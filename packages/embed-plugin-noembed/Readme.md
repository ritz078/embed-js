# embed-plugin-noembed

A plugin that can be used to embed selected services supported by NoEmbed.

## Installation
```
npm i -S embed-js embed-plugin-noembed
```

### CDN

https://unpkg.com/embed-plugin-noembed


### Supported Services
- AmCharts
- CollegeHumor
- DailyMotion
- DeviantArt
- DotSub
- Dropbox
- Flickr
- Gfycat
- Giphy
- Hulu
- Imgur
- Kickstarter
- Mixcloud
- NyTimes
- Reddit
- Screen9
- Scribd
- SlideShare
- Smugmug
- SoundCloud
- SpeakerDeck
- Ted
- Twitch
- Twitter
- Ustream
- VeerVR
- Vevo
- Vimeo
- Vine
- Wikimedia
- YouTube

## Usage
Embeds repository data in the website. Supports repo URLs. Usage is simple.

```js
import EmbedJS from 'embed-js'
import noembed from 'embed-plugin-noembed'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  noembed({
    exclude: ['twitter'], // array of service names that you want to exclude. Defaults to an empty array.

    twttr: isBrowser ? window.twttr : null, // in case you want to define a custom twitter widget script.

    onLoad() {}, // executed when tweets are rendered.

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