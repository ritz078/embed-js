# embed-plugin-github

A plugin that can be used to embed GitHub repo description.

## Installation
```
npm i -S embed-js embed-plugin-github
```

### CDN

https://unpkg.com/embed-plugin-github

## Usage

[![Edit embed.js - GitHub](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/7jx90or24x)

Embeds repository data in the website. Supports repo URLs. Usage is simple.

```js
import EmbedJS from 'embed-js'
import github from 'embed-plugin-github'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  github({
    regex: /githubRepoRegex/gi, // in case you want to define a custom regex
    template(args) {
      // optional template
    }
   })
 ]
})
```
When you click on the link URL, it redirects you to the repo URL.

### License
MIT @ Ritesh Kumar
