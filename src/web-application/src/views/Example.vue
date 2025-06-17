<template>
    <div class="simulation-view">
        <div class="task">
            <div class="header">
                <div v-if="mode === 'example'" class="info">
                    Example: {{ $store.state.taskInfo.title }} - {{ exampleTitle }}
                </div>
                <div v-else-if="mode === 'student'" class="info">
                    {{student.firstName}}  {{student.lastName}} {{student.studentNumber}} 
                    <span class="unit-task">Unit: {{info.journey.title}} Task: {{info.task.title}}</span>
                </div>
                <div v-if="mode === 'student'" class="model-selection">
                    <label for="task-models">Select a model: </label>
                    <select name="task-models" id="task-models" class="task-models" v-model="selected">
                        <option id="selected-model"
                        v-for="model in models" 
                        :key="model.id" 
                        :value="model">
                            {{ model.title || 'untitled' + model.id }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="contents">
                <ReadOnlyBlocklyComponent id="blockly" ref="workspace" :models="models" :selected="selected" v-on:blocklySetupComplete="initSimulation"/>
                <SimulationComponent id="simulation" class="component" :workspace="workspace" ref="simulation"/>
                <ExperimentComponent id="experiment" class="component" :workspace="workspace" />
                <ChartComponent class="component" :workspace="workspace"/>
            </div>
        </div>
        
    </div>
</template>

<script>
import ReadOnlyBlocklyComponent from '@/components/ReadOnlyBlocklyComponent.vue';
import ChartComponent from '@/components/ChartComponent.vue';
import ExperimentComponent from '@/components/ExperimentComponent.vue';
import SimulationComponent from '@/components/SimulationComponent.vue';
import _ from 'underscore';
import $ from 'jquery';

export default {
    name: 'Simulation',
    components: {
        ReadOnlyBlocklyComponent,
        ChartComponent,
        ExperimentComponent,
        SimulationComponent
    },
    data(){
        return {
            exampleTitle: '',
            task: '',
            workspace: null,
            hasTitle: false,
            selected: {},
            models: [],
            modalType: '',
            mode: '',
            student: {},
            info: ''
        }
    },
    mounted(){
        this.workspace = this.$refs['workspace'].workspace;
        if(window["__STUDENT_INFO__"]){
            this.mode = 'student';
            this.info = window["__TASK_INFO__"];
            window.fv.getStudents((e)=>{
                this.student = _.findWhere(e, {id: parseInt(new URLSearchParams(window.location.search).get('studentId'))});
            });
        }
        else if(window["__EXAMPLE_CONTENT__"]){
            this.exampleTitle = this.$store.state.taskInfo.example.title;
            this.mode = 'example';
        }
        // modularizes layout of simulation view
        if(this.$store.state.taskInfo.viewComponents.includes('chartComponent') && this.$store.state.taskInfo.viewComponents.includes('experimentComponent')){
            $('.contents').css('grid-template-areas', '"workspace model experiment" "workspace chart chart"');
        }
        else if(this.$store.state.taskInfo.viewComponents.includes('chartComponent') && !this.$store.state.taskInfo.viewComponents.includes('experimentComponent')){
            $('.contents').css('grid-template-areas', '"workspace model model" "workspace chart chart"');
            $('#experiment').hide();
        }
        else if(!this.$store.state.taskInfo.viewComponents.includes('chartComponent') && this.$store.state.taskInfo.viewComponents.includes('experimentComponent')){
            $('.contents').css('grid-template-areas', '"workspace model experiment" "workspace model experiment"');
            $('#chart').hide();
        }
        else {
            $('.contents').css('grid-template-areas', '"workspace model model" "workspace model model"');
            $('#chart').hide();
            $('#experiment').hide();
        }
    },
    methods:{
        initSimulation(){
            this.$refs['simulation'].getStarted();
            this.getModels();
        },
        getModels(){
            this.models = window["__STUDENT_INFO__"] || [];
            if(this.models.length > 0){
                this.selected = this.models[this.models.length - 1];
            }
        }
    }
}
</script>

<style>
.simulation-view {
    height: 100%;
    width: 100%;
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
    grid-row-start: 1;
    grid-row-end: 3;
}

#simulation {
    grid-column: 2;
    grid-row: 1;
}

#experiment {
    grid-column: 3;
    grid-row: 1;
}

#chart{
    grid-row: 2;
    grid-column-start: 2;
    grid-column-end: 4;
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
    grid-template-rows: 60px minmax(0, 1fr) 20px;
    height: 100%;
    width: 100%;
    align-items: center;
}

.header{
    display: flex;
    height: 100%;
    grid-column: 2;
    grid-row: 1;
    justify-content: space-between;
    align-items: center;
}

.info{
    font-weight: 500;
    font-size: 30px;
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
    display: grid;
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
    border-width: 0px;
    color: white;
    font-weight: 500;
    font-size: 17px;
    border-radius: 15px;
    padding: 10px;
}

.task-models{
    font-family: Poppins, sans-serif;
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
    border-width: 0px;
    color: white;
    font-weight: 500;
    font-size: 17px;
    border-radius: 15px;
    padding: 10px;
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
.unit-task{
    font-size: 18px;
    font-weight: normal;
}
</style>
