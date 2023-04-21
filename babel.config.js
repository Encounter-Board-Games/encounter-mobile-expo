module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@graphql': './src/graphql', // fix typo here
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@store': './src/store',
            '@styles': './src/styles',
            '@texts': './src/texts',
            '@utils': './src/utils',
            // Define more aliases as needed
          },
        },
      ],
    ],
  };
};
