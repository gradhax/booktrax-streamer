module.exports = {
  "plugins": [
    [
      "module-resolver", {
        "alias": {
          "@@apis": "./src/apis",
          '@@keys': './src/keys',
          "@@modules": "./src/modules",
          "@@src": "./src",
          "@@utils": "./src/utils"
        },
      }
    ],
  ],
  "presets": [
    [ "@babel/preset-env" ],
    "@babel/preset-typescript"
  ]
};
