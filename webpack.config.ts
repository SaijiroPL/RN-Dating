module.exports = {
  entry: "./App.js",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }],
              ["@babel/preset-typescript", { modules: false }],
              ["@babel/preset-react", { modules: false }]
            ]
          }
        }
      }
    ]
  }
};
