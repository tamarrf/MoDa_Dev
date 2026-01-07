import Blockly from 'blockly'
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
import { baseBlockLibrary } from "./baseBlocks.js";
export let pollutants = {};

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
                "type": "math_arithmetic"
            }
        ]
    }]
}

pollutants = {
  "categories": [
    {
      "kind": "category",
      "name": "Pollutants",
      "expanded": true,
      "contents": [
        {
          "kind": "category",
          "name": "Properties",
          "toolboxitemid": "propertiesUnpackable",
          "categorystyle": "particles_category",
          "contents": [
            {
              "kind": "block",
              "type": "create_particles"
            },
            {
              "kind": "block",
              "type": "set_speed"
            },
            {
              "kind": "block",
              "type": "set_speed_number"
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
              "type": "set_position"
            },
            {
              "kind": "block",
              "type": "set_heading"
            },
            {
              "kind": "block",
              "type": "set_shape"
            },
            {
              "kind": "block",
              "type": "set_size"
            },
            {
              "kind": "block",
              "type": "set_tick_delta"
            }
          ]
        },
        {
          "kind": "category",
          "name": "Action",
          "categorystyle": "behavior_category",
          "expanded": true,
          "contents": [
            // {
            //   "kind": "block",
            //   "type": "move forward"
            // },
            {
                "kind": "block",
                "type": "move"
              },
            {
              "kind": "block",
              "type": "blow"
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
              "type": "attach"
            },
            {
                "kind": "block",
                "type": "erase"
            },
            {
                "kind": "block",
                "type": "turn_into"
            }
          ]
        },
        {
          "kind": "category",
          "name": "Control",
          "categorystyle": "control_category",
          "expanded": true,
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
                "blockxml": "<block type=\"with_chance\"><value name=\"VALUE\"><shadow type=\"math_number\"/></value></block>",
                "type": "with_chance"
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
        }
      ]
    }
  ]
}

Blockly.Blocks['create_particles'] = {
    init: function () {
        this.jsonInit({
            "message0": "create  %1 %2 particles %3",
            "args0": [
                {
                    "type": "field_slider",
                    "name": "PARTICLE_NUM",
                    "value": 1000,
                    "min": 0,
                    "max": 2000
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ["air", "AIR"],
                        ["PM", "PM"],
                        ["NOx", "NOx"],
                        ["ozone", "ozone"],
                        ["CO", "CO"]
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
                    SPEED: 'VERY_LOW',
                  }
                },
                {
                  blockType: 'set_position',
                  fields: {
                    'POSITION': this.getFieldValue('TYPE') === 'AIR' ? 'RANDOM' : 'CENTER',
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
                    'COLOR': this.getFieldValue('TYPE') === 'PM' ? 'gray' :
                             this.getFieldValue('TYPE') === 'NOx' ? 'gray' :
                             this.getFieldValue('TYPE') === 'ozone' ? 'gray' :
                             this.getFieldValue('TYPE') === 'CO' ? 'gray' : 'cyan',
                  }
                },
                {
                  blockType: 'set_shape',
                  fields: {
                    'SHAPE': 'circle',
                  }
                },
                {
                    blockType: 'set_size',
                    fields: {
                        'SIZE': 1,
                    }
                },
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'age',
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
        if(this.getInput('EXPANDED_STATEMENT')){
            // add blocks to XML
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
        // update fields to match type if type is the thing that changed
        if (!dataObj.contextData['CHANGED']) {
            dataObj.unpackBlocks = [
                {
                  blockType: 'set_speed',
                  fields: {
                    SPEED: 'VERY_LOW',
                  }
                },
                {
                  blockType: 'set_position',
                  fields: {
                    'POSITION': this.getFieldValue('TYPE') === 'AIR' ? 'RANDOM' : 'CENTER',
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
                    'COLOR': this.getFieldValue('TYPE') === 'PM' ? 'gray' :
                             this.getFieldValue('TYPE') === 'NOx' ? 'gray' :
                             this.getFieldValue('TYPE') === 'ozone' ? 'gray' :
                             this.getFieldValue('TYPE') === 'CO' ? 'gray' : 'cyan',
                  }
                },
                {
                  blockType: 'set_shape',
                  fields: {
                    'SHAPE': 'circle',
                  }
                },
                {
                    blockType: 'set_size',
                    fields: {
                        'SIZE': 1,
                    }
                },
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'age',
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

Blockly.Blocks['turn_into'] = {
    init: function () {
        this.jsonInit({
            "message0": "turn into  %1 %2",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ["air", "AIR"],
                        ["PM", "PM"],
                        ["NOx", "NOx"],
                        ["ozone", "ozone"],
                        ["CO", "CO"]
                    ]
                },
                {
                    "type": "input_dummy",
                    "name": "EMPTY"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "behavior_border",
            "mutator": "general_mutator"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                  blockType: 'set_type',
                  fields: {
                    'TYPE': this.getFieldValue('TYPE')
                  }
                },
                {
                  blockType: 'set_color',
                  fields: {
                    'COLOR': this.getFieldValue('TYPE') === 'PM' ? 'gray' :
                             this.getFieldValue('TYPE') === 'NOx' ? 'gray' :
                             this.getFieldValue('TYPE') === 'ozone' ? 'gray' :
                             this.getFieldValue('TYPE') === 'CO' ? 'gray' : 'cyan',
                  }
                },
                {
                  blockType: 'set_shape',
                  fields: {
                    'SHAPE': 'circle',
                  }
                },
                {
                    blockType: 'set_size',
                    fields: {
                        'SIZE': 1,
                    }
                },
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'age',
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
        if(this.getInput('EXPANDED_STATEMENT')){
            // add blocks to XML
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
        // update fields to match type if type is the thing that changed
        if (!dataObj.contextData['CHANGED']) {
            dataObj.unpackBlocks = [
                {
                  blockType: 'set_type',
                  fields: {
                    'TYPE': this.getFieldValue('TYPE')
                  }
                },
                {
                  blockType: 'set_color',
                  fields: {
                    'COLOR': this.getFieldValue('TYPE') === 'PM' ? 'gray' :
                             this.getFieldValue('TYPE') === 'NOx' ? 'gray' :
                             this.getFieldValue('TYPE') === 'ozone' ? 'gray' :
                             this.getFieldValue('TYPE') === 'CO' ? 'gray' : 'cyan',
                  }
                },
                {
                  blockType: 'set_shape',
                  fields: {
                    'SHAPE': 'circle',
                  }
                },
                {
                    blockType: 'set_size',
                    fields: {
                        'SIZE': 1,
                    }
                },
                {
                    blockType: 'set_variable',
                    fields: {
                        'VAR': 'age',
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

// Collision with mutation
Blockly.Blocks['interact'] = {
    init: function(){
        this.jsonInit({
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
                            value: 'ANY'
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
            this.data = JSON.stringify(dataObj);
        }
    }
};

// move block
Blockly.Blocks['move forward'] = {
    init: function(){
        this.jsonInit({
            "message0": "move %1",
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
            'unpackBlocks':[
                {
                  blockType: 'move',
                  fields: {
                    DIRECTION: 'upward',
                    MAGNITUDE: 'SAME'
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
        this.data = JSON.stringify(dataObj);
    }
};

// wind block
Blockly.Blocks['blow'] = {
    init: function(){
        this.jsonInit({
            "message0": "blow %1",
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
            'unpackBlocks':[
                {
                  blockType: 'set_heading',
                  fields: {
                    HEADING: 'WIND_DIRECTION'
                  }
                },
                {
                    blockType: 'set_speed',
                    fields: {
                      SPEED: 'WIND_SPEED'
                    }
                },
                {
                    blockType: 'move',
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
        this.data = JSON.stringify(dataObj);
    }
};

Blockly.defineBlocksWithJsonArray([
{
    "type": "set_speed",
    "message0": "set speed %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "SPEED",
            "options": [
                ["zero", "ZERO"],
                ["very low", "VERY_LOW"],
                ["low", "LOW"],
                ["medium", "MEDIUM"],
                ["high", "HIGH"],
                ["wind speed", "WIND_SPEED"]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border"
},
{
    "type": "set_speed_number",
    "message0": "set speed %1",
    "args0": [
        {
            'type': 'field_number',
            'name': 'SPEED_NUMBER',
            'value': 1,
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border"
},
{
    "type": "set_type",
    "message0": "set type %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                ["air", "AIR"],
                ["PM", "PM"],
                ["NOx", "NOx"],
                ["ozone", "ozone"],
                ["CO", "CO"]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border"
},
{
    "type":"set_mass",
    "message0": "set mass %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "MASS",
            "options": [
                ["light", "LIGHT"],
                ["medium", "MEDIUM"],
                ["heavy", "HEAVY"]
            ]
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border",
    "tooltip": "pick a value between 0 and 5",
},
    {
        "type": "set_color",
        "message0": "set color %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    ["black", "black"],
                    ["blue", "blue"],
                    ["brown", "brown"],
                    ["cyan", "cyan"],
                    ["gray", "gray"],
                    ["green", "green"],
                    ["lime", "lime"],
                    ["orange", "orange"],
                    ["red", "red"],
                    ["violet", "violet"],
                    ["white", "white"],
                    ["yellow", "yellow"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "",
        "helpUrl": "",
        "style": "particle_border"
    },
    // {
    //     "type": "set_size",
    //     "message0": "set size %1",
    //     "args0": [
    //         {
    //             "type": "field_slider",
    //             "name": "SIZE",
    //             "value": 2,
    //             "min": 1,
    //             "max": 10,
    //         },
    //     ],
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "tooltip": "",
    //     "helpUrl": "",
    //     "style": "particle_border"
    // },
{
    "type": "set_position",
    "message0": "set position %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "POSITION",
            "options": [
                ["random", "RANDOM"],
                ["center", "CENTER"],
                ["vertical line", "VERTICAL"],
                ["horizontal line", "HORIZONTAL"]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border"
},
{
    "type": "set_heading",
    "message0": "set heading %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "HEADING",
            "options": [
                ["random", "RANDOM"],
                ["up", "UP"],
                ["right", "RIGHT"],
                ["down", "DOWN"],
                ["left", "LEFT"],
                ["wind direction", "WIND_DIRECTION"]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "",
    "style": "particle_border"
},
{
    "type": "set_shape",
    "message0": "set shape %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "SHAPE",
            "options": [
                ["circle", "circle"],
                ["pentagon", "pentagon"],
                ["square", "square"],
                ["star", "star"],
                ["triangle", "triangle"]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "",
    "style": "particle_border"
},
{
    "type": "set_size",
    "message0": "set size %1",
    "args0": [
        {
            'type': 'field_number',
            'name': 'SIZE',
            'value': 1,
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border"
},
{
    "type": "set_tick_delta",
    "message0": "set tick-delta %1",
    "args0": [
        {
            'type': 'field_number',
            'name': 'TICK_DELTA',
            'value': 0.1,
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border"
},

// Action blocks
{
    "type": "move",
    "message0": "move",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
},
{
    "type": "bounce_off",
    "message0": "bounce off",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
},
{
    "type": "erase",
    "message0": "erase",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
},
{
    "type": "attach",
    "message0": "attach",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
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
                ["air", "AIR"],
                ["PM", "PM"],
                ["NOx", "NOx"],
                ["ozone", "ozone"],
                ["CO", "CO"],
                ["all", "ALL"]
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
    "type": "touching_dropdown",
    "message0": "touching %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                ["any particle", "ANY"],
                ["air", "AIR"],
                ["PM", "PM"],
                ["NOx", "NOx"],
                ["ozone", "ozone"],
                ["CO", "CO"],
                ["wall", "WALL"]
            ]
        }
    ],
    "output": "Boolean",
    "style": "control_blocks",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "with_chance",
    "message0": "with a chance of %1 % %2 %3",
    "args0": [
        {
            'type': 'input_value',
            'name': 'VALUE'
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
    "type": "relationship",
    "message0": "as size goes %1 %2 step size goes %3",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "SIZE",
            "options": [
                ["up", "UP"],
                ["down", "DOWN"]
            ]
        },
        {
            "type": "input_dummy"
        },
        {
            "type": "field_dropdown",
            "name": "STEPSIZE",
            "options": [
                ["up", "UP"],
                ["down", "DOWN"],
                ["the same", "SAME"]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "smoke_action_unpacked_blocks",
    "tooltip": "",
    "helpUrl": ""
},
{
    'type': 'get_variable',
    'message0': '%1',
    'args0': [
        {
        'type': 'field_dropdown',
        'name': 'VAR',
        'options': [
            ["age", "age"],
            ["light-intensity", "light-intensity" ]
        ]
        },
    ],
    'output': null,
    'style': 'netlogo_variable_blocks',
},
{
    'type': 'set_variable',
    'message0': 'set %1 = %2',
    'args0': [
    {
        'type': 'field_dropdown',
        'name': 'VAR',
        'options': [
            ["age", "age"]
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
        usedTouching = conditionCode.includes('(count collision-enemies > 0) and (collision-candidate != nobody) and (speed > 0 or [speed] of collision-candidate > 0)');
        branchCode = usedTouching ? (netlogoGenerator.INDENT + 'set collision-flag 1\n' + netlogoGenerator.statementToCode(block, 'DO' + n)) : (netlogoGenerator.INDENT + 'set collision-flag 0\n') + netlogoGenerator.statementToCode(block, 'DO' + n);
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
    usedTouching ? code += 'set collision-flag 0\n' : code +='';

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

netlogoGenerator['turn_into'] = unpackableNetlogoGenerator;

// SMOKE PROPAGATION BLOCK DEFINITIONS
// Properties
// Create Particles w/ mutation
netlogoGenerator['create_particles'] = function (block) {
    const root = block.getRootBlock().type;
    const dataObj = JSON.parse(block.data);
    const num = block.getFieldValue('PARTICLE_NUM');
    const type = block.getField('TYPE').selectedOption_[0];
    const size = (type === "SMOKE" ? 2 : 1)
    let parameters;
    let prefix = 
    'set particle-type "' + type + '"\n' +
    'set energy (.5 * mass * speed * speed)\n' + 
    'set mass 3\n' + //setting mass be default, can change by adding block in params
    'set size ' + size + '\n' + //setting size be default, can change by adding block in params
    'set first-time 1\n' +
    'set last-collision nobody\n' +
    'set collision-flag 0\n' +
    'set collision-hatching 0\n' +
    ';; setting collision candidates in case particles created before interact in go\n' +
    'set collision-where patches in-radius (size / 2)\n' +
    'set collision-enemies other particles-on collision-where\n' +
    'if count collision-enemies > 0 ;; modified to be realistic, was = 1\n' +
    '[\n' +
    '  set collision-candidate one-of collision-enemies with [myself != last-collision]; and who < [who] of myself and ]\n' +
    ']\n'
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

// Set Particle Speed
netlogoGenerator['set_speed'] = function (block) {
    let speed = netlogoGenerator.SPEED[block.getField('SPEED').selectedOption_[1]];
    let code = 'set random-wiggle 0\nset speed ' + speed + '\n';
    return code;
};

// Set Particle Type
netlogoGenerator['set_type'] = function (block) {
    let type = block.getField('TYPE').selectedOption_[0];
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
    let color = block.getField('COLOR').selectedOption_[0]
    let code = 'set color ' + color + '\n';
    return code;
};

// Set Particle Size
// netlogoGenerator['set_size'] = function (block) {
//     let size = block.getField('SIZE').value_;
//     let code = 'set size ' + size + '\n';
//     return code;
// };

// Set Particle Postion
netlogoGenerator['set_position'] = function (block) {
    const position = netlogoGenerator.POSITION_WILDFIRES[block.getField('POSITION').selectedOption_[1]];
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

netlogoGenerator['set_shape'] = function (block) {
    let shape = block.getField('SHAPE').selectedOption_[0];
    let code = 'set shape "' + shape + '"\n';
    return code;
};

netlogoGenerator['set_size'] = function (block) {
    let size = block.getFieldValue('SIZE');
    let code = 'set size ' + size + '\n';
    return code;
};

netlogoGenerator['set_speed_number'] = function (block) {
    let speed_number = block.getFieldValue('SPEED_NUMBER');
    let code = 'set speed ' + speed_number + '\n';
    return code;
};

netlogoGenerator['set_tick_delta'] = function (block) {
    let tick_delta = block.getFieldValue('TICK_DELTA');
    let code = 'set tick-delta ' + tick_delta + '\n';
    return code;
};

// Action
// Move
// netlogoGenerator['move'] = function (block) {
//     let block_direction = block.getField('DIRECTION').selectedOption_[1]
//     let block_magnitude = block.getField('MAGNITUDE').selectedOption_[1]
//     let direction = netlogoGenerator.DIRECTION[block_direction];
//     let magnitude = netlogoGenerator.MAGNITUDE[block_magnitude];
//     let code = 'set random-wiggle 2\n'
//       + 'move ' + direction + ' ' + magnitude + '\n';
//     if (block_magnitude === "WIND") {
//       code += 'if (speed > wind-speed) [set speed wind-speed]\n'
//     }
//     if (block_direction === "FORWARD") {
//       code = code + 'particle-forward\n'
//     }
//     return code;
// };
netlogoGenerator['move'] = function () {
    let code = 'particle-forward\n'
    return code;
};

// Apply wind
netlogoGenerator['blow'] = function (block) {
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

netlogoGenerator['move forward'] = function (block) {
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

// Interact
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

// Bounce Off
netlogoGenerator['bounce_off'] = function () {
    let code = 
    'ifelse collision-flag = 1\n[\n' + 
    netlogoGenerator.INDENT + 'collide-with collision-candidate\n'+
    netlogoGenerator.INDENT +'set last-collision collision-candidate\n'+
    netlogoGenerator.INDENT + 'ask collision-candidate [ set last-collision myself ]\n]\n[\n' +
    netlogoGenerator.INDENT + 'if abs[pxcor] of patch-ahead 1 >= max-pxcor - 4\n' +
    netlogoGenerator.INDENT + '[ set heading (- heading) ]\n' + 
    netlogoGenerator.INDENT + 'if abs [pycor] of patch-ahead 1 >= max-pycor - 4\n' + 
    netlogoGenerator.INDENT + '[ set heading(180 - heading) ]\n]\n';
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
        ']\n[\n' +
        netlogoGenerator.INDENT + 'set speed 0\n' +
        ']\n';
    return code;
};

// Control
// Ask Particles
netlogoGenerator['ask_each_particle'] = function (block) {
    const particleName = block.getField('TYPE').selectedOption_[0] || 'air';
    const parameter = particleName === 'all' ? '' : ' with [particle-type = "' + particleName + '"]';
    const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
    let code = 'ask particles' + parameter + '\n' + '[\n' + statement_members + ']\n';
    return code;
};

// Detect if touching
netlogoGenerator['touching_dropdown'] = function (block) {
    const particleType = block.getField('TYPE').selectedOption_[0];
    let code;
    if(particleType !== 'wall' ){
        const particleCondition = particleType != 'any particle' ? ' and ([particle-type] of collision-candidate = "' + particleType + '")' : ''
        code = '(count collision-enemies > 0) and (collision-candidate != nobody) and (speed > 0 or [speed] of collision-candidate > 0)' + particleCondition
    }
    else{
        code = 'abs [pxcor] of patch-ahead 1 >= max-pxcor - 4 or abs [pycor] of patch-ahead 1 >= max-pycor - 4'
    }
    return [code, netlogoGenerator.ORDER_NONE];
};

netlogoGenerator['with_chance'] = function (block) {
    const chance = netlogoGenerator.statementToCode(block, 'VALUE');
    const statement_members = netlogoGenerator.statementToCode(block, 'WITH_CHANCE');
    let code = `if random-float 100 < ${chance}\n [\n ${statement_members} ]\n`;
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

