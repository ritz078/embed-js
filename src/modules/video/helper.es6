import utils from '../utils.es6';

var helper = {
    play: (className, options) => {
        let classes = document.getElementsByClassName(className);
        for (let i = 0; i < classes.length; i++) {
            classes[i].addEventListener('click', function() {
                options.onVideoShow();
                let url = this.getAttribute('data-ejs-url');
                let template = helper.template(url, options);
                this.parentNode.parentNode.innerHTML = template;
            }, false);
        }
    },

    template: (url, options) => {
        let dimensions = utils.dimensions(options);
        let template =
            `<div class="ejs-video-player">
		<iframe src="${url}" frameBorder="0" width="${dimensions.width}" height="${dimensions.height}"></iframe>
		</div>`;
        return template;
    },

    detailsTemplate: (data, embedUrl) => {
        var template =
            `<div class="ejs-video">
		<div class="ejs-video-preview">
		<div class="ejs-video-thumb" data-ejs-url="${embedUrl}">
		<img src="${data.thumbnail}" alt="${data.host}/${data.id}"/>
		<i class="fa fa-play-circle-o"></i>
		</div>
		<div class="ejs-video-detail">
		<div class="ejs-video-title">
		<a href="${data.url}">${data.title}</a>
		</div>
		<div class="ejs-video-desc">${data.description}</div>
		<div class="ejs-video-stats">
		<span><i class="fa fa-eye"></i>${data.views}</span>
		<span><i class="fa fa-heart"></i>${data.likes}</span>
		</div>
		</div>
		</div>
		</div>`;
        return template;
    }
}

module.exports = helper;
