<template>
    <div style="display: grid;">
        <div class="moda-math-widget">

            <div class="widget-reflect-col">
                <div class="widget-reflectx-label">Reflect on X</div>
                <label class="widget-checkbox widget-reflectx-moda-math">
                    <input v-on:input="onReflectxUpdate" type="checkbox" id="reflectx"/>
                    <div class="checkmark"></div>
                </label>

                <div class="widget-reflecty-label">Reflect on Y</div>
                <label class="widget-checkbox widget-reflecty-moda-math">
                    <input v-on:input="onReflectyUpdate" type="checkbox" id="reflecty"/>
                    <div class="checkmark"></div>
                </label>
            </div>

            <div class="widget-translate-col">
                <div class="widget-translate-label">Translate</div>
                <label class="widget-checkbox widget-translate-moda-math">
                    <input v-on:input="onTranslateUpdate" type="checkbox" id="translate"/>
                    <div class="checkmark"></div>
                </label>

                <div class="widget-slider-label-translatex">X</div>
                <input v-on:input="onTranslatexUpdate" @change="logInteractionData('slider', 'translatex', $event.target.value)" type="range" min="-5" max="5" value="1" step="1" class="widget-slider widget-slider-translatex" id="translatex">
                <div class="translatex-widget-value"> {{ translatex }} </div>

                <div class="widget-slider-label-translatey">Y</div>
                <input v-on:input="onTranslateyUpdate" @change="logInteractionData('slider', 'translatey', $event.target.value)" type="range" min="-5" max="5" value="1" step="1" class="widget-slider widget-slider-translatey" id="translatey">
                <div class="translatey-widget-value"> {{ translatey }} </div>
            </div>

            <div class="widget-rotate-col">
                <div class="widget-rotate-label">Rotate Clockwise</div>
                <label class="widget-checkbox widget-rotate-moda-math">
                    <input v-on:input="onRotateUpdate" type="checkbox" id="rotate"/>
                    <div class="checkmark"></div>
                </label>

                <input v-on:input="onRotationAngleUpdate" @change="logInteractionData('slider', 'rotation-angle', $event.target.value)" type="range" min="90" max="270" value="90" step="90" class="widget-slider widget-slider-rotation-angle" id="rotation-angle">
                <div class="rotation-angle-widget-value"> {{ rotation_angle }} °</div>
            </div>

        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'diffusionWidgetComponent',
    data(){
        return{
            completeEvent: '',
            completeClicked: false,
            reflectx: false,
            reflecty: false,
            translate: false,
            translatex: 1,
            translatey: 1,
            rotate: false,
            rotation_angle: 90
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
        onReflectxUpdate(){
            this.reflectx = $("#reflectx").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'reflect-x?', value: this.reflectx});
        },
        onReflectyUpdate(){
            this.reflecty = $("#reflecty").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'reflect-y?', value: this.reflecty});
        },
        onTranslateUpdate(){
            this.translate = $("#translate").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'translate?', value: this.translate});
        },
        onTranslatexUpdate(){
            this.translatex = $("#translatex").val();
            this.$emit('sendValue', {type:'fv-slider', name:'translate-x', value: this.translatex});
            const percent = (this.translatex - ($("#translatex")[0].min)) / ($("#translatex")[0].max-$("#translatex")[0].min) * 100;
            $("#translatex").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onTranslateyUpdate(){
            this.translatey = $("#translatey").val();
            this.$emit('sendValue', {type:'fv-slider', name:'translate-y', value: this.translatey});
            const percent = (this.translatey - ($("#translatey")[0].min)) / ($("#translatey")[0].max-$("#translatey")[0].min) * 100;
            $("#translatey").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        },
        onRotateUpdate(){
            this.rotate = $("#rotate").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'rotate?', value: this.rotate});
        },
        onRotationAngleUpdate(){
            this.rotation_angle = $("#rotation-angle").val();
            this.$emit('sendValue', {type:'fv-slider', name:'rotation-angle', value: this.rotation_angle});
            const percent = (this.rotation_angle - ($("#rotation-angle")[0].min)) / ($("#rotation-angle")[0].max-$("#rotation-angle")[0].min) * 100;
            $("#rotation-angle").css('background','linear-gradient(to right, #FF0A01 0%, #FF0A01 ' + percent + '%, #ADADAD ' + percent + '%, #ADADAD 100%)');
        }
    }
}
</script>

<style scoped>
    .moda-math-widget{
        display: grid;
        grid-template-rows: minmax(0,1fr);
        grid-template-columns: repeat(5, 1fr);
        font-size: 13px;
        height: 100%;
        padding-top: 0.5%;
        padding-left: 1%;
        grid-template-areas: "a b b c c";
    }
    
    .widget-reflect-col{
        grid-area: a;
        display: grid;
        grid-template-rows: minmax(0,0.4fr) minmax(0,0.4fr);
        grid-template-columns: minmax(0,0.2fr) minmax(0,0.4fr);
        grid-template-areas:
            "a b"
            "c d";
        border-right: groove;
    }

    .widget-reflectx-moda-math{
        grid-area: a;
        align-self: center;
    }

    .widget-reflectx-label{
        grid-area: b;
        align-self: center;
    }

    .widget-reflecty-moda-math{
        grid-area: c;
        align-self: center;
    }

    .widget-reflecty-label{
        grid-area: d;
        align-self: center;
    }

    .widget-translate-col{
        grid-area: b;
        display: grid;
        grid-template-rows: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        grid-template-columns: minmax(0,0.2fr) minmax(0,1fr) minmax(0,1fr);
        grid-template-areas:
            "a b b"
            "c d e"
            "f g h";
        padding-left: 1%;
        border-right: groove;
    }

    .widget-translate-moda-math{
        grid-area: a;
        align-self: center;
    }

    .widget-translate-label{
        grid-area: b;
        align-self: center;
    }

    .widget-slider-label-translatex{
        grid-area: c;
        align-self: center;
        text-align: center;
    }

    .widget-slider-translatex{
        grid-area: d;
        align-self: center;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 60%, #ADADAD 60%, #ADADAD 100%);
    }

    .translatex-widget-value{
        grid-area: e;
        align-self: center;
    }

    .widget-slider-label-translatey{
        grid-area: f;
        align-self: center;
        text-align: center;
    }

    .widget-slider-translatey{
        grid-area: g;
        align-self: center;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 60%, #ADADAD 60%, #ADADAD 100%);
    }

    .translatey-widget-value{
        grid-area: h;
        align-self: center;
    }

    .widget-rotate-col{
        grid-area: c;
        display: grid;
        grid-template-rows: minmax(0,1fr) minmax(0,1fr);
        grid-template-columns: minmax(0,0.2fr) minmax(0,1fr) minmax(0,1fr);
        grid-template-areas:
            "a b b"
            "c d e"
            "f g h";
        padding-left: 1%;
    }

    .widget-rotate-moda-math{
        grid-area: a;
        align-self: center;
    }

    .widget-rotate-label{
        grid-area: b;
        align-self: center;
    }

    .rotation-angle-widget-value{
        grid-area: c;
        align-self: center;
    }

    .widget-slider-rotation-angle{
        grid-area: d;
        align-self: center;
        background: linear-gradient(to right, #FF0A01 0%, #FF0A01 0%, #ADADAD 0%, #ADADAD 100%);
    }

</style>
