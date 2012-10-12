// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Layers.Planes = (function(_super) {

    __extends(Planes, _super);

    function Planes(scene) {
      this.scene = scene;
      this.flipped = Math.random() > 0.75;
      this.height = THREE.Math.randFloat(100, 500);
      this.angle = 0;
      this.maxDrift = 300;
      this.drift = {
        angle: Curve.low(Math.random()) * 60 * Math.PI / 180,
        r: [Math.random() * 2 - 1, Math.random() * 2 - 1],
        g: [Math.random() * 2 - 1, Math.random() * 2 - 1],
        b: [Math.random() * 2 - 1, Math.random() * 2 - 1]
      };
      this.gridSize = {
        r: THREE.Math.randFloat(75, 400),
        g: THREE.Math.randFloat(75, 400),
        b: THREE.Math.randFloat(75, 400)
      };
      this.planes = [new Layers.Planes.Plane(this.scene, this), new Layers.Planes.Plane(this.scene, this)];
      this.planes[0].mesh.rotation.x = 90 * (Math.PI / 180);
      this.planes[0].mesh.position.y = this.height;
      this.planes[1].mesh.rotation.x = 90 * (this.flipped ? -1 : 1) * (Math.PI / 180);
      this.planes[1].mesh.position.y = -this.height;
    }

    Planes.prototype.beat = function() {
      var plane, _i, _len, _ref, _results;
      _ref = this.planes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plane = _ref[_i];
        _results.push(plane.beat());
      }
      return _results;
    };

    Planes.prototype.update = function(elapsed) {
      var plane, _i, _len, _ref, _results;
      _ref = this.planes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plane = _ref[_i];
        _results.push(plane.update(elapsed));
      }
      return _results;
    };

    return Planes;

  })(Layers.Base);

  Layers.Planes.Plane = (function(_super) {

    __extends(Plane, _super);

    function Plane(scene, parent) {
      this.scene = scene;
      this.parent = parent;
      this.uniforms = {
        brightness: {
          type: 'f',
          value: 1
        },
        angle: {
          type: 'f',
          value: 0
        },
        shiftXr: {
          type: 'f',
          value: 0
        },
        shiftYr: {
          type: 'f',
          value: 0
        },
        shiftXg: {
          type: 'f',
          value: 0
        },
        shiftYg: {
          type: 'f',
          value: 0
        },
        shiftXb: {
          type: 'f',
          value: 0
        },
        shiftYb: {
          type: 'f',
          value: 0
        },
        gridSizeR: {
          type: 'f',
          value: this.parent.gridSize.r
        },
        gridSizeG: {
          type: 'f',
          value: this.parent.gridSize.g
        },
        gridSizeB: {
          type: 'f',
          value: this.parent.gridSize.b
        }
      };
      this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(100000, 100000), new THREE.ShaderMaterial(_.extend(this.getMatProperties('plane'), {
        uniforms: this.uniforms
      })));
      this.mesh.doubleSided = true;
      this.scene.add(this.mesh);
    }

    Plane.prototype.beat = function() {
      return this.uniforms.brightness.value = 1;
    };

    Plane.prototype.update = function(elapsed) {
      this.uniforms.brightness.value -= 0.5 * elapsed;
      if (this.uniforms.brightness.value < 0) {
        this.uniforms.brightness.value = 0;
      }
      this.uniforms.angle.value += this.parent.drift.angle * elapsed * (this.uniforms.brightness.value - 0.5) * 2;
      this.uniforms.shiftXr.value += this.parent.drift.r[0] * this.parent.maxDrift * elapsed;
      this.uniforms.shiftXr.value += this.parent.drift.r[0] * this.parent.maxDrift * elapsed;
      this.uniforms.shiftYr.value += this.parent.drift.r[1] * this.parent.maxDrift * elapsed;
      this.uniforms.shiftXg.value -= this.parent.drift.g[0] * this.parent.maxDrift * elapsed;
      this.uniforms.shiftYg.value += this.parent.drift.g[1] * this.parent.maxDrift * elapsed;
      this.uniforms.shiftXb.value -= this.parent.drift.b[0] * this.parent.maxDrift * elapsed;
      return this.uniforms.shiftYb.value += this.parent.drift.b[1] * this.parent.maxDrift * elapsed;
    };

    return Plane;

  })(Layers.Base);

}).call(this);
