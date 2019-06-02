module.exports = function(api) {
  api.cache(true);
  return {
    resets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx"
          ],
          root: ["./src"]
        }
      ]
    ]
  };
};
