var webpack = require("webpack");
var path = require("path");

var config = {
    entry: {
        index: path.join(__dirname, "index.js")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: "[id].bundle.js",
        libraryTarget: "umd",
        library: "paerivorus-terminal"
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
