/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Changes the list_create block to use a +/- mutator UI.
 */

import Blockly from 'blockly/core';
import { createPlusField } from './field_plus';
import { createMinusField } from './field_minus';

/* eslint-enable quotes */
// UNPACK CREATE
const unpackMutator = {
    /**
     * Boolean of item inputs the block has.
     * @type {boolean}
     */
    expanded_: false,

    /**
     * Creates XML to represent if block is expanded.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('expanded', this.expanded_);
        return container;
    },

    /**
     * Parses XML to restore the text inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        const unpackState = xmlElement.getAttribute('expanded') === "true" ? true : false;
        this.expanded_ = unpackState;
        if (unpackState) {
            this.getInput('EMPTY').removeField('PLUS');
            this.getInput('EMPTY').insertFieldAt(0, createMinusField(), 'MINUS');
            this.appendStatementInput('EXPANDED_STATEMENT');
        }
    },

    /**
     * Callback for the plus image. Adds an input to the end of the block and
     * updates the state of the minus.
     */
    plus: function () {
        this.addPart_();
        let dataObj = JSON.parse(this.data);
        dataObj.contextData['CHANGED'] = true;
        this.data = JSON.stringify(dataObj);
    },

    minus: function () {
        this.removePart_();
    },

    /**
     * Adds additional unpackable parameters
     * @this {Blockly.Block}
     * @private
     */
    addPart_: function () {
        this.getInput('EMPTY').removeField('PLUS');
        this.getInput('EMPTY').insertFieldAt(0, createMinusField(), 'MINUS');
        this.appendStatementInput('EXPANDED_STATEMENT');
        const unpackData = JSON.parse(this.data).unpackBlocks;
        //const fieldData = JSON.parse(this.data).fieldData;
        if (JSON.parse(this.data).contentXml === ''){
            // recursive function
            this.traverseBlocks_(unpackData, this.getInput('EXPANDED_STATEMENT').connection)
        }
        else{
            let dataObj = JSON.parse(this.data);
            let blockDom = Blockly.Xml.domToBlock(Blockly.Xml.textToDom(dataObj.contentXml), this.workspace);
            this.getInput('EXPANDED_STATEMENT').connection.connect(blockDom.previousConnection);
        }
        this.expanded_ = true;
        let dataObj = JSON.parse(this.data);
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
    },

    /**
     * Recursively traverses data for a set of blocks in
     * order to generate a set of blocks and connect them
     * to a parent block.
     * @param {!JSON} blockData JSON object containing block data.
     * @param {Blockly.Block.input.connection} parentBlockConnection connection of the parent block.
     * @this {Blockly.Block}
     * @private
     */
    traverseBlockFields_: function(blockGroup, block) {
        const conditionBlock = this.workspace.newBlock(blockGroup.blockType);
        // considering the case where the condition block accept blocks as input
        if (blockGroup.blockFields) {
            blockGroup.blockFields.forEach(element => {
                this.traverseBlockFields_(element, conditionBlock);
            });
        }
        // conditionBlock.setMovable(false);
        block.getInput(blockGroup.input).connection.connect(conditionBlock.outputConnection);
        if (blockGroup.field) {
            conditionBlock.setFieldValue(blockGroup.field.value, blockGroup.field.name);
        }
        conditionBlock.initSvg();
    },

    traverseBlocks_: function(blockData, parentBlockConnection) {
      for (let blockGroup of blockData.reverse()) {
        // instantiate block
        const block = this.workspace.newBlock(blockGroup.blockType);
        //block.setMovable(false);
        // block.setEditable(false);
        // set field values in block from block data
        for (let field in blockGroup.fields) {
            if (block.getField(field)) {
                block.setFieldValue(blockGroup.fields[field], field)
            }
        }
        block.initSvg();
        this.workspace.render();
        // connect block to parent block
        const blockPreviousConnection = block.previousConnection;
        parentBlockConnection.connect(blockPreviousConnection);
        // add condition block if one exists
        if (blockGroup.condition) {
            if (Array.isArray(blockGroup.condition)) {
                blockGroup.condition.forEach(element => {
                    this.traverseBlockFields_(element, block);
                });
            } else {
                this.traverseBlockFields_(blockGroup.condition, block);
            }
            this.workspace.render();
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
            this.traverseBlocks_(childrenBlocks, inputBlock.connection);
        }
        if (blockGroup.children_else) {
            let inputBlock = block.inputList[2];
            let childrenBlocks = blockGroup.children_else;
            if (blockGroup.children_else.field) {
                inputBlock = block.inputList.find(obj => {return obj.name === blockGroup.children_else.field});
                childrenBlocks = blockGroup.children_else.blocks;
            }
            this.traverseBlocks_(childrenBlocks, inputBlock.connection);
        }
      }
    },

    /**
     * Hides additional parameters
     * @this {Blockly.Block}
     * @private
     */
    removePart_: function () {
        this.getInput('EMPTY').removeField('MINUS');
        this.getInput('EMPTY').insertFieldAt(0, createPlusField(), 'PLUS');
        this.expanded_ = false;
        for (const child of this.getChildren()) {
            if (child.getSurroundParent() === this) {
              child.dispose();
            }
        }
        this.removeInput('EXPANDED_STATEMENT', true);
    }
};

/**
 * Updates the shape of the block to packed mode.
 * @this {Blockly.Block}
 */
const mutatorHelper = function () {
    if (this.expanded_) {
      this.getInput('EMPTY').insertFieldAt(0, createMinusField(), 'MINUS');
    } else {
      this.getInput('EMPTY').insertFieldAt(0, createPlusField(), 'PLUS');
    }
};

Blockly.Extensions.registerMutator('general_mutator',
    unpackMutator, mutatorHelper);
