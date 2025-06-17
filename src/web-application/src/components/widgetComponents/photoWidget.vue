<template>
    <div style="display: grid;">
        <div class="wildfire-widget">

            <div class="left-col">
                <div class="speed-container-left">
                    <div class="widget-slider-label-left">Left</div>
                    <div class="speed-widget-label-left">{{ windSpeed }} km/h</div>
                </div>
                <input v-model="leituraLeft" v-on:input="onLeftUpdate" @change="logInteractionData('slider', 'wind speed', $event.target.value)" type="range" min="0" max="50" value="10" step="1" class="widget-slider" id="wind-speed-left">
            </div>

            <div class="mid-col">
                <div class="speed-container-mid">
                    <div class="widget-slider-label-mid">Mid</div>
                    <div class="speed-widget-label-mid">{{ windSpeed }} km/h</div>
                </div>
                <input v-model="windSpeed" v-on:input="onSpeedUpdate" @change="logInteractionData('slider', 'wind speed', $event.target.value)" type="range" min="0" max="50" value="10" step="1" class="widget-slider" id="wind-speed-mid">
            </div>

            <div class="right-col">
                <div class="speed-container-mid">
                    <div class="widget-slider-label-mid">Right</div>
                    <div class="speed-widget-label-mid">{{ windSpeed }} km/h</div>
                </div>    
                <input v-model="windSpeed" v-on:input="onSpeedUpdate" @change="logInteractionData('slider', 'wind speed', $event.target.value)" type="range" min="0" max="50" value="10" step="1" class="widget-slider" id="wind-speed-right">
            </div>

        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'wildfiresWidgetComponent',
    components:{
        // RoundSlider
    },
    data(){
        return{
            temperature: false,
            sideView: false,
            windDirection: 90,
            windSpeed: 10,
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
        onLeftUpdate(){
            const percentLeft = (this.leituraLeft - ($("#wind-speed")[0].min)) / ($("#wind-speed")[0].max-$("#wind-speed")[0].min) * 100;
            $("#wind-speed").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percentLeft + '%, #ADADAD ' + percentLeft + '%, #ADADAD 100%)');
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
    }
}
</script>

<style scoped>
    .wildfire-widget{
        display: grid;
        grid-template-columns: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        grid-template-rows: 1fr;
        width: 100%;
        height: 100%;
        justify-content: space-evenly;
        align-items: center;
        font-size: 13px;
    }
    .widget-slider-left , .widget-slider-mid , .widget-slider-right{
        border-radius: 50px;
        width: 85%;
        height: 5px;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 50%, #ADADAD 50%, #ADADAD 100%);
        outline: none;
        transition: background 450ms ease-in;
        -webkit-appearance: none;
    }

    .left-col, .mid-col , .right-col{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
        align-items: center;
    }
    .speed-container-left, .speed-container-mid, .speed-container-right, .temperature-container{
        display: flex;
    }
    .speed-widget-label-left, .speed-widget-label-mid, .speed-widget-label-right, .widget-checkbox-label{
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
