import Blockly from 'blockly'
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
export let wolf_sheep = {};

wolf_sheep = {
    "categories": [{
        "kind": "category",
        "name": "Wolf Sheep",
        "expanded": true,
        "contents": [{
            "kind": "category",
            "name": "Properties",
            "toolboxitemid": "propertiesUnpackable",
            "categorystyle": "particles_category",
            "contents": [{
                "kind": "block",
                "type": "create_animal"
            },
            {
                "kind": "block",
                "type": "set_color"
            },
            {
                "kind": "block",
                "type": "set_size"
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
                "type": "move"
            },
            {
                "kind": "block",
                "type": "reduce_energy"
            },
            {
                "kind": "block",
                "type": "eat"
            },
            {
                "kind": "block",
                "type": "die"
            },
            {
                "kind": "block",
                "type": "reproduce"
            },
            {
                "kind": "block",
                "type": "grow_grass"
            }
            ]
        },
        {
            "kind": "category",
            "name": "Control",
            "colour": "#0089B8",
            "contents": [{
                "kind": "block",
                "type": "ask_each_particle"
            },
            {
                "kind": "block",
                "type": "no_more_energy"
            }
        ]
        }]
    }]
}

// Create with Mutation
Blockly.Blocks['create_animal'] = {
    init: function () {
        this.jsonInit({
            "message0": "create  %1 %2 %3",
            "args0": [
                {
                    "type": "field_slider",
                    "name": "PARTICLE_NUM",
                    "value": 100,
                    "min": 0,
                    "max": 250
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        [
                            "sheep",
                            "SHEEP"
                        ],
                        [
                            "wolves",
                            "WOLVES"
                        ]
                    ]
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
                  blockType: 'set_color',
                  fields: {
                    'COLOR': this.getFieldValue('TYPE') === 'SHEEP' ? 'WHITE' : 'BLACK',
                  }
                },
                {
                  blockType: 'set_size',
                  fields: {
                    'SIZE': this.getFieldValue('TYPE') === 'SHEEP' ? 'MEDIUM' : 'BIG',
                  }
                },
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
                  blockType: 'set_color',
                  fields: {
                    'COLOR': this.getFieldValue('TYPE') === 'SHEEP' ? 'WHITE' : 'BLACK',
                  }
                },
                {
                  blockType: 'set_size',
                  fields: {
                    'SIZE': this.getFieldValue('TYPE') === 'SHEEP' ? 'MEDIUM' : 'BIG',
                  }
                },
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.defineBlocksWithJsonArray([
    {
        "type":"set_color",
        "message0": "set color %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    [
                        "red",
                        "RED"
                    ],
                    [
                        "orange",
                        "ORANGE"
                    ],
                    [
                        "yellow",
                        "YELLOW"
                    ],
                    [
                        "green",
                        "GREEN"
                    ],
                    [
                        "blue",
                        "BLUE"
                    ],
                    [
                        "cyan",
                        "CYAN"
                    ],
                    [
                        "violet",
                        "VIOLET"
                    ],
                    [
                        "gray",
                        "GRAY"
                    ],
                    [
                        "black",
                        "BLACK"
                    ],
                    [
                        "brown",
                        "BROWN"
                    ],
                    [
                        "white",
                        "WHITE"
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
        "type": "set_size",
        "message0": "set size %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SIZE",
                "options": [
                    [
                        "small",
                        "SMALL"
                    ],
                    [
                        "medium",
                        "MEDIUM"
                    ],
                    [
                        "big",
                        "BIG"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
// Action Blocks
    {
        "type": "move",
        "message0": "move",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "reduce_energy",
        "message0": "reduce energy",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "eat",
        "message0": "eat %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "FOOD",
                "options": [
                    [
                        "grass",
                        "GRASS"
                    ],
                    [
                        "sheep",
                        "SHEEP"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "die",
        "message0": "die",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "reproduce",
        "message0": "reproduce",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "grow_grass",
        "message0": "grow grass",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    // Control Blocks
    {
        "type": "ask_each_particle",
        "message0": "ask %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "sheep",
                        "SHEEP"
                    ],
                    [
                        "wolves",
                        "WOLVES"
                    ],
                    [
                        "all",
                        "ALL"
                    ]
                ]
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
        "type": "no_more_energy",
        "message0": "no more energy",
        "output": "Boolean",
        "style": "netlogo_control_blocks",
        "tooltip": "",
        "helpUrl": ""
    }
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
        netlogoGenerator.INDENT + 'mouse_click\n' +
        netlogoGenerator.INDENT + 'go\n' +
        statement_members +
        netlogoGenerator.INDENT + 'tick-advance tick-delta\n' +
        netlogoGenerator.INDENT + 'display\n' +
        'end\n';
    return code;
};

netlogoGenerator['mouse_click'] = function (block) {
    let statement_members = netlogoGenerator.INDENT + 'set mouse-up? false\n' + netlogoGenerator.statementToCode(block, 'MOUSE');

    let ifContents = 'if mouse-down? \n[\n' +
        statement_members + ']';
    ifContents = Blockly.JavaScript.prefixLines(ifContents, netlogoGenerator.INDENT);

    let elseContents = '[\n' + netlogoGenerator.INDENT + 'if not mouse-down?\n' + netlogoGenerator.INDENT + '[\n' + netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set mouse-up? true\n' + netlogoGenerator.INDENT + ']\n' + ']\n'
    elseContents = Blockly.JavaScript.prefixLines(elseContents, netlogoGenerator.INDENT);
    let code = 'ifelse mouse-up? != false' + '\n[\n' + ifContents + '\n]\n';

    code = Blockly.JavaScript.prefixLines(
        code, netlogoGenerator.INDENT) + elseContents;

    return 'to mouse_click\n' + code + 'end\n';
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


// DIFFUSION BLOCK DEFINITIONS

// Properties Blocks
// Create Particles w/ mutation
netlogoGenerator['create_animal'] = function (block) {
    const dataObj = JSON.parse(block.data);
    const num = block.getFieldValue('PARTICLE_NUM');
    const type = block.getFieldValue('TYPE')
    let parameters;
    let prefix;
    if (type === 'SHEEP') {
        prefix = 
            'set shape "sheep"\n' +
            'set label-color blue - 2\n' +
            'set gain-from-food sheep-gain-from-food\n' +
            'set energy random (2 * gain-from-food)\n' +
            'setxy random-xcor random-ycor\n';
    } else {
        prefix = 
            'set shape "wolf"\n' +
            'set gain-from-food wolf-gain-from-food\n' +
            'set energy random (2 * gain-from-food)\n' +
            'setxy random-xcor random-ycor\n';
    }
    let suffix = '';
    if (!dataObj.contextData.CHANGED){
        parameters = getNLCodeFromUnpackBlocks(block.type, dataObj.unpackBlocks, this.workspace)
    }
    else{
        let xmlblock = Blockly.Xml.domToBlock(Blockly.Xml.textToDom(JSON.parse(block.data).contentXml), this.workspace);
        parameters = netlogoGenerator.blockToCode(xmlblock);
        xmlblock.dispose();
    }
    let code = 'create-' + type.toLowerCase() + ' ' + num + '\n[\n' + 
        Blockly.JavaScript.prefixLines(prefix, netlogoGenerator.INDENT) + 
        Blockly.JavaScript.prefixLines(parameters, netlogoGenerator.INDENT) + 
        Blockly.JavaScript.prefixLines(suffix, netlogoGenerator.INDENT) + '\n]\n';
    return code;
};

// Set Particle Color
netlogoGenerator['set_color'] = function (block) {
    let color = block.getField('COLOR').selectedOption_[0]
    let code = 'set color ' + color + '\n';
    return code;
};

// Set Particle Size
netlogoGenerator['set_size'] = function (block) {
    let size = netlogoGenerator.SIZE_ANIMAL[block.getField('SIZE').selectedOption_[1]];
    let code = 'set size ' + size + '\n';
    return code;
};

// Action Blocks
// Move
netlogoGenerator['move'] = function () {
    const code = 'move\n';
    return code;
};

netlogoGenerator['reduce_energy'] = function () {
    const code = 'set energy energy - 1\n';
    return code;
};

netlogoGenerator['eat'] = function (block) {
    let food = block.getField('FOOD').selectedOption_[0]
    let code = 'eat-' + food + '\n';
    return code;
};

netlogoGenerator['die'] = function () {
    const code = 'die\n';
    return code;
};

netlogoGenerator['reproduce'] = function () {
    const code = 'reproduce\n';
    return code;
};

netlogoGenerator['grow_grass'] = function () {
    const code = 'ask patches [ grow-grass ]\n';
    return code;
};

// Control Blocks
// Ask Particles
netlogoGenerator['ask_each_particle'] = function (block) {
    const particleName = block.getField('TYPE').value_ || 'SHEEP';
    const parameter = particleName === 'ALL' ? 'turtles' : particleName.toLowerCase();
    const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
    let code = 'ask ' + parameter + '\n' + '[\n' + statement_members + ']\n';
    return code;
};

netlogoGenerator['no_more_energy'] = function () {
    const code = 'energy < 0';
    return [code, netlogoGenerator.ORDER_NONE];
};

function getNLCodeFromUnpackBlocks(blockType, unpackBlocks, workspace) {
  const tempBlock = workspace.newBlock(blockType);
  tempBlock.appendStatementInput('EXPANDED_STATEMENT');
  traverseBlocks(unpackBlocks, tempBlock.getInput('EXPANDED_STATEMENT').connection, workspace)
  const code = netlogoGenerator.blockToCode(tempBlock.getInput('EXPANDED_STATEMENT').connection.targetBlock());
  tempBlock.dispose()
  return code
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
            const conditionBlock = workspace.newBlock(blockGroup.condition.blockType);
            block.getInput(blockGroup.condition.input).connection.connect(conditionBlock.outputConnection);
            if (blockGroup.condition.field) {
                conditionBlock.setFieldValue(blockGroup.condition.field.value, blockGroup.condition.field.name);
            }
        }
        // recursive step - traverse children and connect to parent.
        // basecase when no children exist
        if (blockGroup.children) {
          traverseBlocks(blockGroup.children, block.inputList[1].connection, workspace)
        }
      }
    }

