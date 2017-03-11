import { toUrl, lastElement } from './utils'

export default {
  url (match, options) {
    let config = options.linkOptions
    return `<a href="${toUrl(match)}" rel="${config.rel}" target="${config.target}">${match}</a>`
  },

  smiley (text, pre, code) {
    return `<span class="icon-emoticon" title="${text}">${pre}${code}</span>`
  },

  emoji (text) {
    return `<span class="emoticon emoticon-${text}" title=":${text}:"></span>`
  },

  audio (match) {
    return `<div class="ejs-audio ejs-plyr ejs-embed"><audio src="${match}" controls class="video-js ejs-video-js"></audio></div>`
  },

  soundcloud (match, options) {
    let config = options.soundCloudOptions
    return `<div class="ejs-embed">
		<iframe height="160" scrolling="no" src="https://w.soundcloud.com/player/?url=${match}&auto_play=${config.autoPlay}&hide_related=${config.hideRelated}&show_comments= ${config.showComments}&show_user=${config.showUser}&show_reposts=${config.showReposts}&visual=${config.visual}&download=${config.download}&color=${config.themeColor}&theme_color=${config.themeColor}"></iframe>
		</div>`
  },

  spotify (match) {
    let id = lastElement(match.split('/'))
    return `<div class="ejs-embed"><iframe src="https://embed.spotify.com/?uri=spotify:track:${id}" height="80"></iframe></div>`
  },

  codepen (id, options) {
    return `<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="${options.codeEmbedHeight}" src="${id.replace(/\/pen\//, '/embed/')}/?height=${options.codeEmbedHeight}"></iframe></div>`
  },

  ideone (match, options) {
    return `<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/${match.split('/')[1]}" frameborder="0" height="${options.codeEmbedHeight}"></iframe></div>`
  },

  jsbin (id, options) {
    return `<div class="ejs-jsbin ejs-embed"><iframe height="${options.codeEmbedHeight}" class="jsbin-embed foo" src="http://${id}/embed?html,js,output"></iframe></div>`
  },

  jsfiddle (id, options) {
    id = lastElement(id) === '/' ? id.slice(0, -1) : id
    id = (id.indexOf('//') !== -1) ? id : `//${id}`
    return `<div class="ejs-embed ejs-jsfiddle"><iframe height="${options.codeEmbedHeight}" src="${id}/embedded"></iframe></div>`
  },

  plunker (id, options) {
    return `<div class="ejs-embed ejs-plunker"><iframe class="ne-plunker" src="http://embed.plnkr.co/${id}" height="${options.codeEmbedHeight}"></iframe></div>`
  },

  image (match) {
    return `<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="${match}"/></div></div>`
  },

  flickr (match, options) {
    return `<div class="ejs-embed"><div class="ne-image-wrapper"><iframe src="${toUrl(match.split('/?')[0])}/player/" width="${options.videoWidth}" height="${options.videoHeight}"></iframe></div></div>`
  },

  instagram (match, options) {
    return `<div class="ejs-embed ejs-instagram"><iframe src="${toUrl(match.split('/?')[0])}/embed/" height="${options.videoHeight}"></iframe></div>`
  },

  facebook (match, options) {
    // check  if it is a video or a post
    const type = match.indexOf('/videos/') < 0 ? 'post' : 'video'
    return `<div class="ejs-embed ejs-facebook"><iframe src="https://www.facebook.com/plugins/${type}.php?href=${toUrl(match.split('/?')[0])}" height="${options.videoHeight}" target="_top" ></iframe></div>`
  },

  slideShare (html) {
    return `<div class="ejs-embed ejs-slideshare">${html}</div>`
  },

  video (match) {
    return `<div class="ejs-video ejs-embed"><div class="ejs-video-player"><div class="ejs-player ejs-plyr"><video src="${match}" class="ejs-video-js video-js" controls></video></div></div></div>`
  },

  dailymotion (match, options) {
    const id = lastElement(match.split('/'))
    return `<div class="ejs-video ejs-embed"><iframe src="http://www.dailymotion.com/embed/video/${id}" height="${options.videoHeight}" width="${options.videoWidth}"></iframe></div>`
  },

  liveleak (match, options) {
    return `<div class="ejs-video ejs-embed"><iframe src="http://www.liveleak.com/e/${match.split('=')[1]}" height="${options.videoHeight}" width="${options.videoWidth}"></iframe></div>`
  },

  ted (match, options) {
    let a = match.split('/')
    const id = a[a.length - 1]
    return `<div class="ejs-embed ejs-ted"><iframe src="http://embed.ted.com/talks/${id}.html" height="${options.videoHeight}" width="${options.videoWidth}"></iframe></div>`
  },

  ustream (match, options) {
    let id = match.split('/')
		// only add embed if it is not already in the link
    if (match.indexOf('/embed/') < 0) {
      id.splice(1, 0, 'embed')
    }

    // check if '//www.' is there in the link
    let prefix = ''
    if (match.indexOf('/www\.ustream\.tv/') < 0) {
      prefix = prefix + '//www.'
    }

    return `<div class="ejs-embed ejs-ustream"><iframe src="${prefix}${id.join('/')}" height="${options.videoHeight}" width="${options.videoWidth}"></iframe></div>`
  },

  detailsVimeo (data, fullData, embedUrl) {
    return `<div class="ejs-video ejs-embed"><div class="ejs-video-preview"><div class="ejs-video-thumb" data-ejs-url="${embedUrl}"><div class="ejs-thumb" style="background-image:url(${data.thumbnail})"></div><i class="fa fa-play-circle-o"></i></div><div class="ejs-video-detail"><div class="ejs-video-title"><a href="${data.url}">${data.title}</a></div><div class="ejs-video-desc">${data.description}</div><div class="ejs-video-stats"><span><i class="fa fa-eye"></i>${data.views}</span><span><i class="fa fa-heart"></i>${data.likes}</span></div></div></div></div>`
  },

  detailsYoutube (data, fullData, embedUrl) {
    return `<div class="ejs-video ejs-embed"><div class="ejs-video-preview"><div class="ejs-video-thumb" data-ejs-url="${embedUrl}"><div class="ejs-thumb" style="background-image:url(${data.thumbnail})"></div><i class="fa fa-play-circle-o"></i></div><div class="ejs-video-detail"><div class="ejs-video-title"><a href="${data.url}">${data.title}</a></div><div class="ejs-video-desc">${data.description}</div><div class="ejs-video-stats"><span><i class="fa fa-eye"></i>${data.views}</span><span><i class="fa fa-heart"></i>${data.likes}</span></div></div></div></div>`
  },

  vine (match, options) {
    const id = lastElement(match.split('/'))
    const config = options.vineOptions
    return `<div class="ejs-vine"><iframe class="ejs-vine-iframe" src="https://vine.co/v/${id}/embed/${config.type}" height="${config.height}" width="${config.width}"></iframe></div>`
  },

  vimeo (url, options) {
    return options.plyr
			? `<div class='ejs-plyr'><div data-video-type='vimeo' data-video-id='${lastElement(url.split('/'))}'></div></div>`
			: `<div class="ejs-video-player ejs-embed"><iframe src="${url}" frameBorder="0" width="${options.videoWidth}" height="${options.videoHeight}"></iframe></div>`
  },

  youtube (url, options) {
    return options.plyr
			? `<div class='ejs-plyr'><div data-video-type='youtube' data-video-id='${lastElement(url.split('/'))}'></div></div>`
			: `<div class="ejs-video-player ejs-embed"><iframe src="${url}" frameBorder="0" width="${options.videoWidth}" height="${options.videoHeight}"></iframe></div>`
  },

  openGraph (data, options) {
    return `<div class="ejs-embed ejs-ogp"><div class="ejs-ogp-thumb" style="background-image:url(${data.image})"></div><div class="ejs-ogp-details"><div class="ejs-ogp-title"><a href="${data.url}" target="${options.linkOptions.target}">${data.title}</a></div><div class="ejs-ogb-details">${data.description}</div></div></div>`
  },

  github (data, options) {
    return `<div class="ejs-embed ejs-github"><div class="ejs-ogp-thumb" style="background-image:url(${data.owner.avatar_url})"></div><div class="ejs-ogp-details"><div class="ejs-ogp-title"><a href="${data.html_url}" target="${options.linkOptions.target}">${data.full_name}</a></div><div class="ejs-ogb-details">${data.description}</div><div class="ejs-github-stats"><span><i class="fa fa-star"></i>${data.stargazers_count}</span><span><i class="fa fa-code-fork"></i>${data.network_count}</span></div></div></div>`
  },

  gmap (latitude, longitude, location, options) {
    const config = options.mapOptions
    if (config.mode === 'place') {
      return `<div class="ejs-embed ejs-map"><iframe width="${options.videoWidth}" height="${options.videoHeight}" src="https://www.google.com/maps/embed/v1/place?key=${options.googleAuthKey}&q=${location}"></iframe></div>`
    } else if (config.mode === 'streetview') {
      return `<div class="ejs-embed ejs-map"><iframe width="${options.videoWidth}" height="${options.videoHeight}" src="https://www.google.com/maps/embed/v1/streetview?key=${options.googleAuthKey}&location=${latitude},${longitude}&heading=210&pitch=10&fov=35"></iframe></div>`
    } else if (config.mode === 'view') {
      return `<div class="ejs-embed ejs-map"><iframe width="${options.videoWidth}" height="${options.videoHeight}" src="https://www.google.com/maps/embed/v1/view?key=${options.googleAuthKey}&center=${latitude},${longitude}&zoom=18&maptype=satellite"></iframe></div>`
    }
  }
}
