'use strict';

var should = require('should');
var fs = require('fs');
var join = require('path').join;
var rimraf = require('rimraf');
var download = require('../lib/download');
var fixtures = join(__dirname, 'fixtures');
var tmp = join(fixtures, 'tmp');

describe('download', function() {

  afterEach(rimraf.bind(null, tmp));

  it('should work', function*() {
    var url = 'https://a.alipayobjects.com/jquery/jquery/1.11.1/jquery.js';
    yield download(url, join(tmp, 'jquery.js'));
    fs.existsSync(join(tmp, 'jquery.js')).should.be.true;
  });

  it('should throw when status >= 300', function*() {
    var err;
    try {
      yield download('https://a.alipayobjects.com/a.js', join(tmp, 'a.js'));
    } catch(e) {
      err = e;
    }
    should.exists(err);
    err.message.should.eql('Download got statusCode 404');
  });

});
