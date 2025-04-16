import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default  {
    entry : './lib/Kernox.js',
    output: {
        path : path.resolve(__dirname,'dist'),
        filename : 'Kernox.min.js'
    },
    module : {
        rules : [
            {
                test : /\.js/,
                loader  : 'babel-loader',
                options : {
                    presets : ['@babel/preset-env']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization : {
        minimize  : true,
        minimizer : [new TerserPlugin()] 
    },
}