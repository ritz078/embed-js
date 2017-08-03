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
<a href="https://www.paypal.me/ritz078/10usd" target="_blank">
<img src="https://img.shields.io/badge/Donate-PayPal-green.svg" alt="paypal" style="max-width:100%;">
</a>

</p>

> A lightweight JavaScript plugin to embed emojis, media, maps, tweets, code and services.

#### [Live Demo](http://codepen.io/ritz078/full/WvvNGe/)

## Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Options](#options)
- [Plugins](#plugins)
	- [url](#url)
	- [emoji](#emoji)
	- [Basic Audio](#basic-audio)
	- [highlight](#highlight)
	- [plunker](#plunker)
	- [github](#github)
	- [Basic Image](#basic-image)
	- [Basic Video](#basic-video)
	- [youtube](#youtube)
	- [facebook](#facebook)
	- [map](#map)
	- [markdown](#markdown)
	- [noembed](#noembed)
	- [Slide Share](#slide-share)
	- [Twitter](#twitter)
- [Presets](#presets)
	- [all](#all)
- [Create a custom plugin](#create-a-custom-plugin)

## Installation

To install the stable version:
```
npm install --save embed-js
```


## Basic Usage

**You need to use plugins or presets to do anything. By defauly embed-js does nothing.**

Let's assume that the HTML structure is as written below

``` html
<div id="element">
   <!--===== your string here =======-->
</div>
```

Creating an instance of embed.js

``` javascript
import EmbedJS from 'embed-js'
import { url, emoji } from 'embed-js/src/plugins'

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


## Plugins

### url
Parsing urls into anchor tags.
```js
import EmbedJS from 'embed-js'
import { url } from 'embed-js/src/plugins'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
    url({
        attributes: {}, // a hash of attributes to be added in the url
        escape: false   // whether on not to escape special characters in url
    })
  ]
})
```
**Note :** Avoid using `escape: true` when using with **highlight** plugin.

### emoji
Convert texts like `:smile:` into 😄. It supports all the emojis supported by [emoji.css](https://github.com/IonicaBizau/emoji.css). If you are using this plugin, you need to load
```css
@import url("https://unpkg.com/emoji.css/dist/emoji.min.css")
```
In case you want to use a custom CSS, you can change the template by
passing a new template in the options.

```js
import EmbedJS from 'embed-js'
import { emoji } from 'embed-js/src/plugins'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  emoji({
    regex: /emojiRegex/gi, // in case you want to define a custom regex
    template(emojiName) {
      // optional template
    }
   })
 ]
})
```
**Known issue** : It doesn't check if a particular name is a valid emoji name. So if you use a test like `:not_valid_emoji_name:`, it will still convert it to
a span element with that class name.


### Basic Audio
Embeds web supported videos in HTML video tags.

```js
import EmbedJS from 'embed-js'
import { basicAudio } from 'embed-js/src/plugins'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  basicAudio({
    regex: /audioRegex/gi, // in case you want to define a custom regex
    template(args) {
      // optional template
    },
    onLoad(element) {} // in case you want to do something when the component has loaded on the client.
   })
 ]
})
```
You can use video.js or plyr by applying it in the `onLoad()` method.

### Highlight
Uses prismjs to highlight code. For that it supports markdown syntax.

```js
import EmbedJS from 'embed-js'
import { highlight } from 'embed-js/src/plugins'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  basicAudio({
    regex: /audiRegex/gi, // in case you want to define a custom regex
    template(args) {
      // optional template
    },
    onLoad(element) {} // in case you want to do something when the component has loaded on the client.
   })
 ]
})
```
This will convert
```md
\`\`\`js
 const x = "hello world"
\`\`\`
```

into

```html
<pre class="language-js">
  <code class="language-js">
    const x = "hello world"
  </code>
</pre>
```
**Note** : Don't use highlight with **markdown** plugin. It supports highlight feature on its own.

### GitHub
Embeds repository data in the website. q



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
