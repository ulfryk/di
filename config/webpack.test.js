const path = require('path');

const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  module: { rules: [{ test: /\.ts$/, loader: 'ts-loader', options: { config: 'tsconfig.json' } }] },
  resolve: {

    modules: [path.resolve(__dirname, 'src'), 'node_modules',],

    extensions: ['.ts', '.js'],

    plugins: [
      new CircularDependencyPlugin({ exclude: /node_modules/, failOnError: true }),

      // FIXME: this is temporary solution, consider converting it to a plugin
      // See https://gist.github.com/ulfryk/a825465c201052f03ce407b5cc2d350e
      function () {
        this.plugin('done', stats => {
          if (stats.compilation.errors && stats.compilation.errors.length > 0) {
            console.log('\n=== Webpack Compilation Errors ===\n');
            stats.compilation.errors.forEach(err => {
              console.log(`${err.module.resource}\n    ${String(err.message).replace(/(\r\n|\n\r|\n|\r)/gm, '\n    ')}`)
            });
            console.log('\n==================================\n');
            process.exit(1);
          }
        });
      }
    ],

  },
};
