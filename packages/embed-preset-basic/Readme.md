# embed-plugin-noembed

A collection of plugins combined together.

## Installation
```
npm i -S embed-js embed-preset-basic
```

### CDN

https://unpkg.com/embed-preset-basic

### Included Plugins
- [embed-plugin-highlight]('../embed-plugin-highlight/')
- [embed-plugin-emoji]('../embed-plugin-emoji/')
- [embed-plugin-github]('../embed-plugin-github/')
- [embed-plugin-noEmbed]('../embed-plugin-noembed/')
- [embed-plugin-url]('../embed-plugin-url/')
- [embed-plugin-youtube]('../embed-plugin-youtube/')
- [embed-plugin-facebook]('../embed-plugin-facebook/')
- [embed-plugin-media]('../embed-plugin-media/')
- [embed-plugin-instagram]('../embed-plugin-instagram/)

## Usage

[![Edit embed.js - demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/Wp5OlNMn)

Embeds repository data in the website. Supports repo URLs. Usage is simple.

```js
import EmbedJS from 'embed-js'
import basic from 'embed-plugin-basic'

const x = new EmbedJS({
  input: document.getElementById('element'),
  preset: basic({
    gAuthKey: '', // will be automatically passed to all plugins requiring it.

    exclude: ['url'], // plugins that you don't want to use.

    [pluginId]: {} // pass plugin specific options. Eg: ID for embed-plugin-emoji is emoji. Similar for others.
  })
})
```

Currently only one preset at a time is supported. You can use plugins and preset at the same time though. (not recommended.)

### License
MIT @ Ritesh Kumar
