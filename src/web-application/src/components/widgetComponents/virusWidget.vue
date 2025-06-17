<template>
    <div style="display: grid;">
        <div class="virus-widget">

            <div class="widget-checkbox-col">
                <div class="widget-show-contact-label">show<br>contact radius</div>
                <label class="widget-checkbox widget-show-contact">
                    <input v-on:input="onShowContactUpdate" type="checkbox" id="show-contact-radius"/>
                    <div class="checkmark"></div>
                </label>
                <div class="widget-checkbox-label">show<br>recovery time</div>
                <label class="widget-checkbox widget-show-recovery">
                    <input v-on:input="onGridUpdate" type="checkbox" id="show-recovery-time"/>
                    <div class="checkmark"></div>
                </label>
                <div class="timer">{{$props.ticks}} ticks</div>
            </div>

            <div class="widget-infectiousness-col">
                <div class="widget-slider-label-infectiousness">infectiousness rate</div>
                <input v-on:input="onInfectiousnessUpdate" @change="logInteractionData('slider', 'infectiousness-rate', $event.target.value)" type="range" min="0" max="100" value="25" step="1" class="widget-slider widget-slider-infectiousness" id="infectiousness-rate">
                <div class="infectiousness-widget-value"> {{ infectiousness_rate }} </div>
            </div>

            <div class="widget-fatality-col">
                <div class="widget-slider-label-fatality">fatality rate</div>
                <input v-on:input="onFatalityUpdate" @change="logInteractionData('slider', 'fatality-rate', $event.target.value)" type="range" min="0" max="100" value="25" step="1" class="widget-slider widget-slider-fatality" id="fatality-rate">
                <div class="fatality-widget-value"> {{ fatality_rate }} </div>
            </div>

            <div class="widget-recovery-col">
                <div class="widget-slider-label-recovery">recovery rate</div>
                <input v-on:input="onRecoveryUpdate" @change="logInteractionData('slider', 'recovery-rate', $event.target.value)" type="range" min="0" max="100" value="25" step="1" class="widget-slider widget-slider-recovery" id="recovery-rate">
                <div class="recovery-widget-value"> {{ recovery_rate }} </div>
            </div>

            <div class="widget-contact-col">
                <div class="widget-slider-label-contact">contact radius</div>
                <input v-on:input="onContactUpdate" @change="logInteractionData('slider', 'contact-radius', $event.target.value)" type="range" min="1" max="10" value="4" step="1" class="widget-slider widget-slider-contact" id="contact-radius">
                <div class="contact-widget-value"> {{ contact_radius }} </div>
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
            infectiousness_rate: 25,
            fatality_rate: 25,
            recovery_rate: 25,
            contact_radius: 4,
            show_recovery_time: false,
            show_contact_radius: false
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
        onInfectiousnessUpdate(){
            this.infectiousness_rate = $("#infectiousness-rate").val();
            this.$emit('sendValue', {type:'fv-slider', name:'infectiousness-rate', value: this.infectiousness_rate});
            const percent = (this.infectiousness_rate - ($("#infectiousness-rate")[0].min)) / ($("#infectiousness-rate")[0].max-$("#infectiousness-rate")[0].min) * 100;
            $("#infectiousness-rate").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onFatalityUpdate(){
            this.fatality_rate = $("#fatality-rate").val();
            this.$emit('sendValue', {type:'fv-slider', name:'fatality-rate', value: this.fatality_rate});
            const percent = (this.fatality_rate - ($("#fatality-rate")[0].min)) / ($("#fatality-rate")[0].max-$("#fatality-rate")[0].min) * 100;
            $("#fatality-rate").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onRecoveryUpdate(){
            this.recovery_rate = $("#recovery-rate").val();
            this.$emit('sendValue', {type:'fv-slider', name:'recovery-rate', value: this.recovery_rate});
            const percent = (this.recovery_rate - ($("#recovery-rate")[0].min)) / ($("#recovery-rate")[0].max-$("#recovery-rate")[0].min) * 100;
            $("#recovery-rate").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onContactUpdate(){
            this.contact_radius = $("#contact-radius").val();
            this.$emit('sendValue', {type:'fv-slider', name:'contact-radius', value: this.contact_radius});
            const percent = (this.contact_radius - ($("#contact-radius")[0].min)) / ($("#contact-radius")[0].max-$("#contact-radius")[0].min) * 100;
            $("#contact-radius").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onGridUpdate(){
            this.show_recovery_time = $("#show-recovery-time").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'show-recovery-time?', value: this.show_recovery_time});
        },
        onShowContactUpdate(){
            this.show_contact_radius = $("#show-contact-radius").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'show-contact-radius?', value: this.show_contact_radius});
        }
    }
}
</script>

<style scoped>
    .virus-widget{
        display: grid;
        grid-template-rows: minmax(0,1fr);
        grid-template-columns: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        font-size: 13px;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    
    .widget-checkbox-col{
        display: grid;
        grid-template-rows: auto auto auto;
        grid-template-columns: minmax(0,1fr) minmax(0,1fr);
        grid-row: 1;
        grid-column: 5;
        border-left: groove;
    }

    .widget-show-contact-label{
        justify-self: center;
        align-self: center;
        text-align: center;
        grid-row: 1;
        grid-column: 1;
    }

    .widget-show-contact{
        grid-row: 2;
        grid-column: 1;
        align-self: center;
        justify-self: center;
    }

    .widget-checkbox-label{
        justify-self: center;
        align-self: center;
        text-align: center;
        grid-row: 1;
        grid-column: 2;
    }

    .widget-show-recovery{
        grid-row: 2;
        grid-column: 2;
        align-self: center;
        justify-self: center;
        align-content: center;
    }

    .timer{
        grid-row: 3;
        grid-column: 2;
        justify-self: center;
        align-items: center;
    }

    .widget-infectiousness-col{
        display: grid;
        grid-template-rows: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        grid-template-columns: minmax(0,1fr) minmax(0,0.2fr);
        grid-row: 1;
        grid-column: 1;
    }

    .widget-slider-label-infectiousness{
        grid-row: 1;
        grid-column: 1;
        justify-self: center;
        align-self: center;
    }

    .infectiousness-widget-value{
        display: flex;
        align-items: center;
        grid-row: 3;
        grid-column: 2;
    }

    .widget-slider-infectiousness{
        grid-row: 3;
        grid-column: 1;
        justify-self: center;
        align-self: center;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 25%, #ADADAD 25%, #ADADAD 100%);
    }

    .widget-fatality-col{
        display: grid;
        grid-template-rows: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        grid-template-columns: minmax(0,1fr) minmax(0,0.2fr);
        grid-row: 1;
        grid-column: 2;
    }

    .widget-slider-label-fatality{
        grid-row: 1;
        grid-column: 1;
        justify-self: center;
        align-self: center;
    }

    .fatality-widget-value{
        display: flex;
        align-items: center;
        grid-row: 3;
        grid-column: 2;
    }

    .widget-slider-fatality{
        grid-row: 3;
        grid-column: 1;
        justify-self: center;
        align-self: center;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 25%, #ADADAD 25%, #ADADAD 100%);
    }

    .widget-recovery-col{
        display: grid;
        grid-template-rows: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        grid-template-columns: minmax(0,1fr) minmax(0,0.2fr);
        grid-row: 1;
        grid-column: 3;
    }

    .widget-slider-label-recovery{
        grid-row: 1;
        grid-column: 1;
        justify-self: center;
        align-self: center;
    }

    .recovery-widget-value{
        display: flex;
        align-items: center;
        grid-row: 3;
        grid-column: 2;
    }

    .widget-slider-recovery{
        grid-row: 3;
        grid-column: 1;
        justify-self: center;
        align-self: center;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 25%, #ADADAD 25%, #ADADAD 100%);
    }

    .widget-contact-col{
        display: grid;
        grid-template-rows: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        grid-template-columns: minmax(0,1fr) minmax(0,0.2fr);
        grid-row: 1;
        grid-column: 4;
    }

    .widget-slider-label-contact{
        grid-row: 1;
        grid-column: 1;
        justify-self: center;
        align-self: center;
    }

    .contact-widget-value{
        display: flex;
        align-items: center;
        grid-row: 3;
        grid-column: 2;
    }

    .widget-slider-contact{
        grid-row: 3;
        grid-column: 1;
        justify-self: center;
        align-self: center;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 40%, #ADADAD 40%, #ADADAD 100%);
    }

</style>
