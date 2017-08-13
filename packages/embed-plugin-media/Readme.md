# embed-plugin-highlight

A plugin that can be used to embed video, audio or image those are supported by the browser.

## Installation
```
npm i -S embed-js embed-plugin-media
```

### CDN

https://unpkg.com/embed-plugin-media

## Usage
Embeds video, audio or image those are supported by the browser.

```js
import EmbedJS from 'embed-js'
import media from 'embed-plugin-media'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  media({
    regex: /regex/gi, // in case you want to define a custom regex
    template(args) {
      // optional template
    },
    onLoad(element) {} // in case you want to do something when the component has loaded on the client.
   })
 ]
})
```
You can use video.js or plyr by applying it in the `onLoad()` method.
- [Usage with plyr.io](https://codepen.io/ritz078/pen/BdpoxQ)

### License
MIT @ Ritesh Kumar