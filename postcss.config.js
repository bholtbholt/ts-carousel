module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
    require('postcss-nested')(),
    require('postcss-simple-vars')({
      variables: {
        $black: '#000',
        $white: '#FFF',
        $silver: '#C0C0C0',
        $lightGrey: '#D3D3D3',
      },
    }),
  ],
};
