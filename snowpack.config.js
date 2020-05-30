module.exports = {
  installOptions: {
    clean: true,
    installTypes: true,
  },
  dev: {
    port: 3000,
    src: 'src',
    out: 'build',
    fallback: 'index.html',
    bundle: process.env.NODE_ENV === 'production',
  },
  scripts: {
    'plugin:ts,tsx': '@snowpack/plugin-babel',
    'mount:public': 'mount public --to /',
    'mount:web_modules': 'mount web_modules',
    'lintall:tsc': 'tsc --noEmit',
    'lintall:tsc::watch': '$1 --watch',
    'build:ts,tsx,js,jsx': 'babel --no-babelrc',
  },
};
