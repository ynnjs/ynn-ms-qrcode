module.exports = class extends require( 'ynn' ).Controller {
    async indexAction() {
        const ctx = this.ctx;
        const {
            text,
            errorCorrectionLevel = 'L',
            version = 12,
            type = 'png',
            maskPattern = 8
        } = ctx.query;

        this.assert( text, 400, 'text must have a value' );

        const options = {
            errorCorrectionLevel,
            version,
            maskPattern
        };

        if( type === 'png' ) {
            ctx.set( 'content-type', 'image/png' );
        } else if( type === 'data-url' ) {
            ctx.set( 'content-type', 'text/plain' );
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
