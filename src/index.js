#!/usr/bin/env node

const argv = require( 'yargs' ).argv;
const Ynn = require( 'ynn' );
const app = new Ynn( { root : __dirname } );
require.main === module && app.listen( argv.port );
module.exports = app;
