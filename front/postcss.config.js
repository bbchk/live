// todo configure postcss.config.js

module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './comps/**/*.{js,jsx,ts,tsx}',
          './features/**/*.{js,jsx,ts,tsx}',
          './styles/**/*.{scss,css}',
          './node_modules/react-bootstrap/**/*.{js,jsx,ts,tsx}',
          './node_modules/react-bootstrap/**/*.{scss,css}',
        ],
        safelist: {
          standard: ['html', 'body', 'btn'],
          deep: [/^col/, /^navbar/, /^nav/, /^modal/],
        },
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        whitelist: require('purgecss-with-wordpress').whitelist, // Whitelist all classes
        whitelistPatterns: require('purgecss-with-wordpress').whitelistPatterns, // Whitelist based on patterns
      },
    ],
  ],
}
