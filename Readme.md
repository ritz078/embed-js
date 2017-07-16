# javascript-plugin-boilerplate

> A boilerplate to write plugins in pure JavaScript using ES2015. Includes mocha, chai, prettier, husky, Rollup and Eslint

### Features
* ES2015 support (using [rollup.js](http://rollupjs.org/) and [Babel](http://babeljs.io/))
* [UMD](https://github.com/umdjs/umd) supported build
* Automatic versioning using [semantic-release](https://github.com/semantic-release/semantic-release)
* [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/) for testing
* Lint using [babel-eslint](https://github.com/babel/babel-eslint)
* Code coverage recording with [istanbul](https://gotwarlost.github.io/istanbul/)
* Code coverage reporting to codecov.io
* Prettier for code formatting as a precommit hook

## npm scripts
- **test**: Run tests
- **test:watch**: Run tests while watching at the same time
- **test:cover**: Create code coverage report using istanbul
- **test:report**: Report code coverage report to codecov.io
- **build**: Build all JS files to different formats
- **build:watch**: Build all JS files to different formats while watching
- **lint**: Run eslint on all JS files
- **lint:fix**: Fix linting errors
- **format**: Run prettier on js files

## License
MIT @ Ritesh Kumar


