module.exports = {
  entry: "./App.tsx",
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
            presets: [["@babel/preset-typescript", { modules: false }]]
          }
        }
      }
    ]
  }
};
