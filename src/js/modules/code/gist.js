import regex from '../regex'
import { embed } from '../../helpers'

export default class Gist {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = regex.gist;
		this.service = 'gist';

		if(typeof this.options.input !== 'string'){
			this.options.input.addEventListener('rendered', () => {
				this.load()
			})
		}
	}

	template(match) {
		return `<div class="ejs-gist" data-src="${match}"></div>`
	}

	load() {
		let gists = this.options.input.getElementsByClassName('ejs-gist');
		for (let i = 0; i < gists.length; i++) {
			let gistFrame = document.createElement("iframe");
			gistFrame.setAttribute("width", "100%");
			gistFrame.id = `ejs-gist-${i}`;

			let zone       = gists[i];
			zone.innerHTML = "";
			zone.appendChild(gistFrame);

			// Create the iframe's document
			let url           = gists[i].getAttribute('data-src');
			url               = url.indexOf('http') === -1 ? `https://${url}` : url;
			let gistFrameHTML = `<html><base target="_parent"/><body onload="parent.document.getElementById('ejs-gist-${i}').style.height=parseInt(document.body.scrollHeight)+20+'px'"><script type="text/javascript" src="${url}.js"></script></body></html>`;

			// Set iframe's document with a trigger for this document to adjust the height
			let gistFrameDoc = gistFrame.document;

			if (gistFrame.contentDocument) {
				gistFrameDoc = gistFrame.contentDocument;
			} else if (gistFrame.contentWindow) {
				gistFrameDoc = gistFrame.contentWindow.document;
			}

			gistFrameDoc.open();
			gistFrameDoc.writeln(gistFrameHTML);
			gistFrameDoc.close();
		}
	}

	process() {
		return embed(this);
	}
}
