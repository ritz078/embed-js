# embed-plugin-emoji

A plugin that can be used to convert :emoji_name: to actual emojis.

## Installation
```
npm i -S embed-js embed-plugin-emoji
```

### CDN

https://unpkg.com/embed-plugin-emoji

## Usage
[![Edit embed.js - emoji](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1zzvxym817)

It supports all the emojis supported by [emoji.css](https://github.com/IonicaBizau/emoji.css). If you are using this plugin, you need to load
```css
@import url("https://unpkg.com/emoji.css/dist/emoji.min.css")
```
In case you want to use a custom CSS, you can change the template by
passing a new template in the options.

```js
import EmbedJS from 'embed-js'
import emoji from 'embed-plugin-emoji'

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

### License
MIT @ Ritesh Kumar
