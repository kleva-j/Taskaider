module.exports = {
  extends: ["custom/react-internal"],
  overides: {
    rules: {
      "eslint-comments/disable-enable-pair": [
        "error",
        { allowWholeFile: true },
      ],
    },
  },
};
