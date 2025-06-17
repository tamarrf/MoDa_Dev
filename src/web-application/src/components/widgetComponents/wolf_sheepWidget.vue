<template>
    <div style="display: grid;">
        <div class="diff-widget">

            <div class="widget-checkbox-label">show-energy</div>
            <label class="widget-checkbox">
                <input v-on:input="onGridUpdate" type="checkbox" id="show-energy"/>
                <div class="checkmark"></div>
            </label>
            
            <div class="widget-slider-label-sheep-gain">sheep-gain-from-food</div>
            <input v-on:input="onSheepGainUpdate" @change="logInteractionData('slider', 'sheep-gain-from-food', $event.target.value)" type="range" min="1" max="50" value="4" step="1" class="widget-slider widget-slider-sheep-gain" id="sheep-gain-from-food">
            <div class="sheep-gain-widget-value"> {{ sheep_gain }} </div>

            <div class="widget-slider-label-wolf-gain">wolf-gain-from-food</div>
            <input v-on:input="onWolfGainUpdate" @change="logInteractionData('slider', 'wolf-gain-from-food', $event.target.value)" type="range" min="1" max="100" value="20" step="1" class="widget-slider widget-slider-wolf-gain" id="wolf-gain-from-food">
            <div class="wolf-gain-widget-value"> {{ wolf_gain }} </div>

            <div class="widget-slider-label-sheep-reproduce">sheep-reproduce</div>
            <input v-on:input="onSheepReproduceUpdate" @change="logInteractionData('slider', 'sheep-reproduce', $event.target.value)" type="range" min="1" max="20" value="4" step="1" class="widget-slider widget-slider-sheep-reproduce" id="sheep-reproduce">
            <div class="sheep-reproduce-widget-value"> {{ sheep_reproduce }} %</div>

            <div class="widget-slider-label-wolf-reproduce">wolf-reproduce</div>
            <input v-on:input="onWolfReproduceUpdate" @change="logInteractionData('slider', 'wolf-reproduce', $event.target.value)" type="range" min="1" max="20" value="5" step="1" class="widget-slider widget-slider-wolf-reproduce" id="wolf-reproduce">
            <div class="wolf-reproduce-widget-value"> {{ wolf_reproduce }} %</div>

            <div class="widget-slider-label-grass">grass-regrowth-time</div>
            <input v-on:input="onGrassUpdate" @change="logInteractionData('slider', 'grass-regrowth-time', $event.target.value)" type="range" min="0" max="100" value="30" step="1" class="widget-slider widget-slider-grass" id="grass-regrowth-time">
            <div class="grass-widget-value"> {{ grass }} </div>

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
            sheep_gain: 4,
            wolf_gain: 20,
            grass: 30,
            sheep_reproduce: 4,
            wolf_reproduce: 5,
            show_energy: false
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
            this.show_energy = $("#show-energy").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'show-energy?', value: this.show_energy});
        },
        onSheepGainUpdate(){
            this.sheep_gain = $("#sheep-gain-from-food").val();
            this.$emit('sendValue', {type:'fv-slider', name:'sheep-gain-from-food', value: this.sheep_gain});
            const percent = (this.sheep_gain - ($("#sheep-gain-from-food")[0].min)) / ($("#sheep-gain-from-food")[0].max-$("#sheep-gain-from-food")[0].min) * 100;
            $("#sheep-gain-from-food").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onWolfGainUpdate(){
            this.wolf_gain = $("#wolf-gain-from-food").val();
            this.$emit('sendValue', {type:'fv-slider', name:'wolf-gain-from-food', value: this.wolf_gain});
            const percent = (this.wolf_gain - ($("#wolf-gain-from-food")[0].min)) / ($("#wolf-gain-from-food")[0].max-$("#wolf-gain-from-food")[0].min) * 100;
            $("#wolf-gain-from-food").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onGrassUpdate(){
            this.grass = $("#grass-regrowth-time").val();
            this.$emit('sendValue', {type:'fv-slider', name:'grass-regrowth-time', value: this.grass});
            const percent = (this.grass - ($("#grass-regrowth-time")[0].min)) / ($("#grass-regrowth-time")[0].max-$("#grass-regrowth-time")[0].min) * 100;
            $("#grass-regrowth-time").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onSheepReproduceUpdate(){
            this.sheep_reproduce = $("#sheep-reproduce").val();
            this.$emit('sendValue', {type:'fv-slider', name:'sheep-reproduce', value: this.sheep_reproduce});
            const percent = (this.sheep_reproduce - ($("#sheep-reproduce")[0].min)) / ($("#sheep-reproduce")[0].max-$("#sheep-reproduce")[0].min) * 100;
            $("#sheep-reproduce").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onWolfReproduceUpdate(){
            this.wolf_reproduce = $("#wolf-reproduce").val();
            this.$emit('sendValue', {type:'fv-slider', name:'wolf-reproduce', value: this.wolf_reproduce});
            const percent = (this.wolf_reproduce - ($("#wolf-reproduce")[0].min)) / ($("#wolf-reproduce")[0].max-$("#wolf-reproduce")[0].min) * 100;
            $("#wolf-reproduce").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
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

.widget-slider-label-sheep-gain{
    grid-row: 1;
    grid-column: 1;
    justify-self: center;
    align-self: center;
}

.widget-slider-label-wolf-gain{
    grid-row: 1;
    grid-column: 3;
    justify-self: center;
    align-self: center;
}

.widget-slider-label-grass{
    grid-row: 3;
    grid-column: 5;
    justify-self: center;
    align-self: center;
}

.widget-slider-label-sheep-reproduce{
    grid-row: 3;
    grid-column: 1;
    justify-self: center;
    align-self: center;
}

.widget-slider-label-wolf-reproduce{
    grid-row: 3;
    grid-column: 3;
    justify-self: center;
    align-self: center;
}

.diff-widget{
    display: grid;
    grid-template-rows: minmax(0,1fr) minmax(0,1.5fr) minmax(0,1fr) minmax(0,1.5fr);
    grid-template-columns: minmax(0,1fr) minmax(0,0.2fr) minmax(0,1fr) minmax(0,0.2fr) minmax(0,1fr) minmax(0,0.2fr) minmax(0,0.5fr);
    font-size: 13px;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.widget-checkbox-label{
    justify-self: center;
    align-self: center;
    grid-row: 1;
    grid-column: 7;
}

.widget-checkbox{
    grid-row: 2;
    grid-column: 7;
    align-self: center;
    justify-self: center;
}

.sheep-gain-widget-value{
    display: flex;
    align-items: center;
    grid-row: 2;
    grid-column: 2;
}

.wolf-gain-widget-value{
    display: flex;
    align-items: center;
    grid-row: 2;
    grid-column: 4;
}

.grass-widget-value{
    display: flex;
    align-items: center;
    grid-row: 4;
    grid-column: 6;
}

.sheep-reproduce-widget-value{
    display: flex;
    align-items: center;
    grid-row: 4;
    grid-column: 2;
}

.wolf-reproduce-widget-value{
    display: flex;
    align-items: center;
    grid-row: 4;
    grid-column: 4;
}

.timer{
    grid-row: 4;
    grid-column: 7;
    justify-self: center;
    align-items: center;
}

.widget-slider-sheep-gain{
    grid-row: 2;
    grid-column: 1;
    justify-self: center;
    align-self: center;
    background: linear-gradient(to right, #FF0A01 0%, #FF0A01 8%, #ADADAD 8%, #ADADAD 100%);
}

.widget-slider-wolf-gain{
    grid-row: 2;
    grid-column: 3;
    justify-self: center;
    align-self: center;
    background: linear-gradient(to right, #FF0A01 0%, #FF0A01 20%, #ADADAD 20%, #ADADAD 100%);
}

.widget-slider-grass{
    grid-row: 4;
    grid-column: 5;
    justify-self: center;
    align-self: center;
    background: linear-gradient(to right, #FF0A01 0%, #FF0A01 30%, #ADADAD 30%, #ADADAD 100%);
}

.widget-slider-sheep-reproduce{
    grid-row: 4;
    grid-column: 1;
    justify-self: center;
    align-self: center;
    background: linear-gradient(to right, #FF0A01 0%, #FF0A01 20%, #ADADAD 20%, #ADADAD 100%);
}

.widget-slider-wolf-reproduce{
    grid-row: 4;
    grid-column: 3;
    justify-self: center;
    align-self: center;
    background: linear-gradient(to right, #FF0A01 0%, #FF0A01 25%, #ADADAD 25%, #ADADAD 100%);
}

</style>
