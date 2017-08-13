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

#### [Live Demo](http://codepen.io/ritz078/full/WvvNGe/)

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


## Development
1. Fork the repo
1. clone the repo then `cd embed.js`
1. create a new branch
1. Then `npm install && yarn build:watch`
1. Create a PR

**Note**: This projects adheres to a [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT &copy; [Ritesh Kumar](https://github.com/ritz078)
