import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import * as ManifestPlugin from 'webpack-manifest-plugin';
import { appDllManifestPath } from './webpack.App';

function getConfig(): webpack.Configuration {
    const sourcePath = path.join(__dirname, 'tests');
    const rootPath = path.join(__dirname, 'tests');
    const appPath = path.join(rootPath, 'app');
    const entryApp = path.join(sourcePath, 'index.js');

    const outputFilename = '[name].js';
    const appManifestFileName = 'tests.manifest.json';

    const devtool: webpack.Options.Devtool = 'eval-source-map';

    const cleanPaths = [
        path.join(__dirname, 'coverage'),
        appManifestFileName,
    ];
    try {
        const lastManifest = require(path.join(appPath, appManifestFileName));
        Object.keys(lastManifest).forEach(key => {
            cleanPaths.push(lastManifest[key]);
        });
    } catch { }

    const config: webpack.Configuration = {
        entry: {
            tests: entryApp,
        },
        output: {
            filename: outputFilename,
            path: appPath,
        },
        devtool: devtool,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader',
                        },
                    ],
                    include: rootPath,
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(cleanPaths, {
                root: appPath,
                verbose: false,
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: appDllManifestPath,
            }),
            new ManifestPlugin({
                fileName: appManifestFileName,
            }),
        ],
        resolve: {
            extensions: ['.ts', '.js'],
            symlinks: false,
        },
        target: 'node',
    };

    return config;
}

export default getConfig;
