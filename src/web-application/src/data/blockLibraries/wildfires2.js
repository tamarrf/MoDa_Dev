import Blockly from 'blockly'
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
export let wildfires2 = {};

wildfires2 = {
  "categories": [
    {
      "kind": "category",
      "name": "Wildfires",
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
          ]
        },
        {
          "kind": "category",
          "name": "Action",
          "categorystyle": "behavior_category",
          "expanded": true,
          "contents": [
            {
              "kind": "block",
              "type": "move forward"
            },
            {
              "kind": "block",
              "type": "come_down"
            },
            {
              "kind": "block",
              "type": "go_up"
            },
            // {
            //   "kind": "block",
            //   "type": "blow"
            // },
            {
              "kind": "block",
              "type": "interact"
            },
            {
              "kind": "block",
              "type": "move"
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
                "type": "controls_when"
            },
            {
                "kind": "block",
                "type": "touching_dropdown"
            },
            {
                "kind": "block",
                "type": "distance_from_fire"
            },
            {
                "kind": "block",
                "type": "particle_mass"
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
                        [
                            "air",
                            "AIR"
                        ],
                        [
                            "heavy smoke",
                            "HEAVY_SMOKE"
                        ],
                        [
                            "light smoke",
                            "LIGHT_SMOKE"
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
                  blockType: 'set_speed',
                  fields: {
                    SPEED: 'VERY_LOW',
                  }
                },
                {
                  blockType: 'set_position',
                  fields: {
                    'POSITION': this.getFieldValue('TYPE') === 'HEAVY_SMOKE' | this.getFieldValue('TYPE') === 'LIGHT_SMOKE' ? 'FIRE_BOTTOM' : 'RANDOM',
                  }
                },
                {
                  blockType: 'set_heading',
                  fields: {
                    'HEADING': this.getFieldValue('TYPE') === 'HEAVY_SMOKE' | this.getFieldValue('TYPE') === 'LIGHT_SMOKE' ? 'UP' : 'RANDOM',
                  }
                },
                {
                  blockType: 'set_mass',
                  fields: {
                    'MASS': this.getFieldValue('TYPE') === 'HEAVY_SMOKE' ? 'HEAVY' : this.getFieldValue('TYPE') === 'LIGHT_SMOKE' ? 'MEDIUM' : 'LIGHT',
                  }
                },
                {
                  blockType: 'set_color',
                  fields: {
                    'COLOR': this.getFieldValue('TYPE') === 'HEAVY_SMOKE' ? 'GRAY - 2' : this.getFieldValue('TYPE') === 'LIGHT_SMOKE' ? 'GRAY + 2' : 'CYAN',
                  }
                },
                {
                  blockType: 'set_size',
                  fields: {
                    'SIZE': this.getFieldValue('TYPE') === 'HEAVY_SMOKE'  ? '3' : (this.getFieldValue('TYPE') === 'LIGHT_SMOKE' ? '2' : '1'),
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
                    SPEED: 'VERY_LOW',
                  }
                },
                {
                  blockType: 'set_position',
                  fields: {
                    'POSITION': this.getFieldValue('TYPE') === 'HEAVY_SMOKE' | this.getFieldValue('TYPE') === 'LIGHT_SMOKE' ? 'FIRE_BOTTOM' : 'RANDOM',
                  }
                },
                {
                  blockType: 'set_heading',
                  fields: {
                    'HEADING': this.getFieldValue('TYPE') === 'HEAVY_SMOKE' | this.getFieldValue('TYPE') === 'LIGHT_SMOKE' ? 'UP' : 'RANDOM',
                  }
                },
                {
                  blockType: 'set_mass',
                  fields: {
                    'MASS': this.getFieldValue('TYPE') === 'HEAVY_SMOKE' ? 'HEAVY' : this.getFieldValue('TYPE') === 'LIGHT_SMOKE' ? 'MEDIUM' : 'LIGHT',
                  }
                },
                {
                  blockType: 'set_color',
                  fields: {
                    'COLOR': this.getFieldValue('TYPE') === 'HEAVY_SMOKE' ? 'GRAY - 2' : this.getFieldValue('TYPE') === 'LIGHT_SMOKE' ? 'GRAY + 2' : 'CYAN',
                  }
                },
                {
                  blockType: 'set_size',
                  fields: {
                    'SIZE': this.getFieldValue('TYPE') === 'HEAVY_SMOKE'  ? '3' : (this.getFieldValue('TYPE') === 'LIGHT_SMOKE' ? '2' : '1'),
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
            "style": "netlogo_action_blocks"
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
            "style": "netlogo_action_blocks"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                  blockType: 'move',
                  fields: {
                    DIRECTION: 'WIND',
                    MAGNITUDE: 'WIND'
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

// Gravity block
Blockly.Blocks['come_down'] = {
    init: function(){
        this.jsonInit({
            "message0": "come down %1",
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
            'unpackBlocks':[
                {
                  blockType: 'move',
                  fields: {
                    DIRECTION: 'DOWNWARD',
                    MAGNITUDE: 'MORE',
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
        this.data = JSON.stringify(dataObj);
    }
};

// Bouyancy block
Blockly.Blocks['go_up'] = {
    init: function(){
        this.jsonInit({
            "message0": "go up %1",
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
            'unpackBlocks':[
                {
                    blockType: 'controls_when',
                    fields: {},
                    condition: {
                        input: 'MOVE_FACTOR',
                        blockType: 'distance_from_fire',
                        field: {
                            name: 'DISTANCE_FROM_FIRE',
                            value: 'CLOSE'
                        }
                    },
                    children: [
                      {
                        blockType: 'move',
                        fields: {
                          DIRECTION: 'UPWARD',
                          MAGNITUDE: 'MORE'
                        }
                      }
                    ]
                },
                {
                    blockType: 'controls_when',
                    fields: {},
                    condition: {
                        input: 'MOVE_FACTOR',
                        blockType: 'particle_mass',
                        field: {
                            name: 'MASS',
                            value: 'LIGHTER'
                        }
                    },
                    children: [
                      {
                        blockType: 'move',
                        fields: {
                          DIRECTION: 'UPWARD',
                          MAGNITUDE: 'LITTLE_MORE'
                        }
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
        this.data = JSON.stringify(dataObj);
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
            "style": "netlogo_action_blocks"
        });
        let dataObj = {
            'unpackBlocks':[
                {
                  blockType: 'move',
                  fields: {
                    DIRECTION: 'FORWARD',
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

Blockly.defineBlocksWithJsonArray([
{
    "type": "set_speed",
    "message0": "set speed %1",
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
                    "very low",
                    "VERY_LOW"
                ],
                [
                    "low",
                    "LOW"
                ],
                [
                    "medium",
                    "MEDIUM"
                ],
                [
                    "high",
                    "HIGH"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "netlogo_property_blocks"
},
{
    "type": "set_type",
    "message0": "set type %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                [
                    "air",
                    "AIR"
                ],
                [
                    "smoke",
                    "SMOKE"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "netlogo_property_blocks"
},
{
    "type":"set_mass",
    "message0": "set mass %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "MASS",
            "options": [
                [
                    "light",
                    "LIGHT"
                ],
                [
                    "medium",
                    "MEDIUM"
                ],
                [
                    "heavy",
                    "HEAVY"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "netlogo_property_blocks",
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
                    [
                        "red",
                        "RED"
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
                        "dark gray",
                        "GRAY - 2"
                    ],
                    [
                        "light gray",
                        "GRAY + 2"
                    ],
                    [
                      "cyan",
                      "CYAN"
                    ],
                    [
                      "white",
                      "WHITE"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "",
        "helpUrl": "",
        "style": "netlogo_property_blocks"
    },
    {
        "type": "set_size",
        "message0": "set size %1",
        "args0": [
            {
                "type": "field_slider",
                "name": "SIZE",
                "value": 2,
                "min": 1,
                "max": 10,
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "",
        "helpUrl": "",
        "style": "netlogo_property_blocks"
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
                ],
                [
                  "at fire",
                  "FIRE_BOTTOM"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "netlogo_property_blocks"
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
        "tooltip": "",
        "helpUrl": "",
        "style": "netlogo_property_blocks"
    },

// Action blocks
{
    "type": "move",
    "message0": "move %1 %2",
    "args0": [
      {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [
              [
                  "forward",
                  "FORWARD"
              ],
            //   [
            //       "upward",
            //       "UPWARD"
            //   ],
            //   [
            //       "rightward",
            //       "RIGHTWARD"
            //   ],
            //   [
            //       "downward",
            //       "DOWNWARD"
            //   ],
            //   [
            //       "leftward",
            //       "LEFTWARD"
            //   ],
              [
                  "in wind direction",
                  "WIND"
              ]
          ]
      },
      {
          "type": "field_dropdown",
          "name": "MAGNITUDE",
          "options": [
              [
                  "the same",
                  "SAME"
              ],
            //   [
            //       "much more",
            //       "MUCH_MORE"
            //   ],
            //   [
            //       "more",
            //       "MORE"
            //   ],
            //   [
            //       "a little more",
            //       "LITTLE_MORE"
            //   ],
              [
                  "at wind speed",
                  "WIND"
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
    "type": "bounce_off",
    "message0": "bounce off",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "netlogo_action_blocks"
},
{
    "type": "erase",
    "message0": "erase particles",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "netlogo_action_blocks"
},
{
    "type": "attach",
    "message0": "attach particles",
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
                    "air particles",
                    "AIR"
                ],
                [
                    "smoke particles",
                    "SMOKE"
                ],
                [
                    "all particles",
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
    "type": "controls_when",
    "message0": "when %1 %2",
    "args0": [
        {
          "type": "input_value",
          "name": "MOVE_FACTOR",
        },
        {
            "type": "input_statement",
            "name": "WHEN_STATEMENTS"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "netlogo_control_blocks"
},
{
    "type": "touching_dropdown",
    "message0": "touching %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                [
                    "any particle",
                    "ANYPARTICLE"
                ],
                [
                    "air particle",
                    "AIRPARTICLE"
                ],
                [
                    "smoke particle",
                    "SMOKEPARTICLE"
                ],
                [
                    "wall",
                    "WALL"
                ]
            ]
        }
    ],
    "output": "Boolean",
    "style": "netlogo_control_blocks",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "distance_from_fire",
    "message0": "%1 fire",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "DISTANCE_FROM_FIRE",
            "options": [
                [
                    "closer to",
                    "CLOSE"
                ],
                [
                    "further from",
                    "FAR"
                ],
            ]
        }
    ],
    "output": "Boolean",
    "style": "netlogo_control_blocks",
},
{
    "type": "particle_mass",
    "message0": "mass is %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "MASS",
            "options": [
                [
                    "lighter",
                    "LIGHTER"
                ],
                [
                    "heavier",
                    "HEAVIER"
                ]
            ]
        }
    ],
    "output": "Boolean",
    "style": "netlogo_control_blocks",
},
    {
        "type": "relationship",
        "message0": "as size goes %1 %2 step size goes %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SIZE",
                "options": [
                    [
                        "up",
                        "UP"
                    ],
                    [
                        "down",
                        "DOWN"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "STEPSIZE",
                "options": [
                    [
                        "up",
                        "UP"
                    ],
                    [
                        "down",
                        "DOWN"
                    ],
                    [
                        "the same",
                        "SAME"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "netlogo_action_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
]);

// GEN BLOCKS
// Setup blocks
netlogoGenerator['set'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'SET');
    const code = 'to blocks-set\n' +
        netlogoGenerator.INDENT + 'setup\n' +
        statement_members +
        netlogoGenerator.INDENT + 'ask particles [\n' +
        netlogoGenerator.INDENT + ']\n' +
        netlogoGenerator.INDENT + 'reset-ticks\n' +
        'end\n';
    return code;
};
netlogoGenerator['go'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'GO');
    const code = 'to blocks-go\n' +
        // netlogoGenerator.INDENT + 'mouse_click\n' +
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

    // return 'to mouse_click\n' + code + 'end\n';
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

// SMOKE PROPAGATION BLOCK DEFINITIONS
// Properties
// Create Particles w/ mutation
netlogoGenerator['create_particles'] = function (block) {
    const root = block.getRootBlock().type;
    const dataObj = JSON.parse(block.data);
    const num = block.getFieldValue('PARTICLE_NUM');
    const type = block.getFieldValue('TYPE') === "AIR" ? "AIR" : "SMOKE"
    const size = (type === "SMOKE" ? 2 : 1)
    let parameters;
    let prefix = 
    'set particle-type "' + type.toLowerCase() + '"\n' +
    'set energy (.5 * mass * speed * speed)\n' + 
    'set mass 3\n' + //setting mass be default, can change by adding block in params
    'set size ' + size + '\n' +
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
    let suffix = ''
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
    let code = 'set random-wiggle 5\nset speed ' + speed + '\n';
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
    let color = block.getField('COLOR').selectedOption_[1]
    let code = 'set color ' + color + '\n';
    return code;
};

// Set Particle Size
netlogoGenerator['set_size'] = function (block) {
    let size = block.getField('SIZE').value_;
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


// Action
// Move
netlogoGenerator['move'] = function (block) {
    let block_direction = block.getField('DIRECTION').selectedOption_[1]
    let block_magnitude = block.getField('MAGNITUDE').selectedOption_[1]
    let direction = netlogoGenerator.DIRECTION[block_direction];
    let magnitude = netlogoGenerator.MAGNITUDE[block_magnitude];
    let code = 'set random-wiggle 2\n'
      + 'move ' + direction + ' ' + magnitude + '\n';
    if (block_magnitude === "WIND") {
      code += 'if (speed > wind-speed) [set speed wind-speed]\n'
    }
    if (block_direction === "FORWARD") {
      code = code + 'particle-forward\n'
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

netlogoGenerator['come_down'] = function (block) {
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

netlogoGenerator['go_up'] = function (block) {
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
        netlogoGenerator.INDENT + 'ask collision-candidate [ set last-collision myself ]\n' +
        netlogoGenerator.INDENT + 'ask collision-candidate [ die ]\n' +
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
        netlogoGenerator.INDENT + 'set last-collision collision-candidate\n' +
        netlogoGenerator.INDENT + 'let heading-candidate heading\n' +
        netlogoGenerator.INDENT + 'ask collision-candidate\n' + 
        netlogoGenerator.INDENT + '[\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set last-collision myself\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set heading heading-candidate\n' + 
        netlogoGenerator.INDENT + ']\n' +
        ']\n[\n' +
        netlogoGenerator.INDENT + 'set speed 0\n' +
        ']\n';
    return code;
};

// Control
// Ask Particles
netlogoGenerator['ask_each_particle'] = function (block) {
    const particleName = block.getField('TYPE').value_ || 'AIR';
    const parameter = particleName === 'ALL' ? '' : ' with [particle-type = "' + particleName.toLowerCase() + '"]';
    const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
    let code = 'ask particles' + parameter + '\n' + '[\n' + statement_members + ']\n';
    return code;
};

// When
netlogoGenerator['controls_when'] = function (block) {
    //const move_factor = block.getField('MOVE_FACTOR') || "1";
    const move_factor = netlogoGenerator.valueToCode(block, 'MOVE_FACTOR',
            netlogoGenerator.ORDER_NONE) || "1"
    let code = 'set move-factor ' + move_factor + '\n'
    const statement_members = netlogoGenerator.statementToCode(block, 'WHEN_STATEMENTS');
    code += statement_members + 
      'set move-factor 1\n';
    return code;
};

// Detect if touching
netlogoGenerator['touching_dropdown'] = function (block) {
    const type = block.getFieldValue('TYPE');
    let code;
    let particleType;
    if(type.includes('PARTICLE')){
        if(type.includes('ANY')){
            particleType = 'any';
        }
        else{
            particleType = block.getField('TYPE').selectedOption_[0].replace(' particle', '');
        }
        const particleCondition = particleType != 'any' ? ' and ([particle-type] of collision-candidate = "' + particleType + '")' : ''
        code = '(count collision-enemies > 0) and (collision-candidate != nobody) and (speed > 0 or [speed] of collision-candidate > 0)' + particleCondition
    }
    else{
        code = 'abs [pxcor] of patch-ahead 1 >= max-pxcor - 4 or abs [pycor] of patch-ahead 1 >= max-pycor - 4'
    }
    return [code, netlogoGenerator.ORDER_NONE];
};

// Check distance from fire
netlogoGenerator['distance_from_fire'] = function (block) {
    switch (block.getFieldValue('DISTANCE_FROM_FIRE')) {
        case 'CLOSE':
            return ['1 - distance-from-fire', netlogoGenerator.ORDER_NONE];
        case 'FAR':
            return ['distance-from-fire', netlogoGenerator.ORDER_NONE];
    }
};

// Check particle mass
netlogoGenerator['particle_mass'] = function (block) {
    switch (block.getFieldValue('MASS')) {
        case 'LIGHTER':
            return ['1 - mass-factor', netlogoGenerator.ORDER_NONE];
        case 'HEAVIER':
            return ['mass-factor', netlogoGenerator.ORDER_NONE];
    }
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

