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

</p>

> A lightweight JavaScript plugin to embed emojis, media, maps, tweets, code and services.

**This is the documentation for v5 that is still in beta. If you are looking for docs of v4 you can get them** [here](https://embedjs.readme.io/docs).

#### [Live Demo](https://codesandbox.io/s/Wp5OlNMn)

## Features
-   **Supported:** supports IE8+ _(assuming `Promise` is polyfilled)
-   **Plugin Based:** only load what you want.
-   **Isomorphic**: Can be used both on server and client side.
-   **Customizable**: So much that creating a custom plugin is also few lines of code.
-   **Modern:** written in ES2015

## Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Options](#options)
- [Plugins](#plugins)
	- [url](./packages/embed-plugin-url)
	- [emoji](./packages/embed-plugin-emoji)
	- [Media](./packages/embed-plugin-media)
	- [highlight](./packages/embed-plugin-highlight)
	- [github](./packages/embed-plugin-github)
	- [youtube](./packages/embed-plugin-youtube)
	- [facebook](./packages/embed-plugin-facebook)
	- [map](./packages/embed-plugin-map)
	- [noembed](./packages/embed-plugin-noembed)
	- [Twitter](./packages/embed-plugin-twitter)
	- [Instagram](./packages/embed-plugin-instagram)
- [Presets](#presets)
	- [basic](./packages/embed-preset-basic)
- [Create a custom plugin](#create-a-custom-plugin)

## Installation

To install the stable version:
```
npm install --save embed-js
```
## CDN
https://unpkg.com/embed-js

## Basic Usage

**You need to use plugins or presets to do anything. By default embed-js does nothing.**

Let's assume that the HTML structure is as written below

``` html
<div id="element">
   <!--===== your string here =======-->
</div>
```

Creating an instance of embed.js

``` javascript
import EmbedJS from 'embed-js'
import url from 'embed-plugin-url'
import emoji from 'embed-plugin-emoji'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
    url(),
    emoji()
  ]
})
```

Next step is replacing the original text with the processed text.

``` javascript
//Render the result
x.render();
```

There may be cases where you just want the processed string to use it according to your need. You can get it by the following method. This can
be used on the server side to get the string. Still if the plugin involves interactions, you will have to load it on
the client side.

``` javascript
//Get the resulting string
x.text().then(({ result }) => {
  console.log(result); //The resulting string
})
```

If you wan't to destroy the instance. It will also replace the processed string with the original string.

``` javascript
//Destroy the instance
x.destroy()
```

## Options

option|default|Description
------|-------|-----------
**plugins**|[]|Accepts an array of plugins.
**preset**| null | Accepts a preset. Currently accpets only one preset. It can be combined with plugins.
**inlineEmbed**| true | If case you want to to embed contents at the end of texts, turn this to false.
**replaceText**| false | Useful when __inlineEmbed__ is set to true. Replace text with the embed.
**fetch**| `window.fetch` or `window.unfetch` | If you are willing to use the library on both server and client side you need to pass an isomorphic fetch library like [isomorphic-unfetch](https://github.com/developit/unfetch/tree/master/packages/isomorphic-unfetch) or [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch). This is only needed if you are using a plugin that has to make a HTTP request.


## Development
1. Fork the repo
1. clone the repo then `cd embed.js`
1. create a new branch
1. Then `npm install && yarn build:watch`
1. Create a PR

**Note**: This projects adheres to a [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT &copy; [Ritesh Kumar](https://github.com/ritz078)
