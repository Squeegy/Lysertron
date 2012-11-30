// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Layers || (window.Layers = {
    _shaders: {}
  });

  Layers.Base = (function(_super) {

    __extends(Base, _super);

    Base.prototype.components = {};

    Base.prototype.uniformAttrs = {};

    function Base(scene) {
      this.scene = scene;
      Base.__super__.constructor.apply(this, arguments);
      this.active = true;
      this.initComponents();
      this.initUniforms();
      this.scene.add(this);
    }

    Base.prototype.initComponents = function() {
      var args, component, name;
      return this.components = (function() {
        var _ref, _results;
        _ref = this.components;
        _results = [];
        for (name in _ref) {
          if (!__hasProp.call(_ref, name)) continue;
          args = _ref[name];
          component = new Component[name](args || {});
          component.obj = this;
          _results.push(component);
        }
        return _results;
      }).call(this);
    };

    Base.prototype.initUniforms = function() {
      var name, type, _ref,
        _this = this;
      this.uniforms = {};
      _ref = this.uniformAttrs;
      for (name in _ref) {
        type = _ref[name];
        this.uniforms[name] = {
          type: type,
          value: null
        };
        if (!(name in this)) {
          (function(name, type) {
            return Object.defineProperty(_this.constructor.prototype, name, {
              get: function() {
                return this.uniforms[name].value;
              },
              set: function(val) {
                return this.uniforms[name].value = val;
              }
            });
          })(name, type);
        }
      }
    };

    Base.prototype.getShader = function(name) {
      var _this = this;
      return Layers._shaders[name] || ($.ajax({
        url: "js/layers/" + name,
        async: false,
        success: function(data) {
          return Layers._shaders[name] = data;
        }
      }), Layers._shaders[name]);
    };

    Base.prototype.getMatProperties = function(name) {
      return {
        vertexShader: this.getShader("" + name + ".vshader"),
        fragmentShader: this.getShader("" + name + ".fshader"),
        uniforms: this.uniforms
      };
    };

    Base.prototype.kill = function() {
      return this.active = false;
    };

    Base.prototype.expired = function() {
      return !this.active && !this.alive();
    };

    Base.prototype.alive = function() {
      return this.active;
    };

    Base.prototype.beat = function() {};

    Base.prototype.bar = function() {};

    Base.prototype.segment = function() {};

    Base.prototype.tatum = function() {};

    Base.prototype.update = function(elapsed) {
      var component, _i, _len, _ref, _results;
      _ref = this.components;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        _results.push(component.update(elapsed));
      }
      return _results;
    };

    return Base;

  })(THREE.Object3D);

}).call(this);
