var webpack = require("webpack");
var path = require("path");

var config = {
    entry: {
        main: __dirname + "/index.js"
    },
    output: {
        path: __dirname,
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
