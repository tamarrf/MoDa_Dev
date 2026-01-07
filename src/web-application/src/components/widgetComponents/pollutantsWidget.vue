<template>
    <div style="display: grid;">
        <div class="wildfire-widget">
            <div class="wind-col">
                <div class="wind-col-left">
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
                <div class="wind-col-right">
                    <div class="speed-container">
                        <div class="widget-slider-label">Wind Speed</div>
                        <div class="speed-widget-label">{{ windSpeed }} km/h</div>
                    </div>
                    <input v-model="windSpeed" v-on:input="onSpeedUpdate" @change="logInteractionData('slider', 'wind speed', $event.target.value)" type="range" min="0" max="50" value="10" step="1" class="widget-slider" id="wind-speed">
                </div>
            </div>
            <div class="manual-li-col">
                <div class="speed-container">
                    <div class="widget-slider-label">Manual light-intensity</div>
                    <div class="speed-widget-label">{{ manualLI / 100 }}</div>
                </div>
                <input v-on:input="onManualLIUpdate" @change="logInteractionData('slider', 'manual-light-intensity', $event.target.value)" type="range" min="0" max="100" value="50" step="1" class="widget-slider widget-slider-manual-light-intensity" id="manual-light-intensity">
            </div>
            <div class="auto-li-col">
                <div class="auto-li-col-label">Auto light-intensity</div>
                <label class="widget-checkbox widget-checkbox-auto-li">
                    <input v-on:input="onAutoLIUpdate" type="checkbox" id="use-auto-light-intensity" checked/>
                    <div class="checkmark"></div>
                </label>
                <div class="day-length-col-label">Day Length (ticks)</div>
                <input v-on:input="onDayLengthUpdate" type="text" value ="24" style="text-align: right;" id="day-length" name="day-length" class="widget-day-length">
            </div>
            <div class="right-col">
                <div class="timer">{{$props.ticks}} ticks</div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import RoundSlider from 'vue-round-slider';
export default {
    name: 'wildfiresWidgetComponent',
    props: ['ticks'],
    components:{
        RoundSlider
    },
    data(){
        return{
            temperature: false,
            sideView: false,
            windDirection: 90,
            windSpeed: 10,
            manualLI: 50,
            use_autoLI: true,
            day_length: 24
        }
    },
    mounted(){
        this.onSpeedUpdate();
        this.onManualLIUpdate();
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
        onManualLIUpdate(){
            this.manualLI = $("#manual-light-intensity").val();
            this.$emit('sendValue', {type:'fv-slider', name:'manual-light-intensity', value: this.manualLI});
            const percent = (this.manualLI - ($("#manual-light-intensity")[0].min)) / ($("#manual-light-intensity")[0].max-$("#manual-light-intensity")[0].min) * 100;
            $("#manual-light-intensity").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onAutoLIUpdate(){
            this.use_autoLI = $("#use-auto-light-intensity").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'use-auto-light-intensity?', value: this.use_autoLI});
        },
        onDayLengthUpdate(){
            this.day_length = $("#day-length").val();
            this.$emit('sendValue', {type:'fv-slider', name:'day-length', value: this.day_length});
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
        manualLI: function(){
            this.$emit('sendValue', {type:'fv-slider', name:'manual-light-intensity', value: this.manualLI});
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
        grid-template-columns: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,0.4fr);
        grid-template-rows: 1fr;
        width: 100%;
        height: 100%;
        justify-content: space-evenly;
        align-items: center;
        font-size: 13px;
    }

    .wind-col{
        display: grid;
        grid-template-columns: minmax(0,1fr) minmax(0,2fr);
        grid-template-rows: 1fr;
        width: 100%;
        height: 100%;
        justify-content: space-evenly;
        align-items: center;
        font-size: 13px;
        grid-column: 1;
    }

    .wind-col-left, .wind-col-right, .right-col{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
        align-items: center;
    }

    .wind-col-left{
        grid-column: 1;
    }

    .wind-col-right{
        grid-column: 2;
    }

    .manual-li-col{
        grid-column: 2;
    }

    .auto-li-col{
        display: grid;
        grid-template-columns: minmax(0,1fr) minmax(0,0.4fr);
        grid-template-rows: minmax(0,1fr) minmax(0,1fr);
        grid-column: 3;
    }

    .auto-li-col-label{
        grid-row: 1;
        grid-column: 1;
    }

    .widget-checkbox-auto-li{
        grid-row: 1;
        grid-column: 2;
        align-items: left;
    }

    .day-length-col-label{
        grid-row: 2;
        grid-column: 1;
    }

    .widget-day-length{
        grid-row: 2;
        grid-column: 2;
        align-items: left;
    }

    .right-col{
        grid-column: 4;
    }

    .side-view-container{
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
    .speed-container, .temperature-container, .timer{
        display: flex;
    }
    .speed-widget-label, .widget-checkbox-label{
        margin: 0 0.5rem;
    }

    .widget-slider-manual-light-intensity{
        justify-self: center;
        align-self: center;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 50%, #ADADAD 50%, #ADADAD 100%);
    }

</style>
