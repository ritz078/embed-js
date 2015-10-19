embed.js [![Build Status](https://travis-ci.org/ritz078/embed.js.svg?branch=es6)](https://travis-ci.org/ritz078/embed.js)
============

>A jQuery plugin that analyses the string and automatically embeds the supported emojis, media, maps, tweets, code and services.


![screen](demo/demo.gif)

[Codepen Example](http://codepen.io/ritz078/full/WvvNGe/)

**The angular version of this plugin is [ngEmbed](http://github.com/ritz078/ngEmbed)**

Contents
--------
* [Features](#features)
* [Dependencies](#dependencies)
* [Getting Started](#getting-started)
* [Usage Example](#usage-example)
* [Advanced Options](#advanced-options)
* [Contributing](#contributing)

Features
--------

* Converts emoticon text codes into emoticons :smile: , :heart:
* Finds links in text input and turns them into html links (shortened urls like goo.gl,ow.ly,bit.ly etc supported)
* Youtube and Vimeo video embedding with video details fetched from the api.
* HTML5 player supported media embedding (mp3,mp4,ogg). Also supports integration of [video.js](http://videojs.com/)
* Flickr and instagram support
* Inline Code Syntax highlighting (using highlight.js)
* Twitter tweet embedding support
* Codepen, jsbin,ideone, jsfiddle and plunker embed supported
* soundcloud and spotify support
* Dailymotion, vine,TED, ustream and liveLeak support.

Dependencies
------------
* [Highlight.js](https://highlightjs.org/) (Optional if code syntax highlighting is needed)
* [Twitter widgets.js](http://platform.twitter.com/widgets.js) (Optional if tweet embed support is set to true needed)
* [video.js](http://videojs.com/) [optional]

Getting started
---------------

Bower
```
bower install --save embed-js
```

npm
```
npm install --save embed-js
```

Load css file
```html
<link rel="stylesheet" href="path/to/embed.css"/>
```

Load Scripts
```html
<!--==== Optional =====-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>
<script src="http://platform.twitter.com/widgets.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/5.0.0/video.min.js"></script>
<!--===================-->
<script src="path/to/embed.js"></script>
```

Usage Example
-------------
```html
<script>
new EmbedJS({
  element : document.getElementById('something'),
  gdevAuthKey : 'xxxxxxxx'
});
</script>
```
This is the minimal setup in which all features will work in their default configuration.If you want to disable any feature or change any default setting see below.

**Note** : The steps of obtaining the **gdevAuthKey** are mentioned [here](https://developers.google.com/api-client-library/python/guide/aaa_apikeys)

Advanced Options
----------------
Only **gdevAuth** option is mandatory. Other options provide you additional control on the plugin.

```html
<script>
new EmbedJS({
  link            : true,
  linkOptions     : {
      target  : 'self',
      exclude : ['pdf']
  },
  emoji           : true,
  fontIcons       : true,
  highlightCode   : true,
  videoJS         : false,
  videojsOptions  : {
      fluid:true,
      preload:'metadata'
  },
  tweetsEmbed     : true,
  tweetOptions    : {
      maxWidth   : 550,
      hideMedia  : false,
      hideThread : false,
      align      : 'none',
      lang       : 'en'
  },
  imageEmbed      : true,
  videoEmbed      : true,
  videoHeight     : null,
  videoWidth      : null,
  videoDetails    : true,
  audioEmbed      : true,
  excludeEmbed    : [],
  codeEmbedHeight : 500,
  vineOptions     : {
      maxWidth   : null,
      type       : 'postcard', //'postcard' or 'simple' embedding
      responsive : true,
      width      : 350,
      height     : 460
  },
  googleAuthKey   : 'AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts',
  soundCloudOptions : {
      height      : 160,
      themeColor  : 'f50000',   //Hex Code of the player theme color
      autoPlay    : false,
      hideRelated : false,
      showComments: true,
      showUser    : true,
      showReposts : false,
      visual      : false,         //Show/hide the big preview image
      download    : false          //Show/Hide download buttons
  },
  beforeEmbedJSApply : function(){},
  afterEmbedJSApply  : function(){},
  onVideoShow        : function(){},
  onTweetsLoad       : function(){},
  videojsCallback    : function(){}
    });
</script>
```
If you specify either one of **videoWidth** or **videoHeight** , the other option will be automatically set in the aspected ratio.

[Demo Example](http://codepen.io/ritz078/full/WvvNGe/)

Contributing
------------

1. Fork and clone the repo.
1. Run` npm install` to install all build dependencies(including Grunt).
1. Create a **new branch**, please DON'T work in your `master` branch directly.
1. Fix stuff.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.

Contributors
------------
[Jesús Pérez](https://github.com/jesusprubio)

License
-------

MIT © Ritesh Kumar


