import Base from '../base.es6'

export class Vine extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /vine.co\/v\/[a-zA-Z0-9]+/gi;
        this.service = 'vine'
    }

    template(match) {
        const config = this.options.vineOptions;
        let a = match.split('/')
        const id = a[a.length - 1]
        return ejs.template.vine(id, this.options) || `<div class="ejs-vine">
		<iframe class="ejs-vine-iframe" src="https://vine.co/v/${id}/embed/${config.type}" height="${config.height}" width="${config.width}"></iframe>
		</div>`
    }
}

