module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-optional-chaining',
    '@snowpack/babel-plugin-asset-import',
    'babel-plugin-macros',
  ],
};
