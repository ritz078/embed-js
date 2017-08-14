# embed-plugin-utilities

A collection of utilities that can be used to make a plugin.

## Installation
```
npm i -S embed-js embed-plugin-utilities
```

### CDN

https://unpkg.com/embed-plugin-utilities

### Methods

Method Name| Arguments | Description
------|------|-----
insert| **(options, pluginOptions)** | It modifies the string by replacing or adding the template based on the provided options. Returns the modified options object.
withDetailsTemplate| **({url, title, embedUrl, description, thumbnail}, thumbClassName)** | This method returns a tempate with description and thumb image. embedUrl and thumbClassName is optional. Others are mandatory.
withoutDetailsTemplate | **(embedUrl, height, name)** | Returns a simple embeddable iframe.
jsonp | (url) | Makes a JSONP request on client side and normal get request on the server side.
getQuery| (paramObject) | Converts an object of query params into `&` separated string.

### License
MIT @ Ritesh Kumar
