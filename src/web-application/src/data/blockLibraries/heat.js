import Blockly from 'blockly'
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
export let heat = {};

heat = {
  "categories": [
    {
      "kind": "category",
      "name": "Heat",
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
            // {
            //   "kind": "block",
            //   "type": "create_electrons_old"
            // },
            {
               "kind": "block",
               "type": "create_electrons"
            },
            // {
            //   "kind": "block",
            //   "type": "set_speed"
            // },
            {
              "kind": "block",
              "type": "set_type"
            },
            {
              "kind": "block",
              "type": "set_links"
            },
            {
              "kind": "block",
              "type": "set_size"
            },
            {
               "kind": "block",
              "type": "set_arrangement"
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
            // {
            //   "kind": "block",
            //   "type": "move forward"
            // },
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
              "type": "transfer_energy"
            },
            {
              "kind": "block",
              "type": "vibrate"
            },
            {
              "kind": "block",
              "type": "wiggle"
            },
            {
              "kind": "block",
              "type": "travel"
            },
            {
            "kind": "block",
            "type": "transfer_heat"
            },
            // {
            //   "kind": "block",
            //   "type": "move"
            // },
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
                "type": "is_linked"
            },
          ]
        }
      ]
    }
  ]
}

Blockly.Blocks['create_particles'] = {
    init: function () {
        this.jsonInit({
            "message0": "create  %1 particles %2",
            "args0": [
                // {
                //     "type": "field_slider",
                //     "name": "PARTICLE_NUM",
                //     "value": 1000,
                //     "min": 0,
                //     "max": 2000
                // },
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        [
                            "copper",
                            "COPPER"
                        ],
                        [
                            "wood",
                            "WOOD"
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
                // {
                //   blockType: 'set_speed',
                //   fields: {
                //     SPEED: 'VERY_LOW',
                //   }
                // },
                // {
                //   blockType: 'set_position',
                //   fields: {
                //     'POSITION': this.getFieldValue('TYPE') === 'SMOKE' ? 'CENTER' : 'RANDOM',
                //   }
                // },
                // {
                //   blockType: 'set_heading',
                //   fields: {
                //     'HEADING': 'RANDOM',
                //   }
                // },
                // {
                //   blockType: 'set_mass',
                //   fields: {
                //     'MASS': 'UNIFORM',
                //   }
                // },
                 {
                  blockType: 'set_arrangement',
                  fields: {
                    'ARRANGEMENT': this.getFieldValue('TYPE') === 'COPPER' ? 'UNIFORM' : 'MESSY',
                  }
                },
                // {
                //   blockType: 'set_color',
                //   fields: {
                //     'COLOR': this.getFieldValue('TYPE') === 'COPPER' ? 'WHITE' : 'WHITE',
                //   }
                // },
                {
                    blockType: 'set_links',
                    fields: {
                      'LINKS': 'ON',
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
                // {
                //   blockType: 'set_speed',
                //   fields: {
                //     SPEED: 'VERY_LOW',
                //   }
                // },
                // {
                //   blockType: 'set_position',
                //   fields: {
                //     'TRAVELPOSITION': this.getFieldValue('TYPE') === 'SMOKE' ? 'CENTER' : 'RANDOM',
                //   }
                // },
                // {
                //   blockType: 'set_heading',
                //   fields: {
                //     'HEADING': 'RANDOM',
                //   }
                // },
                // {
                //   blockType: 'set_mass',
                //   fields: {
                //     'MASS': 'UNIFORM',
                //   }
                // },
                 {
                  blockType: 'set_arrangement',
                  fields: {
                    'ARRANGEMENT': this.getFieldValue('TYPE') === 'COPPER' ? 'UNIFORM' : 'MESSY',
                  }
                },
                // {
                //   blockType: 'set_color',
                //   fields: {
                //     'COLOR': this.getFieldValue('TYPE') === 'COPPER' ? 'WHITE' : 'WHITE',
                //   }
                // },
                {
                    blockType: 'set_links',
                    fields: {
                      'LINKS': 'ON',
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



Blockly.Blocks['create_electrons'] = {
    init: function () {
        this.jsonInit({
            "message0": "create  %1 electrons %2",
            "args0": [
                {
                    "type": "field_slider",
                    "name": "PARTICLE_NUM",
                    "value": 50,
                    "min": 1,
                    "max": 100
                },
                // {
                //     "type": "field_dropdown",
                //     "name": "TYPE",
                //     "options": [
                //         [
                //             "copper",
                //             "COPPER"
                //         ],
                //         [
                //             "wood",
                //             "WOOD"
                //         ]
                //     ]
                // },
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
                // {
                //   blockType: 'set_speed',
                //   fields: {
                //     SPEED: 'VERY_LOW',
                //   }
                // },
                {
                  blockType: 'set_position',
                  fields: {
                    'POSITION': 'RANDOM_HEAT',
                  }
                },
                {
                  blockType: 'set_heading',
                  fields: {
                    'HEADING': 'RANDOM',
                  }
                },
                // {
                //   blockType: 'set_mass',
                //   fields: {
                //     'MASS': 'UNIFORM',
                //   }
                // },
                //  {
                //   blockType: 'set_arrangement',
                //   fields: {
                //     'ARRANGEMENT': this.getFieldValue('TYPE') === 'COPPER' ? 'UNIFORM' : 'MESSY',
                //   }
                // },
                {
                  blockType: 'set_color',
                  fields: {
                    'COLOR': 'YELLOW',
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
                  // {
                //   blockType: 'set_speed',
                //   fields: {
                //     SPEED: 'VERY_LOW',
                //   }
                // },
                {
                  blockType: 'set_position',
                  fields: {
                    'POSITION': 'RANDOM_HEAT',
                  }
                },
                {
                  blockType: 'set_heading',
                  fields: {
                    'HEADING': 'RANDOM',
                  }
                },
                // {
                //   blockType: 'set_mass',
                //   fields: {
                //     'MASS': 'UNIFORM',
                //   }
                // },
                //  {
                //   blockType: 'set_arrangement',
                //   fields: {
                //     'ARRANGEMENT': this.getFieldValue('TYPE') === 'COPPER' ? 'UNIFORM' : 'MESSY',
                //   }
                // },
                {
                  blockType: 'set_color',
                  fields: {
                    'COLOR': 'YELLOW',
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

// Collision with mutation
Blockly.Blocks['transfer_energy'] = {
    init: function(){
        this.jsonInit({
            "message0": "transfer energy %1",
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
                        blockType: 'transfer_heat',
                        fields: {}
                      }
                    ]
                },
                {
                    blockType: 'controls_if',
                    fields: {},
                    condition: {
                        input: 'IF0',
                        blockType: 'is_linked',
                    },
                    children: [
                      {
                        blockType: 'transfer_heat',
                        fields: {}
                      }
                    ]
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

Blockly.Blocks['vibrate'] = {
    init: function(){
        this.jsonInit({
            "message0": "vibrate %1",
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
                  blockType: 'wiggle',
                },
                {
                  blockType: 'transfer_energy',
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
                    "copper",
                    "COPPER"
                ],
                [
                    "wood",
                    "WOOD"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "netlogo_property_blocks"
},
// {
//     "type": "create_electrons_old",
//     "message0": "create electrons",
//     "inputsInline": true,
//     "previousStatement": null,
//     "nextStatement": null,
//     "style": "netlogo_property_blocks"
// },
// {
//     "type":"set_mass",
//     "message0": "set mass %1",
//     "args0": [
//         {
//             "type": "field_dropdown",
//             "name": "MASS",
//             "options": [
//                 [
//                     "uniform",
//                     "UNIFORM"
//                 ],
//                 [
//                     "messy",
//                     "MESSY"
//                 ]
//             ]
//         }
//     ],
//     "inputsInline": true,
//     "previousStatement": null,
//     "nextStatement": null,
//     "style": "netlogo_property_blocks",
//     "tooltip": "pick a value between 0 and 5",
// },
{
    "type":"set_arrangement",
    "message0": "set arrangement %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "ARRANGEMENT",
            "options": [
                [
                    "uniform",
                    "UNIFORM"
                ],
                [
                    "messy",
                    "MESSY"
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
                        "yellow",
                        "YELLOW"
                    ],
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
                        "gray",
                        "GRAY"
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
        "type": "set_links",
        "message0": "set links %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LINKS",
                "options": [
                    [
                        "on",
                        "ON"
                    ],
                    [
                        "off",
                        "OFF"
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
                    "RANDOM_HEAT"
                ],
                [
                    "center",
                    "CENTER_HEAT"
                ],
                [
                    "vertical line",
                    "VERTICAL_HEAT"
                ],
                [
                    "horizontal line",
                    "HORIZONTAL_HEAT"
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
    "type": "wiggle",
    "message0": "wiggle",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "netlogo_action_blocks"
},
{
    "type": "travel",
    "message0": "move",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "netlogo_action_blocks"
},
{
    "type": "transfer_heat",
    "message0": "transfer heat",
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
                    "particles",
                    "PARTICLES"
                ],
                [
                    "electrons",
                    "ELECTRONS"
                ],
                [
                    "all agents",
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
    "type": "touching_dropdown",
    "message0": "touching %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                [
                    "any",
                    "ANY"
                ],
                [
                    "particles",
                    "PARTICLES"
                ],
                [
                    "electrons",
                    "ELECTRONS"
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
    "type": "is_linked",
    "message0": "is linked to particles %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                [
                    "any",
                    "ANY"
                ],
                [
                    "particles",
                    "PARTICLES"
                ],
                [
                    "electrons",
                    "ELECTRONS"
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
       // netlogoGenerator.INDENT + 'ask particles [color-agent]\n' +
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
        usedTouching = conditionCode.includes('(collision-candidate != nobody and collision-candidate != last-collision and distance collision-candidate <= size)');
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
    // const num = block.getFieldValue('PARTICLE_NUM');
    const type = block.getFieldValue('TYPE');
    // const size = (type === "COPPER" ? 2.0 : 2.0)
    const size = 0.7;
    let parameters;
    let prefix = 

    'let particlesX 0 \n' +
    'let particlesY 0 \n' + 
    // 'let bottomCor -15 \n' +
    'while [particlesY < 11][ \n' +
    '  while [particlesX < 11][ \n' +
    '    create-particles 1[ \n' +
    '      set particle-type "' + type.toLowerCase() + '"\n' +
    '      set size ' + size + '\n'  +
    '      set shape "circle" \n'   +
    '      set color white \n'   +
    '      set turtle-moved 0\n'+
    '      set temperature room-temp \n'   +
    '      ;; save old value \n' +
    '      set old-temperature temperature \n' +
    '      set heading random 360   \n'   +  
    '      setxy (particlesX - 5) (particlesY - 5)\n'     
    
    let suffix = 
    '    ] \n' +
    '    set particlesX particlesX + 1 \n' +
    '  ] \n' +
    '  set particlesX 0 \n' +
    '  set particlesY particlesY + 1 \n' +
    '] \n'  +

    'set particlesx 0\n' +

    //create particles on heatsoruce type particles-heatsource and turn them red
    'while [particlesX < 11][ \n' +
    '  create-particles 1[ \n' +
    '    set particle-type "' + 'particle-heatsource' + '"\n' +
    '    set size ' + size + '\n'  +
    '    set shape "circle" \n'   +
    '    setxy (particlesx - 5) bottomcor  \n' +
    '  ] \n' +
    '  set particlesX particlesX + 1 \n' +
    ']\n' +
    'ask particles with [ycor = bottomCor][ \n '  +
    '  set temperature bottomTemperature \n' +
    '  set color scale-color red rescale bottomTemperature 19.9 14.4 \n ' +
    '] \n'  +
    'if linked = "ON" [ \n'  +
    '  ask particles with [particle-type != "particle-heatsource"][ \n '  +
    '    create-links-with other particles in-radius 1.4 \n' +
    '  ] \n'+
    '  ask links[ \n '  +
    '    set thickness 0.1 \n' +
    '    set color 45 \n' +
    '  ] \n'+
    '] \n'
      
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
    let code = Blockly.JavaScript.prefixLines(prefix, netlogoGenerator.INDENT) + ';; test 1' + '\n' + Blockly.JavaScript.prefixLines(parameters, netlogoGenerator.INDENT)  +'\n ;; test 2 \n'+ Blockly.JavaScript.prefixLines(suffix, netlogoGenerator.INDENT) + ';; test 3' + '\n';
    // let code = Blockly.JavaScript.prefixLines(prefix, netlogoGenerator.INDENT) + '\n';
    return code;
};

netlogoGenerator['create_electrons'] = function (block) {
    const root = block.getRootBlock().type;
    const dataObj = JSON.parse(block.data);
    const num = block.getFieldValue('PARTICLE_NUM');
    const size = 0.4;
    let parameters;
    let prefix = 
    '   create-electrons ' + num + '[ \n' +
    '      set size ' + size + '\n'  +
    '      set particle-type "electrons"\n' +
    '      set shape "circle" \n'   +
    '      set turtle-moved 0\n' + 
        ';; assign to electron the room temperature\n' +
        'set temperature room-temp\n' +
        ' ;; give to the bottom ones the temperature of the bunsen\n' +
        'if pycor = (- plate-size) [set temperature bottomTemperature]\n' +
        ';; save old value\n' +
        'set old-temperature temperature\n' ;
        // 'ask electrons [color-electron]\n' ;
    
    let suffix = 
    '   ] \n'   

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
    let code = Blockly.JavaScript.prefixLines(prefix, netlogoGenerator.INDENT) + ';; test 1' + '\n' + Blockly.JavaScript.prefixLines(parameters, netlogoGenerator.INDENT)  +'\n ;; test 2 \n'+ Blockly.JavaScript.prefixLines(suffix, netlogoGenerator.INDENT) + ';; test 3' + '\n';
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

// // Create electrons
// netlogoGenerator['create_electrons_old'] = function () {
//     const code =
//         'create-electrons 500 [\n' +
//         'setxy (random-float (2 * plate-size) ) - (plate-size ) + 3 (random-float (2 * plate-size)) - plate-size\n' +
//         'set heading random 360\n' +
//         'set particle-type "electrons"\n' +
//         'set electron-moved 0\n' + 
//         'set shape "circle"\n' +
//         'set size .4\n' +
//         ';; assign to electron the room temperature\n' +
//         'set temperature room-temp\n' +
//         ' ;; give to the bottom ones the temperature of the bunsen\n' +
//         'if pycor = (- plate-size) [set temperature bottom-temp]\n' +
//         ';; save old value\n' +
//         'set old-temperature temperature\n' +
//         'ask electrons [color-electron]\n' +
//         ']\n' ;
//     return code;
// };

// // Set Particle Mass
// netlogoGenerator['set_mass'] = function (block) {
//     let mass = netlogoGenerator.MASS[block.getField('MASS').selectedOption_[1]];
//     let code = ' \n ;; test X \n';
//     return code;
// };

// Set Particle Arrangement
netlogoGenerator['set_arrangement'] = function (block) {
    let arrangerment = netlogoGenerator.ARRANGEMENT[block.getField('ARRANGEMENT').selectedOption_[1]];

    let code = 
    
    arrangerment + '\n';

    // 'setxy xcor ' + arrangerment + 'ycor ' + arrangerment + '\n';
    // 'ifelse (ycor <= plate-size) and (ycor >= (- plate-size )) and (xcor <= plate-size + 3) and (xcor >= (- plate-size + 3))\n' +
    // '[]\n' +
    // '[setxy ((random 15 - random 15) + 3) (random 15 - random 15)]\n';
    
    return code;
};

// Set Particle Color
netlogoGenerator['set_color'] = function (block) {
    let color = block.getField('COLOR').selectedOption_[0]
    // let code = 'set color ' + color + '\nset turtle-color ' + color + '\n';
    let code = 'set color ' + color + '\n';
    return code;
};

// Set Particle Links
netlogoGenerator['set_links'] = function (block) {
    let linked = block.getField('LINKS').selectedOption_[1];
    let code = 'set linked ' + '"' + linked+ '"' + '\n';
    return code;
};

// Set Particle Size
netlogoGenerator['set_size'] = function (block) {
    let size = netlogoGenerator.HEATSIZE[block.getField('SIZE').selectedOption_[1]];
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

// Wiggle
netlogoGenerator['wiggle'] = function () {
    const code =

    // change tick-counter frequency on nlogo file
    'if tick-counter = 1 [ \n' +
    // 'if random-normal (room-temp + 10) 5 < temperature [ \n' +
    
    '  set vibrate-energy (vibrate-energy + temperature / 5)\n'+
    '  if vibrate-energy >= temperature [set vibrate-energy temperature]\n'+
    '  if vibrate-energy <= (- temperature) [set vibrate-energy (- temperature)]\n'+
    
    '  ifelse turtle-moved = 0 [\n'+
    '    set heading random 360\n'+
    '    set wiggle-displacement ((vibrate-energy / 100) * 0.1)\n' +
    '    forward wiggle-displacement\n' +
    '    set heading heading - 180 \n' +
    '    set turtle-moved 1\n' +
    '  ]\n'+

    '  [\n'+
    '    forward wiggle-displacement\n' +
    '    set turtle-moved 0\n' +
    '  ]\n' +
    ']\n';


    return code;
};

// Travel
netlogoGenerator['travel'] = function () {
    // let fineTuning = 0.5;
    const code =
    'if particle-type != "particle-heatsource"[ \n' +
    'let xcorr (xcor + dx * temperature * 0.1 * tick-delta)\n' +
    'let ycorr (ycor + dy * temperature * 0.1 * tick-delta)\n' +
    'if (ycorr) > plate-size + 0.5 [\n' +
    '  die\n' +
    ']\n' +
    'if (ycorr) < (- plate-size - 0.5)[\n' +
        '  die\n' +

        ']\n' +
        'if xcorr > plate-size + 0.5 or xcorr < (- plate-size - 0.5) [\n' +
        'die\n' +

            ']\n' +
        
        'setxy xcorr ycorr\n ' +
     'if ycorr < (- plate-size) - 0.3 [ set temperature bottomTemperature ]\n' +
    ']\n';
    return code;
};

// Travel backup
// netlogoGenerator['travel'] = function () {
//     // let fineTuning = 0.5;
//     const code =
//     'if particle-type != "particle-heatsource"[ \n' +
//     'let xcorr (xcor + dx * temperature * 0.1 * tick-delta)\n' +
//     'let ycorr (ycor + dy * temperature * 0.1 * tick-delta)\n' +
//     'if (ycorr) > plate-size [\n' +
//     '  set heading (180 - heading)\n' +
//     ']\n' +
//     'if (ycorr) < (- plate-size)[\n' +
//         '  set heading (180 - heading)\n' +

//         ']\n' +
//         'if xcorr > plate-size or xcorr < (- plate-size) [\n' +
//         'set heading (- heading)\n' +

//             ']\n' +
        
//         'setxy xcorr ycorr\n ' +
//     // 'if pycor < (- plate-size) [ set temperature bottom-temp ]\n' +
//     ']\n';
//     return code;
// };

// Wiggle
netlogoGenerator['transfer_heat'] = function () {
    const code =

    'if breed = particles and linked = "ON" [ \n' +
      'set temperature new-temperature\n' +
       ';; set the edges back to their constant heat\n' +
       'if pycor = bottomcor [ set temperature bottomTemperature ]\n' +
       ';; save old temperature\n' +
       'set old-temperature temperature\n'+
       'color-agent\n'+
       '] \n' +
    'if breed = electrons[ \n' +
        'set temperature new-temperature\n' +
        ';; set the edges back to their constant heat\n' +
        'if pycor = bottomcor [ set temperature bottomTemperature ]\n' +
        ';; save old temperature\n' +
        'set old-temperature temperature\n'+
        'color-agent\n'+
        '] \n';
    
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

// Interact
netlogoGenerator['transfer_energy'] = function (block) {
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


netlogoGenerator['vibrate'] = function (block) {
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
    'if particle-type != "particle-heatsource" [ ifelse collision-flag = 1\n[\n' + 
    netlogoGenerator.INDENT + 'set heading (heading + (random 60) - random (60))\n'+
    netlogoGenerator.INDENT +'set last-collision collision-candidate\n'+
    netlogoGenerator.INDENT + ']\n' +
    netlogoGenerator.INDENT + '[ \n' +
    netlogoGenerator.INDENT + 'let xcorr (xcor + dx * temperature * 0.1 * tick-delta)\n' +
    netlogoGenerator.INDENT + 'let ycorr (ycor + dy * temperature * 0.1 * tick-delta)\n'+
    netlogoGenerator.INDENT + 'if (ycorr) > (plate-size + 0.5) [\n' +
    netlogoGenerator.INDENT +  '  set heading (180 - heading)\n' +
    netlogoGenerator.INDENT +  ']\n' +
    netlogoGenerator.INDENT +  'if (ycorr) < (- plate-size - 0.5)[\n' +
    netlogoGenerator.INDENT +      '  set heading (180 - heading)\n' +
    netlogoGenerator.INDENT +     ']\n' +
    netlogoGenerator.INDENT +     'if xcorr > plate-size  + 0.5 or xcorr < (- plate-size - 0.5) [\n' +
    netlogoGenerator.INDENT +     'set heading (- heading)\n' +
    netlogoGenerator.INDENT +         ']\n' +
    netlogoGenerator.INDENT + '] ]\n';
    return code;
};
// // Bounce Off
// netlogoGenerator['bounce_off'] = function () {
//     let code = 
//     'ifelse collision-flag = 1\n[\n' + 
//     netlogoGenerator.INDENT + 'collide-with collision-candidate\n'+
//     netlogoGenerator.INDENT +'set last-collision collision-candidate\n'+
//     netlogoGenerator.INDENT + 'ask collision-candidate [ set last-collision myself ]\n]\n[\n' +
//     netlogoGenerator.INDENT + 'if abs[pxcor] of patch-ahead 1 >= max-pxcor - 4\n' +
//     netlogoGenerator.INDENT + '[ set heading (- heading) ]\n' + 
//     netlogoGenerator.INDENT + 'if abs [pycor] of patch-ahead 1 >= max-pycor - 4\n' + 
//     netlogoGenerator.INDENT + '[ set heading(180 - heading) ]\n]\n';
//     return code;
// };

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
    const particleName = block.getField('TYPE').value_ || 'PARTICLES';
    const parameter = particleName === 'ALL' ? 'turtles ' : particleName.toLowerCase() ;
    // const parameter = particleName === 'ALL' ? '' : ' with [particle-type = "' + particleName.toLowerCase() + '"]';
    const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
    let code = 'ask ' + parameter + '\n' + '[\n' + statement_members + ']\n';
    return code;
};

// // Ask Particles BACKUP
// netlogoGenerator['ask_each_particle'] = function (block) {
//     const particleName = block.getField('TYPE').value_ || 'PLATE';
//     const parameter = particleName === 'PLATE' ? 'particles' : 'electrons';
//     const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
//     let code = 'ask ' + parameter + '\n' + '[\n' + statement_members + ']\n';
//     return code;
// };

// Detect if touching
netlogoGenerator['touching_dropdown'] = function (block) {
    const type = block.getFieldValue('TYPE');
    let code;
    let particleType;
    if(type.includes('PARTICLES') || type.includes('ELECTRONS') || type.includes('ANY')){  
        if(type.includes('ANY')){
            particleType = 'particles electrons ';
        }
        if(type.includes('ELECTRONS')){
            particleType = 'electrons ';
        }
        if(type.includes('PARTICLES')){
            particleType = 'particles ';
        }
        code = 
        //to bypass the if and create the if later
        'true [] \n' +
        'set collision-candidate min-one-of other (turtle-set ' + particleType + ') [distance myself] \n ' +
        'set collision-flag 1 \n' +
        'if(collision-candidate != nobody and collision-candidate != last-collision and distance collision-candidate <= size)';
       
    }
    if(type.includes('WALL')){  
        //if wall
        code = 
        'true \n';
        // 'set collision-flag 0 \n';
        // 'if true \n';
        // 'if(abs [pxcor] of patch-ahead 1 >= max-pxcor or abs [pycor] of patch-ahead 1 >= max-pycor)';
    }
    return [code, netlogoGenerator.ORDER_NONE];
};

netlogoGenerator['is_linked'] = function (block) {
    const type = block.getFieldValue('TYPE');
    let code;
    if(type.includes('PARTICLES') || type.includes('ELECTRONS') || type.includes('ANY')){  
    //    
    }
   
    code = 
            'linked = "ON" \n';
    return [code, netlogoGenerator.ORDER_NONE];
};

// netlogoGenerator['is_linked'] = function (block) {
//     let code;
//         code = 
//         'linked = "ON" \n' +
//         '    \n ' ;
//     return [code, netlogoGenerator.ORDER_NONE];
// };

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

