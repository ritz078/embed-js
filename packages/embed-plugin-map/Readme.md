# embed-plugin-map

A plugin that can be used to embed Google map for a location.

## Installation
```
npm i -S embed-js embed-plugin-map
```

### CDN

https://unpkg.com/embed-plugin-map

## Usage
Embeds google map.

```js
import EmbedJS from 'embed-js'
import map from 'embed-plugin-map'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  map({
    regex: /mapNamePattern/gi, // in case you want to define a custom regex
    template(args) {
      // optional template
    },
    mode: "place", // one of place, streetview or view
    height: 300,
    gAuthKey: "" // mandatory gAuthKey
   })
 ]
})
```
Default pattern to embed a location is `@(locationName)`. You can change this by passing a custom regex.

### License
MIT @ Ritesh Kumar