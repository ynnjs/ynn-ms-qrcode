module.exports = class extends require( 'ynn' ).Controller {
    async indexAction() {
        const ctx = this.ctx;
        const query = ctx.query;
        const {
            text,
            errorCorrectionLevel = 'L',
            version = 12,
            type = 'png',
            maskPattern = 8
        } = query;

        this.assert( text, 400, 'text must have a value' );

        const options = {
            errorCorrectionLevel,
            version,
            maskPattern,
            width : query.width,
            margin : query.margin,
            color : {
                light : query.light,
                dark : query.dark
            }
        };

        if( type === 'png' ) {
            ctx.type = 'image/png';
        } else if( type === 'data-url' ) {
            ctx.type = 'text/plain';
        }

        return this.service( 'qr' ).generate( text, type, options ).catch( e => {
            this.logger.error( 'error while generating qr code', {
                error : e.message,
                options
            } );

            if( /cannot contain this amount of data/.test( e.message ) ) {
                this.throw( 400, e.message );
            }
        } );
    }
}
