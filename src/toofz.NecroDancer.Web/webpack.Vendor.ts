import * as path from 'path';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as webpack from 'webpack';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as ManifestPlugin from 'webpack-manifest-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const appPath = path.join(__dirname, 'wwwroot', 'app');
export const vendorDllManifestPath = path.join(appPath, 'vendor.dll.manifest.json');

function getConfig(env: any): webpack.Configuration {
    env = env || {};

    const $configuration = env.configuration || 'development';

    let outputFilename = '[name].js';
    if ($configuration === 'production') {
        outputFilename = '[name].[hash].js';
    }

    const manifestFileName = 'vendor.manifest.json';
    const vendorReportFileName = 'vendor.report.html';

    let devtool: webpack.Options.Devtool = 'eval-source-map';
    if ($configuration === 'production') {
        devtool = 'source-map';
    }

    const cleanPaths = [
        manifestFileName,
        vendorDllManifestPath,
        vendorReportFileName,
    ];
    try {
        const lastManifest = require(path.join(appPath, manifestFileName));
        Object.keys(lastManifest).forEach(key => {
            cleanPaths.push(lastManifest[key]);
            if (path.extname(key) === '.js') {
                cleanPaths.push(`${lastManifest[key]}.LICENSE`);
            }
        });
    } catch { }

    const extractCss = new ExtractTextPlugin({
        filename: '[name].[contenthash:20].css',
    });

    const config: webpack.Configuration = {
        entry: {
            vendor: [path.join(__dirname, 'vendors.js')],
        },
        output: {
            path: appPath,
            filename: outputFilename,
            library: '[name]_[hash]',
        },
        devtool: devtool,
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: extractCss.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: $configuration === 'production',
                                    sourceMap: true,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.(svg|eot|ttf|woff|woff2)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:20].[ext]',
                        },
                    },
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(cleanPaths, {
                root: appPath,
                verbose: false,
            }),
            extractCss,
            new webpack.ProvidePlugin({
                'window.jQuery': 'jquery',
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new ManifestPlugin({
                fileName: manifestFileName,
            }),
            new webpack.DllPlugin({
                context: __dirname,
                name: '[name]_[hash]',
                path: vendorDllManifestPath,
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                defaultSizes: 'gzip',
                openAnalyzer: false,
                reportFilename: path.resolve(appPath, vendorReportFileName),
            }),
        ],
        resolve: {
            symlinks: false,
        },
    };

    if ($configuration === 'production') {
        config.plugins!.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify($configuration),
            }),
            new UglifyJsPlugin({
                extractComments: true,
                sourceMap: true,
            }),
        );
    }

    return config;
}

export default getConfig;
