'use strict';

var should = require('should');
var join = require('path').join;
var fs = require('fs');
var rimraf = require('rimraf');
var mm = require('mm');
var fetch = require('..');
var fixtures = join(__dirname, 'fixtures');
var tmp = join(fixtures, 'tmp');

describe('fetch', function() {

  afterEach(rimraf.bind(null, tmp));
  afterEach(mm.restore);

  it('should fetch from url', function*() {
    yield fetch({
      url: 'https://a.alipayobjects.com/jquery/jquery/1.11.1/jquery.js',
      dest: tmp
    });
    fs.existsSync(join(tmp, 'jquery/jquery/1.11.1/jquery.js')).should.be.true;
  });

  it('should fetch from file', function*() {
    yield fetch({
      file: join(fixtures, 'urls'),
      dest: tmp
    });
    fs.existsSync(join(tmp, 'jquery/jquery/1.11.1/jquery.js')).should.be.true;
    fs.existsSync(join(tmp, 'seajs/seajs/2.2.0/sea.js')).should.be.true;
  });

  it('should throw when it has wrong format', function*() {
    var err;
    try {
      yield fetch();
    } catch(e) {
      err = e;
    }
    should.exists(err);
    err.message.should.eql('undefined is not url');
  });

  it('should set default dest cwd', function*() {
    mm(process, 'cwd', function() {
      return tmp;
    });
    yield fetch({
      url: 'https://a.alipayobjects.com/jquery/jquery/1.11.1/jquery.js'
    });
    fs.existsSync(join(tmp, 'jquery/jquery/1.11.1/jquery.js')).should.be.true;
  });
});
