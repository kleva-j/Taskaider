module.exports = {
  extends: ["custom/next"],
  overides: {
    rules: {
      "eslint-comments/disable-enable-pair": [
        "error",
        { allowWholeFile: true },
      ],
    },
  },
};
