import Blockly from 'blockly'
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
export let photosynthesis = {};

photosynthesis = {
    "categories": [{
        "kind": "category",
        "name": "Photosynthesis",
        "expanded": true,
        "contents": [{
            "kind": "category",
            "name": "Properties",
            "toolboxitemid": "propertiesUnpackable",
            "categorystyle": "particles_category",
            "contents": [{
                "kind": "block",
                "type": "create_particles"
            },
            {
                "kind": "block",
                "type": "create_energy"
            },
            // {
            //     "kind": "block",
            //     "type": "create_chloroplasts"
            //
            // {
            //     "kind": "block",
            //     "type": "set_type"
            // },
            // {
            //     "kind": "block",
            //     "type": "set_mass"
            // },
            {
                "kind": "block",
                "type": "set_speed"
            },
            {
                "kind": "block",
                "type": "set_position"
            },
            {
                "kind": "block",
                "type": "set_heading"
            },
            // {
            //     "kind": "block",
            //     "type": "set_light"
            // },
            ]
        },
        {
            "kind": "category",
            "name": "Action",
            "toolboxitemid": "actionsUnpackable",
            "categorystyle": "behavior_category",
            "contents": [{
                "kind": "block",
                "type": "move"
            },
            // {
            //     "kind": "block",
            //     "type": "break_apart"
            // },
            {
                "kind": "block",
                "type": "break_apart2"
            },
            // {
            //     "kind": "block",
            //     "type": "produce_o2"
            // },
            // {
            //     "kind": "block",
            //     "type": "produce_glucose"
            // },
            {
                "kind": "block",
                "type": "produce"
            },
            // {
            //     "kind": "block",
            //     "type": "consume"
            // },
            {
                "kind": "block",
                "type": "addCounter"
            },
            {
                "kind": "block",
                "type": "zeroCounter"
            }
            // {
            //     "kind": "block",
            //     "type": "interact"
            // },
            // {
            //     "kind": "block",
            //     "type": "break_molecules"
            // },
            // {
            //     "kind": "block",
            //     "type": "bounce_off"
            // },
            // {
            //     "kind": "block",
            //     "type": "erase"
            // },
            // {
            //     "kind": "block",
            //     "type": "attach"
            // }
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
                "type": "inside"
            },
            {
                "kind": "block",
                "type": "counter"
            }
            // {
            //     "kind": "block",
            //     "type": "temperature"
            // },
            // {
            //     "kind": "block",
            //     "type": "touching_dropdown"
            // }
        ]
        }]
    }]
}

// Create with Mutation
Blockly.Blocks['create_particles'] = {
    init: function () {
        this.jsonInit({
            "message0": "create  %1 %2 molecules %3",
            "args0": [
                {
                    "type": "field_slider",
                    "name": "PARTICLE_NUM",
                    "value": 50,
                    "min": 0,
                    "max": 100
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        [
                            "co2",
                            "CO2"
                        ],
                        [
                            "h2o",
                            "H2O"
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
                    SPEED: 'PHOTOMEDIUM',
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
                // {
                //   blockType: 'set_mass',
                //   fields: {
                //     'MASS': 'MEDIUM',
                //   }
                // },
                // {
                //   blockType: 'set_color',
                //   fields: {
                //     'COLOR': this.getFieldValue('TYPE') === 'WATER' ? 'CYAN' : 'RED',
                //   }
                // },
                // {
                //   blockType: 'set_size',
                //   fields: {
                //     'SIZE': 'MEDIUM',
                //   }
                // },
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
                  SPEED: 'PHOTOMEDIUM',
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
                // {
                //   blockType: 'set_mass',
                //   fields: {
                //     'MASS': 'MEDIUM',
                //   }
                // },
                // {
                //   blockType: 'set_color',
                //   fields: {
                //     'COLOR': this.getFieldValue('TYPE') === 'WATER' ? 'CYAN' : 'RED',
                //   }
                // },
                // {
                //   blockType: 'set_size',
                //   fields: {
                //     'SIZE': 'MEDIUM',
                //   }
                // },
            ]
        }
        this.data = JSON.stringify(dataObj);
    }
};

// Blockly.Blocks['create_energy'] = {
//     init: function () {
//         this.jsonInit({
//             "message0": "create light energy %1",
//             "args0": [
//                 {
//                     "type": "input_dummy",
//                     "name": "EMPTY"
//                 }
//             ],
//             "previousStatement": null,
//             "nextStatement": null,
//             "style": "particle_blocks",
//             "mutator": "general_mutator"
//         });
//         let dataObj = {
//             'unpackBlocks':[
//                 {
//                   blockType: 'set_speed',
//                   fields: {
//                     SPEED: 'PHOTOHIGH',
//                   }
//                 },
//                 // {
//                 //   blockType: 'set_position',
//                 //   fields: {
//                 //     'POSITION': 'RANDOM',
//                 //   }
//                 // },
//                 // {
//                 //   blockType: 'set_heading',
//                 //   fields: {
//                 //     'HEADING': 'RANDOM',
//                 //   }
//                 // },
//                 // {
//                 //   blockType: 'set_mass',
//                 //   fields: {
//                 //     'MASS': 'MEDIUM',
//                 //   }
//                 // },
//                 // {
//                 //   blockType: 'set_color',
//                 //   fields: {
//                 //     'COLOR': this.getFieldValue('TYPE') === 'WATER' ? 'CYAN' : 'RED',
//                 //   }
//                 // },
//                 // {
//                 //   blockType: 'set_mass',
//                 //   fields: {
//                 //     'MASS': 'MEDIUM',
//                 //   }
//                 // },
//                 {
//                   blockType: 'set_light',
//                   fields: {
//                     'LIGHT': 'LAMP',
//                   }
//                 },
//             ],
//             'contextData':{
//                 'CHANGED': false
//             },
//             'contentXml':'',
//         }
//         // define unpacked blocks and default values
//         this.data = JSON.stringify(dataObj);
        
//     },
//     // update dafault values when applicable
//     onchange: function(){
//         const dataObj = JSON.parse(this.data);
//         // update connected blocks if visible
//         if(this.getInput('EXPANDED_STATEMENT')){
//             let count = 0;
//             for (let child of this.getChildren()) {
//               if (child.getSurroundParent() === this) {
//                 if (count === 0) {
//                     dataObj.contentXml = Blockly.Xml.domToText(Blockly.Xml.blockToDom(child));
//                 }
//                 else {
//                     dataObj.contentXml += Blockly.Xml.domToText(Blockly.Xml.blockToDom(child));
//                 }
//                 ++count;
//               }
//             }
//         }
//         if (!dataObj.contextData['CHANGED']) {
//           dataObj.unpackBlocks = [
//             {
//                 blockType: 'set_speed',
//                 fields: {
//                   SPEED: 'PHOTOHIGH',
//                 }
//               },
//                 // {
//                 //   blockType: 'set_position',
//                 //   fields: {
//                 //     'POSITION': 'RANDOM',
//                 //   }
//                 // },
//                 // {
//                 //   blockType: 'set_heading',
//                 //   fields: {
//                 //     'HEADING': 'RANDOM',
//                 //   }
//                 // },
//                 // {
//                 //   blockType: 'set_mass',
//                 //   fields: {
//                 //     'MASS': 'MEDIUM',
//                 //   }
//                 // },
//                 // {
//                 //   blockType: 'set_color',
//                 //   fields: {
//                 //     'COLOR': this.getFieldValue('TYPE') === 'WATER' ? 'CYAN' : 'RED',
//                 //   }
//                 // },
//                   {
//                     blockType: 'set_light',
//                     fields: {
//                       'LIGHT': 'LAMP',
//                     }
//                   },
//             ]
//         }
//         this.data = JSON.stringify(dataObj);
//     }
// };

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

// Blockly.Blocks['break_molecules'] = {
//     init: function(){
//         this.jsonInit({
//             "message0": "photossynthesis %1",
//             "args0": [
//                 {
//                     "type": "input_dummy",
//                     "name": "EMPTY"
//                 }
//             ],
//             "inputsInline": true,
//             "previousStatement": null,
//             "nextStatement": null,
//             "mutator": "general_mutator",
//             "style": "behavior_border"
//         });
//         let dataObj = {
//             'unpackBlocks': [
//                 {
//                     blockType: 'controls_if',
//                     fields: {},
//                     condition: {
//                         input: 'IF0',
//                         blockType: 'inside',
//                         field: {
//                             name: 'TYPE',
//                             value: 'H2O'
//                         }
//                     },
//                     children: [
//                       {
//                         blockType: 'controls_if',
//                         fields: {},
//                          condition: {
//                         input: 'IF0',
//                         blockType: 'inside',
//                         field: {
//                             name: 'TYPE',
//                             value: 'CO2'
//                               }
//                          },
//                         children: [
//                         {
//                             blockType: 'break_apart',
//                             fields: {}
//                         },
//                         {
//                             blockType: 'produce_o2',
//                             fields: {}
//                         },
//                         {
//                             blockType: 'addCounter',
//                             fields: {}
//                         },
//                         ]
//                         }
//                     ]
//                 },
//                 {
//                     blockType: 'produce_glucose',
//                         fields: {}
//                 },
//             ],
//             'contextData': {
//                 'CHANGED': false
//             },
//             'contentXml': ''
//         };
//         // define unpacked blocks and default values
//         this.data = JSON.stringify(dataObj);
//     },
//     onchange: function(){
//         if (this.getInput('EXPANDED_STATEMENT')) {
//             const dataObj = JSON.parse(this.data);
//             let count = 0;
//             for (let child of this.getChildren()){
//               if (child.getSurroundParent() === this) {
//                 if(count === 0){
//                     dataObj.contentXml = Blockly.Xml.domToText(Blockly.Xml.blockToDom(child));
//                 }
//                 else{
//                     dataObj.contentXml += Blockly.Xml.domToText(Blockly.Xml.blockToDom(child));
//                 }
//                 ++count;
//               }
//             }
//             this.data = JSON.stringify(dataObj);
//         }
//     }
// };

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
                    "low",
                    "PHOTOLOW"
                ],
                [
                    "medium",
                    "PHOTOMEDIUM"
                ],
                [
                    "high",
                    "PHOTOHIGH"
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
    "message0": "set type %1",
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
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border",
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
    "style": "particle_border",
    "tooltip": "pick a value between 0 and 5",
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
    "style": "particle_border",
},
// {
//     "type": "break_apart",
//     "message0": "break %1 apart",
//     "args0": [
//         {
//             "type": "field_dropdown",
//             "name": "TYPE",
//             "options": [
//                 [
//                     "co2",
//                     "CO2"
//                 ],
//                 [
//                     "h2o",
//                     "H2O"
//                 ]
//             ]
//         }
//     ],
//     "previousStatement": null,
//     "nextStatement": null,
//     "style": "particle_border",
// },
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
                    "mouse position",
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
    "type": "set_light",
    "message0": "set light intensity %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "LIGHT",
            "options": [
                [
                    "lamp intensity",
                    "LAMP"
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
    "style": "particle_border",
},
{
    "type": "create_chloroplasts",
    "message0": "create %1 chloroplasts",
    "args0": [
        {
            "type": "field_slider",
                    "name": "PARTICLE_NUM",
                    "value": 3,
                    "min": 1,
                    "max": 6
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_border",
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
    "style": "particle_border",
},
{
    "type": "produce",
    "message0": "produce %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PRODUCE",
            "options": [
                [
                    "o2",
                    "O2"
                ],
                // [
                //     "glucose complex",
                //     "GLUCOSECOMPLEX"
                // ],
                [
                    "glucose",
                    "GLUCOSE"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border",
},
{
    "type": "break_apart2",
    "message0": "break %1 apart",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "BREAK",
            "options": [
                [
                    "co2",
                    "CO2"
                ],
                [
                    "h2o",
                    "H2O"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border",
},
{
    "type": "consume",
    "message0": "consume %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "CONSUME",
            "options": [
                [
                    "co2",
                    "CO2"
                ],
                [
                    "h2o",
                    "H2O"
                ],
                [
                    "glucose complexes",
                    "GLUCOSECOMPLEX"
                ],
                [
                    "light energy",
                    "LIGHTENERGY"
                ]
            ]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border",
},
// Action Blocks
{
    "type": "move",
    "message0": "move",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
},
{
    "type": "break_apart",
    "message0": "break molecules apart",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
},
{
    "type": "produce_o2",
    "message0": "produce o2",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
},
{
    "type": "create_energy",
    "message0": "create light energy",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "particle_blocks"
},
{
    "type": "addCounter",
    "message0": "add 1 to counter",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
},
{
    "type": "zeroCounter",
    "message0": "set counter to 0",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_border"
},

{
    "type": "produce_glucose",
    "message0": "produce glucose",
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
    "message0": "bounce off",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_blocks"
},
{
    "type": "erase",
    "message0": "erase particles",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_blocks"
},
{
    "type": "attach",
    "message0": "attach particles",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "behavior_blocks"
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
                    "all molecules",
                    "ALL"
                ],
                [
                    "chloroplasts",
                    "CHLOROPLASTS"
                ],
                [
                    "light energy",
                    "energy"
                ],
                [
                    "co2 molecules",
                    "CO2"
                ],
                [
                    "h2o molecules",
                    "H2O"
                ],
                [
                    "o2 molecules",
                    "O2"
                ],
                [
                    "glucose molecules",
                    "GLUCOSE"
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
    "message0": "temperature is %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TEMP",
            "options": [
                [
                    "high",
                    "HIGH"
                ],
                [
                    "medium",
                    "MEDIUM"
                ],
                [
                    "low",
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
    "type": "inside",
    "message0": "%1 is inside",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                [
                    "co2",
                    "CO2MOLECULE"
                ],
                [
                    "h2o",
                    "H2OMOLECULE"
                ],
                [
                    "light energy",
                    "ENERGYMOLECULE"
                ]
            ]
        }
    ],
    "output": "Boolean",
    "style": "control_blocks",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "counter",
    "message0": "counter is %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "NUMBER",
            "options": [
                [
                    "1",
                    "1"
                ],
                [
                    "2",
                    "2"
                ],
                [
                    "3",
                    "3"
                ],
                [
                    "4",
                    "4"
                ],
                [
                    "5",
                    "5"
                ],
                [
                    "6",
                    "6"
                ],
                [
                    "changed",
                    "CHANGED"
                ]
            ]
        }
    ],
    "output": "Boolean",
    "style": "control_blocks",
    "tooltip": "",
    "helpUrl": ""
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
                    "any molecule",
                    "ANYMOLECULE"
                ],
                [
                    "h2o molecule",
                    "H2OMOLECULE"
                ],
                [
                    "co2 molecule",
                    "CO2MOLECULE"
                ],
                [
                    "o2 molecule",
                    "O2MOLECULE"
                ],
                [
                    "wall",
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
        // netlogoGenerator.INDENT + 'mouse_click\n' +
        netlogoGenerator.INDENT + 'go\n' +
        statement_members +
        netlogoGenerator.INDENT + 'tick-advance tick-delta\n' +
        netlogoGenerator.INDENT + 'display\n' +
        netlogoGenerator.INDENT + 'ask particles with [particle-type = "chloroplasts"] [\n' +
        netlogoGenerator.INDENT + 'set sugar-count-old sugar-count\n' +
        netlogoGenerator.INDENT + ']\n' +
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
    'set size 16\n' +
    'set photo-candidate-CO2 nobody\n' +
    'set photo-candidate-H2O nobody\n' +
    'set ismoving? true\n' +
    'if particle-type = "co2"[\n' +
    'set shape "co2"\n' +
    ']\n'+
    'if particle-type = "h2o"[\n' +
    'set shape "h2o"\n' +
    ']\n'+
    'set kill 0\n' +
    'set color blue\n' +
    'set mass 3\n' +
    'set collision-hatching 0\n';
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

netlogoGenerator['create_energy'] = function () {
    const code = 
    'if temperature > random 100 [ \n' +
    'create-particles 1 [\n'+
    'set particle-type "energy"\n' +
    'set first-time 1\n' +
    'set last-collision nobody\n' +
    'set collision-flag 0\n' +
    'set size 16\n' +
    'set color 45 \n'+
    'set photo-candidate-CO2 nobody\n' +
    'set photo-candidate-H2O nobody\n' +
    'set ismoving? true\n' +
    'setxy -100 (100 - random 200)\n' +
    'set shape "ray"\n' +
    'set heading 90\n' +
    'set speed 35\n' +
    'set kill 0\n' +
    'set color yellow\n' +
    'set mass 3\n' +
    'set collision-hatching 0\n' +
    ']\n]\n';
    return code;
};

// netlogoGenerator['create_energy'] = function (block) {
//     const root = block.getRootBlock().type;
//     const dataObj = JSON.parse(block.data);
//     // const num = block.getFieldValue('PARTICLE_NUM');
//     // const type = block.getFieldValue('TYPE')
//     let parameters;
//     let num = 1;
//     let prefix = 
//     'set particle-type "energy"\n' +
//     'set first-time 1\n' +
//     'set last-collision nobody\n' +
//     'set collision-flag 0\n' +
//     'set size 10\n' +
//     'set color 45 \n'+
//     'set photo-candidate-CO2 nobody\n' +
//     'set photo-candidate-H2O nobody\n' +
//     'set ismoving? true\n' +
//     'setxy -100 (100 - random 200)\n' +
//     'set shape "ray"\n' +
//     'set heading 90\n' +
//     'set kill 0\n' +
//     'set color yellow\n' +
//     'set mass 3\n' +
//     'set collision-hatching 0\n';
//     let suffix =
//     'if mouse-down? \n[\n' +
//     netlogoGenerator.INDENT + 'drop-with-mouse ' + num + '\n' +
//     ']';
//     if (!dataObj.contextData.CHANGED){
//         parameters = getNLCodeFromUnpackBlocks(block.type, dataObj.unpackBlocks, this.workspace)
//     }
//     else{
//         let xmlblock = Blockly.Xml.domToBlock(Blockly.Xml.textToDom(JSON.parse(block.data).contentXml), this.workspace);
//         for(let descendant of xmlblock.getDescendants()){
//             if(root === 'mouse_click' && descendant.type === 'set_position'){
//                 descendant.dispose(true);
//             }
//         }
//         parameters = netlogoGenerator.blockToCode(xmlblock);
//         xmlblock.dispose();
//     }
//     let code = 
//     'if light-intensity > random 100 [ \n' +
//     'create-particles ' + num + '\n[\n' + Blockly.JavaScript.prefixLines(prefix, netlogoGenerator.INDENT) + Blockly.JavaScript.prefixLines(parameters, netlogoGenerator.INDENT) + Blockly.JavaScript.prefixLines(suffix, netlogoGenerator.INDENT) + '\n]\n'+
//     ']\n';
//     return code;
// };

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
        'set ready? false \n' +
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
    let code = 'set speed ' + speed + '\n';
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

netlogoGenerator['set_light'] = function (block) {
    let light = netlogoGenerator.LIGHT[block.getField('LIGHT').selectedOption_[1]];
    let code = 'set light-intensity ' + light + '\n';
    return code;
};

// //break apart to go inside ask chroloplast
// netlogoGenerator['break_apart'] = function (block) {
//     // const type = block.getFieldValue('TYPE');
//     //  let code; 
//     //   if (type.toLowerCase() === "co2"){
//     //     code = ';TYPE = co2\n';
//     // }
//     // if (type.toLowerCase() === "h2o"){
//     //     code = ';TYPE = h20\n';
//     // }
//     let code =
//         'break-apart\n'+
//     '\n';
     
//     return code;
// };

netlogoGenerator['break_apart'] = function () {
    const code = 'break-apart\n';
    return code;
};

netlogoGenerator['produce_o2'] = function () {
    const code = 'produce-o2\n';
    return code;
};
netlogoGenerator['produce_glucose'] = function () {
    const code = 'produce-glucose\n';
    return code;
};

netlogoGenerator['addCounter'] = function () {
    const code = 'set sugar-count sugar-count + 1\n';
    return code;
};
netlogoGenerator['zeroCounter'] = function () {
    const code = 'set sugar-count 0\n';
    return code;
};

//create chloroplasts
netlogoGenerator['create_chloroplasts'] = function (block) {
    const num = block.getFieldValue('PARTICLE_NUM');
    let code = 'create-chloroplasts ' + num + '[\n' +    
     'set particle-type "chloroplasts"\n' +
     'set size 50\n' +
     'set ismoving? false\n' +
     'set shape "circle"\n' +
     'set color [0 125 0 75]\n' +
     'set mass 3 \n'+
     'set photo-candidate-H2O nobody \n'+
     'set photo-candidate-CO2 nobody \n'+
     'set photo-candidate-ENERGY nobody \n' +
     'set heading random-float 360\n'+
     'setxy (- 0.9 * max-pxcor + random-float (0.9 * max-pxcor * 2)) -0.9 * max-pycor + random-float (0.9 * max-pycor * 2)' +
     ']\n'+
     '\n';
     
     //  'set first-time 1\n' +
    //  'set last-collision nobody\n' +
    //  'set collision-flag 0\n' +
  
    //  'if particle-type = "co2"[\n' +
    //  ']\n'+
    //  'if particle-type = "h2o"[\n' +
    //  'set shape "h2o"\n' +
    //  ']\n'+
    //  'set mass 3\n' +
    //  'set speed 10\n' +
    //  'set collision-hatching 0\n';

    // 'setxy 0 0\n' +
    
    
    return code;
};

// Set Particle Heading
netlogoGenerator['set_heading'] = function (block) {
    let heading = netlogoGenerator.HEADING[block.getField('HEADING').selectedOption_[1]];
    let code = 'set random-wiggle 40\nset heading ' + heading + '\n';
    return code;
};

netlogoGenerator['produce'] = function (block) {
    let produce = netlogoGenerator.PRODUCE[block.getField('PRODUCE').selectedOption_[1]];
    let code = produce + '\n';
    return code;
};

netlogoGenerator['break_apart2'] = function (block) {
    let break_molecule = netlogoGenerator.BREAK[block.getField('BREAK').selectedOption_[1]];
    let code = break_molecule + '\n';
    return code;
};

netlogoGenerator['consume'] = function (block) {
    let consume = netlogoGenerator.CONSUME[block.getField('CONSUME').selectedOption_[1]];
    let type = block.getFieldValue('CONSUME');
    let code;

        if(type.includes('GLUCOSECOMPLEX')){
            code = 'ask particles with [chloroplasts-candidate = myself and particle-type = ' + consume + '] [set kill 1] \n';
        }
        else{
            code = 'ask one-of particles with [chloroplasts-candidate = myself and particle-type = ' + consume + '] [set kill 1] \n';
        }

    return code;
};


// Action Blocks
// Move
netlogoGenerator['move'] = function () {
    const code = 'turtle-forward\n';
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
    'ifelse collision-flag = 1\n[\n' + 
    netlogoGenerator.INDENT + 'collide-with collision-candidate\n'+
    netlogoGenerator.INDENT +'set last-collision collision-candidate\n'+
    netlogoGenerator.INDENT + 'ask collision-candidate [ set last-collision myself ]\n]\n[\n' +
    netlogoGenerator.INDENT + 'if abs[pxcor] of patch-ahead 1 >= max-pxcor - ( size )\n' +
    netlogoGenerator.INDENT + '[ set heading (- heading) ]\n' + 
    netlogoGenerator.INDENT + 'if abs [pycor] of patch-ahead 1 >= max-pycor - ( size )\n' + 
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


// Control Blocks
// Ask Particles
netlogoGenerator['ask_each_particle'] = function (block) {
    const particleName = block.getField('TYPE').value_ || 'CO2';
    const parameter = particleName === 'ALL' ? ' with [particle-type != "chloroplasts"] ' : ' with [particle-type = "' + particleName.toLowerCase() + '"]';
    const statement_members = netlogoGenerator.statementToCode(block, 'ASK_EACH');
    let code = 'ask turtles' + parameter + '\n' + '[\n' + statement_members + ']\n';
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

// netlogoGenerator['inside'] = function (block) {
//     const type = block.getFieldValue('TYPE');
//     let code;
//     let particleType;
//     let particleTYPE;


//     if(type.includes('h2o')){
//         particleType = "H2O";
//     }
//     if(type.includes('co2')){
//         particleType = "CO2";
//     }
//     if(type.includes('CO2')){
//         particleTYPE = "CO2";
//     }
//     if(type.includes('H2O')){
//         particleTYPE = "H2O";
//     }
//     if(type.includes('CO2')){
//         particleType = "co2";
//     }
//     if(type.includes('H2O')){
//         particleType = "h2o";
//     }

//     code =

    
//     ' photo-candidate-' + particleTYPE + ' = nobody [ \n' +
//     '  set photo-candidate-' + particleTYPE + ' one-of other particles in-radius ((size / 2) - 1.5) with [ particle-type = "' + particleType + '"] \n' +
//     '] \n' +
//     '\n';

//     return [code, netlogoGenerator.ORDER_NONE];
// };



// Detect if touching
netlogoGenerator['touching_dropdown'] = function (block) {
    const type = block.getFieldValue('TYPE');
    let code;
    let particleType;
    if(type.includes('MOLECULE')){
        if(type.includes('ANY')){
            particleType = 'any';
        }
        else{
            particleType = block.getField('TYPE').selectedOption_[0].replace(' molecule', '');
        }
        const particleCondition = particleType != 'any' ? ' and ([particle-type] of collision-candidate = "' + particleType + '")' : ''
        code = '(count collision-enemies > 0) and (collision-candidate != nobody) and (speed > 0 or [speed] of collision-candidate > 0)' + particleCondition
    }
    else{
        code = 'abs [pxcor] of patch-ahead 1 >= max-pxcor - 4 or abs [pycor] of patch-ahead 1 >= max-pycor - 4'
    }
    return [code, netlogoGenerator.ORDER_NONE];
};

netlogoGenerator['inside'] = function (block) {
    const type = block.getFieldValue('TYPE');
    let code;
    let particleType;
    let particleTYPE;
    if(type.includes('CO2'))    {
        particleTYPE = 'CO2';
    }
    if(type.includes('H2O'))    {
        particleTYPE = 'H2O';
    } 
    if(type.includes('ENERGY'))    {
        particleTYPE = 'ENERGY';
    }
    if(type.includes('MOLECULE')){
        if(type.includes('ANY')){
            particleType = 'any';
        }
        else{
            particleType = block.getField('TYPE').selectedOption_[0].replace(' molecule', '');
        }
        const particleCondition = particleType != 'any' ? '(photo-candidate-' + particleTYPE + ' != nobody)' : ''
        code = particleCondition
    }
    else{
        code = 'abs [pxcor] of patch-ahead 1 >= max-pxcor - 4 or abs [pycor] of patch-ahead 1 >= max-pycor - 4'
    }
    return [code, netlogoGenerator.ORDER_NONE];
};

netlogoGenerator['counter'] = function (block) {
    let code;
    const num = block.getFieldValue('NUMBER');
    
    if (num === "CHANGED") {
        code = '(sugar-count != sugar-count-old)'
    }
    else {
        code = 'sugar-count = ' + num
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

