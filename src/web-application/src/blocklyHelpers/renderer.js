import Blockly from 'Blockly';

let CustomRenderer = function (name) {
    CustomRenderer.superClass_.constructor.call(this, name);
};
Blockly.utils.object.inherits(CustomRenderer,
    Blockly.blockRendering.Renderer);

Blockly.blockRendering.register('custom_renderer', CustomRenderer);

let CustomConstantsProvider = function () {
    // Set up all of the constants from the base provider.
    CustomConstantsProvider.superClass_.constructor.call(this);

    // Override a few properties.
    /**
     * Rounded corner radius.
     * @type {number}
     */
    this.CORNER_RADIUS = 10;
};
Blockly.utils.object.inherits(CustomConstantsProvider,
    Blockly.blockRendering.ConstantProvider);

CustomRenderer.prototype.makeConstants_ = function () {
    return new CustomConstantsProvider();
};