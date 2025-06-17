<template>
    <div class="simulation-component">
        <!-- Top Title -->
        <div class="title">
            <div v-if="modelLanguage === 'pt_br'" class="label">Modelo</div>
            <div v-else-if="modelLanguage === 'en'" class="label">Model</div>
            <div class="component-buttons">
                <!-- <input type="image" class="screenshot" :src="$store.state.imagePrefix ? $store.state.imagePrefix + 'camera.png' : require('@/assets/camera.png')" alt="camera" /> -->
                <button class="screenshot zoom" @click="zoomIn()">+</button>
                <button class="screenshot zoom" @click="zoomOut()">-</button>
                <!-- <input type="image" :src="$store.state.viewMode === 'main' ? expandSrc : shrinkSrc" class="change-mode" :class="$store.state.viewMode === 'main' ? 'expand':'shrink'" v-on:click="changeViewMode" > -->
            </div>
        </div>
        <!-- Netlogo Default Buttons -->
        <div class="controls-container">
            <div class="netlogo-buttons" v-if="ready">
                <div class="simulation-buttons">
                    <template v-if="modelLanguage === 'pt_br'">
                        <button v-on:click="setupClicked" class="widget buttons flag" title="preparar"><img :src="$store.state.imagePrefix ? $store.state.imagePrefix + 'start-flag.png' : require('@/assets/start-flag.png')" alt="start flag" /></button>
                        <button v-if="!onlyGoOnce" v-on:click="goClicked" class="widget buttons" title="executar"><img id="go-button" :class= "playing ? 'go-pause' : 'go-play'" :src= "playing ? pauseSrc : playSrc" alt="play/pause button" /></button>
                        <button v-on:click="goOnceClicked" class="widget buttons" title="executar uma vez" v-bind:disabled= "playing ? true: false"><img :src="$store.state.imagePrefix ? $store.state.imagePrefix + 'play-once.png' : require('@/assets/play-once.png')" alt="play once" /></button>
                        <div v-if="!onlyGoOnce" class="label">velocidade <br> do modelo</div>
                    </template>
                    <template v-else-if="modelLanguage === 'en'">
                        <button v-on:click="setupClicked" class="widget buttons flag" title="setup"><img :src="$store.state.imagePrefix ? $store.state.imagePrefix + 'start-flag.png' : require('@/assets/start-flag.png')" alt="start flag" /></button>
                        <button v-if="!onlyGoOnce" v-on:click="goClicked" class="widget buttons" title="go"><img id="go-button" :class= "playing ? 'go-pause' : 'go-play'" :src= "playing ? pauseSrc : playSrc" alt="play/pause button" /></button>
                        <button v-on:click="goOnceClicked" class="widget buttons" title="go once" v-bind:disabled= "playing ? true: false"><img :src="$store.state.imagePrefix ? $store.state.imagePrefix + 'play-once.png' : require('@/assets/play-once.png')" alt="play once" /></button>
                        <div v-if="!onlyGoOnce" class="label">model <br> speed</div>
                    </template>
                    <div v-if="!onlyGoOnce" class="speed-container">
                        <input v-on:input="onSliderUpdate" type="range" min="-1" max="1" value="0" step="0.01" class="slider" id="speedRange">
                    </div>
                </div>
            </div>
        </div>
        <!-- NetLogo Simulation Canvas / iframe -->
        <div id="netlogo-content" class="content">
            <div id="netlogo" class="iframe-container" style="overflow: auto">
                <iframe style="width: 100%; height: 100%;" :style="getiFrameStyle()" v-bind:src="iframe" :class="{ active:!recompiling || !setupHasBeenClicked || errorMessage, loading: (recompiling && !errorMessage)}"/>
                <div class="loader" :class="{ hide:(ready && (!recompiling || !setupHasBeenClicked) || errorMessage), show: recompiling && !errorMessage}">
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    <p v-if="!ready" class="waiting"></p>
                    <p v-if="!ready" class="loading"></p>
                    <div class="buttons">
                        <button id="sendMessage" class="button" disabled="disabled" v-if="!setupHasBeenClicked"></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- NetLogo Widget Buttons -->
        <div v-if="ready" class="widgets">
            <!-- Dynamic content component for simulation specific components with a function that passes data back to parent -->
            <component :is="widgetComponent" v-on:sendValue="onReceiveVal" :ticks="ticks" ref="widgetComponent"></component>
        </div>
    </div>
</template>

<script>
import Blockly from 'blockly';
import $ from 'jquery';
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
export default {
    name: 'SimulationComponent',
    props: ['workspace'],
    data(){
        return{
            // distribution code for this task (just the .nlogo file)
            baseNLogo: '',
            errorMessage: false,
            goFunction: 'blocks-go',
            //iframe: 'http://localhost:9000/launch',
            iframe: new URLSearchParams(window.location.search).get('debug') ? "http://localhost:9000/launch" : "https://galapagos.moda.education/launch",
            series: {},
            loaded: false,
            newPatchSize: '',
            // this is the entire netlogo script as a string including blocks
            nlscript: '',
            playing: false,
            preNLogo: '',
            ready: false,
            recompiling: false,
            setupFunction: 'blocks-set',
            setupHasBeenClicked: false,
            simulationRunning: false,
            temp: 25,
            ticks: 0,
            widgetComponent: '',
            playSrc: this.$store.state.imagePrefix ? this.$store.state.imagePrefix + 'play.png' : require('@/assets/play.png'),
            pauseSrc: this.$store.state.imagePrefix ? this.$store.state.imagePrefix + 'pause.png' : require('@/assets/pause.png'),
            expandSrc:  this.$store.state.imagePrefix ? this.$store.state.imagePrefix + 'expand.png' : require('@/assets/expand.png'),
            shrinkSrc:  this.$store.state.imagePrefix ? this.$store.state.imagePrefix + 'shrink.png' : require('@/assets/shrink.png'),
            zoom: 1,
            modelLanguage: '',
            onlyGoOnce: false,
        }
    },
    mounted(){
        if(this.$store.state.taskInfo.taskId === 'moda_math' || 
           this.$store.state.taskInfo.taskId === 'moda_math_1quad' ||
           this.$store.state.taskInfo.taskId === 'moda_math_1quad_basic' ||
           this.$store.state.taskInfo.taskId === 'moda_math_transform'){
            this.onlyGoOnce = true;
        }
        if(this.$store.state.taskInfo.taskId?.endsWith('pt_br')){
            this.modelLanguage = 'pt_br';
        } else {
            this.modelLanguage = 'en';
        }
        // Import widget component with webpack
        const widgetPath = this.$store.state.taskInfo.widget + '.vue';
        import(/* webpackChunkName: "[request]" */ `@/components/widgetComponents/${widgetPath}`).then(module => {
            this.widgetComponent = module.default;
        });
    },
    methods:
    {   
        getiFrameStyle(){
            return {
                transform: `scale(${this.zoom})`,
                transformOrigin: `0px 0px`
            }
        },
        zoomIn(){
            this.zoom += 0.1;
            if (this.zoom > 10) this.zoom = 10;
        },
        zoomOut(){
            this.zoom -= 0.1;
            if (this.zoom < 0.1) this.zoom = 0.1;
        },
        getStarted(){
            this.resizeNetlogo();
            this.initialize();
        },
        getparams(requestedProperty) {
            const vars = {};
            window.location.href.replace(/[?&#]+([^=&]+)=([^&]*)/gi, ((m, key, value) => {
                vars[key] = value;
            }));
            for (const prop in vars) {
                if (vars[prop].toLowerCase() === 'true')
                    vars[prop] = true;
                else if (vars[prop].toLowerCase() === 'false')
                    vars[prop] = false;
                else if (!isNaN(parseFloat(vars[prop])) && !vars[prop].match(/[^0-9]+/gim))
                    vars[prop] = parseFloat(vars[prop]);
            }
            if (requestedProperty)
                return vars[requestedProperty];
            return vars;
        },
        download(input, title) {
            const content = new Blob([ input ]);
            const a = window.document.createElement('a');
            a.href = window.URL.createObjectURL(content);
            a.download = title;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        setupClicked(){
            $('.flag').removeClass('pulse');
            this.completeClicked = false;
            // Clears out chart
            this.$store.commit('clearData');
            this.playing = false;
            // Do this stuff only the first time a model is loaded
            if (!this.setupHasBeenClicked){
                this.resizeNetlogo();
                // this.setupFunction = this.$store.state.taskInfo.setupFunction;
                $("iframe").get(0).contentWindow.postMessage({type: "fv-button-click", buttons: [{name: this.setupFunction}]}, "*");
                this.setupHasBeenClicked = true;
            }
            // Recompile subsequent times on the setup button
            else{
                this.$store.commit('incrementRunCount');
                new URLSearchParams(window.location.search).get('debug') ? $("iframe").get(0).contentWindow.postMessage({type: "fv-button-click", buttons: [{name: this.setupFunction}]}, "*") : this.recompileClicked();
            }
            
            // Initiate the chart data
            this.ticks = 0;
            if(this.$store.state.taskInfo.taskId === 'heat' ||
               this.$store.state.taskInfo.taskId === 'diffusion' ||
               this.$store.state.taskInfo.taskId === 'diffusion_v2' ||
               this.$store.state.taskInfo.taskId === 'diffusion_v2_pt_br' ||
               this.$store.state.taskInfo.taskId === 'diffusion-gogo' ||
               this.$store.state.taskInfo.taskId === 'virus' ||
               this.$store.state.taskInfo.taskId === 'photossynthesis' ||
               this.$store.state.taskInfo.taskId === 'wolf_sheep' ||
               this.$store.state.taskInfo.taskId === 'eutrophication_v2' ||
               this.$store.state.taskInfo.taskId === 'eutrophication_v2_pt_br'){
                this.series.series1 = 0;
                this.series.series2 = 0;
                this.series.series3 = 0;
                this.series.series4 = 0;
                this.series.series5 = 0;
                this.series.series6 = 0;
                this.series.series7 = 0;
                this.$store.commit('appendData', {x: this.ticks, y: this.series, chart_num: 1});
                
                this.series.series1_2 = 0;
                this.series.series2_2 = 0;
                this.series.series3_2 = 0;
                this.series.series4_2 = 0;
                this.series.series5_2 = 0;
                this.series.series6_2 = 0;
                this.series.series7_2 = 0;
                this.$store.commit('appendData', {x: this.ticks, y: this.series, chart_num: 2});
            }
            
            // for data logging
            const text  = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.$props.workspace, true));
            if(window.fv && window["__USER_ID__"] && !window["__EXAMPLE_CONTENT__"] && !window["__STUDENT_INFO__"]){
                window.fv.saveEvent( 'setup clicked', null, text)
            }

            if(this.getparams("download") === true) {
                this.download(text,"workspace.txt");
                this.download(this.nlscript, "nlscript.txt");
            }
            console.log(this.nlscript)

            // Clear out simulation data
            this.$store.state.simulationData = [];

            window.dispatchEvent(new CustomEvent('SetupComplete'));

            this.resizeNetlogo();
            //console.log(this.nlscript);
        }, 
        goClicked(){
            this.simulationRunning = true;
            this.playing = !this.playing;
            // Differentiate between play and pause (when go forever is true)
            if(this.playing) {
                $("iframe").get(0).contentWindow.postMessage({type: "fv-button-click", buttons: [{name: this.goFunction, forever:true}]}, "*");
            } else {
                $("iframe").get(0).contentWindow.postMessage({type: "fv-button-click", buttons: [{name: this.goFunction, forever:false}]}, "*");
            }
            // for data logging
            const text = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.$props.workspace, true));
            if(window.fv && window["__USER_ID__"] && !window["__EXAMPLE_CONTENT__"] && !window["__STUDENT_INFO__"]){
                window.fv.saveEvent( 'go clicked', null, text)
            }

            if(this.getparams("download") === true) {
                const downloadable = `${this.nlscript}\n; --- END BLOCKLY GENERATED NETLOGO ---\n${this.baseNLogo.split('; --- END BLOCKLY GENERATED NETLOGO ---')[1]}`
                this.download(text,"workspace.txt");
                this.download(downloadable, "nlscript.txt");
            }
            
        },
        goOnceClicked(){
            // Equivalent to Go Once using the function defined in the taskDescriptions.json
            $("iframe").get(0).contentWindow.postMessage({type: "fv-button-click", buttons: [{name: this.goFunction}]}, "*");
        },
        recompileClicked(){
            $("iframe").get(0).contentWindow.postMessage({type: "fv-set-error-message", visible: false}, "*");
            this.recompiling = true;
            // Replace .nlogo file with blockly code and remove the widget definition at the bottom of the file
            this.preNLogo = this.baseNLogo.split('; --- END BLOCKLY GENERATED NETLOGO ---')[0];
            this.nlscript = this.preNLogo.replace(';BLOCKLY CODE GOES HERE', this.getCodeFromBlocks());
            
            $("iframe").get(0).contentWindow.postMessage({type: "fv-recompile", script: this.nlscript}, "*");
            
            // this.nlscript = this.baseNLogo.replace(';BLOCKLY CODE GOES HERE', this.getCodeFromBlocks());
            // $("iframe").get(0).contentWindow.postMessage({type: "fvloadscript", script: this.nlscript}, "*");
            
            this.resizeNetlogo();
        },
        getCodeFromBlocks(){
            return netlogoGenerator.workspaceToCode(this.$props.workspace);
        },
        initialize(){
            let fvreadyCount = 0;
            // Listen for messages from iframe
            window.addEventListener("message", (e) => {
                const type = e.data.type;
                if(e.data.type ==="fv-actions-registered"){
                    // console.log(e.data.type)
                }
                switch(type) {
                    case "fvready":
                        if(fvreadyCount === 0){
                            fvreadyCount += 1;
                            $('#sendMessage').click();
                        }
                        // $("button").attr("disabled", null);
                        $(".loader").addClass("ready");
                    break;
                    case "fvrunning":
                        this.ready = true;
                        if (!this.loaded) {
                            this.loaded = true;
                        }
                        $(".iframe-container").addClass("render");
                        // Simulate a setup click on initial load
                        if (!this.setupHasBeenClicked && this.ready){
                            this.setupClicked();
                        }
                    break;
                    case "fv-recompile-complete":
                        setTimeout(() => {
                            this.recompiling = false;
                        }, 1500);
                        $("iframe").get(0).contentWindow.postMessage({type: "fv-button-click", buttons: [{name: this.setupFunction}]}, "*");
                    break;
                    case "fv-tick-count":
                        this.ticks = e.data.count;
                        if (this.$store.state.taskInfo.taskId === 'eutrophication_v2' || this.$store.state.taskInfo.taskId === 'eutrophication_v2_pt_br') {
                            this.ticks = this.ticks * 10;
                        }
                        // Update chart with current temperature
                        if((this.$store.state.taskInfo.taskId === 'heat' ||
                           this.$store.state.taskInfo.taskId === 'diffusion' ||
                           this.$store.state.taskInfo.taskId === 'diffusion_v2' ||
                           this.$store.state.taskInfo.taskId === 'diffusion_v2_pt_br' ||
                           this.$store.state.taskInfo.taskId === 'diffusion-gogo' ||
                           this.$store.state.taskInfo.taskId === 'virus' ||
                           this.$store.state.taskInfo.taskId === 'photossynthesis' ||
                           this.$store.state.taskInfo.taskId === 'wolf_sheep' ||
                           this.$store.state.taskInfo.taskId === 'eutrophication_v2' ||
                           this.$store.state.taskInfo.taskId === 'eutrophication_v2_pt_br') && this.ticks > 0){
                                this.$store.commit('appendData', {x: this.ticks, y: this.series, chart_num: 1});    
                                this.$store.commit('appendData', {x: this.ticks, y: this.series, chart_num: 2});
                        }

                        if (this.ticks > 0) this.$store.state.simulationData.push([this.ticks, parseInt(this.series.series1)]);
                    break;
                    case "fv-canvas-click": {
                        let dataLog = {
                          component_type: "simulation",
                          component_data: {
                            interaction_type: "canvas click",
                            interaction_data : {
                              x: e.data.event.x,
                              y: e.data.event.y
                            }
                          }
                        }
                        let logString = JSON.stringify(dataLog)
                        if (window.fv && window["__USER_ID__"]) {
                          window.fv.log(logString)
                        }
                    break;}
                    case "fv-monitor":
                        if(e.data.displayName === 'ink spread (%)') {
                            this.series.series1 = parseInt(e.data.value);
                        } else {
                            this.series[e.data.displayName] = parseInt(e.data.value);
                        }
                    break;
                    case "fv-get-error-message":
                        this.errorMessage = e.data.visible;
                    break;
                    default:
                }
            });
            // Listen for window resize to adjust the size of the netlogo canvas
            window.addEventListener("resize", this.resizeNetlogo);
            window.addEventListener("complete", () =>{
                if(this.playing){
                    this.goClicked();
                    if((this.$store.state.taskInfo.taskId === 'heat' ||
                        this.$store.state.taskInfo.taskId === 'diffusion' ||
                        this.$store.state.taskInfo.taskId === 'diffusion_v2' ||
                        this.$store.state.taskInfo.taskId === 'diffusion_v2_pt_br' ||
                        this.$store.state.taskInfo.taskId === 'diffusion-gogo' ||
                        this.$store.state.taskInfo.taskId === 'virus' ||
                        this.$store.state.taskInfo.taskId === 'photossynthesis' ||
                        this.$store.state.taskInfo.taskId === 'wolf_sheep' ||
                        this.$store.state.taskInfo.taskId === 'eutrophication_v2' ||
                        this.$store.state.taskInfo.taskId === 'eutrophication_v2_pt_br') && this.$store.state.secondChart?.data.datasets[0].data){
                        // multi run
                        // const length = this.$store.state.chart.data.datasets[this.$store.state.runCount].data.length;
                        // let spread = this.$store.state.chart.data.datasets[this.$store.state.runCount].data[length - 1];
                        // single run
                        const length = this.$store.state.chart.data.datasets[0].data.length;
                        let spread = this.$store.state.chart.data.datasets[0].data[length - 1];

                        this.$store.state.secondChart.data.datasets[0].data.push({x: this.temp, y: spread.y});
                    }
                    this.$store.state.secondChart?.update();
                    if(window.fv && window["__USER_ID__"] && !window["__EXAMPLE_CONTENT__"] && !window["__STUDENT_INFO__"]){
                        window.fv.saveChartData([{
                            id: 'ink spread over time',
                            data: this.$store.state.chart.data.datasets[0].data
                        }, this.$store.state.secondChart ?? {
                            id: 'ink spread by temperature',
                            data: this.$store.state.secondChart.data.datasets[0].data
                        }])
                    }
                }
            })
            this.loadTestScript();
        },
        loadTestScript() {
            // TODO get script from back end for the specific task
            const taskScript = this.$store.state.taskInfo.script;
            const script = new URLSearchParams(window.location.search).get('debug') ? this.$store.state.taskInfo.debugFile : taskScript;

            // this.getCodeFromBlocks();
            $.ajax({
                url: script,
                success: this.onLoadScript,
                dataType: "text",
                mimeType: "text/plain"
            })
        },
        onLoadScript(e) {
            this.baseNLogo = e;
            this.nlscript = e.replace(';BLOCKLY CODE GOES HERE', this.getCodeFromBlocks());
            $("#sendMessage").click(this.sendTestMessage);
        },
        sendTestMessage() {
            $(".loader").removeClass("ready").addClass("loading");
            $("iframe").get(0).contentWindow.postMessage({type: "fvloadscript", script: this.nlscript}, "*");
        },
        onSliderUpdate() {
            const value = $("#speedRange").val();
            // Used to change progress of slider color dynamically
            const percent = (value - ($("#speedRange")[0].min)) / ($("#speedRange")[0].max-$("#speedRange")[0].min) * 100;
            $("#speedRange").css('background','linear-gradient(to right, #2671BC 0%, #2671BC ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
            $("iframe").get(0).contentWindow.postMessage({type: "fv-speed", speed: value}, "*");
        },
        resizeNetlogo(){
            let dimension;
            // Calculate new patch size based on worldWidth and 15 pixels smaller than the content window so there is no overlap on the borders
            if ($(".content").height() < $(".content").width()){
                this.newPatchSize = ($(".content").height() - 15) / this.$store.state.taskInfo.worldWidth;
            }
            else{
                this.newPatchSize = ($(".content").width() - 15) / this.$store.state.taskInfo.worldWidth;
            }
            this.newPatchSize = this.newPatchSize.toFixed(2);
            
            // Model needs to redraw patches in go for this to work
            $("iframe").get(0).contentWindow.postMessage({type: "fv-patch-size", patchSize: parseFloat(this.newPatchSize)}, "*");
            // Calculate the netlogo div size based on patch size
            dimension = this.newPatchSize * this.$store.state.taskInfo.worldWidth;
            $("#netlogo").css('height', dimension);
            $("#netlogo").css('width', dimension);
        },
        changeViewMode(){
            // Swap view mode to show larger simulation
            if(this.$store.state.viewMode === 'main'){
                this.$store.commit('changeMode', 'model');
            }
            else{
                this.$store.commit('changeMode', 'main');
            }
            // setTimeout(()=>{
                this.resizeNetlogo();
            // }, 500)
        },
        onReceiveVal(widgetParameters){
            // get data from children components
            if(this.$store.state.taskInfo.taskId === 'diffusion' ||
               this.$store.state.taskInfo.taskId === 'diffusion_v2' ||
               this.$store.state.taskInfo.taskId === 'diffusion_v2_pt_br' ||
               this.$store.state.taskInfo.taskId === 'diffusion-gogo' ||
               this.$store.state.taskInfo.taskId === 'virus'||
               this.$store.state.taskInfo.taskId === 'heat' ||
               this.$store.state.taskInfo.taskId === 'photossynthesis' ||
               this.$store.state.taskInfo.taskId === 'wolf_sheep' ||
               this.$store.state.taskInfo.taskId === 'eutrophication_v2' ||
               this.$store.state.taskInfo.taskId === 'eutrophication_v2_pt_br' ||
               this.$store.state.taskInfo.taskId === 'moda_math' ||
               this.$store.state.taskInfo.taskId === 'moda_math_1quad' ||
               this.$store.state.taskInfo.taskId === 'moda_math_1quad_basic' ||
               this.$store.state.taskInfo.taskId === 'moda_math_transform' ||
               this.$store.state.taskInfo.taskId === 'moda_art'){
                this.temp = parseInt(widgetParameters.value);
            }
            $("iframe").get(0).contentWindow.postMessage({type: widgetParameters.type, buttons: [{name: widgetParameters.name, value: widgetParameters.value }]}, "*");
        },
    }
}
</script>

<style scoped>
.content{
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 3;
}

#netlogo{
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.component-buttons{
    display: flex;
    width: 70px;
    justify-content: space-evenly;
}

.widgets{
    background-color: #E9E9E9;
    width: 100%;
    border-style: solid;
    border-color: #B5B5B6;
    border-width: 2px 0 0 0;
}

.slider{
    grid-row: 2;
    grid-column: 1;
    justify-self: center;
    align-self: center;
}

.speed-container{
    background-color: #F4F5F7;
    display: flex;
    height: 22px;
    justify-content: center;
    align-items: center;
    width: 40%;
    border-radius: 50px;
}

input[type='range']{
    border-radius: 50px;
    width: 85%;
    outline: none;
    transition: background 450ms ease-in;
    -webkit-appearance: none;
}

#speedRange {
    height: 2px;
    background: linear-gradient(to right, #2671BC 0%, #2671BC 50%, #ADADAD 50%, #ADADAD 100%);
}

input[type='range']::-webkit-slider-thumb {
    border: 2px solid #515151;
    height: 17px;
    width: 17px;
    border-radius: 50px;
    background: #FFFFFF;
    cursor: pointer;
    -webkit-appearance: none;
}

input[type='range']::-moz-range-thumb {
    border: 2px solid #515151;
    height: 17px;
    width: 17px;
    border-radius: 50px;
    background: #FFFFFF;
    cursor: pointer;
}

input[type='range']::-ms-thumb {
    margin-top: 1px;
    border: 2px solid #515151;
    height: 17px;
    width: 17px;
    border-radius: 50px;
    background: #FFFFFF;
    cursor: pointer;
}

.simulation-component{
    display: grid;
    grid-template-rows: 41px 40px minmax(0, 1fr) 100px;
    grid-template-columns: 100%;
}

.title{
    display: flex;
    border-style: solid;
    border-width: 0 0 2px 0;
    border-color: #B5B5B6;
    padding: 5px 10px;
    justify-content: space-between;
    font-weight: 500;
}

.label{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column: 2;
}

.netlogo-buttons{
    background-color: #E0E0E0;
    border-style: solid;
    border-color: #B5B5B6;
    border-width: 0 0 2px 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
}

.simulation-buttons{
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    font-size: 13px;
    align-items: center;
}

.widget{
    width: 30px;
    height: 30px;
}

.widget.text-buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #2671BC;
    color: white;
    border-width: 0px;
    border-radius: 50%;
    font-size: 10px;
    padding: 2px;
    box-sizing: border-box;
}

.widget.buttons {
    background-color: #FFFFFF;
    border-radius: 50%;
    border-width: 0px;
    padding: 0px;
    display: flex;
}

.widget.buttons.flag {
    background-color: #2671BC;
    padding: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    box-shadow: 0 0 0 0 rgba(41, 58, 216, 1);
    transform: scale(1);
}
.widget.buttons.flag.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(41, 58, 216, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(41, 58, 216, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(41, 58, 216, 0);
    }
}

.widget.buttons img{
    width: 100%;
    height: 100%;
}

.diffusion-complete button{
    font-size: 10px;
}

html {
    background: #343434;
    font-family: 'Roboto', sans-serif;
    color: white;
}

h1, .buttons {
    text-align: center;
    font-family: inherit;
    color: inherit;
}

.button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-family: inherit;
    font-size: 1rem;
    color: black;
    background: #FFFFFF;
    border: 0;
    cursor: pointer;
    display: none;
    padding: 0.25rem 0.625rem;
    border-radius: 1.5rem;
}

button:disabled {
    cursor: default;
    opacity: 0.5;
}

iframe {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

iframe.loading {
    display: none !important;
}

.render iframe {
    display: block;
}

.loader p {
    display: none;
    color: #343434;
    text-align: center;
    margin: 0;
    padding: 0;
}

.loader:not(.ready):not(.loading) p.waiting,
.loader.ready p.ready,
.loader.loading p.loading{
    display: block;
}

.loader.ready button {
    display: inline-block;
}

.lds-ellipsis {
    display: block;
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto;
}

.loader.show {
    display: block !important;
}

.render .loader, .loader.hide{
    display: none;
}

.lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #bbcff3;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}

.screenshot.zoom {
    color: blue;
    aspect-ratio: 1;
    cursor: pointer;
}

@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}

@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
}

/* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #acacac #ffffff;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #acacac;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }

</style>
