import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as ManifestPlugin from 'webpack-manifest-plugin';
import { Environment } from './build';
import stats from './webpack.stats';
import { vendorDllManifestPath } from './webpack.vendor.config';

let rootPath = path.join(__dirname, 'wwwroot');
let appPath = path.join(rootPath, 'app');
export const appDllManifestPath = path.join(appPath, 'app.dll.manifest.json');

function getConfig(env: any): webpack.Configuration {
    env = env || {};

    const $configuration = env.configuration || Environment.Development;
    const $test = env.test || false;

    let sourcePath = path.join(__dirname, 'src');

    let entryApp = path.join(sourcePath, 'app.module.ts');

    let outputFilename = '[name].js';
    if ($configuration === Environment.Production) {
        outputFilename = '[name].[hash].js';
    }

    const appManifestFileName = 'app.manifest.json';
    const appReportFileName = 'app.report.html';

    let devtool: webpack.Options.Devtool = 'eval-source-map';
    if ($configuration === Environment.Production) {
        devtool = 'source-map';
    }

    const tsRule: webpack.Rule = {
        test: /\.ts$/,
        use: [
            {
                loader: 'ng-annotate-loader',
                options: {
                    map: {
                        inline: true,
                    },
                },
            },
            {
                loader: 'ts-loader',
            },
        ],
        include: path.resolve(__dirname, 'src'),
    };

    if ($test) {
        // Array check to satisfy TypeScript
        if (Array.isArray(tsRule.use)) {
            tsRule.use.unshift({
                loader: 'istanbul-instrumenter-loader',
                options: {
                    esModules: true,
                },
            });
        }
    }

    const extractSass = new ExtractTextPlugin({
        filename: '[name].[contenthash:20].css',
    });

    const bootstrap = require.resolve('./lib/bootstrap/bootstrap');

    const cleanPaths = [
        appManifestFileName,
        appReportFileName,
    ];
    try {
        const lastManifest = require(path.join(appPath, appManifestFileName));
        Object.keys(lastManifest).forEach(key => {
            cleanPaths.push(lastManifest[key]);
        });
    } catch { }

    const config: webpack.Configuration = {
        entry: {
            app: [entryApp],
        },
        output: {
            path: appPath,
            filename: outputFilename,
        },
        devtool: devtool,
        module: {
            rules: [
                tsRule,
                {
                    test: /\.scss$/,
                    use: extractSass.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: $configuration === Environment.Production,
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: 'url-loader',
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: $configuration === Environment.Production,
                            },
                        },
                    ],
                },
            ],
        },
        node: {
            __dirname: true,
        },
        plugins: [
            new CleanWebpackPlugin(cleanPaths, {
                root: appPath,
                verbose: false,
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify($configuration),
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: vendorDllManifestPath,
            }),
            extractSass,
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                defaultSizes: 'gzip',
                openAnalyzer: false,
                reportFilename: path.resolve(appPath, appReportFileName),
            }),
            new ManifestPlugin({
                fileName: appManifestFileName,
            }),
        ],
        resolve: {
            alias: {
                bootstrap$: bootstrap,
            },
            extensions: ['.ts', '.js'],
            symlinks: false,
        },
        stats: stats,
    };

    if ($test) {
        config.output!.library = '[name]_[hash]';
        config.plugins!.push(
            new webpack.DllPlugin({
                context: __dirname,
                name: '[name]_[hash]',
                path: appDllManifestPath,
            }),
        );
    }

    if ($configuration === Environment.Production) {
        config.plugins!.push(
            new UglifyJsPlugin({
                extractComments: true,
                sourceMap: true,
            }),
        );
    }

    return config;
}

export default getConfig;
