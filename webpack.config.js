module.exports = env => {
    return {
        mode: env === "dev" ? "development" : "production",
        entry: "./src/index.js",
        devtool: "sourcemap",
        output: {
            path: __dirname + "/dist",
            filename: "onresize-matcher.min.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                }
            ]
        }
    }; 
};
