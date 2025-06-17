<template>
    <div style="display: grid;">
        <div class="wildfire-widget">
            <div class="left-col">
                <div class="widget-room-label">Room Temperature: 20°</div>
            </div>
            <div class="right-col">
                <div class="bottom-container">
                    <div class="widget-bottom-label">Bottom Temperature</div>
                    <div class="widget-bottom-value">{{ bottomTemp }} °C</div>
                </div>
                <input v-model="bottomTemp" v-on:input="onTempUpdate" @change="logInteractionData('slider', 'bottom temperature', $event.target.value)" type="range" min="20" max="80" value="70" step="1" class="widget-slider widget-slider-bottom" id="bottom-temp">
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
// import RoundSlider from 'vue-round-slider';
export default {
    name: 'heatWidgetComponent',
    props: ['roomTemp'],
    components:{
        // RoundSlider
    },
    data(){
        return{
            temperature: false,
            sideView: false,
            windDirection: 90,
            bottomTemp: 70,
        }
    },
    mounted(){
        this.onTempUpdate();
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
        onTempUpdate(){
            const percent = (this.bottomTemp - ($("#bottom-temp")[0].min)) / ($("#bottom-temp")[0].max-$("#bottom-temp")[0].min) * 100;
            $("#bottom-temp").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
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
        bottomTemp: function(){
            this.$emit('sendValue', {type:'fv-slider', name:'bottom-temp', value: this.bottomTemp});
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
        grid-template-rows: minmax(0,3fr);
        grid-template-columns: minmax(0,1fr) minmax(0,2fr);
        height: 100%;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        padding-top: 1%;
    }
    .left-col{
        display: grid;
        grid-template-rows: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        grid-template-columns: minmax(0,1fr);
        grid-row: 2;
        grid-column: 1;
    }
    .widget-room-label{
        justify-self: center;
        align-self: center;
        text-align: center;
        grid-row: 1;
        grid-column: 1;
    }
    .right-col{
        display: grid;
        grid-template-rows: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        grid-template-columns: minmax(0,2fr);
        grid-row: 2;
        grid-column: 2;
    }
    .bottom-container{
        display: grid;
        grid-template-rows: minmax(0,1fr);
        grid-template-columns: minmax(0,1fr) minmax(0,1fr);
        justify-self: center;
        align-self: center;
        text-align: center;
        grid-row: 1;
        grid-column: 1;
    }
    .widget-bottom-label{
        justify-self: center;
        align-self: center;
        text-align: center;
        grid-row: 1;
        grid-column: 1;
    }
    .widget-bottom-value{
        justify-self: center;
        align-self: center;
        text-align: center;
        grid-row: 1;
        grid-column: 2;
    }
    .widget-slider-bottom{
        justify-self: center;
        align-self: center;
        text-align: center;
        grid-row: 3;
        grid-column: 1;
    }

</style>
