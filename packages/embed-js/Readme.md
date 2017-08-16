# embed-js
A lightweight JavaScript plugin to embed emojis, media, maps, tweets, code and services.

## Features
-   **Supported:** supports IE8+ (assuming `Promise` is polyfilled)
-   **Plugin Based:** only load what you want.
-   **Isomorphic**: Can be used both on server and client side.
-   **Customizable**: So much that creating a custom plugin is also few lines of code.
-   **Modern:** written in ES2015

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
**fetch**| `window.fetch || window.unfetch` | If you are willing to use the library on both server and client side you need to pass an isomorphic fetch library like [isomorphic-unfetch](https://github.com/developit/unfetch/tree/master/packages/isomorphic-unfetch) or [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch). This is only needed if you are using a plugin that has to make a HTTP request.

## License
MIT @ Ritesh Kumar
