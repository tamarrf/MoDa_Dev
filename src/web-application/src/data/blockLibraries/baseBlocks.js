import Blockly from 'blockly'
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
export let baseBlockLibrary = {};
import '@blockly/field-slider';

// function imagePath(name){
//     const prefix = window["__IMAGE_URL__"] ? (window["__IMAGE_URL__"] + '/') : '/img/';
//     return prefix + name;
// }

Blockly.Msg['GENERAL_CATEGORY'] = 'General';
Blockly.Msg['SETUP_BLOCK'] = 'setup %1';
Blockly.Msg['GO_BLOCK'] = 'go %1';
Blockly.Msg['MOUSE_CLICK_BLOCK'] = 'on mouse click %1';

baseBlockLibrary = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "%{BKY_GENERAL_CATEGORY}",
            "colour": "#00836B",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_if"
                },
                {
                    "kind": "block",
                    "type": "logic_operation"
                },
                {
                    "kind": "block",
                    "type": "logic_negate"
                },
            ]
        },
    ]
}

Blockly.defineBlocksWithJsonArray([
    {
    "type": "set",
    "message0": "%{BKY_SETUP_BLOCK}",
    "args0": [
        {
            "type": "field_image",
            // "src": imagePath("start-flag.png"),
            "src": window["__IMAGE_URL__"] ? (window["__IMAGE_URL__"] + '/') + 'start-flag.png' : require('@/assets/start-flag.png'),
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "message1": "%1",
    "args1": [
        {
            "type": "input_statement",
            "name": "SET"
        }
    ],
    "style": "netlogo_blocks"
},
{
    "type": "go",
    "message0": "%{BKY_GO_BLOCK}",
    "args0": [
        {
            "type": "field_image",
            // "src": imagePath("start-flag.png"),
            "src": window["__IMAGE_URL__"] ? (window["__IMAGE_URL__"] + '/') + 'play-icon.png' : require('@/assets/play-icon.png'),
            "width": 10,
            "height": 10,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "message1": "%1",
    "args1": [
        {
            "type": "input_statement",
            "name": "GO"
        }
    ],

    "style": "netlogo_blocks"
},
{
    "type": "mouse_click",
    "message0": "%{BKY_MOUSE_CLICK_BLOCK}",
    "args0": [
        {
            "type": "field_image",
            // "src": imagePath("click.png"),
            "src": window["__IMAGE_URL__"] ? (window["__IMAGE_URL__"] + '/') + 'click.png' : require('@/assets/click.png'),
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "message1": "%1",
    "args1": [
        {
            "type": "input_statement",
            "name": "MOUSE"
        }
    ],
    "style": "netlogo_blocks"
},
]);

// If else block
netlogoGenerator['controls_ifelse'] = netlogoGenerator['controls_if'];

// Operations 'and', 'or'
netlogoGenerator['logic_operation'] = function (block) {
    let operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
    let order = (operator == 'and') ? netlogoGenerator.ORDER_LOGICAL_AND :
        netlogoGenerator.ORDER_LOGICAL_OR;
    let argument0 = netlogoGenerator.valueToCode(block, 'A', order);
    let argument1 = netlogoGenerator.valueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
        // If there are no arguments, then the return value is false.
        argument0 = 'false';
        argument1 = 'false';
    } else {
        // Single missing arguments have no effect on the return value.
        let defaultArgument = (operator == 'and') ? 'true' : 'false';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }
    let code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

// Negation operator
netlogoGenerator['logic_negate'] = function (block) {

    let order = netlogoGenerator.ORDER_LOGICAL_NOT;
    let argument0 = netlogoGenerator.valueToCode(block, 'BOOL', order) ||
        'true';
    let code = 'not ' + argument0;
    return [code, order];
};
