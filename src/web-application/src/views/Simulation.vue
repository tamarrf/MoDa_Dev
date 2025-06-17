<template>
    <div class="simulation-view">
        <div class="task">
            <!-- <div class="header">
                <div class="model-info">
                    <div v-if="hasSavedModels" class="model-selection">
                        <label for="task-models">Select a model: </label>
                        <select name="task-models" id="task-models" class="task-models" v-model="selected">
                            <option id="selected-model"
                            v-for="model in models" 
                            :key="model.id" 
                            :value="model">
                                {{ model.title === 'new model' ? ('new model ' + model.id) : (model.title || 'untitled' + model.id) }}
                            </option>
                        </select>
                        <button id="delete-model" class="ui-buttons delete-model" v-on:click="openDeleteModal">Delete Model</button>
                    </div>
                    <button class="ui-buttons" v-on:click="openNewModelModal">New Model</button>
                </div>
                
            </div> -->
            <div class="contents">
                <grid-layout :layout.sync="layout.items"
                    :col-num="layout.gridCols"
                    :row-height="layout.rowHeightPx"
                    :max-rows="layout.gridRows"
                    :prevent-collision="false"
                    :is-draggable="false"
                    :is-resizable="false"
                    :vertical-compact="false"
                    :use-css-transforms="false"
                    :autoSize="true"
                    @layout-updated="layoutUpdatedEvent"
                    ref="gridLayout"
                >
                    <grid-item
                        :static="layout.items[0].static"
                        :x="layout.items[0].x"
                        :y="layout.items[0].y"
                        :w="layout.items[0].w"
                        :h="layout.items[0].h"
                        :i="layout.items[0].i"
                        drag-allow-from=".title"
                        @resized-event="layoutItemResize"
                        v-if="layout.items[0].show"
                    >
                        <BlocklyComponent id="blockly" ref="workspace" :models="models" :selected="selected" v-on:blocklySetupComplete="initSimulation"/>
                        <div class="resizeHandle" @mousedown="(e) => dragStart(e, 0)">
                            <div class="resizeHandleVisuals"></div>
                        </div>
                    </grid-item>
                    <grid-item
                        :static="layout.items[1].static"
                        :x="layout.items[1].x"
                        :y="layout.items[1].y"
                        :w="layout.items[1].w"
                        :h="layout.items[1].h"
                        :i="layout.items[1].i"
                        drag-allow-from=".title"
                        @resized-event="layoutItemResize"
                        v-if="layout.items[1].show"
                        @mouseup="dragStop"
                    >
                        <SimulationComponent id="simulation" class="component" :workspace="workspace" ref="simulation"/>
                        <div class="resizeHandle" @mousedown="(e) => dragStart(e, 1)">
                            <div class="resizeHandleVisuals"></div>
                        </div>
                    </grid-item>
                    <grid-item
                        :static="layout.items[2].static"
                        :x="layout.items[2].x"
                        :y="layout.items[2].y"
                        :w="layout.items[2].w"
                        :h="layout.items[2].h"
                        :i="layout.items[2].i"
                        drag-allow-from=".title"
                        v-if="layout.items[2].show"
                    >
                        <ExperimentComponent id="experiment" class="component" :workspace="workspace" />
                    </grid-item>
                    <grid-item
                        :static="layout.items[3].static"
                        :x="layout.items[3].x"
                        :y="layout.items[3].y"
                        :w="layout.items[3].w"
                        :h="layout.items[3].h"
                        :i="layout.items[3].i"
                        drag-allow-from=".title"
                        v-if="layout.items[3].show"
                    >
                        <div class="resizeHandleVertical" @mousedown="(e) => dragVerticalStart(e, 3)">
                            <div class="resizeHandleVerticalVisuals"></div>
                        </div>
                        <ChartComponent class="component" :workspace="workspace" ref="charts"/>
                    </grid-item>
                    <!-- Resizer for if the chart component is missing (not sure if it's needed, but just leaving the idea here for future dev) -->
                    <!-- <grid-item
                        :static="layout.items[3].static"
                        :x="layout.items[3].x"
                        :y="layout.items[3].y"
                        :w="layout.items[3].w"
                        :h="layout.items[3].h"
                        :i="layout.items[3].i"
                        drag-allow-from=".title"
                        v-else
                    >
                        <div class="resizeHandleVertical" @mousedown="(e) => dragVerticalStart(e, 3)">
                            <div class="resizeHandleVerticalVisuals"></div>
                        </div>
                    </grid-item> -->
                    <!--  -->
                    <!--  -->
                    <!--  -->
                </grid-layout>
            </div>
        </div>
        <div class="modal">
            <div class="modal-content">
                <button id="close-modal" class="close" v-on:click="closeModal"><i class="fas fa-times"></i></button>
                <div v-if="modalType === 'ask_new' || modalType === 'ask_open'" class="modal-container">
                    <template v-if="modelLanguage === 'pt_br'">
                        <div class="modal-title">Você quer salvar as alterações feitas no modelo? Suas alterações serão perdidas se você não salvá-las.</div>
                        <div class="buttons">
                            <button class="ui-buttons-white" v-on:click="closeModal">Cancelar</button>
                            <button class="ui-buttons-red" v-on:click="askDontSave">Não Salvar</button>
                            <button class="ui-buttons" v-on:click="askSave">Salvar</button>
                        </div>    
                    </template>
                    <template v-else-if="modelLanguage === 'en'">
                        <div class="modal-title">Do you want to save the changes you made in the model? Your changes will be lost if you don't save them.</div>
                        <div class="buttons">
                            <button class="ui-buttons-white" v-on:click="closeModal">Cancel</button>
                            <button class="ui-buttons-red" v-on:click="askDontSave">Don't Save</button>
                            <button class="ui-buttons" v-on:click="askSave">Save</button>
                        </div>
                    </template>
                </div>
                <div v-if="modalType === 'save' || modalType === 'new model'" class="modal-container">
                    <template v-if="modelLanguage === 'pt_br'">
                        <div v-if="modalType === 'save'" class="modal-title">Salvar Como...</div>
                        <div v-else-if="modalType === 'new model'" class="modal-title">Novo Modelo</div>
                        <div class="title-container">
                            <div class="model-title">Nome do Modelo:</div>
                            <input type="text" id="model-name" name="name" v-on:input="updateName" required minlength="1" maxlength="255">
                        </div>
                        <div id="title-exists" style="color:red;"></div>
                        <div class="buttons">
                            <button class="ui-buttons-white delete" v-on:click="closeModal">Cancelar</button>
                            <input v-if="modalType === 'save'" id="save-model" class="save-model" type="submit" value="Salvar" :disabled="!hasTitle" v-on:click="saveToDb">
                            <input v-else-if="modalType === 'new model'" id="new-model" class="save-model" type="submit" value="Criar" :disabled="!hasTitle" v-on:click="newModel">
                        </div>
                    </template>
                    <template v-else-if="modelLanguage === 'en'">
                        <div v-if="modalType === 'save'" class="modal-title">Save As...</div>
                        <div v-else-if="modalType === 'new model'" class="modal-title">New Model</div>
                        <div class="title-container">
                            <div class="model-title">Model Name:</div>
                            <input type="text" id="model-name" name="name" v-on:input="updateName" required minlength="1" maxlength="255">
                        </div>
                        <div id="title-exists" style="color:red;"></div>
                        <div class="buttons">
                            <button class="ui-buttons-white delete" v-on:click="closeModal">Cancel</button>
                            <input v-if="modalType === 'save'" id="save-model" class="save-model" type="submit" value="Save" :disabled="!hasTitle" v-on:click="saveToDb">
                            <input v-else-if="modalType === 'new model'" id="new-model" class="save-model" type="submit" value="Create" :disabled="!hasTitle" v-on:click="newModel">
                        </div>
                    </template>
                </div>
                <div v-else-if="modalType === 'delete'" class="modal-container">
                    <template v-if="modelLanguage === 'pt_br'">
                        <div class="modal-title">Tem certeza que quer apagar <b> {{ selected.title === 'new model' ? ('new model ' + selected.id) : (selected.title || 'untitled' + selected.id) }} </b> ?</div>
                        <div class="buttons">
                            <button class="ui-buttons-white delete" v-on:click="closeModal">Cancelar</button>
                            <button class="ui-buttons delete" v-on:click="deleteFromDb">Apagar</button>
                        </div>
                    </template>
                    <template v-else-if="modelLanguage === 'en'">
                        <div class="modal-title">Are you sure you want to delete <b> {{ selected.title === 'new model' ? ('new model ' + selected.id) : (selected.title || 'untitled' + selected.id) }} </b> ?</div>
                        <div class="buttons">
                            <button class="ui-buttons-white delete" v-on:click="closeModal">Cancel</button>
                            <button class="ui-buttons delete" v-on:click="deleteFromDb">Delete</button>
                        </div>
                    </template>
                </div>
                <div v-else-if="modalType === 'open model'" class="modal-container">
                    <div v-if="modelLanguage === 'pt_br'" class="modal-title">Abrir modelo:</div>
                    <div v-else-if="modelLanguage === 'en'" class="modal-title">Open model:</div>
                    <select name="task-models" id="task-models" class="task-models" v-model="selected">
                        <option id="selected-model"
                        v-for="model in models" 
                        :key="model.id" 
                        :value="model">
                            {{ model.title === 'new model' ? ('new model ' + model.id) : (model.title || 'untitled' + model.id) }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BlocklyComponent from '@/components/BlocklyComponent.vue';
import ChartComponent from '@/components/ChartComponent.vue';
import ExperimentComponent from '@/components/ExperimentComponent.vue';
import SimulationComponent from '@/components/SimulationComponent.vue';
import { returnWorkspaceDataUri } from '@/blocklyHelpers/screenshot';
import { GridLayout, GridItem } from 'vue-grid-layout';
import $ from 'jquery';
import Blockly from 'blockly';
export default {
    name: 'Simulation',
    components: {
        GridLayout,
        GridItem,
        BlocklyComponent,
        ChartComponent,
        ExperimentComponent,
        SimulationComponent
    },
    data(){
        return {
            task: '',
            hasSavedModels: false,
            workspace: null,
            hasTitle: false,
            hasChanges: false,
            modelLanguage: '',
            selected: {},
            models: [],
            modalType: '',
            drag: {
                isDragging: false,
                index: 0,
                start: {
                    x: 0,
                    y: 0
                },
                refreshTimeout: null // This is so we're not constantly refreshing the blockly layout and taxing the CPU
            },
            layout: {
                gridCols: 100,
                gridRows: 100,
                rowHeightPx: 0.5,
                items: [
                    // Blockly
                    {"x":0,"y":0,"w":42,"h":76,"i":"0", static: true, show: true},
                    // Simulation
                    {"x":42,"y":0,"w":34,"h":57,"i":"1", static: true, show: true},
                    // Experiment
                    {"x":76,"y":0,"w":24,"h":57,"i":"2", static: true, show: true},
                    // Chart
                    {"x":42,"y":57,"w":58,"h":19,"i":"3", static: true, show: true},
                ]
            }
        }
    },
    mounted(){
        if(this.$store.state.taskInfo.taskId?.endsWith('pt_br')){
            this.modelLanguage = 'pt_br';
        } else {
            this.modelLanguage = 'en';
        }

        // console.log(this.$store.state.taskInfo.viewComponents);
        // modularizes layout of simulation view
        if(this.$store.state.taskInfo.viewComponents.includes('chartComponent') && this.$store.state.taskInfo.viewComponents.includes('experimentComponent')){
            // $('.contents').css('grid-template-areas', '"workspace model experiment" "workspace chart chart"');
            this.layout.items[2].show = true;
            this.layout.items[3].show = true;
        }
        else if(this.$store.state.taskInfo.viewComponents.includes('chartComponent') && !this.$store.state.taskInfo.viewComponents.includes('experimentComponent')){
            // $('.contents').css('grid-template-areas', '"workspace model model" "workspace chart chart"');
            this.layout.items[2].show = false;
            this.layout.items[3].show = true;
            
            this.layout.items[1].w += this.layout.items[2].w;
        }
        else if(!this.$store.state.taskInfo.viewComponents.includes('chartComponent') && this.$store.state.taskInfo.viewComponents.includes('experimentComponent')){
            // $('.contents').css('grid-template-areas', '"workspace model experiment" "workspace model experiment"');
            this.layout.items[2].show = true;
            this.layout.items[3].show = false;
            
            this.layout.items[1].h = this.layout.items[0].h;
            this.layout.items[2].h = this.layout.items[0].h;

            // Note: this is set even thought he item is invisible because the resize method uses this value
            this.layout.items[3].y = this.layout.items[1].y + this.layout.items[1].h;
        }
        else {
            // $('.contents').css('grid-template-areas', '"workspace model model" "workspace model model"');
            this.layout.items[2].show = false;
            this.layout.items[3].show = false;

            this.layout.items[1].w += this.layout.items[2].w;
            this.layout.items[1].h = this.layout.items[0].h;
            // this.layout.items[2].h = this.layout.items[0].h;

            // this.layout.items[3].x = this.layout.items[1].x;
            // this.layout.items[3].y = this.layout.items[1].y + this.layout.items[1].h;
            // this.layout.items[3].w = this.layout.items[1].w + this.layout.items[2].w;
            // this.layout.items[3].h = 0;
        }

        // this.layout.items[3].show = true;
        // this.layout.items[1].h = 61;
        // this.layout.items[2].h = 61;

        this.workspace = this.$refs['workspace'].workspace;

        $('#open-model').on('click', () => {
            this.checkChanges();
            if(this.hasChanges){
                this.modalType = 'ask_open';
            }
            else {
                this.modalType = 'open model';
            }
            $('.modal').show();
        })

        // save workspace to account
        $('#save').on('click', () => {
            this.saveButtonClicked();
        });

        $('#save-as').on('click', () => {
            this.modalType = 'save';
            $('.modal').show();
            this.updateName();
        });

        $('#delete').on('click', () => {
            this.openDeleteModal();
        });

        $('#new-model').on('click', () => {
            this.openNewModelModal();
        });
    },
    methods:{
        initSimulation(){
            if(window.fv && window["__USER__"]){
                window.fv.loadProgress(this.getModels);
            }
            this.$refs['simulation'].getStarted();
        },
        openNewModelModal(){
            this.checkChanges();
            if(this.hasChanges){
                this.modalType = 'ask_new';
            }
            else {
                this.modalType = 'new model';
            }
            $('.modal').show();
        },
        newModel(){
            if (Object.values(this.models).some((obj) => obj.title === $("#model-name").val())) {
                let el = document.getElementById('title-exists');
                if(el) {
                    el.innerHTML = 'Name already in use. Please choose a different one.';
                }
                return false;
            }
            this.$refs['workspace'].setupWorkspace(true, $("#model-name").val());
            this.closeModal();
        },
        checkChanges(){
            this.hasChanges = false;
            let xml = Blockly.Xml.workspaceToDom(this.workspace);
            let xml_text = Blockly.Xml.domToText(xml);
            if(this.selected.progress !== xml_text) {
                this.hasChanges = true;
            }
        },
        closeModal(){
            let el = document.getElementById('model-name');
            if(el) {
                el.value = '';
            }
            el = document.getElementById('title-exists');
            if(el) {
                el.innerHTML = '';
            }
            $('.modal').hide();
        },
        askDontSave(){
            $('.modal').hide();
            if(this.modalType === 'ask_new') {
                this.modalType = 'new model';
            }
            else if(this.modalType === 'ask_open') {
                this.modalType = 'open model';
            }
            $('.modal').show();
        },
        askSave(){
            this.saveButtonClicked();
            this.askDontSave();
        },
        updateName(){
            let el = document.getElementById('title-exists');
            if(el) {
                el.innerHTML = '';
            }
            if($('#model-name').val()?.trim())
            {
                this.hasTitle = true;
            }
            else{
                this.hasTitle = false;
            }
        },
        openDeleteModal(){
            this.modalType = 'delete';
            $('.modal').show();
        },
        saveButtonClicked(){
            let _this = this;
            returnWorkspaceDataUri(this.workspace, function(datauri){
                if(_this.models.length === 0){
                    _this.modalType = 'save';
                    $('.modal').show();
                    _this.updateName();
                }
                else if(window.fv && window["__USER_ID__"]){
                    let xml = Blockly.Xml.workspaceToDom(_this.workspace);
                    let xml_text = Blockly.Xml.domToText(xml);
                    window.fv.saveProgress(_this.selected.id, _this.selected.title, xml_text, String(datauri), null, null, _this.updateModel);
                }
            });
        },
        saveToDb(){
            if(window.fv && window["__USER_ID__"]){
                if (Object.values(this.models).some((obj) => obj.title === $("#model-name").val())) {
                    let el = document.getElementById('title-exists');
                    if(el) {
                        el.innerHTML = 'Name already in use. Please choose a different one.';
                    }
                    return false;
                }
                let xml = Blockly.Xml.workspaceToDom(this.workspace);
                let xml_text = Blockly.Xml.domToText(xml);
                let _this = this;
                returnWorkspaceDataUri(this.workspace, function(datauri){
                    window.fv.saveProgress(null, $("#model-name").val(), xml_text, String(datauri), null, null, _this.saveModel);
                });
            }
            $('.modal').hide();
        },
        deleteFromDb(){
            if(window.fv && window["__USER_ID__"]){
                window.fv.deleteModel(this.selected.id, this.updateAfterDelete);
            }
        },
        saveModel(){
            window.fv.loadProgress(this.getModels);
            const savedDiv = document.createElement('span');
            savedDiv.innerHTML = 'Saved!';
            savedDiv.classList.add('saved');
            savedDiv.setAttribute('id', 'saved');
            $('.saved').remove();
            $('.info').append(savedDiv);
            $('.saved').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() { $(savedDiv).remove(); });
        },
        updateModel(){
            window.fv.loadProgress(this.getModelsUpdate);
            const savedDiv = document.createElement('span');
            savedDiv.innerHTML = 'Saved!';
            savedDiv.classList.add('saved');
            savedDiv.setAttribute('id', 'saved');
            $('.saved').remove();
            $('.info').append(savedDiv);
            $('.saved').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() { $(savedDiv).remove(); });
        },
        updateAfterDelete(){
            $('.modal').hide();
            window.fv.loadProgress(this.getModels);
        },
        getModels(e){
            this.models = JSON.parse(e).progress || [];
            if(this.models?.length > 0){
                this.selected = this.models[this.models.length - 1];
                this.hasSavedModels = true;
            }
            else{
                this.hasSavedModels = false;
            }

            this.updateModelsDropdown();
        },
        getModelsUpdate(e){
            let selectedId = this.selected.id;
            this.models = JSON.parse(e).progress || [];
            this.selected = Object.values(this.models).find((obj) => obj.id === selectedId);
        },
        updateModelsDropdown(){
            if (this.hasSavedModels) {
                let el = document.getElementById('task-models');
                if(el){
                    el.innerHTML = '';
                    this.models.forEach(function(model){
                        let option = document.createElement('option');
                        option.value = model;
                        option.innerHTML = model.title;
                        el.appendChild(option);
                    });
                }

                let elements = document.getElementsByClassName('show-on-hasModels');
                for (let i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'block';
                }
            }
            else{
                let elements = document.getElementsByClassName('show-on-hasModels');
                for (let i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'none';
                }
            }
        },
        dragStart(e, index) {
            e.preventDefault();
            this.drag.isDragging = true;
            this.drag.start.x = e.pageX;
            this.drag.start.y = e.pageY;
            this.drag.index = index;

            document.addEventListener('mousemove', this.dragMove);
            document.addEventListener('mouseup', this.dragStop);
            
            document.body.style.cursor = 'col-resize';
        },
        dragStop(e) {
            e.preventDefault();
            this.drag.isDragging = false;

            this.layoutUpdatedEvent();

            document.removeEventListener('mousemove', this.dragMove);
            document.removeEventListener('mouseup', this.dragStop);

            document.body.style.cursor = '';
        },
        dragMove(e) {
            if (this.drag.isDragging) {
                e.preventDefault();
                // Solve for new width based on new position
                let newX = (e.pageX / this.$refs['gridLayout'].width) * 100;
                // Limits
                let maxX = 70;
                let minX = 30;
                if (this.drag.index == 1) {
                    maxX = 80;
                    minX = this.layout.items[0].w + 10;
                }
                newX = Math.round(Math.max(Math.min(newX, maxX), minX)) || 50;

                this.layout.items[this.drag.index].w = newX - this.layout.items[this.drag.index].x;

                this.layoutItemResize();

                if (this.drag.refreshTimeout) window.clearTimeout(this.drag.refreshTimeout);
                this.drag.refreshTimeout = window.setTimeout(() => {
                    this.layoutUpdatedEvent();
                }, 30);
            }
        },
        dragVerticalStart(e, index) {
            e.preventDefault();
            this.drag.isDragging = true;
            this.drag.start.x = e.pageX;
            this.drag.start.y = e.pageY;
            this.drag.index = index;

            document.addEventListener('mousemove', this.dragVerticalMove);
            document.addEventListener('mouseup', this.dragVerticalStop);
            
            document.body.style.cursor = 'row-resize';
        },
        dragVerticalStop(e) {
            e.preventDefault();
            this.drag.isDragging = false;

            this.layoutUpdatedEvent();

            document.removeEventListener('mousemove', this.dragVerticalMove);
            document.removeEventListener('mouseup', this.dragVerticalStop);

            document.body.style.cursor = '';
        },
        dragVerticalMove(e) {
            if (this.drag.isDragging) {
                e.preventDefault();
                // Solve for new width based on new position
                let gridContainerHeight = this.$refs["gridLayout"].containerHeight().replace("px", "") * 1;
                let mouseY = e.pageY - this.$refs["gridLayout"].$el.getBoundingClientRect().y;
                let newY = (mouseY / gridContainerHeight) * 76;
                // Limits
                let maxY = 70;
                let minY = 30;
                // if (this.drag.index == 1) {
                //     maxY = 80;
                //     minY = this.layout.items[0].w + 10;
                // }
                newY = Math.round(Math.max(Math.min(newY, maxY), minY)) || 50;

                this.layout.items[this.drag.index].y = newY; // - this.layout.items[this.drag.index].y;

                this.layoutItemResize();

                if (this.drag.refreshTimeout) window.clearTimeout(this.drag.refreshTimeout);
                this.drag.refreshTimeout = window.setTimeout(() => {
                    this.layoutUpdatedEvent();
                }, 30);
            }
        },
        layoutItemResize() {
            let prevX = this.layout.items[1].x;
            this.layout.items[1].x = this.layout.items[0].x + this.layout.items[0].w;
            this.layout.items[1].w = this.layout.items[1].w + (prevX - this.layout.items[1].x);
            this.layout.items[1].h = this.layout.items[3].y;

            prevX = this.layout.items[2].x;
            this.layout.items[2].x = this.layout.items[1].x + this.layout.items[1].w;
            this.layout.items[2].w = this.layout.items[2].w + (prevX - this.layout.items[2].x);
            this.layout.items[2].h = this.layout.items[3].y;
            
            prevX = this.layout.items[3].x;
            this.layout.items[3].x = this.layout.items[0].x + this.layout.items[0].w;
            this.layout.items[3].w = this.layout.items[3].w + (prevX - this.layout.items[3].x);
            this.layout.items[3].h = 76 - this.layout.items[3].y;

        },
        layoutUpdatedEvent() {
            this.layoutItemResize();

            // Refresh Blockly
            this.$nextTick(() => {
                this.$refs['workspace']?.refreshView();
            });

            // Refresh Netlogo
            window.dispatchEvent(new Event('resize'));
        }
    }
}
</script>

<style>
.simulation-view {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0,1fr);
}

#blockly {
    height: 100%;
    border: #B5B5B6;
    border-width: 2px;
    border-style: solid;
    box-sizing: border-box;
    grid-area: workspace;
}

#simulation {
    grid-area: model;
}

#experiment {
    grid-area: experiment;
}

#chart{
    grid-area: chart;
}

.change-mode{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-style: solid;
    border-color: gray;
    border-width: 1px;
    border-radius: 7px;
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-size: contain;
}

.screenshot{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-style: solid;
    border-color: gray;
    border-width: 1px;
    border-radius: 7px;
    box-sizing: border-box;
    width: 30px;
    height: 30px;
}

.component{
    height: 100%;
    margin: 0;
    background-color: #FFFFFF;
    box-sizing: border-box;
    border: #B5B5B6;
    border-width: 2px;
    border-style: solid;
}

.task {
    justify-self: center;
    align-self: center;
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr) 20px;
    grid-template-rows: 4px minmax(0, 1fr) 20px;
    height: 100%;
    width: 100%;
    align-items: center;
}

.header{
    display: flex;
    grid-column: 2;
    grid-row: 1;
    justify-content: space-between;
    align-items: center;
}

.info{
    font-weight: 500;
    font-size: 30px;
}

.model-info{
    display: flex;
}

.saved{
    margin: 0 1rem;
    font-weight: 300;
    font-size: 16px;
    opacity: 0;
    color: #338449;
    animation: fadeIn ease 1s;
    -webkit-animation: fadeIn ease 1s;
    -moz-animation: fadeIn ease 1s;
    -o-animation: fadeIn ease 1s;
    -ms-animation: fadeIn ease 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


.contents{
    grid-column: 2;
    grid-row: 2;
    /* display: grid; */
    grid-template-columns: minmax(0,5fr) minmax(0, 4fr) minmax(0,3fr);
    grid-template-rows: minmax(0,4fr) minmax(0,1fr);
    gap: 5px;
    width: 100%;
    height: 100%;
    justify-self: center;
    align-self: center;
}

.expandedDiv{
    grid-row-start: 1 !important; 
    grid-row-end: 4 !important;
    grid-column-start: 1 !important;
    grid-column-end: 4 !important;
}

.ui-buttons{
    background-color: #2671BC;
    border-color: #2671BC;
    border-style: solid;
    border-width: 1px;
    color: white;
    font-weight: 500;
    font-size: 15px;
    border-radius: 10px;
    padding: 5px 20px;
    cursor: pointer;
}
.ui-buttons:active{
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}
.ui-buttons-white{
    background-color: white;
    border-color: #B0B0B0;
    border-style: solid;
    border-width: 1px;
    color: black;
    font-weight: 500;
    font-size: 15px;
    border-radius: 10px;
    padding: 5px 20px;
    cursor: pointer;
}
.ui-buttons-white:active{
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}
.ui-buttons-red{
    background-color: #e06666;
    border-color: #e06666;
    border-style: solid;
    border-width: 1px;
    color: white;
    font-weight: 500;
    font-size: 15px;
    border-radius: 10px;
    padding: 5px 20px;
    cursor: pointer;
}
.ui-buttons-black{
    background-color: #434343;
    border-color: #111;
    border-style: solid;
    border-width: 1px;
    color: white;
    font-weight: 500;
    font-size: 15px;
    border-radius: 10px;
    padding: 5px 20px;
    cursor: pointer;
}

.task-models{
    font-family: Poppins, sans-serif;
}

.model-label{
    border-left: thick double #2671BC;
    border-right: thick double #2671BC;
    padding-left: 0.5%;
    padding-right: 0.5%;
}

.delete-model{
    padding: 5px 10px;
    margin: 0 10px;
}
/* SAVE MODAL */
.modal{
	display: none;
	position: fixed;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0,0,0,0.4);
}
.modal-content{
	background-color: #fefefe;
    margin: 20% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
	height: 200px;
    min-width: 300px;
	max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    border-radius:15px;
}
.modal-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.modal-title{
	font-weight: 500;
	font-size: 20px;
}
.title-container{
    display: flex;
    width: 100%;
    justify-content: center;
}
.model-title{
	margin: 0 1em 0 0;
}
.save-model{
	background-color: #2671BC;
    border-color: #2671BC;
    border-style: solid;
    border-width: 1px;
    color: white;
    font-weight: 500;
    font-size: 15px;
    border-radius: 10px;
    padding: 5px 20px;
    cursor: pointer;
}
.save-model:active{
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}
.save-model:disabled{
    background-color: #ADADAD;
}
.buttons{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.close{
	border: none;
    background-color: transparent;
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
}
.resizeHandle {
    position: absolute;
    right: -10px;
    top: 1%;
    height: 98%;
    width: 10px;
    cursor: col-resize;
}

.resizeHandleVertical {
    position: absolute;
    top: -10px;
    left: 1%;
    width: 98%;
    height: 10px;
    cursor: row-resize;
}

.resizeHandleVisuals {
    background: #33333333;
    width: 2px;
    height: 100%;
    margin: auto;
}

.resizeHandle:hover .resizeHandleVisuals {
    background: #229cf2;
}

.resizeHandleVerticalVisuals {
    background: #33333333;
    height: 2px;
    width: 100%;
    margin: 4px 0;
}

.resizeHandleVertical:hover .resizeHandleVerticalVisuals {
    background: #229cf2;
}

/* Vue Grid */
.vue-grid-layout {
    /* background: red; */
    width: 100%;
    height: 100%;
}
.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    /* border: 1px solid black; */
}
.vue-grid-item .resizing {
    opacity: 0.9;
}
.vue-grid-item .static {
    background: #ccc;
}
.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}
.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}
.vue-grid-item .minMax {
    font-size: 12px;
}
.vue-grid-item .add {
    cursor: pointer;
}
.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
.contents .vue-grid-item.vue-grid-placeholder {
    background: rgb(4, 128, 183);
}

.vue-grid-layout {
    transition: none !important;
}

.vue-grid-item {
    transition: none !important;
}
</style>
