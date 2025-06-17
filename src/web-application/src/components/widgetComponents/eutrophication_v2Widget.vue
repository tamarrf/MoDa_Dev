<template>
    <div style="display: grid;">
        <div class="eutrophication-widget">

            <div class="widget-checkbox-col">
                <div class="widget-checkbox-energy-label">show<br>energy</div>
                <label class="widget-checkbox widget-checkbox-energy">
                    <input v-on:input="onEnergyUpdate" type="checkbox" id="show-energy" checked/>
                    <div class="checkmark"></div>
                </label>
                <div class="widget-checkbox-co2-label">show<br>co2</div>
                <label class="widget-checkbox widget-checkbox-co2">
                    <input v-on:input="onCo2Update" type="checkbox" id="show-co2" checked/>
                    <div class="checkmark"></div>
                </label>
                <div class="timer">{{$props.ticks}} ticks</div>
            </div>

            <div class="widget-amount-col">
                <div class="widget-label-amount-row">
                    <div class="widget-label-amount">added at each tick</div>
                    <div class="widget-label-max">max</div>
                </div>
                
                <div class="widget-o2-row">
                    <div class="widget-slider-label-o2-shape"></div>
                    <div class="widget-slider-label-o2">o2</div>
                    <input v-on:input="onAdditionalAmounto2Update" @change="logInteractionData('slider', 'additional-amount-o2', $event.target.value)" type="range" min="0" max="10" value="0" step="1" class="widget-slider widget-slider-additional-amount-o2" id="additional-amount-o2">
                    <div class="additional-amount-o2-widget-value"> {{ additional_amount_o2 }} </div>
                    <input v-on:input="onMaxo2Update" type="text" style="text-align: right;" id="max-o2" name="max-o2" class="widget-max-o2">
                </div>

                <div class="widget-nutrients-row">
                    <div class="widget-slider-label-nutrients-shape"></div>
                    <div class="widget-slider-label-nutrients">nutrients</div>
                    <input v-on:input="onAdditionalAmountNutrientsUpdate" @change="logInteractionData('slider', 'additional-amount-nutrients', $event.target.value)" type="range" min="0" max="10" value="0" step="1" class="widget-slider widget-slider-additional-amount-nutrients" id="additional-amount-nutrients">
                    <div class="additional-amount-nutrients-widget-value"> {{ additional_amount_nutrients }} </div>
                    <input v-on:input="onMaxNutrientsUpdate" type="text" style="text-align: right;" id="max-nutrients" name="max-nutrients" class="widget-max-nutrients">
                </div>
            </div>

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
            additional_amount_o2: 0,
            max_o2: 0,
            additional_amount_nutrients: 0,
            max_nutrients: 0,
            show_energy: true,
            show_co2: true
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
        onAdditionalAmounto2Update(){
            this.additional_amount_o2 = $("#additional-amount-o2").val();
            this.$emit('sendValue', {type:'fv-slider', name:'additional-amount-o2', value: this.additional_amount_o2});
            const percent = (this.additional_amount_o2 - ($("#additional-amount-o2")[0].min)) / ($("#additional-amount-o2")[0].max-$("#additional-amount-o2")[0].min) * 100;
            $("#additional-amount-o2").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onAdditionalAmountNutrientsUpdate(){
            this.additional_amount_nutrients = $("#additional-amount-nutrients").val();
            this.$emit('sendValue', {type:'fv-slider', name:'additional-amount-nutrients', value: this.additional_amount_nutrients});
            const percent = (this.additional_amount_nutrients - ($("#additional-amount-nutrients")[0].min)) / ($("#additional-amount-nutrients")[0].max-$("#additional-amount-nutrients")[0].min) * 100;
            $("#additional-amount-nutrients").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onEnergyUpdate(){
            this.show_energy = $("#show-energy").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'show-energy?', value: this.show_energy});
        },
        onCo2Update(){
            this.show_co2 = $("#show-co2").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'show-co2?', value: this.show_co2});
        },
        onMaxo2Update(){
            this.max_o2 = $("#max-o2").val();
            if (isNaN(this.max_o2) || this.max_o2 === "") {
                this.max_o2 = 0;
            }
            this.$emit('sendValue', {type:'fv-slider', name:'max-o2', value: this.max_o2});
        },
        onMaxNutrientsUpdate(){
            this.max_nutrients = $("#max-nutrients").val();
            if (isNaN(this.max_nutrients) || this.max_nutrients === "") {
                this.max_nutrients = 0;
            }
            this.$emit('sendValue', {type:'fv-slider', name:'max-nutrients', value: this.max_nutrients});
        }
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

    .eutrophication-widget{
        display: grid;
        grid-template-rows: minmax(0,1fr);
        grid-template-columns: minmax(0,1fr) minmax(0,0.6fr);
        font-size: 13px;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    .widget-checkbox-col{
        display: grid;
        grid-template-rows: minmax(0,0.5fr) minmax(0,1fr) minmax(0,1fr) ;
        grid-template-columns: minmax(0,0.6fr) minmax(0,0.2fr) minmax(0,1fr) minmax(0,1fr) ;
        grid-row: 1;
        grid-column: 2;
    }

    .widget-checkbox-energy-label{
        justify-self: center;
        align-self: center;
        grid-row: 2;
        grid-column: 3;
    }

    .widget-checkbox-energy{
        grid-row: 2;
        grid-column: 2;
        align-self: center;
        justify-self: center;
    }

    .widget-checkbox-co2-label{
        justify-self: center;
        align-self: center;
        grid-row: 3;
        grid-column: 3;
    }

    .widget-checkbox-co2{
        grid-row: 3;
        grid-column: 2;
        align-self: center;
        justify-self: center;
    }

    .timer{
        grid-row: 1;
        grid-column: 4;
        justify-self: center;
        align-self: end;
    }

    .widget-amount-col{
        display: grid;
        grid-template-rows: minmax(0,0.5fr) minmax(0,0.2fr) minmax(0,1fr) minmax(0,0.2fr) minmax(0,1fr) ;
        grid-template-columns: minmax(0,2fr);
        grid-row: 1;
        grid-column: 1;
    }

    .widget-label-amount-row{
        display: grid;
        grid-template-rows: minmax(0,1fr);
        grid-template-columns: minmax(0,0.05fr) minmax(0,0.15fr) minmax(0,0.3fr) minmax(0,1fr) minmax(0,0.01fr) minmax(0,0.2fr);
        grid-row: 1;
        grid-column: 1;
    }

    .widget-label-amount{
        display: flex;
        align-items: center;
        justify-self: center;
        grid-row: 1;
        grid-column: 4;
    }

    .widget-label-max{
        display: flex;
        align-items: center;
        justify-self: center;
        grid-row: 1;
        grid-column: 6;
    }

    .widget-o2-row{
        display: grid;
        grid-template-rows: minmax(0,1fr);
        grid-template-columns: minmax(0,0.05fr) minmax(0,0.15fr) minmax(0,0.3fr) minmax(0,1fr) minmax(0,0.1fr) minmax(0,0.2fr);
        grid-row: 3;
        grid-column: 1;
    }

    .widget-slider-label-o2-shape{
        display: flex;
        align-items: center;
        justify-content: right;
        height: 20px;
        width: 20px;
        background-color: #FF0000;
        border-radius: 50%;
        grid-row: 1;
        grid-column: 2;
    }

    .widget-slider-label-o2{
        display: flex;
        align-items: center;
        grid-row: 1;
        grid-column: 3;
    }

    .additional-amount-o2-widget-value{
        display: flex;
        align-items: center;
        grid-row: 1;
        grid-column: 5;
    }

    .widget-slider-additional-amount-o2{
        grid-row: 1;
        grid-column: 4;
        justify-self: center;
        align-self: center;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 0%, #ADADAD 0%, #ADADAD 100%);
    }

    .widget-max-o2{
        grid-row: 1;
        grid-column: 6;
    }

    .widget-nutrients-row{
        display: grid;
        grid-template-rows: minmax(0,1fr);
        grid-template-columns: minmax(0,0.05fr) minmax(0,0.15fr) minmax(0,0.3fr) minmax(0,1fr) minmax(0,0.1fr) minmax(0,0.2fr);
        grid-row: 5;
        grid-column: 1;
    }

    .widget-slider-label-nutrients-shape{
        display: flex;
        align-items: center;
        justify-content: right;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid #2D882D;
        grid-row: 1;
        grid-column: 2;
    }

    .widget-slider-label-nutrients{
        display: flex;
        align-items: center;
        grid-row: 1;
        grid-column: 3;
    }

    .additional-amount-nutrients-widget-value{
        display: flex;
        align-items: center;
        grid-row: 1;
        grid-column: 5;
    }

    .widget-slider-additional-amount-nutrients{
        grid-row: 1;
        grid-column: 4;
        justify-self: center;
        align-self: center;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 0%, #ADADAD 0%, #ADADAD 100%);
    }

    .widget-max-nutrients{
        grid-row: 1;
        grid-column: 6;
    }
</style>
