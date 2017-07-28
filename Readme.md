<p align="center"><img src="resources/logo.png" align="center" alt=""></p>

<p align="center">
<a href="https://travis-ci.org/ritz078/embed.js">
<img src="https://travis-ci.org/ritz078/embed.js.svg?branch=master" alt="Build Status" style="max-width:100%;">
</a>
<a href="https://github.com/ritz078/embed.js">
<img src="https://img.shields.io/npm/v/embed-js.svg" alt="npm" style="max-width:100%;">
</a>
<a href="https://twitter.com/intent/tweet?text=embed.js+%7C+A+JS+plugin+to+embed+emojis%2C+media%2C+maps%2C+tweets%2C+code%2C+services+and+parse+markdown+http%3A%2F%2Fbit.ly%2F1NIvT8A&amp;url='http%3A%2F%2Fbit.ly%2F1NIvT8A'&amp;hashtags=JavaScript">
<img src="https://img.shields.io/twitter/url/https/github.com/ritz078/embed.js.svg?style=social" alt="Twitter" style="max-width:100%;">
</a>
<a href="https://www.producthunt.com/tech/embed-js">
<img src="https://img.shields.io/badge/vote-producthunt-E45127.svg" alt="Producthunt" style="max-width:100%;">
</a>
<a href="https://www.paypal.me/ritz078/20usd" target="_blank">
<img src="https://img.shields.io/badge/Donate-PayPal-green.svg" alt="paypal" style="max-width:100%;">
</a>

</p>

> A lightweight JavaScript plugin to embed emojis, media, maps, tweets, code and services.

#### [Live Demo](http://codepen.io/ritz078/full/WvvNGe/)


[![screen](resources/demo.gif)](http://codepen.io/ritz078/full/WvvNGe/)

## Important links

* **[Features](http://riteshkr.com/embed.js)**
* **[Full Documentation](https://embedjs.readme.io)**
* **[Examples](https://embedjs.readme.io/docs/basic-example)**

## Installation

To install the stable version:
```
npm install --save embed-js
```



## CDN

* [jsDelivr](https://www.jsdelivr.com/projects/embed.js)
* [cdnjs](https://cdnjs.com/libraries/embed-js)

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
  input: document.getElementById('element'),
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

## Development
1. Fork the repo
1. clone the repo then `cd embed.js`
1. create a new branch
1. Make sure ruby and sass are installed on your system.
1. Then `npm install && yarn build:watch`
1. Create a PR

**Note**: This projects adheres to a [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT &copy; [Ritesh Kumar](https://github.com/ritz078)
