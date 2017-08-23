# embed-plugin-facebook

A plugin that can be used to embed facebook posts/videos.

## Installation
```
npm i -S embed-js embed-plugin-facebook
```

### CDN

https://unpkg.com/embed-plugin-facebook

## Usage

[![Edit embed.js - facebook](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/7jx90or24x)

```js
import EmbedJS from 'embed-js'
import facebook from 'embed-plugin-facebook'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  facebook({
    regex: /facebookPostRegex/gi, // in case you want to define a custom regex
    template(args) {
      // optional template
    }
   })
 ]
})
```
When you click on the link URL, it redirects you to the post URL.

### License
MIT @ Ritesh Kumar