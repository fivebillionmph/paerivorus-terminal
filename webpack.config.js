var webpack = require("webpack");
var path = require("path");

var APP_DIR = __dirname + "/examples/src";
var BUILD_DIR = __dirname + "/examples/static/js";

var config = {
    entry: {
        example1: APP_DIR + "/example1.jsx"
    },
    output: {
        path: BUILD_DIR,
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: __dirname,
                loader: "babel"
            }
        ]
    },
    resolve: {
        modulesDirectories: [__dirname + "/node_modules"],
        extensions: ["", ".json", ".js", ".jsx"]
    }
};

module.exports = config;
