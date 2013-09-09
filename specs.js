// Generated by CoffeeScript 1.6.3
(function() {
  var expect;

  mocha.ui('bdd');

  mocha.reporter('html');

  chai.should();

  expect = chai.expect;

  describe("commonjs", function() {
    beforeEach(function() {
      require.modules = {};
      return require.cache = {};
    });
    describe("#define", function() {
      return it("defines module", function() {
        var module;
        require.define({
          'a': function(exports, require, module) {
            return exports.test = 'test';
          }
        });
        module = require('a');
        return module.test.should.be.equal('test');
      });
    });
    return describe("#require", function() {
      it("throws error if module is not defined", function() {
        return expect(function() {
          return require('does not exist');
        }).to["throw"](/not found/);
      });
      it("does not evaluat module until it is required", function() {
        var spy;
        spy = sinon.spy();
        require.define({
          "b": function(exports, require, module) {
            return spy();
          }
        });
        spy.called.should.not.be.ok;
        require("b");
        return spy.calledOnce.should.be.ok;
      });
      it("evauates only once", function() {
        var spy;
        spy = sinon.spy();
        require.define({
          "c": function(exports, require, module) {
            return spy();
          }
        });
        require("c");
        spy.calledOnce.should.be.ok;
        require("c");
        return spy.calledOnce.should.be.ok;
      });
      return it("registers the name of the module", function() {
        var e;
        require.define({
          "e": function(exports, require, module) {
            return module.exports.name = module.id;
          }
        });
        e = require("e");
        return e.name.should.be.equal("e");
      });
    });
  });

}).call(this);
