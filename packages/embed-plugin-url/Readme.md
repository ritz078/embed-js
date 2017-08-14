# embed-plugin-url

A plugin that can be used to parse urls into anchor tags.

## Installation
```
npm i -S embed-js embed-plugin-url
```

### CDN

https://unpkg.com/embed-plugin-url

## Usage

[![Edit embed.js - url](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/kR3rvmYY6)

Parsing urls into anchor tags.
```js
import EmbedJS from 'embed-js'
import url from 'embed-plugin-url'

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

### License
MIT @ Ritesh Kumar
