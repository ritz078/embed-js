<img src="demo/logo.png" style="display:block;margin:0 auto;" alt="">

[![Build Status](https://travis-ci.org/ritz078/embed.js.svg?branch=es6)](https://travis-ci.org/ritz078/embed.js)
============

>A JavaScript plugin that analyses the string and automatically embeds the supported emojis, media, maps, tweets, code and services.


![screen](demo/demo.gif)

[Codepen Example](http://codepen.io/ritz078/full/WvvNGe/)

##Documentation

* [Features](http://riteshkr.com/embed.js/)
* [Documentation](http://riteshkr.com/embed.js/getting_started.html)
* [Examples](http://riteshkr.com/embed.js/examples.html)

##Creating custom build

Set the features you don't want to false in `build.json` and then run

```
grunt build
```

This will create a customized build of the plugin.

##Adding custom emojis

1. Add the image to `assets/images/emojis`. Make sure the name of the file is same as emoji name.
2. Pass the emoji name as the value to `customEmoji`. See the example [here](http://riteshkr.com/embed.js/doc.html#emoji)
3. Run `grunt build-emoji && grunt build`

##Contributing

1. Fork and clone the repo.
1. Run `npm install` to install all build dependencies(including Grunt).
1. Create a new branch, please DON'T work in your master branch directly.
1. Run `grunt` so that you can see the impact of your changes on the browser while developing.
1. Fix stuff or add new feature.
1. This repo follows [Angular commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit). For this we are using [commitizen](http://commitizen.github.io/cz-cli/). So instead of git commit, prefer using npm run commit and follow the guidelines.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.

##License

MIT &copy;

