<template>
    <div style="display: grid;">
        <div class="diff-widget">

            <div class="widget-checkbox-label">grid</div>
            <label class="widget-checkbox">
                <input v-on:input="onGridUpdate" type="checkbox" id="grid" checked/>
                <div class="checkmark"></div>
            </label>
        
            <div class="widget-slider-label">temperature</div>
            <input v-on:input="onTemperatureUpdate" @change="logInteractionData('slider', 'temperature', $event.target.value)" type="range" min="0" max="50" value="25" step="1" class="widget-slider" id="temperature">
            <div class="temp-widget-label">{{ tempText }}</div>
            <div class="temp-widget-value">
                <div class="temperature">{{ temp }}</div><div class="units">° C</div>
            </div>

            <div class="diffusion-complete">
                <button id="diffusionComplete" v-on:click="diffusionClicked" class="ui-buttons" :disabled="completeClicked">Stop Diffusion</button>
            </div>
            <div class="timer">{{$props.ticks}} ticks</div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'diffusionWidgetComponent',
    props: ['ticks'],
    data(){
        return{
            completeEvent: '',
            completeClicked: false,
            temp: 25,
            grid: true,
            tempText: 'medium'
        }
    },
    mounted()
    {
        this.completeEvent = new CustomEvent('complete');

        window.addEventListener("SetupComplete", () =>{
            this.completeClicked = false;
        });
    },
    methods:
    {
        logInteractionData(widgetType, variableName, value){
          let dataLog = {
            component_type: "widget",
            component_data: {
              widget_type: widgetType,
              variable_name: variableName,
              value: value,
            }
          }
          let logString = JSON.stringify(dataLog)
          if (window.fv && window["__USER_ID__"]) {
            window.fv.log(logString)
          }
        },
        diffusionClicked(){
            this.completeClicked = true;
            window.dispatchEvent(this.completeEvent);
        },
        onGridUpdate(){
            this.grid = $("#grid").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'grid?', value: this.grid});
        },
        onTemperatureUpdate(){
            this.temp = $("#temperature").val();
            this.$emit('sendValue', {type:'fv-slider', name:'temperature', value: this.temp});
            const percent = (this.temp - ($("#temperature")[0].min)) / ($("#temperature")[0].max-$("#temperature")[0].min) * 100;
            if (parseInt(this.temp) > 35){
                this.tempText = 'high';
            }
            else if(parseInt(this.temp) < 36 && parseInt(this.temp) > 14){
                this.tempText = 'medium';
            }
            else{
                this.tempText = 'low';
            }
            $("#temperature").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
    }
}
</script>

<style scoped>
.ui-buttons{
    font-weight: bold;
    font-size: 17px;
    padding: 5px 15px;
}

.ui-buttons:disabled{
    background-color: #adadad;
    color: #fff;
}
.widget-slider-label{
    grid-row: 1;
    grid-column: 1;
    justify-self: center;
    align-self: center;
}

.diffusion-complete{
    font-size: 13px;
    grid-row: 3;
    grid-column-start: 1;
    grid-column-end: 4;
    justify-self: center;
    align-self: center;
}

.diff-widget{
    display: grid;
    grid-template-rows: minmax(0,1fr) minmax(0,1fr) minmax(0,1.5fr);
    grid-template-columns: minmax(0,4fr) minmax(0,1fr) minmax(0,1fr);
    font-size: 13px;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.widget-checkbox-label{
    justify-self: center;
    align-self: center;
    grid-row: 1;
    grid-column: 3;
}

.widget-checkbox{
    grid-row: 2;
    grid-column: 3;
    align-self: center;
    justify-self: center;
}

.widget-slider{
    grid-row: 2;
    grid-column: 1;
    justify-self: center;
    align-self: center;
}

.temp-widget-label{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-row: 1;
    grid-column: 2;
}

.temperature{
    background-color: #666666;
    padding: 1px 5px;
    color: white;
    border-radius: 6px;
    border-color: #333333;
    border-style: solid;
    border-width: 1px;
    margin: 0 5px;
    width: 18px;
    text-align: center;
}

.units{
    width: 20px;
}

.temp-value-container{
    display: flex;
    flex-direction: column;
    grid-row: 2;
    grid-column: 2;
}

.temp-widget-value{
    display: flex;
    align-items: center;
    grid-row: 2;
    grid-column: 2;
}

.timer{
    grid-row: 3;
    grid-column-start: 2;
    grid-column-end: 4;
    justify-self: center;
    align-items: center;
}
</style>
