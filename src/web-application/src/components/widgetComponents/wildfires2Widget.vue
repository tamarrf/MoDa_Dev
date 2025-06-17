<template>
    <div style="display: grid;">
        <div class="wildfire-widget">
            <div class="left-col">
                <div class="widget-slider-label">Wind Direction</div>
                <div class="compass-container">
                    <div class="compass-label">{{ windDirection }}°</div>
                    <round-slider
                        v-model="windDirection"
                        v-bind:tooltipFormat="tooltipText"
                        min="0"
                        max="359"
                        width="5"
                        startValue="windDirection"
                        start-angle="90"
                        line-cap="round"
                        radius="30"
                        handleSize="+10"
                        showTooltip="false"
                        rangeColor="#ADADAD"
                        pathColor="#ADADAD"
                        handleColor="#515151"
                        @input="logInteractionData('round slider', 'wind direction', $event)"
                    />
                </div>
            </div>
            <div class="right-col">
                <div class="speed-container">
                    <div class="widget-slider-label">Wind Speed</div>
                    <div class="speed-widget-label">{{ windSpeed }} km/h</div>
                </div>
                
                <input v-model="windSpeed" v-on:input="onSpeedUpdate" @change="logInteractionData('slider', 'wind speed', $event.target.value)" type="range" min="0" max="50" value="10" step="1" class="widget-slider" id="wind-speed">
                <div class="heat-map-container">
                    <label class="widget-checkbox">
                        <input v-model="heatMap" @change="logInteractionData('checkbox', 'heat map', heatMap)" type="checkbox" id="heat-map"/>
                        <div class="checkmark"></div>
                    </label>
                    <div class="widget-checkbox-label">Heat Map</div>
                </div>
            <!--
                <div class="temperature-container">
                    <label class="widget-checkbox">
                        <input v-model="temperature" type="checkbox" id="temperature"/>
                        <div class="checkmark"></div>
                    </label>
                    <div class="widget-checkbox-label">Temperature</div>
                </div>
                <div class="side-view-container">
                    <label class="widget-checkbox">
                        <input v-model="sideView" type="checkbox" id="side-view"/>
                        <div class="checkmark"></div>
                    </label>
                    <div class="widget-checkbox-label">Side View</div>
                </div>
            -->
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import RoundSlider from 'vue-round-slider';
export default {
    name: 'wildfiresWidgetComponent',
    components:{
        RoundSlider
    },
    data(){
        return{
            temperature: false,
            sideView: false,
            windDirection: 90,
            windSpeed: 10,
            heatMap: false
        }
    },
    mounted(){
        this.onSpeedUpdate();
    },
    methods:{
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
        onSpeedUpdate(){
            const percent = (this.windSpeed - ($("#wind-speed")[0].min)) / ($("#wind-speed")[0].max-$("#wind-speed")[0].min) * 100;
            $("#wind-speed").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        tooltipText(e){
            return e.value + '°'
        }

    },
    watch: {
        temperature: function(){
            this.$emit('sendValue', {type:'fv-checkbox', name:'temperature', value: this.temperature});
        },
        sideView: function(){
            this.$emit('sendValue', {type:'fv-checkbox', name:'side-view', value: this.sideView});
        },
        windSpeed: function(){
            this.$emit('sendValue', {type:'fv-slider', name:'wind-speed', value: this.windSpeed});
        },
        windDirection: function(){
            this.$emit('sendValue', {type:'fv-slider', name:'wind-direction', value: this.windDirection});
        },
        heatMap: function(){
            this.$emit('sendValue', {type:'fv-checkbox', name:'heat-map', value: this.heatMap});
        },
    }
}
</script>

<style scoped>
    .wildfire-widget{
        display: grid;
        grid-template-columns: minmax(0,1fr) minmax(0,2fr);
        grid-template-rows: 1fr;
        width: 100%;
        height: 100%;
        justify-content: space-evenly;
        align-items: center;
        font-size: 13px;
    }
    .left-col, .right-col{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
        align-items: center;
    }
    .side-view-container{
        display: flex;
    }
    .heat-map-container{
        display: flex;
    }
    .compass-container{
        position: relative;
    }
    .compass-label{
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }
    .speed-container, .temperature-container{
        display: flex;
    }
    .speed-widget-label, .widget-checkbox-label{
        margin: 0 0.5rem;
    }
    .checkmark{
        height: 15px;
        width: 15px;
    }
    .widget-checkbox .checkmark:after {
        left: 5px;
        top: 0px;
    }

</style>
