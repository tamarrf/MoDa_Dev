import Blockly from 'blockly'
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
import { baseBlockLibrary } from "./baseBlocks.js";
export let virus = {};

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

// Option lists
const opTypes = [
    ["healthy", "healthy"],
    ["infected", "infected"],
    ["recovered", "recovered"]
];

let opTypesAll = [...opTypes];
opTypesAll.push(["all", "ALL"]);

virus = {
    "categories": [{
        "kind": "category",
        "name": "Virus",
        "expanded": true,
        "contents": [{
            "kind": "category",
            "name": "Properties",
            "toolboxitemid": "propertiesUnpackable",
            "categorystyle": "particles_category",
            "contents": [
                {
                    "kind": "block",
                    "type": "create_people"
                },
                {
                    "kind": "block",
                    "type": "set_condition"
                },
                {
                    "kind": "block",
                    "type": "set_speed"
                },
                {
                    "kind": "block",
                    "type": "set_color"
                },
                {
                    "kind": "block",
                    "type": "set_position"
                },
                {
                    "kind": "block",
                    "type": "set_heading"
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
                "type": "move_unpackable"
            },
            {
                "kind": "block",
                "type": "get_infected"
            },
            {
                "kind": "block",
                "type": "infect"
            },
            {
                "kind": "block",
                "type": "recover"
            },
            {
                "kind": "block",
                "type": "recover_or_die"
            },
            {
                "kind": "block",
                "type": "pass_away"
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
                "type": "touching_dropdown"
            },
            {
                "kind": "block",
                "type": "with_chance"
            },
            {
                "kind": "block",
                "type": "with_chance_else"
            },
            {
                "kind": "block",
                "type": "for_any"
            }
        ]
        },
        {
            "kind": "category",
            "name": "Variables",
            "colour": "#C7B02C",
            "contents": [
                {
                    "kind": "block",
                    "type": "get_variable"
                },
                {
                    "kind": "block",
                    "type": "set_variable"
                }
            ]
        }]
    }]
}

// Create with Mutation
Blockly.Blocks['create_people'] = {
    init: function () {
        this.jsonInit({
            "message0": "create %1 %2 people %3",
            "args0": [
                {
                    "type": "field_slider",
                    "name": "PARTICLE_NUM",
                    "value": 10,
                    "min": 1,
                    "max": 200
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
                    blockType: 'set_condition',
                    fields: {
                        'CONDITION': this.getFieldValue('TYPE'),
                    }
                },
                {
                    blockType: 'set_speed',
                    fields: {
                        'SPEED': 'MEDIUM',
                    }
                },
                {
                    blockType: 'set_color',
                    fields: {
                        'COLOR': this.getFieldValue('TYPE') === 'healthy' ? 'GREEN' :
                                 this.getFieldValue('TYPE') === 'infected' ? 'RED' :
                                 this.getFieldValue('TYPE') === 'recovered' ? 'BLUE' : 'GREEN',
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
                }
            ],
            'contextData':{
                'CHANGED': false
            },
            'contentXml':'',
        }
        if (this.getFieldValue('TYPE') === 'infected') {
            dataObj.unpackBlocks.push(
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'recovery-time',
                    },
                    condition:
                    {
                        input: 'VALUE',
                        blockType: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 0
                        }
                    }
                }
            )
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
                    blockType: 'set_condition',
                    fields: {
                        'CONDITION': this.getFieldValue('TYPE'),
                    }
                },
                {
                    blockType: 'set_speed',
                    fields: {
                        'SPEED': 'MEDIUM',
                    }
                },
                {
                    blockType: 'set_color',
                    fields: {
                        'COLOR': this.getFieldValue('TYPE') === 'healthy' ? 'green' :
                                 this.getFieldValue('TYPE') === 'infected' ? 'red' :
                                 this.getFieldValue('TYPE') === 'recovered' ? 'blue' : 'green',
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
                }
            ]
        }
        if (this.getFieldValue('TYPE') === 'infected') {
            dataObj.unpackBlocks.push(
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'recovery-time',
                    },
                    condition:
                    {
                        input: 'VALUE',
                        blockType: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 0
                        }
                    }
                }
            )
        }
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.Blocks['move_unpackable'] = {
    init: function () {
        this.jsonInit({
            "message0": "move %1",
            "args0": [
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
                    blockType: 'set_variable',
                    fields: {
                      'VAR': 'position',
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
                                    value: 'position'
                                }
                            },
                            {
                                input: 'B',
                                blockType: 'get_variable',
                                field: {
                                    name: 'VAR',
                                    value: 'speed'
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
                    blockType: 'set_variable',
                    fields: {
                      'VAR': 'position',
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
                                    value: 'position'
                                }
                            },
                            {
                                input: 'B',
                                blockType: 'get_variable',
                                field: {
                                    name: 'VAR',
                                    value: 'speed'
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

Blockly.Blocks['get_infected'] = {
    init: function(){
        this.jsonInit({
            "message0": "get infected %1",
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
            "style": "netlogo_action_blocks"
        });
        let dataObj = {
            'unpackBlocks': [
                {
                    blockType: 'set_condition',
                    fields: {
                        'CONDITION': 'infected'
                    }
                },
                {
                    blockType: 'set_color',
                    fields: {
                        'COLOR': 'red'
                    }
                },
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'recovery-time',
                    },
                    condition:
                    {
                        input: 'VALUE',
                        blockType: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 0
                        }
                    }
                }
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
        const dataObj = JSON.parse(this.data);
        if (this.getInput('EXPANDED_STATEMENT')) {
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
        }
        if (!dataObj.contextData['CHANGED']) {
            dataObj.unpackBlocks = [
                {
                    blockType: 'set_condition',
                    fields: {
                        'CONDITION': 'infected'
                    }
                },
                {
                    blockType: 'set_color',
                    fields: {
                        'COLOR': 'red'
                    }
                },
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'recovery-time',
                    },
                    condition:
                    {
                        input: 'VALUE',
                        blockType: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 0
                        }
                    }
                }
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.Blocks['infect'] = {
    init: function(){
        this.jsonInit({
            "message0": "infect %1",
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
            "style": "netlogo_action_blocks"
        });
        let dataObj = {
            'unpackBlocks': [
                {
                    blockType: 'for_any',
                    children: {
                        field: 'FOR_ANY',
                        blocks: [
                            {
                                blockType: 'with_chance',
                                fields: {},
                                condition:
                                {
                                    input: 'NUM',
                                    blockType: 'get_variable',
                                    field: {
                                        name: 'VAR',
                                        value: 'infectiousness-rate'
                                    }
                                },
                                children: {
                                    field: 'WITH_CHANCE',
                                    blocks: [
                                        {
                                            blockType: 'set_condition',
                                            fields: {
                                                'CONDITION': 'infected'
                                            }
                                        },
                                        {
                                            blockType: 'set_color',
                                            fields: {
                                                'COLOR': 'red'
                                            }
                                        },
                                        {
                                            blockType: 'set_variable',
                                            fields: {
                                                'VAR': 'recovery-time',
                                            },
                                            condition:
                                            {
                                                input: 'VALUE',
                                                blockType: 'math_number',
                                                field: {
                                                    name: 'NUM',
                                                    value: 0
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
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
        const dataObj = JSON.parse(this.data);
        if (this.getInput('EXPANDED_STATEMENT')) {
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
        }
        if (!dataObj.contextData['CHANGED']) {
            dataObj.unpackBlocks = [
                {
                    blockType: 'for_any',
                    children: {
                        field: 'FOR_ANY',
                        blocks: [
                            {
                                blockType: 'with_chance',
                                fields: {},
                                condition:
                                {
                                    input: 'NUM',
                                    blockType: 'get_variable',
                                    field: {
                                        name: 'VAR',
                                        value: 'infectiousness-rate'
                                    }
                                },
                                children: {
                                    field: 'WITH_CHANCE',
                                    blocks: [
                                        {
                                            blockType: 'set_condition',
                                            fields: {
                                                'CONDITION': 'infected'
                                            }
                                        },
                                        {
                                            blockType: 'set_color',
                                            fields: {
                                                'COLOR': 'red'
                                            }
                                        },
                                        {
                                            blockType: 'set_variable',
                                            fields: {
                                                'VAR': 'recovery-time',
                                            },
                                            condition:
                                            {
                                                input: 'VALUE',
                                                blockType: 'math_number',
                                                field: {
                                                    name: 'NUM',
                                                    value: 0
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.Blocks['recover'] = {
    init: function(){
        this.jsonInit({
            "message0": "recover %1",
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
            "style": "netlogo_action_blocks"
        });
        let dataObj = {
            'unpackBlocks': [
                {
                    blockType: 'set_condition',
                    fields: {
                        'CONDITION': 'recovered'
                    }
                },
                {
                    blockType: 'set_color',
                    fields: {
                        'COLOR': 'blue'
                    }
                }
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
        const dataObj = JSON.parse(this.data);
        if (this.getInput('EXPANDED_STATEMENT')) {
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
        }
        if (!dataObj.contextData['CHANGED']) {
            dataObj.unpackBlocks = [
                {
                    blockType: 'set_condition',
                    fields: {
                        'CONDITION': 'recovered'
                    }
                },
                {
                    blockType: 'set_color',
                    fields: {
                        'COLOR': 'blue'
                    }
                }
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.Blocks['recover_or_die'] = {
    init: function(){
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    'type': 'field_input',
                    'name': 'TEXT',
                    'text': 'recover or die',
                },
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "mutator": "general_mutator",
            "style": "netlogo_action_blocks"
        });
        let dataObj = {
            'unpackBlocks': [
                {
                    blockType: 'with_chance_else',
                    fields: {},
                    condition:
                    {
                        input: 'NUM',
                        blockType: 'get_variable',
                        field: {
                            name: 'VAR',
                            value: 'recovery-rate'
                        }
                    },
                    children: {
                        field: 'WITH_CHANCE',
                        blocks: [
                            {
                                blockType: 'set_condition',
                                fields: {
                                    'CONDITION': 'recovered'
                                }
                            },
                            {
                                blockType: 'set_color',
                                fields: {
                                    'COLOR': 'blue'
                                }
                            }
                        ]
                    },
                    children_else: {
                        field: 'ELSE',
                        blocks: [
                            {
                                blockType: 'pass_away',
                                fields: {}
                            }
                        ]
                    },
                }
                
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
        const dataObj = JSON.parse(this.data);
        if (this.getInput('EXPANDED_STATEMENT')) {
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
        }
        if (!dataObj.contextData['CHANGED']) {
            dataObj.unpackBlocks = [
                {
                    blockType: 'with_chance_else',
                    fields: {},
                    condition:
                    {
                        input: 'NUM',
                        blockType: 'get_variable',
                        field: {
                            name: 'VAR',
                            value: 'recovery-rate'
                        }
                    },
                    children: {
                        field: 'WITH_CHANCE',
                        blocks: [
                            {
                                blockType: 'set_condition',
                                fields: {
                                    'CONDITION': 'recovered'
                                }
                            },
                            {
                                blockType: 'set_color',
                                fields: {
                                    'COLOR': 'blue'
                                }
                            }
                        ]
                    },
                    children_else: {
                        field: 'ELSE',
                        blocks: [
                            {
                                blockType: 'pass_away',
                                fields: {}
                            }
                        ]
                    },
                }
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.defineBlocksWithJsonArray([
    // Properties Blocks
    {
        "type": "set_speed",
        "message0": "set speed %1",
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
                        "slow (0.5)",
                        "SLOW"
                    ],
                    [
                        "medium (1)",
                        "MEDIUM"
                    ],
                    [
                        "fast (1.5)",
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
        "type": "set_condition",
        "message0": "set condition %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "CONDITION",
                "options": opTypes
            }
        ],
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
        "type": "set_position",
        "message0": "set position %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "POSITION",
                "options": [
                    [
                        "random",
                        "RANDOM"
                    ],
                    [
                        "center",
                        "CENTER"
                    ],
                    [
                        "vertical line",
                        "VERTICAL"
                    ],
                    [
                        "horizontal line",
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
        "type": "set_heading",
        "message0": "set heading %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "HEADING",
                "options": [
                    [
                        "random",
                        "RANDOM"
                    ],
                    [
                        "up",
                        "UP"
                    ],
                    [
                        "right",
                        "RIGHT"
                    ],
                    [
                        "down",
                        "DOWN"
                    ],
                    [
                        "left",
                        "LEFT"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_property_blocks",
    },
    // Action Blocks
    {
        "type": "pass_away",
        "message0": "pass away",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks"
    },
    // Control Blocks
    {
        "type": "ask_each_particle",
        "message0": "ask %1 people %2 %3",
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
        "message0": "near %1 person",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": opTypes
            }
        ],
        "output": "Boolean",
        "style": "netlogo_control_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "with_chance",
        "message0": "%1 %2 % %3 %4",
        "args0": [
            {
                'type': 'field_input',
                'name': 'TEXT',
                'text': 'with a chance of',
            },
            {
                'type': 'input_value',
                'name': 'NUM',
                'check': 'Number',
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
    {
        "type": "with_chance_else",
        "message0": "%1 %2 % %3 %4",
        "args0": [
            {
                'type': 'field_input',
                'name': 'TEXT',
                'text': 'with a chance of',
            },
            {
                'type': 'input_value',
                'name': 'NUM',
                'check': 'Number',
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "WITH_CHANCE"
            }
        ],
        "message1": "else %1",
        "args1": [
            {
                "type": "input_statement",
                "name": "ELSE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_control_blocks"
    },
    {
        "type": "for_any",
        "message0": "For any healthy person in contact %1 %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "FOR_ANY"
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
                    "recovery-time",
                    "recovery-time" 
                ],
                [
                    "position",
                    "position"
                ],
                [
                    "speed",
                    "speed"
                ],
                [
                    "condition",
                    "condition"
                ],
                [
                    "infectiousness-rate",
                    "infectiousness-rate"
                ],
                [
                    "fatality-rate",
                    "fatality-rate"
                ],
                [
                    "recovery-rate",
                    "recovery-rate"
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
                    "recovery-time",
                    "recovery-time" 
                ],
                [
                    "position",
                    "position"
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
netlogoGenerator['create_people'] = function (block) {
    const root = block.getRootBlock().type;
    const dataObj = JSON.parse(block.data);
    const num = block.getFieldValue('PARTICLE_NUM');
    const type = block.getFieldValue('TYPE')
    let parameters;
    let prefix = type === 'infected' ? 'set size 10\n' : 'set size 10\nset recovery-time 0\n';

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
    let code = 'create-people ' + num + '\n[\n' + Blockly.JavaScript.prefixLines(prefix, netlogoGenerator.INDENT) + Blockly.JavaScript.prefixLines(parameters, netlogoGenerator.INDENT) + Blockly.JavaScript.prefixLines(suffix, netlogoGenerator.INDENT) + '\n]\n';
    return code;
};

netlogoGenerator['set_speed'] = function (block) {
    let speed = netlogoGenerator.SPEED_EUTROPHICATION[block.getField('SPEED').selectedOption_[1]];
    let code = 'set speed ' + speed + '\n';
    return code;
};

netlogoGenerator['set_condition'] = function (block) {
    let type = block.getField('CONDITION').selectedOption_[1];
    let code = 'set condition "' + type + '"\n';
    if (type === 'infected') {
        code = code + 'set new-cases new-cases + 1\n';
    }
    return code;
};

netlogoGenerator['set_color'] = function (block) {
    let color = block.getField('COLOR').selectedOption_[1];
    let code = 'set color ' + color + ' + 2\n';
    return code;
};

netlogoGenerator['set_position'] = function (block) {
    let position = netlogoGenerator.POSITION[block.getField('POSITION').selectedOption_[1]];
    let code = 'setxy ' + position + '\n';
    return code;
};

netlogoGenerator['set_heading'] = function (block) {
    let heading = netlogoGenerator.HEADING[block.getField('HEADING').selectedOption_[1]];
    let code = 'set random-wiggle 40\nset heading ' + heading + '\n';
    return code;
};

// Action Blocks
netlogoGenerator['move_unpackable'] = unpackableNetlogoGenerator;

netlogoGenerator['get_infected'] = unpackableNetlogoGenerator;

netlogoGenerator['infect'] = unpackableNetlogoGenerator;

netlogoGenerator['recover'] = unpackableNetlogoGenerator;

netlogoGenerator['recover_or_die'] = unpackableNetlogoGenerator;

netlogoGenerator['pass_away'] = function () {
    const code =
        'ask patches in-radius contact-radius [ set pcolor white]\n' +
        'set deaths deaths + 1\n' +
        'die\n';
    return code;
};

// Control Blocks
// Ask Particles
netlogoGenerator['ask_each_particle'] = function (block) {
    const particleName = block.getField('TYPE').selectedOption_[1];
    const parameter = particleName === 'ALL' ? '' : ' with [condition = "' + particleName + '"]';
    const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
    let code = 'ask people' + parameter + '\n' + '[\n' + statement_members + ']\n';
    return code;
};

netlogoGenerator['touching_dropdown'] = function (block) {
    const type = block.getField('TYPE').selectedOption_[1];
    let code = `near-${type} != nobody`;
    return [code, netlogoGenerator.ORDER_NONE];
};

netlogoGenerator['with_chance'] = function (block) {
    const chance = netlogoGenerator.statementToCode(block, 'NUM');
    const statement_members = netlogoGenerator.statementToCode(block, 'WITH_CHANCE');
    let code = `if random-float 100 < ${chance}\n [\n ${statement_members} ]\n`;
    return code;
};

netlogoGenerator['with_chance_else'] = function (block) {
    const chance = netlogoGenerator.statementToCode(block, 'NUM');
    const statement_members = netlogoGenerator.statementToCode(block, 'WITH_CHANCE');
    const else_members = netlogoGenerator.statementToCode(block, 'ELSE');
    let code =
        `ifelse random-float 100 < ${chance}\n`+ 
        `  [ ${statement_members} ]\n` +
        `  [ ${else_members} ]\n`;
    return code;
};

netlogoGenerator['for_any'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'FOR_ANY');
    let code = 
        'ask people with [condition = "healthy"] in-radius contact-radius [\n' +
        `  ${statement_members} ]\n`;
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

