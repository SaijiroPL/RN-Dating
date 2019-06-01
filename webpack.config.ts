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
          oader: "ts-loader"
        }
      }
    ]
  }
};
