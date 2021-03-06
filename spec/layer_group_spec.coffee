describe 'LayerGroup', ->
  scene = null

  beforeEach ->
    scene = new THREE.Scene

  describe 'constructor', ->
    it 'creates @layers as an empty array by default', ->
      stack = new Lysertron.LayerGroup scene
      stack.layers.should.deep.equal []

    it 'accepts an array of layers to populate @layers', ->
      echo = new Lysertron.Layer
      stack = new Lysertron.LayerGroup scene, [echo]
      stack.layers.should.deep.equal [echo]

  describe 'dispatchMusicEvent', ->
    describe 'delegates to each layer', ->
      class Specho extends Lysertron.Layer
        onMusicEvent: ->
          @triggered = yes

      echo1 = null
      echo2 = null
      stack = null

      beforeEach ->
        echo1 = new Specho
        echo2 = new Specho
        stack = new Lysertron.LayerGroup scene, [echo1, echo2]
    
      it 'onBeat', ->
        stack.dispatchMusicEvent event: 'data'
        echo1.triggered.should.be.true
        echo2.triggered.should.be.true

  describe 'update', ->
    it 'calls update on each layer', ->
      class Specho extends Lysertron.Layer
        update: (elapsed) ->
          @updated = yes

      echo1 = new Specho
      echo2 = new Specho
      stack = new Lysertron.LayerGroup scene, [echo1, echo2]

      stack.update()

      echo1.updated.should.be.true
      echo2.updated.should.be.true

    it 'removes expired layers', ->
      class Specho extends Lysertron.Layer
        constructor: (@isExpired) -> super
        expired: -> @isExpired

      echo1 = new Specho no
      echo2 = new Specho yes
      stack = new Lysertron.LayerGroup scene, [echo1, echo2]
      stack.update()

      stack.layers.should.deep.equal [echo1]

  describe 'push', ->
    it 'adds a layer to @layers', ->
      stack = new Lysertron.LayerGroup
      echo = new Lysertron.Layer
      stack.push echo
      stack.layers.should.deep.equal [echo]

    it 'throws exception if a non Lysertron.Layer object is pushed', ->
      stack = new Lysertron.LayerGroup
      obj = {}
      (-> stack.push obj).should.throw "LayerGroup::push() object is not a Lysertron.Layer"

  describe 'isEmpty', ->
    it 'returns false when there are layers', ->
      stack = new Lysertron.LayerGroup scene, new Lysertron.Layer
      stack.isEmpty().should.be.false

    it 'returns true when there are no layers', ->
      stack = new Lysertron.LayerGroup scene
      stack.isEmpty().should.be.true

  describe 'transition', ->
    it 'needs specs'






