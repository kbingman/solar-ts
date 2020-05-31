module.exports = {
  installOptions: {
    installTypes: true
  },
  plugins: ['@snowpack/plugin-babel', '@snowpack/plugin-parcel'],
  devOptions: {},
  scripts: {
    'mount:public': 'mount public --to /',
    'mount:src': 'mount src --to /_dist_',
    'run:tsc': 'tsc --noEmit',
    'run:tsc::watch': '$1 --watch',
  }
};
