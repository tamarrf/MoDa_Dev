import Blockly from 'blockly'
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
import { baseBlockLibrary } from "./baseBlocks.js";
export let moda_math = {};

baseBlockLibrary["contents"][0] = {
    "kind": "category",
    "name": "General",
    "contents": [{
        "kind": "category",
        "name": "Logic",
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
            {
                "kind": "block",
                "type": "logic_compare"
            }
        ]
    },
    {
        "kind": "category",
        "name": "Math",
        "colour": "#009D80",
        "contents": [
            {
                "kind": "block",
                "type": "math_number"
            },
            {
                "kind": "block",
                "blockxml": "<block type=\"math_arithmetic\"><value name=\"A\"><shadow type=\"math_number\"/></value><value name=\"B\"><shadow type=\"math_number\"/></value></block>",
                "type": "math_arithmetic",
            },
            {
                "kind": "block",
                "blockxml": "<block type=\"math_random_int\"><value name=\"FROM\"><shadow type=\"math_number\"><field name=\"NUM\">0</field></shadow></value><value name=\"TO\"><shadow type=\"math_number\"><field name=\"NUM\">100</field></shadow></value></block>",
                "type": "math_random_int"
            }
        ]
    },
    {
        "kind": "category",
        "name": "Text",
        "colour": "#00B695",
        "contents": [
            {
                "kind": "block",
                "type": "text"
            }
        ]
    }]
}

moda_math = {
    "categories": [{
        "kind": "category",
        "name": "Geometry",
        "expanded": true,
        "contents": [{
            "kind": "category",
            "name": "Properties",
            "toolboxitemid": "propertiesUnpackable",
            "categorystyle": "particles_category",
            "contents": [
                {
                    "kind": "block",
                    "type": "create_pens"
                },
                {
                    "kind": "block",
                    "blockxml": "<block type=\"set_size\"><value name=\"SIZE\"><shadow type=\"math_number\"><field name=\"NUM\">1</field></shadow></value></block>",
                    "type": "set_size"
                },
                {
                    "kind": "block",
                    "type": "set_color"
                },
                {
                    "kind": "block",
                    "blockxml": "<block type=\"set_pen_size\"><value name=\"PEN_SIZE\"><shadow type=\"math_number\"><field name=\"NUM\">1</field></shadow></value></block>",
                    "type": "set_pen_size"
                },
                {
                    "kind": "block",
                    "blockxml": "<block type=\"set_position_xy\"><value name=\"X\"><shadow type=\"math_number\"/></value><value name=\"Y\"><shadow type=\"math_number\"/></value></block>",
                    "type": "set_position_xy"
                },
                {
                    "kind": "block",
                    "blockxml": "<block type=\"set_heading\"><value name=\"HEADING\"><shadow type=\"math_number\"/></value></block>",
                    "type": "set_heading"
                },
                {
                    "kind": "block",
                    "type": "set_shape"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Action",
            "toolboxitemid": "actionsUnpackable",
            "categorystyle": "behavior_category",
            "contents": [
            {
                "kind": "block",
                "blockxml": "<block type=\"forward\"><value name=\"FORWARD\"><shadow type=\"math_number\"><field name=\"NUM\">1</field></shadow></value></block>",
                "type": "forward"
            },
            {
                "kind": "block",
                "blockxml": "<block type=\"backward\"><value name=\"BACKWARD\"><shadow type=\"math_number\"><field name=\"NUM\">1</field></shadow></value></block>",
                "type": "backward"
            },
            {
                "kind": "block",
                "blockxml": "<block type=\"go_to_xy\"><value name=\"X\"><shadow type=\"math_number\"/></value><value name=\"Y\"><shadow type=\"math_number\"/></value></block>",
                "type": "go_to_xy"
            },
            {
                "kind": "block",
                "blockxml": "<block type=\"turn_left\"><value name=\"LEFT\"><shadow type=\"math_number\"><field name=\"NUM\">1</field></shadow></value></block>",
                "type": "turn_left"
            },
            {
                "kind": "block",
                "blockxml": "<block type=\"turn_right\"><value name=\"RIGHT\"><shadow type=\"math_number\"><field name=\"NUM\">1</field></shadow></value></block>",
                "type": "turn_right"
            },
            {
                "kind": "block",
                "type": "pen_up_down"
            },
            {
                "kind": "block",
                "type": "stamp"
            },
            {
                "kind": "block",
                "type": "hide_shape"
            },
            {
                "kind": "block",
                "type": "show_shape"
            }
            ]
        },
        {
            "kind": "category",
            "name": "Control",
            "colour": "#0089B8",
            "contents": [
                {
                    "kind": "block",
                    "type": "ask_all_pens"
                },
                {
                    "kind": "block",
                    "type": "ask_pen_condition"
                },
                {
                    "kind": "block",
                    "type": "repeat"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Variables",
            'colour': '330',
            "custom": "VARIABLE",
        },
        {
            "kind": "category",
            "name": "Functions",
            'colour': '290',
            "custom": "PROCEDURE",
        }
        ]
    }]
}

// Create with Mutation
Blockly.Blocks['create_pens'] = {
    init: function () {
        this.jsonInit({
            "message0": "create %1 pens %2",
            "args0": [
                {
                    "type": "field_slider",
                    "name": "NUM",
                    "value": 1,
                    "min": 1,
                    "max": 5
                },
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "netlogo_property_blocks",
            "mutator": "general_mutator"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                    blockType: 'set_size',
                    fields: {},
                    condition: {
                        input: 'SIZE',
                        blockType: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 1
                        }
                    }
                },
                {
                    blockType: 'set_color',
                    fields: {
                        'COLOR': 'blue',
                    }
                },
                {
                    blockType: 'set_pen_size',
                    fields: {},
                    condition: {
                        input: 'PEN_SIZE',
                        blockType: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 1
                        }
                    }
                },
                {
                    blockType: 'set_position_xy',
                    fields: {},
                    condition: [
                        {
                            input: 'X',
                            blockType: 'math_number',
                            field: {
                                name: 'NUM',
                                value: 0
                            }
                        },
                        {
                            input: 'Y',
                            blockType: 'math_number',
                            field: {
                                name: 'NUM',
                                value: 0
                            }
                        }
                    ]
                },
                {
                    blockType: 'set_heading',
                    fields: {},
                    condition: {
                        input: 'HEADING',
                        blockType: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 1
                        }
                    }
                },
                {
                    blockType: 'set_shape',
                    fields: {
                        'SHAPE': 'dot',
                    }
                },
                {
                    blockType: 'pen_up_down',
                    fields: {
                        'PEN': 'down',
                    }
                }
            ],
            'contextData':{
                'CHANGED': false
            },
            'contentXml':'',
        }
        // define unpacked blocks and default values
        this.data = JSON.stringify(dataObj);
    },
    // update dafault values when applicable
    onchange: function(){
        const dataObj = JSON.parse(this.data);
        // update connected blocks if visible
        if(this.getInput('EXPANDED_STATEMENT')){
            let count = 0;
            for (let child of this.getChildren()) {
                if (child.getSurroundParent() === this) {
                    if (count === 0) {
                        dataObj.contentXml = Blockly.Xml.domToText(Blockly.Xml.blockToDom(child));
                    }
                    else {
                        dataObj.contentXml += Blockly.Xml.domToText(Blockly.Xml.blockToDom(child));
                    }
                    ++count;
                }
            }
        }
        if (!dataObj.contextData['CHANGED']) {
            dataObj.unpackBlocks = [
                {
                    blockType: 'set_size',
                    fields: {},
                    condition: {
                        input: 'SIZE',
                        blockType: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 1
                        }
                    }
                },
                {
                    blockType: 'set_color',
                    fields: {
                        'COLOR': 'blue',
                    }
                },
                {
                    blockType: 'set_pen_size',
                    fields: {},
                    condition: {
                        input: 'PEN_SIZE',
                        blockType: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 1
                        }
                    }
                },
                {
                    blockType: 'set_position_xy',
                    fields: {},
                    condition: [
                        {
                            input: 'X',
                            blockType: 'math_number',
                            field: {
                                name: 'NUM',
                                value: 0
                            }
                        },
                        {
                            input: 'Y',
                            blockType: 'math_number',
                            field: {
                                name: 'NUM',
                                value: 0
                            }
                        }
                    ]
                },
                {
                    blockType: 'set_heading',
                    fields: {},
                    condition: {
                        input: 'HEADING',
                        blockType: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 0
                        }
                    }
                },
                {
                    blockType: 'set_shape',
                    fields: {
                        'SHAPE': 'dot',
                    }
                },
                {
                    blockType: 'pen_up_down',
                    fields: {
                        'PEN': 'down',
                    }
                }
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "go",
        "message0": "go once %1",
        "args0": [
            {
                "type": "field_image",
                // "src": imagePath("start-flag.png"),
                "src": window["__IMAGE_URL__"] ? (window["__IMAGE_URL__"] + '/') + 'play-once-icon.png' : require('@/assets/play-once-icon.png'),
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
    // Properties Blocks
    {
        "type": "set_size",
        "message0": "set size %1",
        "args0": [
            {
                "type": "input_value",
                "name": "SIZE",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    {
        "type":"set_color",
        "message0": "set color %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    [
                        "black",
                        "black"
                    ],
                    [
                        "blue",
                        "blue"
                    ],
                    [
                        "brown",
                        "brown"
                    ],
                    [
                        "cyan",
                        "cyan"
                    ],
                    [
                        "gray",
                        "gray"
                    ],
                    [
                        "green",
                        "green"
                    ],
                    [
                        "lime",
                        "lime"
                    ],
                    [
                        "orange",
                        "orange"
                    ],
                    [
                        "red",
                        "red"
                    ],
                    [
                        "violet",
                        "violet"
                    ],
                    [
                        "white",
                        "white"
                    ],
                    [
                        "yellow",
                        "yellow"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    {
        "type": "set_pen_size",
        "message0": "set pen size %1",
        "args0": [
            {
                "type": "input_value",
                "name": "PEN_SIZE",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    {
        "type": "set_position_xy",
        "message0": "set position x: %1 y: %2",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    {
        "type": "set_heading",
        "message0": "set heading %1",
        "args0": [
            {
                "type": "input_value",
                "name": "HEADING",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    {
        "type": "set_shape",
        "message0": "set shape %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SHAPE",
                "options": [
                    [
                        "dot",
                        "dot"
                    ],
                    [
                        "square",
                        "dot square"
                    ],
                    [
                        "triangle",
                        "dot triangle"
                    ],
                ]
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    // Action Blocks
    {
        "type": "forward",
        "message0": "forward %1",
        "args0": [
            {
                "type": "input_value",
                "name": "FORWARD",
                "check": "Number"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks",
    },
    {
        "type": "backward",
        "message0": "backward %1",
        "args0": [
            {
                "type": "input_value",
                "name": "BACKWARD",
                "check": "Number"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks",
    },
    {
        "type": "go_to_xy",
        "message0": "go to x: %1 y: %2",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks",
    },
    {
        "type": "turn_left",
        "message0": "turn left %1 degrees",
        "args0": [
            {
                "type": "input_value",
                "name": "LEFT",
                "check": "Number"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks",
    },
    {
        "type": "turn_right",
        "message0": "turn right %1 degrees",
        "args0": [
            {
                "type": "input_value",
                "name": "RIGHT",
                "check": "Number"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks",
    },
    {
        "type": "pen_up_down",
        "message0": "pen %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PEN",
                "options": [
                    [
                        "down",
                        "down"
                    ],
                    [
                        "up",
                        "up"
                    ]
                ]
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks",
    },
    {
        "type": "stamp",
        "message0": "stamp",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "hide_shape",
        "message0": "hide shape",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "show_shape",
        "message0": "show shape",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    // Control Blocks
    {
        "type": "ask_all_pens",
        "message0": "ask all pens %1 %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "ASK_EACH"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_control_blocks"
    },
    {
        "type": "ask_pen_condition",
        "message0": "ask all pens with %1 = %2 %3 %4",
        "args0": [
            {
                'type': 'field_dropdown',
                'name': 'VAR',
                'options': [
                    [
                        "shape",
                        "shape" 
                    ],
                    [
                        "color",
                        "color" 
                    ],
                    [
                        "size",
                        "size" 
                    ]
                ]
            },
            {
                'type': 'field_input',
                'name': 'VALUE',
                'text': '',
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "ASK_EACH"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_control_blocks"
    },
    {
        "type": "repeat",
        "message0": "repeat %1 %2 %3",
        "args0": [
            {
                'type': 'field_number',
                'name': 'NUM',
                'value': 1
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "REPEAT"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_control_blocks"
    },
    // Variables BLocks
    {
        'type': 'get_variable',
        'message0': '%1',
        'args0': [
            {
            'type': 'field_dropdown',
            'name': 'VAR',
            'options': [
                [
                    "shape",
                    "shape" 
                ],
                [
                    "color",
                    "color" 
                ],
                [
                    "size",
                    "size" 
                ]
            ]
            },
        ],
        'output': null,
        'style': 'netlogo_variable_blocks',
    },
    {
        'type': 'set_variable',
        'message0': '%{BKY_VARIABLES_SET}',
        'args0': [
        {
            'type': 'field_dropdown',
            'name': 'VAR',
            'options': [
                [
                    "shape",
                    "shape" 
                ],
                [
                    "color",
                    "color" 
                ],
                [
                    "size",
                    "size" 
                ]
            ]
        },
        {
            'type': 'input_value',
            'name': 'VALUE',
        },
        ],
        'previousStatement': null,
        'nextStatement': null,
        'style': 'netlogo_variable_blocks',
    },
]);

// GEN BLOCKS
// Setup blocks
netlogoGenerator['set'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'SET');
    const code = 'to blocks-set\n' +
        netlogoGenerator.INDENT + 'setup\n' +
        statement_members +
        netlogoGenerator.INDENT + 'reset-ticks\n' +
        'end\n';
    return code;
};

netlogoGenerator['go'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'GO');
    const code = 'to blocks-go\n' +
        netlogoGenerator.INDENT + 'go\n' +
        statement_members +
        netlogoGenerator.INDENT + 'tick-advance tick-delta\n' +
        'end\n';
    return code;
};

// If/elseif/else condition
netlogoGenerator['controls_if'] = function (block) {
    let n = 0;
    let code = '', branchCode, conditionCode;

    if (block.inputList.length === 2) {
        code += 'if ';
    }
    else {
        code += '(ifelse ';
    }

    do {
        conditionCode = netlogoGenerator.valueToCode(block, 'IF' + n,
            netlogoGenerator.ORDER_NONE) || 'false';
        branchCode = netlogoGenerator.statementToCode(block, 'DO' + n);
        if (Blockly.JavaScript.STATEMENT_SUFFIX) {
            branchCode = Blockly.JavaScript.prefixLines(
                Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
                    block), netlogoGenerator.INDENT) + branchCode;
        }
        code += (n > 0 ? '\n' : '') + conditionCode + '\n[\n' + branchCode + ']';
        n++;
    } while (block.getInput('IF' + n));

    if (block.getInput('ELSE') || Blockly.JavaScript.STATEMENT_SUFFIX) {
        branchCode = netlogoGenerator.statementToCode(block, 'ELSE');
        if (Blockly.JavaScript.STATEMENT_SUFFIX) {
            branchCode = Blockly.JavaScript.prefixLines(
                Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
                    block), netlogoGenerator.INDENT) + branchCode;
        }
        code += '\n[\n' + branchCode + ']';
    }

    (block.inputList.length === 2) ? code += '\n' : code += ')\n';
    code +='';

    return code;
};

// Properties Blocks
netlogoGenerator['create_pens'] = function (block) {
    const root = block.getRootBlock().type;
    const dataObj = JSON.parse(block.data);
    const num = block.getFieldValue('NUM');
    let parameters;
    let prefix = '';
    let suffix =
        'if mouse-down? \n[\n' +
        netlogoGenerator.INDENT + 'drop-with-mouse ' + num + '\n' +
        ']';
    if (!dataObj.contextData.CHANGED){
        parameters = getNLCodeFromUnpackBlocks(block.type, dataObj.unpackBlocks, this.workspace)
    }
    else{
        let xmlblock = Blockly.Xml.domToBlock(Blockly.Xml.textToDom(JSON.parse(block.data).contentXml), this.workspace);
        for(let descendant of xmlblock.getDescendants()){
            if(root === 'mouse_click' && descendant.type === 'set_position'){
                descendant.dispose(true);
            }
        }
        parameters = netlogoGenerator.blockToCode(xmlblock);
        xmlblock.dispose();
    }
    let code = 'crt ' + num + '\n[\n' + Blockly.JavaScript.prefixLines(prefix, netlogoGenerator.INDENT) + Blockly.JavaScript.prefixLines(parameters, netlogoGenerator.INDENT) + Blockly.JavaScript.prefixLines(suffix, netlogoGenerator.INDENT) + '\n]\n';
    return code;
};

netlogoGenerator['set_size'] = function (block) {
    let size = netlogoGenerator.statementToCode(block, 'SIZE');
    let code = 'set size ' + size + '\n';
    return code;
};

netlogoGenerator['set_color'] = function (block) {
    let color = block.getField('COLOR').selectedOption_[1];
    let code = 'set color ' + color + '\n';
    return code;
};

netlogoGenerator['set_pen_size'] = function (block) {
    let pen_size = netlogoGenerator.statementToCode(block, 'PEN_SIZE');
    let code = 'set pen-size ' + pen_size + '\n';
    return code;
};

netlogoGenerator['set_position_xy'] = function (block) {
    let x = netlogoGenerator.statementToCode(block, 'X');
    let y = netlogoGenerator.statementToCode(block, 'Y');
    let code = 'setxy ' + x + ' ' + y + '\n';
    return code;
};

netlogoGenerator['set_heading'] = function (block) {
    let heading = netlogoGenerator.statementToCode(block, 'HEADING');
    let code = 'set heading ' + heading + '\n';
    return code;
};

netlogoGenerator['set_shape'] = function (block) {
    let shape = block.getField('SHAPE').selectedOption_[1];
    let code = 'set shape "' + shape + '"\n';
    return code;
};

// Action Blocks
netlogoGenerator['forward'] = function (block) {
    let forward = netlogoGenerator.statementToCode(block, 'FORWARD');
    let code = 'fd ' + forward + '\n';
    return code;
};

netlogoGenerator['backward'] = function (block) {
    let backward = netlogoGenerator.statementToCode(block, 'BACKWARD');
    let code = 'fd -1 * ' + backward + '\n';
    return code;
};

netlogoGenerator['go_to_xy'] = function (block) {
    let x = netlogoGenerator.statementToCode(block, 'X');
    let y = netlogoGenerator.statementToCode(block, 'Y');
    let code = 
        'facexy ' + x + ' ' + y + '\n' +
        'fd distancexy ' + x + ' ' + y + '\n';
    return code;
};

netlogoGenerator['turn_left'] = function (block) {
    let left = netlogoGenerator.statementToCode(block, 'LEFT');
    let code = 'rt -1 * ' + left + '\n';
    return code;
};

netlogoGenerator['turn_right'] = function (block) {
    let right = netlogoGenerator.statementToCode(block, 'RIGHT');
    let code = 'rt ' + right + '\n';
    return code;
};

netlogoGenerator['pen_up_down'] = function (block) {
    let pen = block.getField('PEN').selectedOption_[1];
    let code = 'pen-' + pen + '\n';
    return code;
};

netlogoGenerator['stamp'] = function () {
    let code = 'stamp\n';
    return code;
};

netlogoGenerator['hide_shape'] = function () {
    let code = 'ht\n';
    return code;
};

netlogoGenerator['show_shape'] = function () {
    let code = 'st\n';
    return code;
};

// Control Blocks
// Ask Particles
netlogoGenerator['ask_all_pens'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
    let code = 'ask turtles\n' + '[\n' + statement_members + ']\n';
    return code;
};

netlogoGenerator['ask_pen_condition'] = function (block) {
    let variable = block.getField('VAR').selectedOption_[1];
    let value = block.getFieldValue('VALUE');
    const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
    if (variable === 'shape') {
        if (value === 'square' || value === 'triangle') {
            value = 'dot ' + value;
        }
        value = '"' + value + '"';
    }
    let code =
        'ask turtles with [ ' +  variable + ' = ' + value + ' ]\n' +
        '[\n' + statement_members + ']\n';
    return code;
};

netlogoGenerator['repeat'] = function (block) {
    const num = block.getFieldValue('NUM');
    const statement_members = netlogoGenerator.statementToCode(block, 'REPEAT');
    let code = 'repeat ' + num + '\n' + '[\n' + statement_members + ']\n';
    return code;
};

// Variables Blocks
netlogoGenerator['logic_compare'] = function (block) {
    const operation = block.getField('OP').selectedOption_[1];
    const operation_symbol = operation === 'EQ' ? '=' :
                             operation === 'NEQ' ? '!=' :
                             operation === 'LT' ? '<' :
                             operation === 'LTE' ? '<=' :
                             operation === 'GT' ? '>' :
                             operation === 'GTE' ? '>=' : '=';
    const statement1_members = netlogoGenerator.statementToCode(block, 'A');
    const statement2_members = netlogoGenerator.statementToCode(block, 'B');
    let code;
    if (statement1_members === '') {
        code = 'false';
    } else if (statement2_members === '') {
        code = 'false';
    } else {
        code = `${statement1_members} ${operation_symbol} ${statement2_members}`;
    }
    return [code, netlogoGenerator.ORDER_NONE];
};

netlogoGenerator['math_number'] = function (block) {
    const value = block.getFieldValue('NUM');
    let code = `${value}`;
    return code;
};

netlogoGenerator['math_arithmetic'] = function (block) {
    const operation = block.getField('OP').selectedOption_[1];
    const operation_symbol = operation === 'ADD' ? '+' :
                           operation === 'MINUS' ? '-' :
                           operation === 'MULTIPLY' ? '*' :
                           operation === 'DIVIDE' ? '/' : '+';
    const statement1_members = netlogoGenerator.statementToCode(block, 'A');
    const statement2_members = netlogoGenerator.statementToCode(block, 'B');
    let code;
    if (statement1_members === '') {
        code = `${statement2_members}`;
    } else if (statement2_members === '') {
        code = `${statement1_members}`;
    } else {
        code = `${statement1_members} ${operation_symbol} ${statement2_members}`;
    }
    return code;
};

netlogoGenerator['math_random_int'] = function (block) {
    const statement1_members = netlogoGenerator.statementToCode(block, 'FROM');
    const statement2_members = netlogoGenerator.statementToCode(block, 'TO');
    let code = `rand-int ${statement1_members} ${statement2_members}`;
    return code;
};

netlogoGenerator['text'] = function (block) {
    const value = block.getFieldValue('TEXT');
    let code = `"${value}"`;
    return code;
};

netlogoGenerator['procedures_defreturn'] = function (block) {
    // Define a procedure with a return value.
    let funcName = block.getFieldValue('NAME');
    funcName = funcName.replace(' ', '-');

    let xfix1 = '';
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
        xfix1 += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_PREFIX,
            block);
    }
    if (Blockly.JavaScript.STATEMENT_SUFFIX) {
        xfix1 += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
            block);
    }
    if (xfix1) {
        xfix1 = Blockly.JavaScript.prefixLines(xfix1, netlogoGenerator.INDENT);
    }
    let loopTrap = '';
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
        loopTrap = Blockly.JavaScript.prefixLines(
            Blockly.JavaScript.injectId(Blockly.JavaScript.INFINITE_LOOP_TRAP,
            block), netlogoGenerator.INDENT);
    }
    let branch = netlogoGenerator.statementToCode(block, 'STACK');
    let returnValue = netlogoGenerator.statementToCode(block, 'RETURN') || '';
    let xfix2 = '';
    if (branch && returnValue) {
        // After executing the function body, revisit this block for the return.
        xfix2 = xfix1;
    }
    if (returnValue) {
        returnValue = netlogoGenerator.INDENT + 'report ' + returnValue + ';\n';
    }
    let args = [];
    let variables = block.getVars();
    for (var i = 0; i < variables.length; i++) {
        args[i] = variables[i].replace(' ', '-');
    }

    let code = '';
    if (returnValue) {
        code = 'to-report ' + funcName;
    } else {
        code = 'to ' + funcName;
    }

    if (args.length > 0) {
        code += ' [ ' + args.join(' ') + ' ]';
    }

    code += '\n' + 
        xfix1 + loopTrap + branch + xfix2 + returnValue +
        'end\n';

    return code;
};

netlogoGenerator['procedures_defnoreturn'] = netlogoGenerator['procedures_defreturn'];

netlogoGenerator['procedures_callreturn'] = function (block) {
    // Call a procedure with a return value.
    let funcName = block.getFieldValue('NAME');
    funcName = funcName.replace(' ', '-');
    let args = [];
    let variables = block.getVars();
    for (var i = 0; i < variables.length; i++) {
        args[i] = netlogoGenerator.statementToCode(block, 'ARG' + i) || 'null';
    }

    let code = '';
    if (variables.length > 0) {
        code = funcName + ' ' + args.join(' ') + '\n';
    } else {
        code = funcName + '\n';
    }
    return code;
};

netlogoGenerator['procedures_callnoreturn'] = netlogoGenerator['procedures_callreturn'];

netlogoGenerator['procedures_ifreturn'] = function(block) {
    // Conditionally return value from a procedure.
    var condition = netlogoGenerator.valueToCode(block, 'CONDITION', netlogoGenerator.ORDER_NONE) || 'false';
    var code = 'if ' + condition + ' [\n';
    if (Blockly.JavaScript.STATEMENT_SUFFIX) {
      // Inject any statement suffix here since the regular one at the end
      // will not get executed if the return is triggered.
      code += Blockly.JavaScript.prefixLines(
          Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX, block),
          netlogoGenerator.INDENT);
    }
    if (block.hasReturnValue_) {
      var value = netlogoGenerator.statementToCode(block, 'VALUE') || 'null';
      code += netlogoGenerator.INDENT + 'report ' + value + ';\n';
    } else {
      code += netlogoGenerator.INDENT + 'report\n';
    }
    code += ']\n';
    return code;
  };

netlogoGenerator['variables_get'] = function(block) {
    // Variable getter.
    let code = block.getField('VAR').getText();
    return code;
  };

netlogoGenerator['variables_set'] = function(block) {
    // Variable setter.
    let argument0 = netlogoGenerator.statementToCode(block, 'VALUE');
    let varName = block.getField('VAR').getText();
    
    let parentBlock = block.getParent();
    let initialCode = 'let';
    
    while (parentBlock) {
        if (parentBlock.type === 'variables_set') {
            if (parentBlock.getField('VAR').getText() === varName) {
                initialCode = 'set';
            }
        }
        parentBlock = parentBlock.getParent();
    }
    
    let code = `${initialCode} ${varName} ${argument0}\n`;
    return code;
};

netlogoGenerator['math_change'] = function(block) {
    // Add to a variable in place.
    var argument0 = netlogoGenerator.statementToCode(block, 'DELTA') || '0';
    var varName = block.getField('VAR').getText();
    let code = `set ${varName} ${varName} + ${argument0}\n`;
    return code;
};

function getNLCodeFromUnpackBlocks(blockType, unpackBlocks, workspace) {
  const tempBlock = workspace.newBlock(blockType);
  tempBlock.appendStatementInput('EXPANDED_STATEMENT');
  traverseBlocks(unpackBlocks, tempBlock.getInput('EXPANDED_STATEMENT').connection, workspace)
  const code = netlogoGenerator.blockToCode(tempBlock.getInput('EXPANDED_STATEMENT').connection.targetBlock());
  tempBlock.dispose()
  return code
}

function traverseBlockFields(blockGroup, block, workspace) {
    const conditionBlock = workspace.newBlock(blockGroup.blockType);
    if (blockGroup.blockFields) {
        blockGroup.blockFields.forEach(element => {
            traverseBlockFields(element, conditionBlock, workspace);
        });
    }
    block.getInput(blockGroup.input).connection.connect(conditionBlock.outputConnection);
    if (blockGroup.field) {
        conditionBlock.setFieldValue(blockGroup.field.value, blockGroup.field.name);
    }
}

function traverseBlocks(blockData, parentBlockConnection, workspace) {
    for (let blockGroup of blockData.reverse()) {
        // instantiate block
        const block = workspace.newBlock(blockGroup.blockType);
        for (let field in blockGroup.fields) {
            if (block.getField(field)) {
                block.setFieldValue(blockGroup.fields[field], field)
            }
        }
        // connect block to parent block
        const blockPreviousConnection = block.previousConnection;
        if (parentBlockConnection) {
            parentBlockConnection.connect(blockPreviousConnection);
        }
        // add condition block if one exists
        if (blockGroup.condition) {
            if (Array.isArray(blockGroup.condition)) {
                blockGroup.condition.forEach(element => {
                    traverseBlockFields(element, block, workspace);
                });
            } else {
                traverseBlockFields(blockGroup.condition, block, workspace);
            }
        }
        // recursive step - traverse children and connect to parent.
        // basecase when no children exist
        if (blockGroup.children) {
            let inputBlock = block.inputList[1];
            let childrenBlocks = blockGroup.children;
            if (blockGroup.children.field) {
                inputBlock = block.inputList.find(obj => {return obj.name === blockGroup.children.field});
                childrenBlocks = blockGroup.children.blocks;
            }
            traverseBlocks(childrenBlocks, inputBlock.connection, workspace);
        }
        if (blockGroup.children_else) {
            let inputBlock = block.inputList[2];
            let childrenBlocks = blockGroup.children_else;
            if (blockGroup.children_else.field) {
                inputBlock = block.inputList.find(obj => {return obj.name === blockGroup.children_else.field});
                childrenBlocks = blockGroup.children_else.blocks;
            }
            traverseBlocks(childrenBlocks, inputBlock.connection, workspace);
        }
    }
}

