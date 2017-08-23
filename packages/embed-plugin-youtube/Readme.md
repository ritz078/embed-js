# embed-plugin-youtube

A plugin that can be used to embed Youtube videos.

## Installation
```
npm i -S embed-js embed-plugin-youtube
```

### CDN

https://unpkg.com/embed-plugin-youtube

## Usage
[![Edit embed.js - youtube](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/38xmnwpw8m)

This embeds youtube videos in the page. This plugin supports two mode controlled by the option `details`. 
- [Example with Details](https://codepen.io/ritz078/pen/JyyPjq)
- [Example without Details](https://codepen.io/ritz078/pen/qXXWde)

```js
import EmbedJS from 'embed-js'
import { youtube } from 'embed-js/src/plugins'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  youtube({
    regex: /youtubeVideoRegex/gi, // in case you want to define a custom regex,

    // If set to false, it doesn't make API calls to Youtube for video details. Instead it just embeds the video.
    details: true,

    // This is a mandatory field. 
    gAuthKey: '' 

     // height of video iframe 
    height: 300,

    // This is the class on clicking which the details view changes to embedded video.
    // This is only required if you providing a custom template for the details view.
    clickClass: "ejs-video-thumb",

    template(args, options, pluginOptions, dataFromApi) {
      // dataFromApi is undefined if details is set to false
    },

    // executes when element is rendered
    onLoad(options, pluginOptions) {}
   })
 ]
})
```

### License
MIT @ Ritesh Kumar
