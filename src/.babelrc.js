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
    // 'babel-plugin-dynamic-import-node',
    'dynamic-import-node',
  ],
  "presets": [
    [ "@babel/preset-env" ],
    "@babel/preset-typescript"
  ]
};
