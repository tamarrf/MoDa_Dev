import Blockly from 'blockly'
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
import { baseBlockLibrary } from "./baseBlocks.js";
export let moda_math_transform = {};

baseBlockLibrary["contents"][0] = {
    "kind": "category",
    "name": "General",
    "expanded": true,
    "contents": [{
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
            }
        ]
    }]
}

moda_math_transform = {
    "categories": [{
        "kind": "category",
        "name": "Geometry",
        "expanded": true,
        "contents": [{
            "kind": "category",
            "name": "Shapes",
            "toolboxitemid": "propertiesUnpackable",
            "categorystyle": "particles_category",
            "contents": [
                {
                    "kind": "block",
                    "type": "create_shape_3"
                },
                {
                    "kind": "block",
                    "type": "create_shape_4"
                },
                {
                    "kind": "block",
                    "type": "create_shape_5"
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
                    "type": "apply"
                },
                {
                    "kind": "block",
                    "blockxml": "<block type=\"setxy\"><value name=\"X\"><shadow type=\"math_number\"/></value><value name=\"Y\"><shadow type=\"math_number\"/></value></block>",
                    "type": "setxy"
                },
                {
                    "kind": "block",
                    "type": "get_variable"
                }
            ]
        }
        ]
    }]
}

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
    // Shapes
    {
        "type": "create_shape_3",
        "message0": "Create shape with 3 vertices %1",
        "message1": "Vertice 1 x:%1 y:%2",
        "message2": "Vertice 2 x:%1 y:%2",
        "message3": "Vertice 3 x:%1 y:%2",
        "args0": [
            {
                "type": "input_dummy"
            }
        ],
        "args1": [
            {
                "type": "field_number",
                "name": "VERTICE_1_X",
                'value': 1,
            },
            {
                "type": "field_number",
                "name": "VERTICE_1_Y",
                'value': 1,
            }
        ],
        "args2": [
            {
                "type": "field_number",
                "name": "VERTICE_2_X",
                'value': 4,
            },
            {
                "type": "field_number",
                "name": "VERTICE_2_Y",
                'value': 5,
            }
        ],
        "args3": [
            {
                "type": "field_number",
                "name": "VERTICE_3_X",
                'value': 7,
            },
            {
                "type": "field_number",
                "name": "VERTICE_3_Y",
                'value': 1,
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    {
        "type": "create_shape_4",
        "message0": "Create shape with 4 vertices %1",
        "message1": "Vertice 1 x:%1 y:%2",
        "message2": "Vertice 2 x:%1 y:%2",
        "message3": "Vertice 3 x:%1 y:%2",
        "message4": "Vertice 4 x:%1 y:%2",
        "args0": [
            {
                "type": "input_dummy"
            }
        ],
        "args1": [
            {
                "type": "field_number",
                "name": "VERTICE_1_X",
                'value': 1,
            },
            {
                "type": "field_number",
                "name": "VERTICE_1_Y",
                'value': 1,
            }
        ],
        "args2": [
            {
                "type": "field_number",
                "name": "VERTICE_2_X",
                'value': 1,
            },
            {
                "type": "field_number",
                "name": "VERTICE_2_Y",
                'value': 4,
            }
        ],
        "args3": [
            {
                "type": "field_number",
                "name": "VERTICE_3_X",
                'value': 3,
            },
            {
                "type": "field_number",
                "name": "VERTICE_3_Y",
                'value': 4,
            }
        ],
        "args4": [
            {
                "type": "field_number",
                "name": "VERTICE_4_X",
                'value': 3,
            },
            {
                "type": "field_number",
                "name": "VERTICE_4_Y",
                'value': 1,
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    {
        "type": "create_shape_5",
        "message0": "Create shape with 5 vertices %1",
        "message1": "Vertice 1 x:%1 y:%2",
        "message2": "Vertice 2 x:%1 y:%2",
        "message3": "Vertice 3 x:%1 y:%2",
        "message4": "Vertice 4 x:%1 y:%2",
        "message5": "Vertice 5 x:%1 y:%2",
        "args0": [
            {
                "type": "input_dummy"
            }
        ],
        "args1": [
            {
                "type": "field_number",
                "name": "VERTICE_1_X",
                'value': 1,
            },
            {
                "type": "field_number",
                "name": "VERTICE_1_Y",
                'value': 1,
            }
        ],
        "args2": [
            {
                "type": "field_number",
                "name": "VERTICE_2_X",
                'value': 1,
            },
            {
                "type": "field_number",
                "name": "VERTICE_2_Y",
                'value': 4,
            }
        ],
        "args3": [
            {
                "type": "field_number",
                "name": "VERTICE_3_X",
                'value': 4,
            },
            {
                "type": "field_number",
                "name": "VERTICE_3_Y",
                'value': 3,
            }
        ],
        "args4": [
            {
                "type": "field_number",
                "name": "VERTICE_4_X",
                'value': 7,
            },
            {
                "type": "field_number",
                "name": "VERTICE_4_Y",
                'value': 6,
            }
        ],
        "args5": [
            {
                "type": "field_number",
                "name": "VERTICE_5_X",
                'value': 9,
            },
            {
                "type": "field_number",
                "name": "VERTICE_5_Y",
                'value': 2,
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    // Action
    {
        "type": "apply",
        "message0": "apply selected transformations",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "setxy",
        "message0": "set x: %1 y: %2",
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
        'type': 'get_variable',
        'message0': 'current %1',
        'args0': [
            {
                'type': 'field_dropdown',
                'name': 'VAR',
                'options': [
                    [
                        "x",
                        "xcor" 
                    ],
                    [
                        "y",
                        "ycor"
                    ]
                ]
            },
        ],
        'output': null,
        'style': 'netlogo_action_blocks',
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

netlogoGenerator['create_shape_3'] = function (block) {
    const vertice_1_x = block.getFieldValue('VERTICE_1_X');
    const vertice_1_y = block.getFieldValue('VERTICE_1_Y');
    const vertice_2_x = block.getFieldValue('VERTICE_2_X');
    const vertice_2_y = block.getFieldValue('VERTICE_2_Y');
    const vertice_3_x = block.getFieldValue('VERTICE_3_X');
    const vertice_3_y = block.getFieldValue('VERTICE_3_Y');
    let code = '' +
        'set vertices [\n' +
        `  [${vertice_1_x} ${vertice_1_y}][${vertice_2_x} ${vertice_2_y}][${vertice_3_x} ${vertice_3_y}]\n` +
        ']\n' +
        'cro length vertices\n' +
        '[\n' +
        '  set shape "circle" set size .3\n'+
        // '  setxy who 1\n' +
        // '  set label-color red\n' +
        // '  set label who\n' +
        ']\n' +
        'draw-polygon\n';
    return code;
};

netlogoGenerator['create_shape_4'] = function (block) {
    const vertice_1_x = block.getFieldValue('VERTICE_1_X');
    const vertice_1_y = block.getFieldValue('VERTICE_1_Y');
    const vertice_2_x = block.getFieldValue('VERTICE_2_X');
    const vertice_2_y = block.getFieldValue('VERTICE_2_Y');
    const vertice_3_x = block.getFieldValue('VERTICE_3_X');
    const vertice_3_y = block.getFieldValue('VERTICE_3_Y');
    const vertice_4_x = block.getFieldValue('VERTICE_4_X');
    const vertice_4_y = block.getFieldValue('VERTICE_4_Y');
    let code = '' +
        'set vertices [\n' +
        `  [${vertice_1_x} ${vertice_1_y}][${vertice_2_x} ${vertice_2_y}][${vertice_3_x} ${vertice_3_y}][${vertice_4_x} ${vertice_4_y}]\n` +
        ']\n' +
        'cro length vertices\n' +
        '[\n' +
        '  set shape "circle" set size .3\n'+
        // '  setxy who 1\n' +
        // '  set label-color red\n' +
        // '  set label who\n' +
        ']\n' +
        'draw-polygon\n';
    return code;
};

netlogoGenerator['create_shape_5'] = function (block) {
    const vertice_1_x = block.getFieldValue('VERTICE_1_X');
    const vertice_1_y = block.getFieldValue('VERTICE_1_Y');
    const vertice_2_x = block.getFieldValue('VERTICE_2_X');
    const vertice_2_y = block.getFieldValue('VERTICE_2_Y');
    const vertice_3_x = block.getFieldValue('VERTICE_3_X');
    const vertice_3_y = block.getFieldValue('VERTICE_3_Y');
    const vertice_4_x = block.getFieldValue('VERTICE_4_X');
    const vertice_4_y = block.getFieldValue('VERTICE_4_Y');
    const vertice_5_x = block.getFieldValue('VERTICE_5_X');
    const vertice_5_y = block.getFieldValue('VERTICE_5_Y');
    let code = '' +
        'set vertices [\n' +
        `  [${vertice_1_x} ${vertice_1_y}][${vertice_2_x} ${vertice_2_y}][${vertice_3_x} ${vertice_3_y}][${vertice_4_x} ${vertice_4_y}][${vertice_5_x} ${vertice_5_y}]\n` +
        ']\n' +
        'cro length vertices\n' +
        '[\n' +
        '  set shape "circle" set size .3\n'+
        // '  setxy who 1\n' +
        // '  set label-color red\n' +
        // '  set label who\n' +
        ']\n' +
        'draw-polygon\n';
    return code;
};

netlogoGenerator['apply'] = function () {
    let code = 'transform\n';
    return code;
};

netlogoGenerator['setxy'] = function (block) {
    let x = netlogoGenerator.statementToCode(block, 'X');
    let y = netlogoGenerator.statementToCode(block, 'Y');
    let code = ' ask turtles [ setxy ' + x + ' ' + y + ' ]\n';
    return code;
};

netlogoGenerator['get_variable'] = function (block) {
    const variable = block.getField('VAR').selectedOption_[1];
    let code = variable;
    return code;
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
