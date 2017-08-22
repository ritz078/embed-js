# embed-plugin-base

A plugin that can be used to create custom plugins.

## Installation
```
npm i -S embed-plugin-base
```

### CDN

https://unpkg.com/embed-plugin-base

## Usage

[![Edit embed.js - custom plugin vimeo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/wm8lgyq1X)

This is just a helper plugin that handles text transformation. You may not always need this.

```js
import extend from 'just-extend'
import base from 'embed-plugin-base'

/**
  * This function can be used to make any API calls that you want to make  
  * before passing the data to the template.
**/
async function _process() {
  // Do any async task
  return value
}

export default function (opts) {
  const defaultOptions = {
    regex: /your_regex/gi,
    async template(args, options, pluginOptions, value) {
      // return the template
    }
  }

  const pluginOptions = extend({}, defaultOptions, opts)
  return base(pluginOptions)
}
```

### License
MIT @ Ritesh Kumar
