const Stream = require( 'stream' );
const qrcode = require( 'qrcode' );

module.exports = class extends require( 'ynn' ).Service {
    generate( text, type, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            if( type === 'png' ) {
                const stream = new Stream.Duplex();
                stream.write = chunk => stream.push( chunk );
                stream._read = () => {};
                qrcode.toFileStream( stream, text, options );
                resolve( stream );
            }

            if( type === 'data-url' ) {
                qrcode.toDataURL( text, options, ( err, url ) => {
                    err && reject( err );
                    resolve( url );
                } );
            }
        } );
    }
};
