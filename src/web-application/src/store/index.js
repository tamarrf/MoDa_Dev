import Vue from 'vue';
import Vuex from 'vuex';
import Blockly from 'blockly';
// import {ContinuousToolbox, ContinuousFlyout, ContinuousMetrics} from '@blockly/continuous-toolbox';
import { baseBlockLibrary } from '@/data/blockLibraries/baseBlocks.js';
import * as blockStyling from '@/data/blockConfig/blockStyling.json';
import $ from 'jquery';
import _ from 'underscore';
import {
    HID_ONCONNECT,
    HID_ONDISCONNECT,
    HID_ONERROR,
    HID_ONINPUTREPORT,
  } from './mutation-types.js'
import { CONST } from './const'
import task from '@/data/taskContent/taskDescriptions.json';
let categories;

Vue.use(Vuex);
categories = baseBlockLibrary.contents;
Blockly.Themes.Custom = Blockly.Theme.defineTheme('custom', {
    'base': Blockly.Themes.Classic,
    'blockStyles': blockStyling.blockStyles,
    'categoryStyles': blockStyling.categoryStyles,
    'componentStyles': blockStyling.componentStyles,
    'fontStyle': blockStyling.fontStyle,
});
Blockly.ContextMenuRegistry.registry.unregister('blockDelete');
Blockly.ContextMenuRegistry.registry.unregister('blockDisable');

export default new Vuex.Store({
    state: {
        imagePrefix: window["__IMAGE_URL__"] ? (window["__IMAGE_URL__"] + '/') : '',
        blocklyOptions: {
            renderer: 'thrasos',
            comments: true,
            hasCss: true,
            maxInstances: {
                'set': 1,
                'go': 1,
                'mouse_click': 1
            },
            // plugins: {
            //     'toolbox': ContinuousToolbox,
            //     'flyoutsVerticalToolbox': ContinuousFlyout,
            //     'metricsManager': ContinuousMetrics,
            // },
            toolbox: {
                'kind': baseBlockLibrary.kind,
                'contents': categories,
            },
            zoom:
            {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.5,
                pinch: true
            },
            theme: 'custom',
        },
        readOnlyBlocklyOptions: {
            renderer: 'thrasos',
            readOnly: false,
            comments: true,
            hasCss: true,
            maxInstances: {
                'set': 1,
                'go': 1,
                'mouse_click': 1
            },
            // plugins: {
            //     'toolbox': ContinuousToolbox,
            //     'flyoutsVerticalToolbox': ContinuousFlyout,
            //     'metricsManager': ContinuousMetrics,
            // },
            toolbox: {
                'kind': baseBlockLibrary.kind,
                'contents': categories,
            },
            zoom:
            {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.5,
                pinch: true
            },
            theme: 'custom',
        },
        chart: null,
        chart2: null,
        secondChart: null,
        libraries: [],
        taskInfo: {},
        viewMode: 'main',
        unpackable: true,
        runCount: 0,
        simulationData: [],
        // for gogo board,
        datasets: [],
        socket: {
            isConnected: false,
            message: 'disconnected',
          },
          board: {
            status: false,
            dataset: []
          },
          response: {
            command: 0,
            data: 0,
            size: 0,
            status: 0
          }
    },
    mutations: {
        getTask(state){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            let taskId;
            // check if craft instance is available
            if(window["__CONTENT__"]){
                taskId = window["__CONTENT__"].task.stableReference.toLowerCase();
                if (!taskId) {
                    taskId = 'wolf_sheep';
                }
                state.taskInfo = window["__CONTENT__"].task;
                state.taskInfo.taskId = taskId;
                //$('#app').css('height', '100vh');
            }
            else if(window["__EXAMPLE_CONTENT__"]){
                taskId = window["__EXAMPLE_CONTENT__"].journey.example.task.stableReference.toLowerCase();
                state.taskInfo = window["__EXAMPLE_CONTENT__"].journey.example.task;
                state.taskInfo.taskId = taskId;
                state.taskInfo.example = window["__EXAMPLE_CONTENT__"].journey.example;
            }
            else if(window["__STUDENT_INFO__"]){
                // taskId = window["__STUDENT_INFO__"].journey.example.task.title.toLowerCase();
                taskId = window["__TASK_INFO__"].task.stableReference.toLowerCase();
                state.taskInfo = window["__TASK_INFO__"].task;
                state.taskInfo.taskId = taskId;
                state.taskInfo.project = window["__STUDENT_INFO__"][0].progress;
            }
            else{
                taskId = urlParams.get('task');
                if (!taskId) {
                    taskId = 'wolf_sheep';
                }
                state.taskInfo = _.find(task, { taskId: taskId });
                //$('#app').css('height', '100vh');
            }

            state.libraries = [];
            // instantiate Blockly Toolbox
            for (let key of Object.keys(state.taskInfo.blocklyLibrary)){
                let lib = state.taskInfo.blocklyLibrary[key].value;
                state.libraries.push(lib);
            }
        },
        getToolboxMode(state){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            let packStatus = urlParams.get('unpackable');
            if (packStatus === "false"){
                state.unpackable = false;
            }
            else{
                state.unpackable = true;
            }
        },
        clearLibs(state){
            state.libraries = [];
        },
        clearData(state){
            if(state.chart){
                for (let i = 0; i < state.chart.data.datasets.length; i++) {
                    state.chart.data.datasets[i].data = [];
                }
            }
            if(state.chart2){
                for (let i = 0; i < state.chart2.data.datasets.length; i++) {
                    state.chart2.data.datasets[i].data = [];
                }
            }
        },
        appendData(state, {x, y, chart_num}){
            // console.log(`appending data ${x} ${y}`);
            // do not duplicate points with the same x coordinate
            let chart;
            let suffix;

            if (chart_num === 1) {
                chart = state.chart;
                suffix = '';
            } else {
                chart = state.chart2;
                suffix = '_2';
            }

            if(chart){
                for (let i = 0; i < chart.data.datasets.length; i++) {
                    let series_num = i + 1;
                    chart.data.datasets[i].data.push({ x: x, y: y['series' + series_num + suffix] });
                    let length = chart.data.datasets[i].data.length;
                    let borderColor = chart.data.datasets[i].borderColor;
                    let backgroundColor = chart.data.datasets[i].backgroundColor;
                    chart.data.datasets[i].pointBackgroundColor[length - 1] = borderColor;
                    chart.data.datasets[i].pointBorderColor[length - 1] = backgroundColor;
                    //chart.data.datasets[i].pointStyle[length - 1] = 'circle';    
                }
                chart.update('none');
            }
        },
        changeMode(state, mode){
            state.viewMode = mode;
            switch (mode){
                case 'main':
                    $('.expandedDiv').removeClass('expandedDiv');
                    $('#blockly').show();
                    $('#chart').show();
                    $('#simulation').show();
                    $('#experiment').show();
                    if(state.taskInfo.viewComponents.includes('chartComponent') && state.taskInfo.viewComponents.includes('experimentComponent')){
                        $('.contents').css('grid-template-areas', '"workspace model experiment" "workspace chart chart"');
                    }
                    else if(state.taskInfo.viewComponents.includes('chartComponent') && !state.taskInfo.viewComponents.includes('experimentComponent')){
                        $('.contents').css('grid-template-areas', '"workspace model model" "workspace chart chart"');
                        $('#experiment').hide();
                    }
                    else if(!state.taskInfo.viewComponents.includes('chartComponent') && state.taskInfo.viewComponents.includes('experimentComponent')){
                        $('.contents').css('grid-template-areas', '"workspace model experiment" "workspace model experiment"');
                        $('#chart').hide();
                    }
                    else {
                        $('.contents').css('grid-template-areas', '"workspace model model" "workspace model model"');
                        $('#chart').hide();
                        $('#experiment').hide();
                    }
                    break;
                case 'workspace':
                    $('#blockly').addClass('expandedDiv');
                    $('#simulation').hide();
                    $('#chart').hide();
                    $('#experiment').hide();
                    break;
                case 'model':
                    $('#simulation').addClass('expandedDiv');
                    $('#blockly').hide();
                    $('#chart').hide();
                    $('#experiment').hide();
                    break;
            }
        },
        incrementRunCount(state){
            state.runCount += 1;
        },
        resetCharts(state){
            state.runCount = 0;
        },
        // for gogo board
        [HID_ONCONNECT](state) {
            state.socket.isConnected = true
            state.board.status = false
            console.log(HID_ONCONNECT)
          },
          [HID_ONDISCONNECT](state) {
            state.socket.isConnected = false
            state.socket.message = 'disconnected'
            state.board.status = false
            console.log(HID_ONDISCONNECT);
          },
          [HID_ONERROR](state, event) {
            console.error(state, event)
          },
          [HID_ONINPUTREPORT](state, message) {
            if (message != undefined) {
              if (message[0] == CONST.response_packet_type) {
                state.response.size = message[1]
                state.response.command = message[2]
                state.response.status = message[3]
                state.response.data = message.filter(function (value, index) { return index > 3; })
              }
              else {
                state.socket.message = message
              }
              if (!state.board.status)
                state.board.status = true
            }
            else {
              if (state.board.status) {
                state.board.status = false
                state.socket.message = "disconnected"
              }
            }
          },
          clear_response_socket(state) {
            state.response.size = 0
            state.response.status = 0
            state.response.data = 0
            state.response.command = 0
          }
    },
    actions: {
        initTask({ commit }) {
            commit("getTask");
            // commit("clearLibs");
            commit("getToolboxMode");
        },
        // for gogo board
        connectDevice: function () {
            Vue.prototype.$webhidConnect();
        },
        sendHID: async function (context, data) {
            if (Vue.prototype.$webhid) {
                let sendData = data.slice(1)  //? data must be 63 bytes without report id
                await Vue.prototype.$webhid.sendReport(0, new Uint8Array(sendData))
            }
        },
        clearResponseHID: function (context) {
            context.commit('clear_response_socket');
        }
    },
    modules: {
    },
    getters: {
        gogoReport: state => state.socket.message,
        gogoResponse: state => state.response,
        boardStatus: state => state.board.status,
    }
})
