embed.js
============

>A jQuery plugin that analyses the string and automatically embeds the supported emojis, media, maps, tweets, code and services.

![screen](demo/demo.gif)
 
[Codepen Example](http://codepen.io/ritz078/full/WvvNGe/)
 
All the features are listed [here](#features).
The demo examples are given [here](http://rkritesh.in/embed.js).
**The angular version of this plugin is [ngEmbed](http://github.com/ritz078/ngEmbed)**

Contents
--------
* [Features](#features)
* [Dependencies](#dependencies)
* [Getting Started](#getting-started)
* [HTML Structure](#html-structure)
* [Usage Example](#usage-example)
* [Advanced Options](#advanced-options)
* [Load plugin in a block](#loading-plugin-in-a-block)
* [Use with browserify](#browserify)
* [Examples](http://rkritesh.in/embed.js)

Features
--------

* Converts emoticon text codes into emoticons :smile: , :heart:
* Finds links in text input and turns them into html links (shortened urls like goo.gl,ow.ly,bit.ly etc supported)
* Youtube and Vimeo video embedding with video details fetched from the api.
* HTML5 player supported media embedding (mp3,mp4,ogg)
* Flickr support
* PDF,DOC,DOCX,XLS,XLSX,PPT viewing with preview and then the actual documents in a frame.
* Inline Code Syntax highlighting (uses highlight.js)
* Twitter tweet embedding supported
* Codepen, jsbin,ideone, jsfiddle and plunker embed supported
* soundcloud and spotify support
* Twitch tv, dotSub, dailymotion, vine,TED, ustream and liveLeak support.
* Google map location embed

Dependencies
------------
* Jquery >= 1.2
* [Highlight.js](https://highlightjs.org/) (Optional if code syntax highlighting is needed)
* [Twitter widgets.js](http://platform.twitter.com/widgets.js) (Optional if tweet embed support is set to true needed)

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
<link rel="stylesheet" href="path/to/jquery.embed.css"/>
```

Load Scripts
```html
<script src="path/to/jquery.min.js"></script>
<!--==== Optional =====-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>
<script src="http://platform.twitter.com/widgets.js"></script>
<!--===================-->
<script src="path/to/jquery.embed.js"></script>
```

HTML Structure
--------------

**Default**

```html
<div id="element">
  <div> Some content here </div>
  <div> Some content here </div>
  ...
  ...
</div>
```

**Custom**

```html
<div id="element">
    <span> Some content here </span>
    <span> Some content here </span>
</div>
<script>
$('#element').embedJS({
    embedSelector : 'span',
    gdevAuthKey   : 'xxxxxxxx'
});
</script>
```




Usage Example
-------------
```html
<script>
$('#element').embedJS({
    gdevAuthKey : 'xxxxxxxx'
});
</script>
```
This is the minimal setup in which all features will work in their default configuration.If you want to disable any feature or change any default setting see below.

Advanced Options
----------------
Only **gdevAuth** option is mandatory. Other options provide you additional control on the plugin.

```html
<script>
$('#element').embedJS({
      //The selector(id/class/tagName) inside #element that needs to be processed
      embedSelector   :'div',
      //Instructs the library whether or not to embed urls
      link              : true,
      //same as the target attribute in html anchor tag . supports all html supported target values.
      linkTarget        : '_blank',
      //Array of extensions to be excluded from converting into links
      linkExclude       : ['jpg','pdf'],
      //set false to show a preview of document(pdf,xls,xlsx,doc,docx,ppt) links
      docEmbed          : true,
      docOptions        : {
              viewText    : '<i class="fa fa-eye"></i> View PDF',
              downloadText: '<i class="fa fa-download"></i> DOWNLOAD'
      },
      //set false to embed images
      imageEmbed        : true,
      //set false to embed audio
      audioEmbed        : false,
      //set false to show a preview of youtube/vimeo videos with details
      videoEmbed        : true,
      //set false to show basic video files like mp4 etc. (supported by html5 player)
      basicVideoEmbed   : true,
      //width of the video frame (in pixels)
      videoWidth        : 640,
      //height of the video frame (in pixels)
      videoHeight       : 390,
      //( Mandatory ) The authorization key obtained from google's developer console for
      //using youtube data api and map embed api
      gdevAuthKey         : 'xxxxxxx',
      //Set google map location embed
      // Use @(place-name) to use this feature . Eg: @(Sydney)
      locationEmbed       :true,
      mapOptions        : {
            //'place' or 'streetview' or 'view'
            mode: 'place'                   
      },
      //Instructs the library whether or not to highlight code syntax.
      highlightCode     : true,
      //Instructs the library whether or not embed the tweets
      tweetsEmbed     : true,
      tweetOptions:{
            //The maximum width of a rendered Tweet in whole pixels. Must be between 220 and 550 inclusive.
            maxWidth   : 550,
            //When set to true or 1 links in a Tweet are not expanded to photo, video, or link previews.
            hideMedia  : false,
            //When set to true or 1 a collapsed version of the previous Tweet in a conversation thread
            //will not be displayed when the requested Tweet is in reply to another Tweet.
            hideThread : false,
            //Specifies whether the embedded Tweet should be floated left, right, or center in
            //the page relative to the parent element.Valid values are left, right, center, and none.
            //Defaults to none, meaning no alignment styles are specified for the Tweet.
            align      : 'none',
            //Request returned HTML and a rendered Tweet in the specified.
            //Supported Languages listed here (https://dev.twitter.com/web/overview/languages)
            lang       : 'en'
      },
      //An array of services excluded from embedding...
      //Options : codePen/jdFiddle/jsBin/ideone/plunker/soundcloud/twitchTv/dotSub/dailymotion/vine/ted/liveleak/spotify/ustream/flickr
      //Can exclude all options by setting it to 'all'
      excludeEmbed     :['twitchTv'],
      //Height of jsfiddle/codepen/jsbin/ideone/plunker
      codeEmbedHeight  :300,
      soundCloudOptions: {
          height      : 160,
          themeColor  : 'f50000',    //Hex Code of the player theme color
          autoPlay    : false,
          hideRelated : false,
          showComments: true,
          showUser    : true,        //Show or hide the uploader name, useful e.g. in tiny players to save space)
          showReposts : false,
          visual      : false,       //Show/hide the big preview image
          download    : false        //Show/Hide download buttons
              },
      vineOptions:{
            maxWidth:null,
            type:'postcard',         //'postcard' or 'simple' embedding
            responsive:false         // whether to make the vine embed responsive
      },
      //callback before doc preview
      beforeDocPreview  : function(){},
      //callback after doc preview
      afterDocPreview   : function(){},
      // callback on video frame view
      onVideoShow:function(){},
      //callback on video load (youtube/vimeo)
      onVideoLoad:function(){}
      //function to execute before embedding services
      beforeEmbedJSApply: function () {},
      //callback after embedJS is applied
      afterEmbedJSLApply: function () {},
      //callback after the twitter widgets of a BLOCK are loaded.
      onTwitterShow     : function () {}

});
</script>
```
If you specify either one of **videoWidth** or **videoHeight** , the other option will be automatically set in the aspected ratio.

Loading plugin in a block
--------------------------
```html
<div id="block">
    Some content
</div>

<script>
$('#block').embedBlock({
    gdevAuthKey : 'xxxxxxxx'
});
</script>
```

All other options of the block are same as given above **except** the **embedSelector** option.

Browserify
----------
This library is [UMD](https://github.com/umdjs/umd) compatible, so you can use it in this way:

```javascript
var jquery = require('jquery');
require('embed-js');

jquery('#element').embedJS({
    gdevAuthKey : 'xxxxxxxx'
});
```

[Demo Example](http://codepen.io/ritz078/full/WvvNGe/)

Examples
--------
Visit [http://rkritesh.in/embed.js](http://rkritesh.in/embed.js)


Version 2.0.5
-------------
* flickr support added
* bugs-fixed : #28 , #29
* UMD support added

Version 2.0.4
-------------

* Vine embed is now responsive
* Support for xls,xlsx,doc,docx,ppt added
* ustream support added.
* streetview and view support added for maps.
* function to load the plugin in a single block added.

Version 2.0.3
-------------
* Better options structure
* Configurable HTML Structure
* can exclude all embed services at once
* Callback functions beforeEmbedJSApply, afterEmbedJSApply and onTwitterShow added
* text to url conversion for a lot of shortened urls like goo.gl, ow.ly, bit.ly etc added

Version 2.0.2
-------------
* Ideone and plunker support added
* Code comments added


Contributing
------------

View [this](CONTRIBUTING.md)

Contributors
------------
[Jesús Pérez](https://github.com/jesusprubio)

License
-------

MIT © Ritesh Kumar


