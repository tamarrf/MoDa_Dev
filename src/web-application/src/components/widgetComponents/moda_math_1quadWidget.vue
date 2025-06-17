<template>
    <div style="display: grid;">
        <div class="moda-math-widget">

            <div class="widget-checkbox-col">
                <div class="widget-checkbox-label">Grid</div>
                <label class="widget-checkbox widget-checkbox-moda-math">
                    <input v-on:input="onGridUpdate" type="checkbox" id="grid" checked/>
                    <div class="checkmark"></div>
                </label>
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
            grid: true
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
        onGridUpdate(){
            this.grid = $("#grid").is(":checked");
            this.$emit('sendValue', {type:'fv-checkbox', name:'grid?', value: this.grid});
        }
    }
}
</script>

<style scoped>
    .moda-math-widget{
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: auto;
        font-size: 13px;
        height: 100%;
        justify-content: center;
        align-items: center;
        padding-top: 2%;
    }
    
    .widget-checkbox-col{
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: minmax(0,1fr) minmax(0,0.2fr) minmax(0,1fr);
        grid-row: 1;
        grid-column: 1;
    }

    .widget-checkbox-moda-math{
        justify-self: center;
        align-self: center;
        text-align: center;
        grid-row: 1;
        grid-column: 1;
    }

    .widget-checkbox-label{
        justify-self: center;
        align-self: center;
        text-align: center;
        grid-row: 1;
        grid-column: 3;
    }

</style>
