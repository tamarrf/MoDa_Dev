<template>
    <div class="blockly-component">
        <div class="title">
            <div v-if="modelLanguage === 'pt_br'" class="label">Área de trabalho - {{ $store.state.taskInfo.title }}</div>
            <div v-else-if="modelLanguage === 'en'" class="label">Workspace - {{ $store.state.taskInfo.title }}</div>
            <div class="component-buttons">
                <!-- <button v-on:click="download()">download</button> -->
                <input type="image" class="screenshot" :src="$store.state.imagePrefix ? $store.state.imagePrefix + 'camera.png' : require('@/assets/camera.png')" alt="camera" v-on:click="download()">
                <!-- <input type="image" :src="$store.state.viewMode === 'main' ? expandSrc : shrinkSrc" class="change-mode" :class="$store.state.viewMode === 'main' ? 'expand':'shrink'" v-on:click="changeViewMode" > -->
            </div>
        </div>
        <div class="blocklyDiv" ref="blocklyDiv"></div>
        <xml ref="blocklyToolbox" style="display:none">
            <slot></slot>
        </xml>
    </div>
</template>

<script>

import Blockly from 'blockly';
import './prompt';
import $ from 'jquery';
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
import '@/blocklyHelpers/mutations';
import { downloadWorkspaceScreenshot } from '@/blocklyHelpers/screenshot';
import { returnWorkspaceDataUri } from '@/blocklyHelpers/screenshot';

export default {
  name: 'BlocklyComponent',
  props: ['models', 'selected'],
  data(){
    return {
      devMode: window.location.href.match(/\?debug=true/i) ? true : false,
      defaultBlocksXml: '<xml></xml>',
      hasSavedModels: false,
      pulse: null,
      toolbox: null,
      workspace: null,
      progress: null,
      expandSrc:  this.$store.state.imagePrefix ? this.$store.state.imagePrefix + 'expand.png' : require('@/assets/expand.png'),
      shrinkSrc:  this.$store.state.imagePrefix ? this.$store.state.imagePrefix + 'shrink.png' : require('@/assets/shrink.png'),
      modelLanguage: ''
    }
  },
  mounted(){
    // Blockly Options exist in Vuex Store as global variables to avoid duplication errors thrown by Blockly everytime the Component is mounted
    this.workspace = Blockly.inject(this.$refs['blocklyDiv'], this.$store.state.blocklyOptions);

    // Store workspace toolbox to add to later
    this.toolbox = this.workspace.getToolbox();

    let unsubscribe = null;
    unsubscribe = this.$store.subscribeAction({
        after: (action) => {
            if (action.type === 'initTask') {
                for (let lib of this.$store.state.libraries){
                    if(lib !== 'general'){
                        import(/* webpackChunkName: "[request]" */ `@/data/blockLibraries/${lib}`).then( module => {
                            for (let category of module[lib].categories){
                                this.toolbox.toolboxDef_.contents.push(category);
                            }
                            this.toolbox.render(this.toolbox.toolboxDef_);
                            this.setupWorkspace();
                            this.workspace.refreshToolboxSelection();
                            // this.workspace.getFlyout().recordScrollPositions();
                        });
                    }
                }
                unsubscribe();
            }
        }
    }, { prepend: true })
    // load task, clear libs, and get the Toolbox Mode
    this.$store.dispatch("initTask");
    if(this.$store.state.taskInfo.taskId?.endsWith('pt_br')){
        this.modelLanguage = 'pt_br';
    } else {
        this.modelLanguage = 'en';
    }
  },
  methods:{
    // sets up Blockly Workspace
    setupWorkspace(reset = false, modelName = 'new model'){
        if(this.$store.state.taskInfo.taskId === 'diffusion' ||
           this.$store.state.taskInfo.taskId === 'diffusionPT' ||
           this.$store.state.taskInfo.taskId === 'diffusion_v2' ||
           this.$store.state.taskInfo.taskId === 'diffusion_v2_pt_br' ||
           this.$store.state.taskInfo.taskId === 'diffusion-gogo' ||
           this.$store.state.taskInfo.taskId === 'virus' ||
           this.$store.state.taskInfo.taskId === 'photossynthesis' ||
           this.$store.state.taskInfo.taskId === 'wolf_sheep' ||
           this.$store.state.taskInfo.taskId === 'eutrophication_v2' ||
           this.$store.state.taskInfo.taskId === 'eutrophication_v2_pt_br' ||
           this.$store.state.taskInfo.taskId === 'moda_art'){
            this.defaultBlocksXml = '<xml>'+
                '<block type="set">'+
                '</block>'+
                '<block type="go">'+
                '</block>'+
                '<block type="mouse_click"></block>' + 
            '</xml>';
        }
        else if(this.$store.state.taskInfo.taskId === 'moda_math_transform'){
            this.defaultBlocksXml = '<xml>'+
                '<block type="set">'+
                '</block>'+
                '<block type="go">'+
                    '<statement name = "GO">' +
                        '<block type = "apply"/>' +
                    '</statement>' +
                '</block>'+
            '</xml>';
        }
        else if(this.$store.state.taskInfo.taskId === 'wildfires-2'){
            // only 'go' because set is added with default children below
            this.defaultBlocksXml = '<xml>'+
                '<block type="set">'+
                '</block>'+
                '<block type="go">'+
                '</block>'+
                /*'<block type="set">'+*/
                    /*'<statement name = "SET">'+*/
                        /*'<block type = "create_particles">'+*/
                            /*'<field name = "number">1000</field>'+*/
                            /*'<field name = "dropdown">air</field>'+*/
                            /*'<next>' +*/
                              /*'<block type = "ask_each_particle">' +*/
                                /*'<statement name = "ASK_EACH">' +*/
                                  /*'<block type = "apply_wind">' +*/
                                  /*'</block>'+*/
                                /*'</statement>'+*/
                              /*'</block>'+*/
                            /*'</next>' +*/
                        /*'</block>'+*/
                    /*'</statement>'+*/
                /*'</block>'+*/
                /*'<block type="go">'+*/
                    /*'<statement name = "GO">'+*/
                      /*'<block type = "ask_each_particle">' +*/
                        /*'<statement name = "ASK_EACH">' +*/
                          /*'<block type = "move">' +*/
                            /*'<next>' +*/
                              /*'<block type = "interact"></block>'+*/
                            /*'</next>' +*/
                          /*'</block>'+*/
                        /*'</statement>'+*/
                      /*'</block>'+*/
                    /*'</statement>'+*/
                /*'</block>'+*/
            '</xml>';
      } else {
        this.defaultBlocksXml = '<xml>'+
            '<block type="set">'+
            '</block>'+
            '<block type="go">'+
            '</block>'+
        '</xml>';
      }

      netlogoGenerator.init(this.workspace);

      this.workspace.addChangeListener(this.checkForOrphanBlocks);

      this.workspace.scrollbar.vScroll.svgGroup_.style.display = 'none';
      this.workspace.scrollbar.hScroll.svgGroup_.style.display = 'none';
      if(window.fv && window["__USER__"] && !reset){
          window.fv.loadProgress(this.getProgress);
      }
      else{
          this.workspace.clear();
          this.addBlockToWorkspaceByDefault(this.defaultBlocksXml, reset, modelName);
          if(!reset){
            this.$emit('blocklySetupComplete');
          }
      }
    },
    getProgress(){
        this.progress = this.$props.selected.progress;
        if (this.progress){
            const xmlText = Blockly.Xml.textToDom(this.progress);
            Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlText, this.workspace);
            this.workspace.scrollCenter();
            this.$emit('blocklySetupComplete');
        }
        else{
            this.addBlockToWorkspaceByDefault(this.defaultBlocksXml);
            this.$emit('blocklySetupComplete');
        }
    },
    loadNewSavedModel(){
        this.$emit('blocklySetupComplete');
    },
    // initiates blocks that should be in the workspace on page load and prevents them from being deleted
    addBlockToWorkspaceByDefault(defaultBlocksString, reset = false, modelName = 'new model'){
        if(!this.devMode){
          let xml = Blockly.Xml.textToDom(defaultBlocksString);
          Blockly.Xml.appendDomToWorkspace(xml, this.workspace);
          for (let block of this.workspace.getAllBlocks()){
            block.setDeletable(false);
            block.setEditable(false);
            if(block.type != 'go' & block.type != 'set' & block.type != 'mouse_click') {
              block.setMovable(true);
              block.setDeletable(true);
              block.setEditable(true);
            }
          }
          this.workspace.cleanUp();
          this.workspace.scrollCenter();
          if(reset && window.fv){
            let _this = this;
            returnWorkspaceDataUri(this.workspace, function(datauri){
                let xml = Blockly.Xml.workspaceToDom(_this.workspace);
                let xml_text = Blockly.Xml.domToText(xml);
                window.fv.saveProgress(null, modelName, xml_text, String(datauri), null, null, _this.loadNewSavedModel);
            });
          }
        }
        else if ((this.devMode && this.$store.state.taskInfo.taskId === 'diffusion') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'diffusion_v2') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'diffusion_v2_pt_br') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'virus' ) ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'photossynthesis') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'wolf_sheep') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'eutrophication_v2') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'eutrophication_v2_pt_br') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'moda_math') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'moda_math_1quad') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'moda_math_1quad_basic') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'moda_math_transform') ||
                 (this.devMode && this.$store.state.taskInfo.taskId === 'moda_art')){
            let string = 
            '<xml>'+
                '<block type="set">'+
                    '<statement name = "SET">'+
                        '<block type = "create_particles">'+
                            '<field name = "number">100</field>'+
                            '<field name = "dropdown">water</field>'+
                        '</block>'+
                    '</statement>'+
                '</block>'+
            '</xml>';
            let xml = Blockly.Xml.textToDom(string);
            Blockly.Xml.appendDomToWorkspace(xml, this.workspace);
            string = 
            '<xml>'+
                '<block type="go">'+
                    '<statement name = "GO">'+
                        '<block type = "for_each_particle">'+
                        '<field name = "dropdown">each water particle</field>'+
                            '<statement name = "FOR_EACH">'+
                                '<block type = "move"></block>'+
                            '</statement>'+
                        '</block>'+
                    '</statement>'+
                '</block>'+
            '</xml>';
            xml = Blockly.Xml.textToDom(string); 
            Blockly.Xml.appendDomToWorkspace(xml, this.workspace);
            string = 
            '<xml>'+
                '<block type="mouse_click">'+
                '</block>'+
            '</xml>';
            xml = Blockly.Xml.textToDom(string);
            Blockly.Xml.appendDomToWorkspace(xml, this.workspace);
        }
    },
    // grays out blocks that are not connected to a top level block
    checkForOrphanBlocks(e){
        var convert = require('xml-js');
        // for data logging
        switch(e.type){
            case 'create':{
                if(window.fv && window["__USER_ID__"]){
                    window.fv.saveEvent((e.type + ' block'), this.workspace.getBlockById(e.blockId).type, Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.workspace, true)))
                }
            }
            break;
            case 'delete':{
                let blockJSON = JSON.parse(convert.xml2json(Blockly.Xml.domToText(e.oldXml), {compact: false, spaces: 4}));
                if(window.fv && window["__USER_ID__"]){
                    window.fv.saveEvent((e.type + ' block'), blockJSON.elements[0].attributes.type, Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.workspace, true)))
                }
            }
            break;
            case 'change':{
                if (e.element === "field") {
                  if(window.fv && window["__USER_ID__"]){
                      window.fv.saveEvent((e.type + ' field'), this.workspace.getBlockById(e.blockId).type, Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.workspace, true)))
                  }
                }
            }
            break;
        }

        // let dom = Blockly.Xml.workspaceToDom(this.workspace, true);
        // let data = Blockly.Xml.domToPrettyText(dom);
        // console.log(data);
        // if(e.type === Blockly.Events.BLOCK_MOVE){
        //     let createBlocks = this.workspace.getBlocksByType('create_particles', true);
        //     // console.log(JSON.parse(createBlocks[0].data))*/
        //     for (let block of createBlocks){
        //         const top = block.getRootBlock();
        //         if(top.type === 'mouse_click'){
        //             if(block.getFieldValue('PARTICLE_NUM') > 100){
        //                 block.setFieldValue(100,'PARTICLE_NUM');
        //             }
        //             block.getField('PARTICLE_NUM').max_ = 100;
        //         } 
        //         else{
        //             block.getField('PARTICLE_NUM').max_ = 500;
        //         } 
        //     }
        // }
        Blockly.Events.disableOrphans(e);
        if(e.type === Blockly.Events.BLOCK_MOVE || e.type === Blockly.Events.BLOCK_CREATE){
            if(this.pulse !== null){
                clearTimeout(this.pulse);
            }
            $('.flag').removeClass('pulse');
            $('.flag').addClass('pulse');
            this.pulse = setTimeout(()=>{
                $('.flag').removeClass('pulse');
            }, 4000);
        }
        if(e.type === Blockly.Events.BLOCK_CHANGE && e?.element === 'field'){
            let block = (this.workspace.getBlockById(e.blockId));
            if(e.name === 'AGENT' && e.newValue === 'SMOKES'){
                block.setStyle('for_smoke_behavior_blocks');
            }
            else if(e.name === 'AGENT' && e.newValue === 'TREES'){
                block.setStyle('forest_control_blocks');
            }
        }
    },
    changeViewMode(){
        if(this.$store.state.viewMode === 'main'){
            this.$store.commit('changeMode', 'workspace');
        }
        else{
            this.$store.commit('changeMode', 'main');
        }
        Blockly.svgResize(this.workspace);
        this.workspace.resize();
    },
    download(){
        downloadWorkspaceScreenshot(this.workspace);
    },
    refreshView(){
        Blockly.svgResize(this.workspace);
        this.workspace.resize();
    }
  },
  watch:{
      selected: function (newVal){
          const xmlText = Blockly.Xml.textToDom(newVal.progress);
          Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlText, this.workspace);
          let el = document.getElementById('selected-model-label');
          if(el){
              if (newVal) {
                  let model_title = newVal.title === 'new model' ? ('new model ' + newVal.id) : (newVal.title || 'untitled' + newVal.id);
                  el.innerHTML = '<b>' + model_title + '</b>';
              }
              else{
                  el.innerHTML = '';
              }
          }
      }
  }
}
</script>

<style>
.component-buttons{
    display: flex;
    width: 70px;
    justify-content: right;
}

.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
.blocklyPath{
    stroke-width: 3px !important;
}
.blockly-component{
    display: grid;
    grid-template-rows: 41px minmax(0, 1fr);
    grid-template-columns: 1fr;
}
.title{
    display: flex;
    border-style: solid;
    border-width: 0 0 2px 0;
    border-color: #B5B5B6;
    padding: 5px 10px;
    justify-content: space-between;
    font-weight: 500;
    background-color: white;
}
.task-models{
    width: 150px;
}

</style>
