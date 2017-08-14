# embed-plugin-instagram

A plugin that can be used to embed instagram posts.

## Installation
```
npm i -S embed-js embed-plugin-instagram
```

### CDN

https://unpkg.com/embed-plugin-instagram

## Usage

```js
import EmbedJS from 'embed-js'
import instagram from 'embed-plugin-instagram'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  instagram({
    regex: /instagramPostRegex/gi, // in case you want to define a custom regex
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