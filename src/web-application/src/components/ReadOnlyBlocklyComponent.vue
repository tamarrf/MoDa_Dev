<template>
    <div class="blockly-component">
        <div class="title">
            <div class="label">Workspace - {{ $store.state.taskInfo.title }}</div>
            <input type="image" :src="$store.state.viewMode === 'main' ? expandSrc : shrinkSrc" class="change-mode" :class="$store.state.viewMode === 'main' ? 'expand':'shrink'" v-on:click="changeViewMode" >
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
export default {
  name: 'ReadOnlyBlocklyComponent',
  props: ['models', 'selected'],
  data(){
    return {
      devMode: window.location.href.match(/\?debug=true/i) ? true : false,
      hasSavedModels: false,
      pulse: null,
      toolbox: null,
      workspace: null,
      progress: null,
      expandSrc:  this.$store.state.imagePrefix ? this.$store.state.imagePrefix + 'expand.png' : require('@/assets/expand.png'),
      shrinkSrc:  this.$store.state.imagePrefix ? this.$store.state.imagePrefix + 'shrink.png' : require('@/assets/shrink.png'),
    }
  },
  mounted(){
    // Blockly Options exist in Vuex Store as global variables to avoid duplication errors thrown by Blockly everytime the Component is mounted
    this.workspace = Blockly.inject(this.$refs['blocklyDiv'], this.$store.state.readOnlyBlocklyOptions);

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
  },
  methods:{
    // sets up Blockly Workspace
    setupWorkspace(){
        netlogoGenerator.init(this.workspace);
        this.workspace.addChangeListener(this.checkForOrphanBlocks);
        this.addBlockToWorkspaceByDefault();
        this.$emit('blocklySetupComplete');
    },
    // initiates blocks that should be in the workspace on page load and prevents them from being deleted
    addBlockToWorkspaceByDefault(xmlString = ""){
        let xmlText;
        if(xmlString){
            xmlText = Blockly.Xml.textToDom(xmlString);
        }
        else if(window["__EXAMPLE_CONTENT__"]){
            xmlText = Blockly.Xml.textToDom(this.$store.state.taskInfo.example.script);
        }
        else if(window["__STUDENT_INFO__"]){
            xmlText = Blockly.Xml.textToDom(this.$store.state.taskInfo.project);
        }
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlText, this.workspace);
        this.workspace.scrollCenter();
    },
    // grays out blocks that are not connected to a top level block
    checkForOrphanBlocks(e){
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
  },
    watch:{
      selected: function (newVal){
          const xmlText = Blockly.Xml.textToDom(newVal.progress);
          Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlText, this.workspace);
      }
    }
}
</script>

<style>
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
