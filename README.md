<p align="center"><img src="demo/logo.png" align="center" alt=""></p>

[![Build Status](https://travis-ci.org/ritz078/embed.js.svg?branch=master)](https://travis-ci.org/ritz078/embed.js) [![npm](https://img.shields.io/npm/v/embed-js.svg)](https://github.com/ritz078/embed.js) [![Bower](https://img.shields.io/bower/v/embed-js.svg)](https://github.com/ritz078/embed.js) 
[![Twitter](https://img.shields.io/twitter/url/https/github.com/ritz078/embed.js.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

> A JavaScript plugin that analyses the string and automatically embeds the supported emojis, media, maps, tweets, code and services.


![screen](demo/demo.gif)

## Important links

* **[Features](http://riteshkr.com/embed.js)**
* **[Full Documentation](http://riteshkr.com/embed.js/doc.html)**
* **[Examples](http://riteshkr.com/embed.js/examples.html)**
  ​

## Simple Usage

Let's assume that the HTML structure is as written below

``` html
<div id="element">
   <!--===== your string here =======-->
</div>
```

Creating an instance of embed.js

``` javascript
var x = new EmbedJS({
  element: document.getElementById('element'),
  googleAuthKey : 'xxxx'
})
```

Next step is replacing the original text with the processed text.

``` javascript
//Render the result
x.render();
```

There may be cases where you just want the processed string to use it according to your need. You can get it by the following method.

``` javascript
//Get the resulting string
x.text(function(data){
  console.log(data); //The resultant string
})
```

If you wan't to destroy the instance. It will also replace the processed string with the original string.

``` javascript
//Destroy the instance
x.destroy()
```

## Creating custom build

Set the features you don't want to **false** in `build.json` and then run

``` 
grunt build
```

This will create a customized build of the plugin.

## Adding custom emojis

1. Add the image to **assets/images/emojis**. Make sure the name of the file is same as emoji name.
2. Pass the emoji name as the value to `customEmoji`. See the example [here](http://riteshkr.com/embed.js/doc.html#emoji)
3. Run `grunt build-emoji && grunt build`

## Contributing

1. Fork and clone the repo.
2. Run `npm install` to install all build dependencies(including Grunt).
3. Create a new branch, please DON'T work in your master branch directly.
4. Run `grunt` so that you can see the impact of your changes on the browser while developing.
5. Fix stuff or add new feature.
6. This repo follows [Angular commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit). For this we are using [commitizen](http://commitizen.github.io/cz-cli/). So instead of git commit, prefer using npm run commit and follow the guidelines.
7. Update the documentation to reflect any changes.
8. Push to your fork and submit a pull request.

## License

MIT &copy; [Ritesh Kumar](https://github.com/ritz078)
