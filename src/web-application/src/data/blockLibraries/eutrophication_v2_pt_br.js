import Blockly from 'blockly'
import * as Pt_br from 'blockly/msg/pt-br';
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
import { baseBlockLibrary } from "./baseBlocks.js";
export let eutrophication_v2_pt_br = {};

Blockly.setLocale(Pt_br);
Blockly.Msg["CONTROLS_IF_MSG_THEN"] = "então";
Blockly.Msg['SETUP_BLOCK'] = 'preparar %1'
Blockly.Msg['GO_BLOCK'] = 'executar %1';
Blockly.Msg['MOUSE_CLICK_BLOCK'] = 'ao clicar %1';
Blockly.Msg['GENERAL_CATEGORY'] = 'Geral';

baseBlockLibrary["contents"][0] = {
    "kind": "category",
    "name": "Geral",
    "contents": [{
        "kind": "category",
        "name": "Lógica",
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
        "name": "Matemática",
        "colour": "#009D80",
        "contents": [
            {
                "kind": "block",
                "type": "math_number"
            },
            {
                "kind": "block",
                "blockxml": "<block type=\"math_arithmetic\"><value name=\"A\"><shadow type=\"math_number\"/></value><value name=\"B\"><shadow type=\"math_number\"/></value></block>",
                "type": "math_arithmetic"
            }
        ]
    },
    {
        "kind": "category",
        "name": "Texto",
        "colour": "#00B695",
        "contents": [
            {
                "kind": "block",
                "type": "text"
            }
        ]
    }]
}

// Option lists
const opTypes = [
    ["algas", "algae"],
    ["bactérias", "bacteria"],
    ["peixes", "fishes"]
];

let opTypesAll = [...opTypes];
opTypesAll.push(["todos", "ALL"]);

const opTypesConsume = [
    ["alga", "algae"],
    ["bactéria", "bacteria"],
    ["co2", "co2s"],
    ["matéria orgânica", "dead-matters"],
    ["nutrientes", "nutrients"],
    ["o2", "o2s"]
];

eutrophication_v2_pt_br = {
    "categories": [{
        "kind": "category",
        "name": "Eutrofização",
        "expanded": true,
        "contents": [{
            "kind": "category",
            "name": "Propriedades",
            "toolboxitemid": "propertiesUnpackable",
            "categorystyle": "particles_category",
            "contents": [
                {
                    "kind": "block",
                    "type": "create_agent"
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
                    "type": "set_speed"
                },
                {
                    "kind": "block",
                    "type": "set_energy"
                },
                {
                    "kind": "block",
                    "type": "set_position"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Ações",
            "toolboxitemid": "actionsUnpackable",
            "categorystyle": "behavior_category",
            "contents": [
                {
                    "kind": "block",
                    "type": "move_unpackable"
                },
                {
                    "kind": "block",
                    "type": "reproduce_unpackable_complete"
                },
                {
                    "kind": "block",
                    "type": "die_unpackable_complete"
                },
                {
                    "kind": "block",
                    "type": "breathe_unpackable"
                },
                {
                    "kind": "block",
                    "type": "decompose_unpackable"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Controle",
            "colour": "#0089B8",
            "contents": [
                {
                    "kind": "block",
                    "type": "ask_each_particle"
                },
                {
                    "kind": "block",
                    "type": "touching_dropdown"
                },
                {
                    "kind": "block",
                    "type": "with_chance"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Variáveis",
            "colour": "#C7B02C",
            "contents": [
                {
                    "kind": "block",
                    "type": "get_variable"
                },
                {
                    "kind": "block",
                    "type": "set_variable"
                },
                {
                    "kind": "block",
                    "blockxml": "<block type=\"change_by\"><value name=\"CHANGE\"><shadow type=\"math_number\"><field name=\"NUM\">0</field></shadow></value></block>",
                    "type": "change_by"
                }
            ]
        }]
    }]
}

// Create with Mutation
Blockly.Blocks['create_agent'] = {
    init: function () {
        this.jsonInit({
            "message0": "criar  %1 %2 %3",
            "args0": [
                {
                    "type": "field_slider",
                    "name": "PARTICLE_NUM",
                    "value": 5,
                    "min": 1,
                    "max": 50
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": opTypes
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
                        'COLOR': this.getFieldValue('TYPE') === 'nutrients' ? 'green - 1' :
                                 this.getFieldValue('TYPE') === 'o2s' ? 'red' :
                                 this.getFieldValue('TYPE') === 'algae' ? 'lime - 1' :
                                 this.getFieldValue('TYPE') === 'bacteria' ? 'brown' :
                                 this.getFieldValue('TYPE') === 'fishes' ? 'orange' : 'black',
                    }
                },
                {
                    blockType: 'set_size',
                    fields: {
                        'SIZE': this.getFieldValue('TYPE') === 'nutrients' ? 'SMALL' :
                                this.getFieldValue('TYPE') === 'o2s' ? 'SMALL' :
                                this.getFieldValue('TYPE') === 'algae' ? 'BIG' :
                                this.getFieldValue('TYPE') === 'bacteria' ? 'SMALL' :
                                this.getFieldValue('TYPE') === 'fishes' ? 'BIG' : 'BIG',
                    }
                },
                {
                    blockType: 'set_speed',
                    fields: {
                        'SPEED': this.getFieldValue('TYPE') === 'nutrients' ? 'MEDIUM' :
                                 this.getFieldValue('TYPE') === 'o2s' ? 'MEDIUM' :
                                 this.getFieldValue('TYPE') === 'algae' ? 'SLOW' :
                                 this.getFieldValue('TYPE') === 'bacteria' ? 'MEDIUM' :
                                 this.getFieldValue('TYPE') === 'fishes' ? 'SLOW' : 'SLOW',
                    }
                },
                {
                    blockType: 'set_energy',
                    fields: {
                        'ENERGY': 200,
                    }
                },
                {
                    blockType: 'set_position',
                    fields: {
                        'POSITION': 'RANDOM',
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
                    blockType: 'set_color',
                    fields: {
                        'COLOR': this.getFieldValue('TYPE') === 'nutrients' ? 'green - -1' :
                                 this.getFieldValue('TYPE') === 'o2s' ? 'red' :
                                 this.getFieldValue('TYPE') === 'algae' ? 'lime - 1' :
                                 this.getFieldValue('TYPE') === 'bacteria' ? 'brown' :
                                 this.getFieldValue('TYPE') === 'fishes' ? 'orange' : 'black',
                    }
                },
                {
                    blockType: 'set_size',
                    fields: {
                        'SIZE': this.getFieldValue('TYPE') === 'nutrients' ? 'SMALL' :
                                this.getFieldValue('TYPE') === 'o2s' ? 'SMALL' :
                                this.getFieldValue('TYPE') === 'algae' ? 'BIG' :
                                this.getFieldValue('TYPE') === 'bacteria' ? 'SMALL' :
                                this.getFieldValue('TYPE') === 'fishes' ? 'BIG' : 'BIG',
                }
                },
                {
                    blockType: 'set_speed',
                    fields: {
                        'SPEED': this.getFieldValue('TYPE') === 'nutrients' ? 'MEDIUM' :
                                 this.getFieldValue('TYPE') === 'o2s' ? 'MEDIUM' :
                                 this.getFieldValue('TYPE') === 'algae' ? 'SLOW' :
                                 this.getFieldValue('TYPE') === 'bacteria' ? 'MEDIUM' :
                                 this.getFieldValue('TYPE') === 'fishes' ? 'SLOW' : 'SLOW',
                    }
                },
                {
                    blockType: 'set_energy',
                    fields: {
                        'ENERGY': 200,
                    }
                },
                {
                    blockType: 'set_position',
                    fields: {
                        'POSITION': 'RANDOM',
                    }
                }
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

// Create with Mutation
Blockly.Blocks['move_unpackable'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    'type': 'field_input',
                    'name': 'TEXT',
                    'text': 'mover',
                },
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "netlogo_action_blocks",
            "mutator": "general_mutator"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                    blockType: 'forward',
                    fields: {},
                    condition:
                    {
                        input: 'FORWARD',
                        blockType: 'get_variable',
                        field: {
                            name: 'VAR',
                            value: 'speed'
                        }
                    }
                },
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'energy',
                    },
                    condition:
                    {
                        input: 'VALUE',
                        blockType: 'math_arithmetic',
                        field: {
                            name: 'OP',
                            value: 'MINUS'
                        },
                        blockFields: [
                            {
                                input: 'A',
                                blockType: 'get_variable',
                                field: {
                                    name: 'VAR',
                                    value: 'energy'
                                }
                            },
                            {
                                input: 'B',
                                blockType: 'math_number',
                                field: {
                                    name: 'NUM',
                                    value: 1
                                }
                            }
                        ]
                    },
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
                    blockType: 'forward',
                    fields: {},
                    condition:
                    {
                        input: 'FORWARD',
                        blockType: 'get_variable',
                        field: {
                            name: 'VAR',
                            value: 'speed'
                        }
                    }
                },
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'energy',
                    },
                    condition:
                    {
                        input: 'VALUE',
                        blockType: 'math_arithmetic',
                        field: {
                            name: 'OP',
                            value: 'MINUS'
                        },
                        blockFields: [
                            {
                                input: 'A',
                                blockType: 'get_variable',
                                field: {
                                    name: 'VAR',
                                    value: 'energy'
                                }
                            },
                            {
                                input: 'B',
                                blockType: 'math_number',
                                field: {
                                    name: 'NUM',
                                    value: 1
                                }
                            }
                        ]
                    },
                },
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

// Create with Mutation
Blockly.Blocks['breathe_unpackable'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    'type': 'field_input',
                    'name': 'TEXT',
                    'text': 'respirar',
                },
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "netlogo_action_blocks",
            "mutator": "general_mutator"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                    blockType: 'controls_if',
                    fields: {},
                    condition: 
                    {
                        input: 'IF0',
                        blockType: 'touching_dropdown',
                        field: {
                            name: 'TYPE',
                            value: 'o2s'
                        }
                    },
                    children: [
                        {
                            blockType: 'consume_touched',
                            fields: {
                                'TYPE': 'o2s'
                            },
                        },
                        {
                            blockType: 'set_variable',
                            fields: {
                                'VAR': 'energy',
                            },
                            condition:
                            {
                                input: 'VALUE',
                                blockType: 'math_arithmetic',
                                field: {
                                    name: 'OP',
                                    value: 'ADD'
                                },
                                blockFields: [
                                    {
                                        input: 'A',
                                        blockType: 'get_variable',
                                        field: {
                                            name: 'VAR',
                                            value: 'energy'
                                        }
                                    },
                                    {
                                        input: 'B',
                                        blockType: 'math_number',
                                        field: {
                                            name: 'NUM',
                                            value: 50
                                        }
                                    }
                                ]
                            },
                        }
                    ]
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
                    blockType: 'controls_if',
                    fields: {},
                    condition: 
                    {
                        input: 'IF0',
                        blockType: 'touching_dropdown',
                        field: {
                            name: 'TYPE',
                            value: 'o2s'
                        }
                    },
                    children: [
                        {
                            blockType: 'consume_touched',
                            fields: {
                                'TYPE': "o2s"
                            },
                        },
                        {
                            blockType: 'set_variable',
                            fields: {
                                'VAR': 'energy',
                            },
                            condition:
                            {
                                input: 'VALUE',
                                blockType: 'math_arithmetic',
                                field: {
                                    name: 'OP',
                                    value: 'ADD'
                                },
                                blockFields: [
                                    {
                                        input: 'A',
                                        blockType: 'get_variable',
                                        field: {
                                            name: 'VAR',
                                            value: 'energy'
                                        }
                                    },
                                    {
                                        input: 'B',
                                        blockType: 'math_number',
                                        field: {
                                            name: 'NUM',
                                            value: 50
                                        }
                                    }
                                ]
                            },
                        }
                    ]
                },
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.Blocks['reproduce_unpackable_complete'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    'type': 'field_input',
                    'name': 'TEXT',
                    'text': 'reproduzir',
                },
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "netlogo_action_blocks",
            "mutator": "general_mutator"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                    blockType: 'with_chance',
                    fields: {
                        'NUM': 0.5
                    },
                    children: [
                        {
                            blockType: 'hatch',
                            fields: {
                                'NUM': 1
                            }
                        },
                        {
                            blockType: 'set_variable',
                            fields: {
                                'VAR': 'energy',
                            },
                            condition:
                            {
                                input: 'VALUE',
                                blockType: 'math_operations',
                                field: {
                                    name: 'OP',
                                    value: 'MINUS'
                                },
                                blockFields: [
                                    {
                                        input: 'A',
                                        blockType: 'get_variable',
                                        field: {
                                            name: 'VAR',
                                            value: 'energy'
                                        }
                                    },
                                    {
                                        input: 'B',
                                        blockType: 'get_number',
                                        field: {
                                            name: 'NUM',
                                            value: 200
                                        }
                                    }
                                ]
                            },
                        },
                    ]
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
                    blockType: 'with_chance',
                    fields: {
                        'NUM': 0.5
                    },
                    children: [
                        {
                            blockType: 'hatch',
                            fields: {
                                'NUM': 1
                            }
                        },
                        {
                            blockType: 'set_variable',
                            fields: {
                                'VAR': 'energy',
                            },
                            condition:
                            {
                                input: 'VALUE',
                                blockType: 'math_operations',
                                field: {
                                    name: 'OP',
                                    value: 'MINUS'
                                },
                                blockFields: [
                                    {
                                        input: 'A',
                                        blockType: 'get_variable',
                                        field: {
                                            name: 'VAR',
                                            value: 'energy'
                                        }
                                    },
                                    {
                                        input: 'B',
                                        blockType: 'get_number',
                                        field: {
                                            name: 'NUM',
                                            value: 200
                                        }
                                    }
                                ]
                            },
                        },
                    ]
                }
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

// Create with Mutation
Blockly.Blocks['reproduce_unpackable'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    'type': 'field_input',
                    'name': 'TEXT',
                    'text': 'reproduzir',
                },
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "netlogo_action_blocks",
            "mutator": "general_mutator"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                    blockType: 'hatch',
                    fields: {
                        'NUM': 1
                    }
                },
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'energy',
                    },
                    condition:
                    {
                        input: 'VALUE',
                        blockType: 'math_arithmetic',
                        field: {
                            name: 'OP',
                            value: 'MINUS'
                        },
                        blockFields: [
                            {
                                input: 'A',
                                blockType: 'get_variable',
                                field: {
                                    name: 'VAR',
                                    value: 'energy'
                                }
                            },
                            {
                                input: 'B',
                                blockType: 'math_number',
                                field: {
                                    name: 'NUM',
                                    value: 200
                                }
                            }
                        ]
                    },
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
                    blockType: 'hatch',
                    fields: {
                        'NUM': 1
                    }
                },
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'energy',
                    },
                    condition:
                    {
                        input: 'VALUE',
                        blockType: 'math_arithmetic',
                        field: {
                            name: 'OP',
                            value: 'MINUS'
                        },
                        blockFields: [
                            {
                                input: 'A',
                                blockType: 'get_variable',
                                field: {
                                    name: 'VAR',
                                    value: 'energy'
                                }
                            },
                            {
                                input: 'B',
                                blockType: 'math_number',
                                field: {
                                    name: 'NUM',
                                    value: 200
                                }
                            }
                        ]
                    },
                }
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.Blocks['die_unpackable_complete'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    'type': 'field_input',
                    'name': 'TEXT',
                    'text': 'morrer',
                },
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "netlogo_action_blocks",
            "mutator": "general_mutator"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                    blockType: 'controls_if',
                    fields: {},
                    condition: 
                    {
                        input: 'IF0',
                        blockType: 'logic_comparison',
                        field: {
                            name: 'OP',
                            value: 'LTE'
                        },
                        blockFields: [
                            {
                                input: 'A',
                                blockType: 'get_variable',
                                field: {
                                    name: 'VAR',
                                    value: 'energy'
                                }
                            },
                            {
                                input: 'B',
                                blockType: 'get_number',
                                field: {
                                    name: 'NUM',
                                    value: 0
                                }
                            }
                        ]
                    },
                    children: [
                        {
                            blockType: 'set_color',
                            fields: {
                                'COLOR': 'gray + 1'
                            },
                        },
                        {
                            blockType: 'set_dead_matter',
                        }
                    ]
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
                    blockType: 'controls_if',
                    fields: {},
                    condition: 
                    {
                        input: 'IF0',
                        blockType: 'logic_comparison',
                        field: {
                            name: 'OP',
                            value: 'LTE'
                        },
                        blockFields: [
                            {
                                input: 'A',
                                blockType: 'get_variable',
                                field: {
                                    name: 'VAR',
                                    value: 'energy'
                                }
                            },
                            {
                                input: 'B',
                                blockType: 'get_number',
                                field: {
                                    name: 'NUM',
                                    value: 0
                                }
                            }
                        ]
                    },
                    children: [
                        {
                            blockType: 'set_color',
                            fields: {
                                'COLOR': 'gray + 1'
                            },
                        },
                        {
                            blockType: 'set_dead_matter',
                        }
                    ]
                }
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

// Create with Mutation
Blockly.Blocks['die_unpackable'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    'type': 'field_input',
                    'name': 'TEXT',
                    'text': 'morrer',
                },
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "netlogo_action_blocks",
            "mutator": "general_mutator"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                    blockType: 'set_dead_matter',
                },
                {
                    blockType: 'set_speed',
                    fields: {
                        'SPEED': 'ZERO'
                    },
                },
                {
                    blockType: 'set_color',
                    fields: {
                        'COLOR': 'gray + 1'
                    },
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
                    blockType: 'set_dead_matter',
                },
                {
                    blockType: 'set_speed',
                    fields: {
                        'SPEED': 'ZERO'
                    },
                },
                {
                    blockType: 'set_color',
                    fields: {
                        'COLOR': 'gray + 1'
                    },
                }
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

// Create with Mutation
Blockly.Blocks['decompose_unpackable'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    'type': 'field_input',
                    'name': 'TEXT',
                    'text': 'decompor',
                },
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "netlogo_action_blocks",
            "mutator": "general_mutator"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                    blockType: 'controls_if',
                    fields: {},
                    condition: {
                        input: 'IF0',
                        blockType: 'logic_operation',
                        field: {
                            name: 'OP',
                            value: 'AND'
                        },
                        blockFields: [
                            {
                                input: 'A',
                                blockType: 'touching_dropdown',
                                field: {
                                    name: 'TYPE',
                                    value: 'o2s'
                                }
                            },
                            {
                                input: 'B',
                                blockType: 'touching_dropdown',
                                field: {
                                    name: 'TYPE',
                                    value: 'dead-matters'
                                }
                            }
                        ]
                    },
                    children: [
                        {
                            blockType: 'consume_touched',
                            fields: {
                                'TYPE': 'o2s'
                            },
                        },
                        {
                            blockType: 'consume_touched',
                            fields: {
                                'TYPE': 'dead-matters'
                            },
                        },
                        {
                            blockType: 'produce',
                            fields: {
                                'TYPE': 'co2s'
                            },
                        },
                        {
                            blockType: 'set_variable',
                            fields: {
                                'VAR': 'energy',
                            },
                            condition:
                            {
                                input: 'VALUE',
                                blockType: 'math_arithmetic',
                                field: {
                                    name: 'OP',
                                    value: 'ADD'
                                },
                                blockFields: [
                                    {
                                        input: 'A',
                                        blockType: 'get_variable',
                                        field: {
                                            name: 'VAR',
                                            value: 'energy'
                                        }
                                    },
                                    {
                                        input: 'B',
                                        blockType: 'math_number',
                                        field: {
                                            name: 'NUM',
                                            value: 100
                                        }
                                    }
                                ]
                            },
                        }
                    ]
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
                    blockType: 'controls_if',
                    fields: {},
                    condition: {
                        input: 'IF0',
                        blockType: 'logic_operation',
                        field: {
                            name: 'OP',
                            value: 'AND'
                        },
                        blockFields: [
                            {
                                input: 'A',
                                blockType: 'touching_dropdown',
                                field: {
                                    name: 'TYPE',
                                    value: 'o2s'
                                }
                            },
                            {
                                input: 'B',
                                blockType: 'touching_dropdown',
                                field: {
                                    name: 'TYPE',
                                    value: 'dead-matters'
                                }
                            }
                        ]
                    },
                    children: [
                        {
                            blockType: 'consume_touched',
                            fields: {
                                'TYPE': 'o2s'
                            },
                        },
                        {
                            blockType: 'consume_touched',
                            fields: {
                                'TYPE': 'dead-matters'
                            },
                        },
                        {
                            blockType: 'produce',
                            fields: {
                                'TYPE': 'co2s'
                            },
                        },
                        {
                            blockType: 'set_variable',
                            fields: {
                                'VAR': 'energy',
                            },
                            condition:
                            {
                                input: 'VALUE',
                                blockType: 'math_arithmetic',
                                field: {
                                    name: 'OP',
                                    value: 'ADD'
                                },
                                blockFields: [
                                    {
                                        input: 'A',
                                        blockType: 'get_variable',
                                        field: {
                                            name: 'VAR',
                                            value: 'energy'
                                        }
                                    },
                                    {
                                        input: 'B',
                                        blockType: 'math_number',
                                        field: {
                                            name: 'NUM',
                                            value: 100
                                        }
                                    }
                                ]
                            },
                        }
                    ]
                },
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.defineBlocksWithJsonArray([
    // Properties Blocks
    {
        "type":"set_color",
        "message0": "definir cor %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    ["amarelo", "yellow"],
                    ["azul", "blue"],
                    ["branco", "white"],
                    ["ciano", "cyan"],
                    ["cinza", "gray + 1"],
                    ["laranja", "orange"],
                    ["lima", "lime - 1"],
                    ["marron", "brown"],
                    ["preto", "black"],
                    ["verde", "green - 1"],
                    ["vermelho", "red"],
                    ["violeta", "violet"]
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
        "style": "netlogo_property_blocks",
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
                        "zero (0)",
                        "ZERO"
                    ],
                    [
                        "baixa (0.5)",
                        "SLOW"
                    ],
                    [
                        "média (1)",
                        "MEDIUM"
                    ],
                    [
                        "alta (1.5)",
                        "FAST"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    {
        "type": "set_energy",
        "message0": "definir energia %1",
        "args0": [
            {
                'type': 'field_number',
                'name': 'ENERGY',
                'value': 0,
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
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
                        "aletória",
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
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    {
        "type": "set_dead_matter",
        "message0": "tornar-se matéria orgânica",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks"
    },
    // Action Blocks
    {
        "type": "consume_touched",
        "message0": "consumir %1 tocado",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": opTypesConsume
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "erase",
        "message0": "apagar-se",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "hatch",
        "message0": "gerar %1",
        "args0": [
            {
                'type': 'field_number',
                'name': 'NUM',
                'value': 1,
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    {
        "type": "produce",
        "message0": "produzir %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "co2",
                        "co2s"
                    ],
                    [
                        "o2",
                        "o2s"
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
        "type": "forward",
        "message0": "avançar %1",
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
    // Control Blocks
    {
        "type": "ask_each_particle",
        "message0": "pedir %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": opTypesAll
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
        "type": "touching_dropdown",
        "message0": "estiver tocando %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": opTypesConsume
            }
        ],
        "output": "Boolean",
        "style": "netlogo_control_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "with_chance",
        "message0": "com uma chance de %1 % %2 %3",
        "args0": [
            {
                'type': 'field_number',
                'name': 'NUM',
                'value': 0.5,
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "WITH_CHANCE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_control_blocks"
    },
    // Variables BLocks
    // Begin: old code for compatibility
    // Block for comparison operator.
    {
        'type': 'logic_comparison',
        'message0': '%1 %2 %3',
        'args0': [
            {
                'type': 'input_value',
                'name': 'A',
            },
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                    ['=', 'EQ'],
                    ['\u2260', 'NEQ'],
                    ['\u200F<', 'LT'],
                    ['\u200F\u2264', 'LTE'],
                    ['\u200F>', 'GT'],
                    ['\u200F\u2265', 'GTE'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'B',
            },
        ],
        'inputsInline': true,
        'output': 'Boolean',
        'style': 'netlogo_general_blocks',
        'helpUrl': '%{BKY_LOGIC_COMPARE_HELPURL}',
        'extensions': ['logic_compare', 'logic_op_tooltip'],
    },
    // Block for basic arithmetic operator.
    {
        'type': 'math_operations',
        'message0': '%1 %2 %3',
        'args0': [
            {
                'type': 'input_value',
                'name': 'A',
                'check': 'Number',
            },
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                ['%{BKY_MATH_ADDITION_SYMBOL}', 'ADD'],
                ['%{BKY_MATH_SUBTRACTION_SYMBOL}', 'MINUS'],
                ['%{BKY_MATH_MULTIPLICATION_SYMBOL}', 'MULTIPLY'],
                ['%{BKY_MATH_DIVISION_SYMBOL}', 'DIVIDE'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'B',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': 'Number',
        'style': 'netlogo_general_blocks',
        'helpUrl': '%{BKY_MATH_ARITHMETIC_HELPURL}',
        'extensions': ['math_op_tooltip'],
    },
    // Block for numeric value.
    {
        'type': 'get_number',
        'message0': '%1',
        'args0': [
        {
            'type': 'field_number',
            'name': 'NUM',
            'value': 0,
        },
        ],
        'output': 'Number',
        'helpUrl': '%{BKY_MATH_NUMBER_HELPURL}',
        'style': 'netlogo_general_blocks',
        'tooltip': '%{BKY_MATH_NUMBER_TOOLTIP}',
        'extensions': ['parent_tooltip_when_inline'],
    },
    // End: old code for compatibility
    {
        'type': 'get_variable',
        'message0': '%1',
        'args0': [
            {
            'type': 'field_dropdown',
            'name': 'VAR',
            'options': [
                ["cor", "color"],
                ["energia", "energy"],
                ["posição", "position"],
                ["tamanho", "size"],
                ["velocidade", "speed"]
            ]
            },
        ],
        'output': null,
        'style': 'netlogo_variable_blocks',
    },
    {
        'type': 'set_variable',
        'message0': 'definir %1 = %2',
        'args0': [
        {
            'type': 'field_dropdown',
            'name': 'VAR',
            'options': [
                ["energia", "energy"],
                ["posição", "position"]
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
    {
        "type": "change_by",
        "message0": "adicionar %1 a energia",
        "args0": [
            {
                "type": "input_value",
                "name": "CHANGE",
                "check": "Number"
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_variable_blocks",
    },
]);

// GEN BLOCKS
// Setup blocks
netlogoGenerator['set'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'SET');
    const code = 'to blocks-set\n' +
        netlogoGenerator.INDENT + 'setup\n' +
        netlogoGenerator.INDENT + 'set language "pt-br"\n' +
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
    let usedTouching;
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
        usedTouching = conditionCode.includes('nobody');
        branchCode = usedTouching ? (netlogoGenerator.INDENT + 'set flag-near 1\n' + netlogoGenerator.statementToCode(block, 'DO' + n)) : netlogoGenerator.statementToCode(block, 'DO' + n);
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
    code += usedTouching ? 'set flag-near 0\n' : '';

    return code;
};

// Generic unpackable function for netlogoGenerator
const unpackableNetlogoGenerator = function (block) {
    const dataObj = JSON.parse(block.data);
    let parameters;
    let prefix = ''
    let suffix = '';
    if (!dataObj.contextData.CHANGED){
        parameters = getNLCodeFromUnpackBlocks(block.type, dataObj.unpackBlocks, this.workspace)
    }
    else{
        let xmlblock = Blockly.Xml.domToBlock(Blockly.Xml.textToDom(JSON.parse(block.data).contentXml), this.workspace);
        parameters = netlogoGenerator.blockToCode(xmlblock);
        xmlblock.dispose();
    }
    let code = '' + 
        Blockly.JavaScript.prefixLines(prefix, netlogoGenerator.INDENT) + 
        Blockly.JavaScript.prefixLines(parameters, netlogoGenerator.INDENT) + 
        Blockly.JavaScript.prefixLines(suffix, netlogoGenerator.INDENT) + '\n';
    return code;
};

// Properties Blocks
// Create Particles w/ mutation
netlogoGenerator['create_agent'] = function (block) {
    const root = block.getRootBlock().type;
    const dataObj = JSON.parse(block.data);
    const num = block.getFieldValue('PARTICLE_NUM');
    const type = block.getFieldValue('TYPE');
    let parameters;
    let prefix =
        'set heading random 360\n' +
        'set flag-near 0\n';
    let suffix =
        'set initial-energy energy\n' +
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
    let code = 'create-' + type.toLowerCase() + ' ' + num + '\n[\n' + 
        Blockly.JavaScript.prefixLines(prefix, netlogoGenerator.INDENT) + 
        Blockly.JavaScript.prefixLines(parameters, netlogoGenerator.INDENT) + 
        Blockly.JavaScript.prefixLines(suffix, netlogoGenerator.INDENT) + '\n]\n';
    return code;
};

// Set Particle Color
netlogoGenerator['set_color'] = function (block) {
    let color = block.getField('COLOR').selectedOption_[1];
    let code = 'set color ' + color + '\n';
    return code;
};

// Set Particle Size
netlogoGenerator['set_size'] = function (block) {
    let size = netlogoGenerator.SIZE_EUTROPHICATION[block.getField('SIZE').selectedOption_[1]];
    let code = 'set size ' + size + '\n';
    return code;
};

// Set Particle Speed
netlogoGenerator['set_speed'] = function (block) {
    let speed = netlogoGenerator.SPEED_EUTROPHICATION[block.getField('SPEED').selectedOption_[1]];
    let code = 'set speed ' + speed + '\n';
    return code;
};

// Set Particle Energy
netlogoGenerator['set_energy'] = function (block) {
    let energy = block.getFieldValue('ENERGY');
    let code = 'set energy ' + energy + '\n';
    return code;
};

// Set Particle Postion
netlogoGenerator['set_position'] = function (block) {
    let position = netlogoGenerator.POSITION[block.getField('POSITION').selectedOption_[1]];
    let code = 'setxy ' + position + '\n';
    return code;
};

netlogoGenerator['set_dead_matter'] = function () {
    const code =
        'let shape_aux shape\n' +
        'set breed dead-matters\n' +
        'set shape shape_aux\n';
    return code;
};

// Action Blocks
netlogoGenerator['move_unpackable'] = unpackableNetlogoGenerator;

netlogoGenerator['consume_touched'] = function (block) {
    let type = block.getField('TYPE').selectedOption_[1];
    let code = 
        'if flag-near = 1 [\n' +
        `  ask near-${type} [die]\n` +
        ']\n';
    return code;
};

netlogoGenerator['erase'] = function () {
    let code = 'die\n';
    return code;
};

netlogoGenerator['reproduce_unpackable'] = unpackableNetlogoGenerator;

netlogoGenerator['reproduce_unpackable_complete'] = unpackableNetlogoGenerator;

netlogoGenerator['die_unpackable'] = unpackableNetlogoGenerator;

netlogoGenerator['die_unpackable_complete'] = unpackableNetlogoGenerator;

netlogoGenerator['breathe_unpackable'] = unpackableNetlogoGenerator

netlogoGenerator['decompose_unpackable'] = unpackableNetlogoGenerator;

netlogoGenerator['hatch'] = function (block) {
    let value = block.getFieldValue('NUM');
    let code =
        `hatch ${value} [\n` +
        '  rt random-float 360 fd 1\n' +
        '  set energy initial-energy\n' +
        ']\n';
    return code;
};

netlogoGenerator['produce'] = function (block) {
    let type = block.getField('TYPE').selectedOption_[1];
    let color = type === 'o2s' ? 'red' : 'black';
    let code =
        `hatch-${type} 1 [\n` +
        '  set heading random 360\n' +
        `  set color ${color}\n` +
        '  set size 5\n' +
        '  set speed 1\n' +
        '  set label ""\n' +
        '  fd 5\n' +
        ']\n';
    return code;
};

netlogoGenerator['forward'] = function (block) {
    let forward = netlogoGenerator.statementToCode(block, 'FORWARD');
    let code = 'fd ' + forward + '\n';
    return code;
};

// Control Blocks
// Ask Particles
netlogoGenerator['ask_each_particle'] = function (block) {
    const particleName = block.getField('TYPE').value_ || 'ALL';
    const parameter = particleName === 'ALL' ? 'turtles with [breed = algae or breed = fishes or breed = bacteria]' : particleName.toLowerCase();
    const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
    let code = 'ask ' + parameter + '\n' + '[\n' + statement_members + ']\n';
    return code;
};

netlogoGenerator['touching_dropdown'] = function (block) {
    const type = block.getField('TYPE').selectedOption_[1];
    let code = `near-${type} != nobody`;
    return [code, netlogoGenerator.ORDER_NONE];
};

netlogoGenerator['with_chance'] = function (block) {
    const chance = block.getFieldValue('NUM');
    const statement_members = netlogoGenerator.statementToCode(block, 'WITH_CHANCE');
    let code = `if random-float 100 < ${chance}\n [\n ${statement_members} ]\n`;
    return code;
};

// Variables Blocks
// Begin: old code for compatibility
netlogoGenerator['logic_comparison'] = function (block) {
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

netlogoGenerator['math_operations'] = function (block) {
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

netlogoGenerator['get_number'] = function (block) {
    const value = block.getFieldValue('NUM');
    let code = `${value}`;
    return code;
};
// End: old code for compatibility

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

netlogoGenerator['math_number'] = function (block) {
    const value = block.getFieldValue('NUM');
    let code = `${value}`;
    return code;
};

netlogoGenerator['get_variable'] = function (block) {
    const variable = block.getField('VAR').selectedOption_[1];
    let code = variable === 'position' ? '' : variable;
    return code;
};

netlogoGenerator['set_variable'] = function (block) {
    const variable = block.getField('VAR').selectedOption_[1];
    const variable_code = variable === 'position' ? 'fd ' : `set ${variable} `;
    const statement_members = netlogoGenerator.statementToCode(block, 'VALUE');
    let code = `${variable_code} ${statement_members}\n`
    return code;
};

netlogoGenerator['change_by'] = function (block) {
    let change = netlogoGenerator.statementToCode(block, 'CHANGE');
    let code = 'set energy energy + ' + change + '\n';
    return code;
};

netlogoGenerator['text'] = function (block) {
    const value = block.getFieldValue('TEXT');
    const valueMap = {
        "pequeno": netlogoGenerator.SIZE_EUTROPHICATION['SMALL'],
        "médio": netlogoGenerator.SIZE_EUTROPHICATION['MEDIUM'],
        "grande": netlogoGenerator.SIZE_EUTROPHICATION['BIG'],
        "amarelo": "yellow",
        "azul": "blue",
        "branco": "white",
        "ciano": "cyan",
        "cinza": "(gray + 1)",
        "laranja": "orange",
        "lima": "(lime - 1)",
        "marron": "brown",
        "preto": "black",
        "verde": "(green - 1)",
        "vermelho": "red",
        "violeta": "violet"
    }
    let code = '';
    if (value in valueMap) {
        code = `${valueMap[value]}`;
    } else {
        code = `"${value}"`;
    }
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
    traverseBlockFields(blockGroup.condition, block, workspace);
    }
    // recursive step - traverse children and connect to parent.
    // basecase when no children exist
    if (blockGroup.children) {
        traverseBlocks(blockGroup.children, block.inputList[1].connection, workspace)
    }
    }
}

