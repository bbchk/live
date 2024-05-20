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
          './node_modules/@mui/**/*.{js,jsx,ts,tsx}',
        ],
        safelist: {
          standard: ['html', 'body'],
        },
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
  ],
}
