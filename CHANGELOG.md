<a name="3.7.4"></a>
## [3.7.4](https://github.com/ritz078/embed.js/compare/v3.7.3...v3.7.4) (2016-01-19)


### Bug Fixes

* **npm:** Fixed npm dist issue and updated packages ([0e0d232](https://github.com/ritz078/embed.js/commit/0e0d232)), closes [#114](https://github.com/ritz078/embed.js/issues/114)
* **npmignore:** updated .npmignore ([6ce6f46](https://github.com/ritz078/embed.js/commit/6ce6f46))
* **package:** corrected main file path ([f49326b](https://github.com/ritz078/embed.js/commit/f49326b))



<a name="3.7.3"></a>
## [3.7.3](https://github.com/ritz078/embed.js/compare/v3.7.2...v3.7.3) (2016-01-19)




<a name="3.7.2"></a>
## [3.7.2](https://github.com/ritz078/embed.js/compare/v3.7.1...v3.7.2) (2016-01-10)


### Bug Fixes

* **build:** removed duplicate YOUTUBE key ([5b3a42a](https://github.com/ritz078/embed.js/commit/5b3a42a))
* **helpers:** changed helper functioned into named exports ([a9633da](https://github.com/ritz078/embed.js/commit/a9633da))
* **ideone:** corrected the src url formed for the iframe ([e3cda9e](https://github.com/ritz078/embed.js/commit/e3cda9e))
* **jsfiddle:** inline embedding of jsfiddle having / in url ([3add245](https://github.com/ritz078/embed.js/commit/3add245))
* **package:** updated package.json ([6913738](https://github.com/ritz078/embed.js/commit/6913738))
* **travis:** added grunt-cli installation to before-install step ([d23e6f8](https://github.com/ritz078/embed.js/commit/d23e6f8))

### Performance Improvements

* **css:** optimized css and reduced file size ([f3f65c3](https://github.com/ritz078/embed.js/commit/f3f65c3))
* **dimensions:** avoid recalculation of dimensions for each services ([3fb29d3](https://github.com/ritz078/embed.js/commit/3fb29d3))



<a name="3.7.1"></a>
## [3.7.1](https://github.com/ritz078/embed.js/compare/v3.7.0...v3.7.1) (2016-01-06)


### Bug Fixes

* **release:** fix version number in build files ([aea6b89](https://github.com/ritz078/embed.js/commit/aea6b89))

### Features

* **changelog:** automated changelog generation using grunt ([f74e5ad](https://github.com/ritz078/embed.js/commit/f74e5ad))



<a name="3.7.0"></a>
# [3.7.0](https://github.com/ritz078/embed.js/compare/v3.7.0...v3.7.0) (2016-01-06)


### Bug Fixes

* **release:** fix version number in build files ([aea6b89](https://github.com/ritz078/embed.js/commit/aea6b89))



Version 3.7.0
-------------
####Feature
* Added Slideshare embedding.

Version 3.5.0
-------------
####Features
* Opengraph support added
* Github API integration

Version 3.2.2
-------------
####Bug fixes
* Fixed instagram embedding
* Fixed flickr and instagram inline embedding
* Added .npmignore
* Fixed bower.json and package.json
* Removed automatic versioning.

Version 3.0.0
-------------
####Features
* No more jQuery dependent. Its purely written in JavaScript
* Written in ES2015
* Support for custom emoji added
* Support to create custom plugin builds
* Modular code
* Tests added
* Support for multiple vimeo and youtube videos added
* Accept a string instead of an element.
* Return a processed string
* Render an element when needed

####Bug fixes
* Correct order of embeds
* Performance improvements

Version 2.0.6
-------------
* Instagram support added
* Github gist support added
* Embed order fixed
* Image lightbox added

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
