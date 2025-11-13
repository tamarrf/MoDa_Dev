import Blockly from 'blockly'
import * as Pt_br from 'blockly/msg/pt-br';
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
export let diffusion_v2_pt_br = {};

Blockly.setLocale(Pt_br);
Blockly.Msg['CONTROLS_IF_MSG_THEN'] = 'então';
Blockly.Msg['SETUP_BLOCK'] = 'preparar %1'
Blockly.Msg['GO_BLOCK'] = 'executar %1';
Blockly.Msg['MOUSE_CLICK_BLOCK'] = 'ao clicar %1';
Blockly.Msg['GENERAL_CATEGORY'] = 'Geral';

diffusion_v2_pt_br = {
    "categories": [{
        "kind": "category",
        "name": "Difusão",
        "expanded": true,
        "contents": [{
            "kind": "category",
            "name": "Propriedades",
            "toolboxitemid": "propertiesUnpackable",
            "categorystyle": "particles_category",
            "contents": [{
                "kind": "block",
                "type": "create_particles"
            },
            {
                "kind": "block",
                "type": "set_speed"
            },
            {
                "kind": "block",
                "type": "set_type"
            },
            {
                "kind": "block",
                "type": "set_mass"
            },
            {
                "kind": "block",
                "type": "set_color"
            },
            {
                "kind": "block",
                "type": "set_size"
            },
            {
                "kind": "block",
                "type": "set_position"
            },
            {
                "kind": "block",
                "type": "set_heading"
            },
            ]
        },
        {
            "kind": "category",
            "name": "Ações",
            "toolboxitemid": "actionsUnpackable",
            "categorystyle": "behavior_category",
            "contents": [{
                "kind": "block",
                "type": "move"
            },
            {
                "kind": "block",
                "type": "interact"
            },
            {
                "kind": "block",
                "type": "bounce_off"
            },
            {
                "kind": "block",
                "type": "erase"
            },
            {
                "kind": "block",
                "type": "attach"
            },
            {
                "kind": "block",
                "type": "split"
            }
            ]
        },
        {
            "kind": "category",
            "name": "Controle",
            "colour": "#0089B8",
            "contents": [{
                "kind": "block",
                "type": "ask_each_particle"
            },
            {
                "kind": "block",
                "type": "temperature"
            },
            {
                "kind": "block",
                "type": "touching_dropdown"
            }]
        }]
    }]
}

// Create with Mutation
Blockly.Blocks['create_particles'] = {
    init: function () {
        this.jsonInit({
            "message0": "criar  %1 partículas de %2 %3",
            "args0": [
                {
                    "type": "field_slider",
                    "name": "PARTICLE_NUM",
                    "value": 100,
                    "min": 0,
                    "max": 500
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        [
                            "água",
                            "WATER"
                        ],
                        [
                            "tinta",
                            "INK"
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
            "style": "particle_blocks",
            "mutator": "general_mutator"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                  blockType: 'set_speed',
                  fields: {
                    'SPEED': this.getFieldValue('TYPE') === 'WATER' ? 'TEMP' : 'MEDIUM',
                  }
                },
                {
                  blockType: 'set_position',
                  fields: {
                    'POSITION': 'RANDOM',
                  }
                },
                {
                  blockType: 'set_heading',
                  fields: {
                    'HEADING': 'RANDOM',
                  }
                },
                {
                  blockType: 'set_mass',
                  fields: {
                    'MASS': 'MEDIUM',
                  }
                },
                {
                  blockType: 'set_color',
                  fields: {
                    'COLOR': this.getFieldValue('TYPE') === 'WATER' ? 'CYAN' : 'RED',
                  }
                },
                {
                  blockType: 'set_size',
                  fields: {
                    'SIZE': 'MEDIUM',
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
                  blockType: 'set_speed',
                  fields: {
                    'SPEED': this.getFieldValue('TYPE') === 'WATER' ? 'TEMP' : 'MEDIUM',
                  }
                },
                {
                  blockType: 'set_position',
                  fields: {
                    'POSITION': 'RANDOM',
                  }
                },
                {
                  blockType: 'set_heading',
                  fields: {
                    'HEADING': 'RANDOM',
                  }
                },
                {
                  blockType: 'set_mass',
                  fields: {
                    'MASS': 'MEDIUM',
                  }
                },
                {
                  blockType: 'set_color',
                  fields: {
                    'COLOR': this.getFieldValue('TYPE') === 'WATER' ? 'CYAN' : 'RED',
                  }
                },
                {
                  blockType: 'set_size',
                  fields: {
                    'SIZE': 'MEDIUM',
                  }
                },
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

// Collision with mutation
Blockly.Blocks['interact'] = {
    init: function(){
        this.jsonInit({
            "message0": "interagir %1",
            "args0": [
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "mutator": "general_mutator",
            "style": "behavior_border"
        });
        let dataObj = {
            'unpackBlocks': [
                {
                    blockType: 'controls_if',
                    fields: {},
                    condition: {
                        input: 'IF0',
                        blockType: 'touching_dropdown',
                        field: {
                            name: 'TYPE',
                            value: 'WALL'
                        }
                    },
                    children: [
                      {
                        blockType: 'bounce_off',
                        fields: {}
                      }
                    ]
                },
                {
                    blockType: 'controls_if',
                    fields: {},
                    condition: {
                        input: 'IF0',
                        blockType: 'touching_dropdown',
                        field: {
                            name: 'TYPE',
                            value: 'ANYPARTICLE'
                        }
                    },
                    children: [
                      {
                        blockType: 'bounce_off',
                        fields: {}
                      }
                    ]
                },
            ],
            'contextData': {
                'CHANGED': false
            },
            'contentXml': ''
        };
        // define unpacked blocks and default values
        this.data = JSON.stringify(dataObj);
    },
    onchange: function(){
        if (this.getInput('EXPANDED_STATEMENT')) {
            const dataObj = JSON.parse(this.data);
            let count = 0;
            for (let child of this.getChildren()){
              if (child.getSurroundParent() === this) {
                if(count === 0){
                    dataObj.contentXml = Blockly.Xml.domToText(Blockly.Xml.blockToDom(child));
                }
                else{
                    dataObj.contentXml += Blockly.Xml.domToText(Blockly.Xml.blockToDom(child));
                }
                ++count;
              }
            }
            this.data = JSON.stringify(dataObj);
        }
    }
};

Blockly.defineBlocksWithJsonArray([
{
    // Properties Blocks
    // Create without Mutation
    "type": "create_particles1",
    "message0": "create  %1 %2 particles %3",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                [
                    "water",
                    "WATER"
                ],
                [
                    "ink",
                    "INK"
                ]
            ]
        },
        {
            "type": "field_slider",
            "name": "PARTICLE_NUM",
            "value": 100,
            "min": 0,
            "max": 500
        },
        {
            "type": "input_dummy",
            "name": "EMPTY"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_blocks"
},
{
    "type": "set_speed",
    "message0": "definir velocidade %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "SPEED",
            "options": [
                [
                    "zero",
                    "ZERO"
                ],
                [
                    "baixa",
                    "LOW"
                ],
                [
                    "média",
                    "MEDIUM"
                ],
                [
                    "alta",
                    "HIGH100"
                ],
                [
                    "temperatura inicial",
                    "TEMP"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border",
},
{
    "type": "set_type",
    "message0": "definir tipo %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                [
                    "água",
                    "water"
                ],
                [
                    "tinta",
                    "ink"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border",
},
{
    "type":"set_mass",
    "message0": "definir massa %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "MASS",
            "options": [
                [
                    "leve",
                    "LIGHT"
                ],
                [
                    "média",
                    "MEDIUM"
                ],
                [
                    "pesada",
                    "HEAVY"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border",
},
{
    "type":"set_color",
    "message0": "definir cor %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "COLOR",
            "options": [
                [
                    "vermelho",
                    "RED"
                ],
                [
                    "laranja",
                    "ORANGE"
                ],
                [
                    "amarelo",
                    "YELLOW"
                ],
                [
                    "verde",
                    "GREEN"
                ],
                [
                    "azul",
                    "BLUE"
                ],
                [
                    "anil",
                    "CYAN"
                ],
                [
                    "violeta",
                    "VIOLET"
                ],
                [
                    "cinza",
                    "GRAY"
                ],
                [
                    "preto",
                    "BLACK"
                ],
                [
                    "marrom",
                    "BROWN"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border",
},
{
    "type": "set_size",
    "message0": "definir tamanho %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "SIZE",
            "options": [
                [
                    "pequeno",
                    "SMALL"
                ],
                [
                    "médio",
                    "MEDIUM"
                ],
                [
                    "grande",
                    "BIG"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border",
},
{
    "type": "set_position",
    "message0": "definir posição %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "POSITION",
            "options": [
                [
                    "aleatória",
                    "RANDOM"
                ],
                [
                    "centro",
                    "CENTER"
                ],
                [
                    "linha vertical",
                    "VERTICAL"
                ],
                [
                    "linha horizontal",
                    "HORIZONTAL"
                ],
                [
                    "ponteiro do mouse",
                    "MOUSE"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border",
},
{
    "type": "set_heading",
    "message0": "definir direção %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "HEADING",
            "options": [
                [
                    "aleatória",
                    "RANDOM"
                ],
                [
                    "para cima",
                    "UP"
                ],
                [
                    "para direita",
                    "RIGHT"
                ],
                [
                    "para baixo",
                    "DOWN"
                ],
                [
                    "para esquerda",
                    "LEFT"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border",
},
// Action Blocks
{
    "type": "move",
    "message0": "mover",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
},
{
    // Collision without Mutation
    "type": "collision1",
    "message0": "interact %1",
    "args0": [
        {
            "type": "input_dummy",
            "name": "EMPTY"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
},
{
    "type": "bounce_off",
    "message0": "rebater",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_blocks"
},
{
    "type": "erase",
    "message0": "apagar",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_blocks"
},
{
    "type": "attach",
    "message0": "juntar",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_blocks"
},
{
    "type": "split",
    "message0": "dividir",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_blocks"
},
// Control Blocks
{
    "type": "ask_each_particle",
    "message0": "pedir para %1 %2 %3",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                [
                    "partículas de água",
                    "WATER"
                ],
                [
                    "partículas de tinta",
                    "INK"
                ],
                [
                    "todas as partículas",
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
    "style": "control_blocks"
},
{
    "type": "temperature",
    "message0": "temperatura estiver %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TEMP",
            "options": [
                [
                    "alta",
                    "HIGH"
                ],
                [
                    "média",
                    "MEDIUM"
                ],
                [
                    "baixa",
                    "LOW"
                ],
                [
                    "zero",
                    "ZERO"
                ]
            ]
        }
    ],
    "output": "Boolean",
    "style": "control_blocks",
},
{
    "type": "touching_dropdown",
    "message0": "tocando em %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                [
                    "qualquer partícula",
                    "ANYPARTICLE"
                ],
                [
                    "partícula de água",
                    "WATERPARTICLE"
                ],
                [
                    "partícula de tinta",
                    "INKPARTICLE"
                ],
                [
                    "parede",
                    "WALL"
                ]
            ]
        }
    ],
    "output": "Boolean",
    "style": "control_blocks",
    "tooltip": "",
    "helpUrl": ""
}]);

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
        //netlogoGenerator.INDENT + 'display\n' +
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
    let usedTouchingParticle, usedTouchingWall;
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
        usedTouchingParticle = conditionCode.includes('(count collision-enemies > 0) and (collision-candidate != nobody) and (speed > 0 or [speed] of collision-candidate > 0)');
        usedTouchingWall = conditionCode.includes('abs [pxcor] of patch-ahead 1 >= max-pxcor - 4 or abs [pycor] of patch-ahead 1 >= max-pycor - 4');
        if (usedTouchingParticle || usedTouchingWall) {
            branchCode = usedTouchingParticle ? (netlogoGenerator.INDENT + 'set collision-flag 1\n' + netlogoGenerator.statementToCode(block, 'DO' + n)) : (netlogoGenerator.INDENT + 'set collision-flag 2\n') + netlogoGenerator.statementToCode(block, 'DO' + n);
        } else {
            branchCode = netlogoGenerator.statementToCode(block, 'DO' + n);
        }
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
    
    if (usedTouchingParticle || usedTouchingWall) {
        code +=
            'if (clean-candidate-flag = 1) [\n' +
            '  ask collision-candidate [ set collision-candidate nobody ]\n' +
            '  set collision-candidate nobody\n' +
            '  set clean-candidate-flag 0\n' +
            ']\n' +
            'set collision-flag 0\n';
    } else {
        code +='';
    }

    return code;
};


// DIFFUSION BLOCK DEFINITIONS

// Properties Blocks
// Create Particles w/ mutation
netlogoGenerator['create_particles'] = function (block) {
    const root = block.getRootBlock().type;
    const dataObj = JSON.parse(block.data);
    const num = block.getFieldValue('PARTICLE_NUM');
    const type = block.getFieldValue('TYPE')
    let parameters;
    let prefix = 
    'set particle-type "' + type.toLowerCase() + '"\n' +
    'set first-time 1\n' +
    'set last-collision nobody\n' +
    'set collision-flag 0\n' +
    'set clean-candidate-flag 0\n' +
    'set collision-hatching 0\n' +
    'set collision-enemies no-turtles\n';
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
    let code = 'create-particles ' + num + '\n[\n' + Blockly.JavaScript.prefixLines(prefix, netlogoGenerator.INDENT) + Blockly.JavaScript.prefixLines(parameters, netlogoGenerator.INDENT) + Blockly.JavaScript.prefixLines(suffix, netlogoGenerator.INDENT) + '\n]\n';
    return code;
};

// Create Particles no mutation
netlogoGenerator['create_particles1'] = function (block) {
    const num = block.getFieldValue('PARTICLE_NUM');
    const parameters =
        'set particle-type "' + block.getFieldValue('TYPE').toLowerCase() + '" \n' +
        'set speed ' + netlogoGenerator.SPEED['TEMP'] + '\n' +
        'set mass ' + netlogoGenerator.MASS['MEDIUM'] + '\n' +
        'set energy (.5 * mass * speed * speed)\n' +
        'set first-time 1\n' +
        'set last-collision nobody\n' +
        'set collision-flag 0 \n' +
        'set clean-candidate-flag 0\n' +
        'set collision-hatching 0\n' +
        'set color ' + (block.getFieldValue('TYPE') === 'WATER' ? 'cyan' : 'red') + '\n' +
        'set size ' + netlogoGenerator.SIZE['MEDIUM'] + '\n' +
        'setxy ' + netlogoGenerator.POSITION['RANDOM'] + '\n' +
        'set random-wiggle 40\n' +
        'set heading ' + netlogoGenerator.HEADING['RANDOM'] + '\n' +
        'if mouse-down? \n[\n' +
        netlogoGenerator.INDENT + 'drop-with-mouse ' + num + '\n' +
        ']';
    const code = 'create-particles ' + num + '\n[\n' + Blockly.JavaScript.prefixLines(parameters, netlogoGenerator.INDENT) + '\n]\n';
    return code;
};

// Set Particle Speed
netlogoGenerator['set_speed'] = function (block) {
    let speed = netlogoGenerator.SPEED[block.getField('SPEED').selectedOption_[1]];
    let code = 'set random-wiggle 5\nset speed ' + speed + '\n';
    return code;
};

// Set Particle Type
netlogoGenerator['set_type'] = function (block) {
    let type = block.getField('TYPE').selectedOption_[1];
    let code = 'set particle-type "' + type + '"\n';
    return code;
};

// Set Particle Mass
netlogoGenerator['set_mass'] = function (block) {
    let mass = netlogoGenerator.MASS[block.getField('MASS').selectedOption_[1]];
    let code = 'set mass ' + mass + '\n' +
        'set energy (.5 * mass * speed * speed)\n';
    return code;
};

// Set Particle Color
netlogoGenerator['set_color'] = function (block) {
    let color = block.getField('COLOR').selectedOption_[1]
    let code = 'set color ' + color + '\n';
    return code;
};

// Set Particle Size
netlogoGenerator['set_size'] = function (block) {
    let size = netlogoGenerator.SIZE[block.getField('SIZE').selectedOption_[1]];
    let code = 'set size ' + size + '\n';
    return code;
};

// Set Particle Postion
netlogoGenerator['set_position'] = function (block) {
    const position = netlogoGenerator.POSITION[block.getField('POSITION').selectedOption_[1]];
    const field = block.getField('POSITION').selectedOption_[1];
    let code = (field !== 'MOUSE') ? ('setxy ' + position + '\n') : (position + '\n');
    return code;
};

// Set Particle Heading
netlogoGenerator['set_heading'] = function (block) {
    let heading = netlogoGenerator.HEADING[block.getField('HEADING').selectedOption_[1]];
    let code = 'set random-wiggle 40\nset heading ' + heading + '\n';
    return code;
};


// Action Blocks
// Move
netlogoGenerator['move'] = function () {
    const code = 'particle-forward\n';
    return code;
};

// Collide with Mutation
netlogoGenerator['interact'] = function (block) {
    let code ;
    const dataObj = JSON.parse(block.data);
    if (!dataObj.contextData.CHANGED){
        code = getNLCodeFromUnpackBlocks(block.type, dataObj.unpackBlocks, this.workspace)
    }
    else{
        let xmlblock = Blockly.Xml.domToBlock(Blockly.Xml.textToDom(JSON.parse(block.data).contentXml), this.workspace);
        code = netlogoGenerator.blockToCode(xmlblock);
        xmlblock.dispose();
    }
    return code;
};

// Collide w/o Mutation
netlogoGenerator['collision1'] = function () {
    const code =
        'bounce-wall\n' +
        'check-for-collision\n';
    return code;
};

// Bounce Off
netlogoGenerator['bounce_off'] = function () {
    let code = 
    'if collision-flag = 1\n[\n' + 
    netlogoGenerator.INDENT + 'collide-with collision-candidate\n'+
    netlogoGenerator.INDENT + 'set last-collision collision-candidate\n'+
    netlogoGenerator.INDENT + 'ask collision-candidate [\n' +
    netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set last-collision myself\n' +
    netlogoGenerator.INDENT + ']\n' +
    netlogoGenerator.INDENT + 'set clean-candidate-flag 1\n'+
    ']\n'+
    'if collision-flag = 2\n[\n' +
    netlogoGenerator.INDENT + 'if abs[pxcor] of patch-ahead 1 >= max-pxcor - 4\n' +
    netlogoGenerator.INDENT + '[ set heading (- heading) ]\n' + 
    netlogoGenerator.INDENT + 'if abs [pycor] of patch-ahead 1 >= max-pycor - 4\n' + 
    netlogoGenerator.INDENT + '[ set heading(180 - heading) ]\n'+
    ']\n';
    return code;
};

// Erase Particles
netlogoGenerator['erase'] = function () {
    const code =
        'ifelse collision-flag = 1\n[\n' +
        netlogoGenerator.INDENT + 'set last-collision collision-candidate\n' +
        netlogoGenerator.INDENT + 'ask collision-candidate [\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set last-collision myself\n' +
        netlogoGenerator.INDENT + ']\n' +
        netlogoGenerator.INDENT + 'die\n' +
        netlogoGenerator.INDENT + 'set clean-candidate-flag 1\n'+
        ']\n' +
        '[\n' +
        netlogoGenerator.INDENT + 'die' +
        '\n]\n';
    return code;
};

// Attach Particles
netlogoGenerator['attach'] = function () {
    const code =
        'ifelse collision-flag = 1 \n[\n' +
        netlogoGenerator.INDENT + 'let heading-candidate heading\n' +
        netlogoGenerator.INDENT + 'let speed-candidate speed\n' +
        netlogoGenerator.INDENT + 'ask collision-candidate\n' + 
        netlogoGenerator.INDENT + '[\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set last-collision myself\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set heading-candidate heading\n' + 
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set speed-candidate speed\n' + 
        netlogoGenerator.INDENT + ']\n' +
        netlogoGenerator.INDENT + 'set last-collision collision-candidate\n' +
        netlogoGenerator.INDENT + 'set speed speed-candidate\n' +
        netlogoGenerator.INDENT + 'set heading heading-candidate\n' +
        netlogoGenerator.INDENT + 'set clean-candidate-flag 1\n' +
        ']\n[\n' +
        netlogoGenerator.INDENT + 'set speed 0\n' +
        ']\n';
    return code;
};

// Split Particles
netlogoGenerator['split'] = function () {
    const code =
        'ifelse collision-flag = 1\n[\n' +
        netlogoGenerator.INDENT + 'set last-collision collision-candidate\n' +
        netlogoGenerator.INDENT + 'ask collision-candidate [\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set last-collision myself\n' +
        netlogoGenerator.INDENT + ']\n' +
        netlogoGenerator.INDENT + 'set size size * 0.9\n' +
        netlogoGenerator.INDENT + 'hatch 1 [\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'if not (abs [pxcor] of patch-ahead 1 >= max-pxcor - 7 or abs [pycor] of patch-ahead 1 >= max-pycor - 7) [\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'fd 3\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + ']\n' +
        netlogoGenerator.INDENT + ']\n' +
        netlogoGenerator.INDENT + 'set clean-candidate-flag 1\n'+
        ']\n' +
        '[\n' +
        netlogoGenerator.INDENT + 'set size size * 0.9\n' +
        netlogoGenerator.INDENT + 'hatch 1 [\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'if not (abs [pxcor] of patch-ahead 1 >= max-pxcor - 7 or abs [pycor] of patch-ahead 1 >= max-pycor - 7) [\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'fd 3\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + ']\n' +
        netlogoGenerator.INDENT + ']\n' +
        '\n]\n';
    return code;
};

// Control Blocks
// Ask Particles
netlogoGenerator['ask_each_particle'] = function (block) {
    const particleName = block.getField('TYPE').value_ || 'WATER';
    const parameter = particleName === 'ALL' ? '' : ' with [particle-type = "' + particleName.toLowerCase() + '"]';
    const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
    let code = 'ask particles' + parameter + '\n' + '[\n' + statement_members + ']\n';
    return code;
};

// Check Environment Temperature
netlogoGenerator['temperature'] = function (block) {
    switch (block.getFieldValue('TEMP')) {
        case 'HIGH':
            return ['temperature > 35', netlogoGenerator.ORDER_NONE];
        case 'MEDIUM':
            return ['temperature < 36 and temperature > 14', netlogoGenerator.ORDER_NONE];
        case 'LOW':
            return ['temperature < 15 and temperature > 0', netlogoGenerator.ORDER_NONE];
        case 'ZERO':
            return ['temperature = 0', netlogoGenerator.ORDER_NONE];
    }
};

// Detect if touching
netlogoGenerator['touching_dropdown'] = function (block) {
    const type = block.getField('TYPE').selectedOption_[1];
    let code;
    let particleType;
    if(type.includes('PARTICLE')){
        if(type.includes('ANY')){
            particleType = 'any';
        }
        else{
            particleType = block.getField('TYPE').selectedOption_[0].replace('partícula de ', '').replace('água', 'water').replace('tinta', 'ink');
        }
        const particleCondition = particleType != 'any' ? ' and ([particle-type] of collision-candidate = "' + particleType + '")' : ''
        code = '(count collision-enemies > 0) and (collision-candidate != nobody) and (speed > 0 or [speed] of collision-candidate > 0)' + particleCondition
    }
    else{
        code = 'abs [pxcor] of patch-ahead 1 >= max-pxcor - 4 or abs [pycor] of patch-ahead 1 >= max-pycor - 4'
    }
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

