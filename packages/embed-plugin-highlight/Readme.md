# embed-plugin-highlight

A plugin that can be used to syntax highlight code.

## Installation
```
npm i -S embed-js embed-plugin-highlight
```

### CDN

https://unpkg.com/embed-plugin-highlight

## Usage

[![Edit embed.js - highlight](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/7jx90or24x)

You need [Prism.js ](http://prismjs.com/) to use this plugins. So import the necessary libraries to support it.
```html
<!-- import the theme of your choice -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-dark.css" />

<!-- import the umd build of prism.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js">  
```
**Note** : On the server, the plugin automatically imports prism.js from `node_modules`. But it doesn't bundle the PrismJS library with the umd build to keep the size to minimal. Technically `prismjs = isServer ? require('prismjs') : window.Prism`. 

```js
import EmbedJS from 'embed-js'
import highlight from 'embed-plugin-highlight'
import prismjs from 'prismjs'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  basicAudio({
    regex: /audiRegex/gi, // in case you want to define a custom regex
    prismjs: prismjs, // By default it takes window.Prism on client side and global.Prism on server side.
    template(args) {
      // optional template
    },
    onLoad(element) {} // in case you want to do something when the component has loaded on the client.
   })
 ]
})
```
This will convert
```md
\`\`\`js
 const x = "hello world"
\`\`\`
```

into

```html
<pre class="language-js">
  <code class="language-js">
    const x = "hello world"
  </code>
</pre>
```
**[Example on CodePen](https://codepen.io/ritz078/pen/ZJLWGb)**

### License
MIT @ Ritesh Kumar
