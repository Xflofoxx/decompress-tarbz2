# decompress-tarbz2 [![Build Status](https://travis-ci.org/kevva/decompress-tarbz2.svg?branch=master)](https://travis-ci.org/kevva/decompress-tarbz2)

> tar.bz2 decompress plugin


## Install

```
$ npm install --save decompress-tarbz2
```


## Usage

```js
const decompress = require('decompress');
const decompressTarbz = require('decompress-tarbz2');

decompress('unicorn.tar.gz', 'dist', {
	plugins: [
		decompressTarbz()
	]
}).then(() => {
	console.log('Files decompressed');
});
```


## API

### decompressTarbz()(input, [options])

Returns both a Promise for a Buffer and a [Duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

#### input

Type: `Buffer` `Stream`

Buffer to decompress.


#### options

See [decompress-tar](https://github.com/kevva/decompress-tar#options) module options.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
