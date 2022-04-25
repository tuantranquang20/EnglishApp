module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    'react-native-reanimated/plugin',
    ["@babel/plugin-proposal-optional-catch-binding"],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          "~app": "./app",
          "~components": "./app/components",
          "~config": "./app/config",
          "~constants": "./app/constants",
          "~i18n": "./app/i18n",
          "~navigators": "./app/navigators",
          "~screens": "./app/screens",
          "~services": "./app/services",
          "~theme": "./app/theme",
          "~utils": "./app/utils",
          "~models": "./app/models",
          "~plugins": "./app/plugins"
        },
        extensions: [
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
        ],
      },
    ],
  ],
}
