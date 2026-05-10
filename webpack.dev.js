import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3030,
        watchFiles: ["./src/template.html"],
    },
});