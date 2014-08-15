'use strict';

var archiveType = require('archive-type');
var bz2 = require('seek-bzip');
var sbuff = require('simple-bufferstream');
var path = require('path');
var tar = require('tar');

/**
 * tar.bz2 decompress plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
    opts = opts || {};
    opts.strip = +opts.strip || 0;

    return function (file, decompress, cb) {
        var files = [];

        if (archiveType(file.contents) !== 'bz2') {
            return cb();
        }

        file.contents = bz2.decode(file.contents);

        sbuff(file.contents).pipe(tar.Parse())
            .on('error', function (err) {
                cb(err);
                return;
            })
            .on('entry', function (file) {
                if (file.type !== 'Directory') {
                    var chunk = '';

                    file.on('data', function (data) {
                        chunk += data.toString();
                    });

                    file.on('end', function () {
                        chunk = new Buffer(chunk, 'utf8');

                        if (opts.strip) {
                            var f = path.basename(file.path);
                            var p = path.dirname(file.path.split('/'));

                            if (Array.isArray(p)) {
                                p = p.slice(opts.strip).join(path.sep);
                            }

                            file.path = path.join(p, f);
                        }

                        files.push({ contents: chunk, path: file.path });
                    });
                }
            })
            .on('end', function () {
                decompress.files = files;
                cb();
            });
    };
};
