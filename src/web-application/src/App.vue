<template>
    <div id="app">
        <component :is="view"></component>
    </div>
</template>

<script>
// import $ from 'jquery';
export default {
    name: 'appVue',
    data(){
        return{
            view:''
        }
    },
    mounted(){
        let pagePath;
        if(window["__EXAMPLE_CONTENT__"] || window["__STUDENT_INFO__"]){
            pagePath = 'Example.vue';
        }
        else{
            pagePath = 'Simulation.vue';
        }
        import(/* webpackChunkName: "[request]" */ `@/views/${pagePath}`).then(module => {
            this.view = module.default;
        });
    }
}
</script>


<style>
body {
    margin: 0;
    font-family: Poppins, sans-serif;
    height: 100%;
    width: 100%;
}

button {
    cursor: pointer; 
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #F4F5F7;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
}
/* Makes our toolbox labels black. */
.blocklyTreeLabel {
    font-family: Poppins, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
    font-weight: 500;
}

.blocklyTreeRow {
    padding: 3px;
    margin-bottom: 1em;
}

.blocklyTreeRow {
    height: initial;
}

.swal2-title {
    font-family: Poppins, sans-serif;
}


/* SLIDER WIDGETS */
.widget-slider{
    border-radius: 50px;
    width: 85%;
    height: 5px;
    background: linear-gradient(to right, #FF0A01 0%, #FF0A01 50%, #ADADAD 50%, #ADADAD 100%);
    outline: none;
    transition: background 450ms ease-in;
    -webkit-appearance: none;
}

.widget-slider::-webkit-slider-thumb {
    border: 2px solid #515151;
    height: 17px;
    width: 17px;
    border-radius: 50px;
    background: #FFFFFF;
    cursor: pointer;
    -webkit-appearance: none;
}

.widget-slider::-moz-range-thumb {
    border: 2px solid #515151;
    height: 17px;
    width: 17px;
    border-radius: 50px;
    background: #FFFFFF;
    cursor: pointer;
}

.widget-slider::-ms-thumb {
    margin-top: 1px;
    border: 2px solid #515151;
    height: 17px;
    width: 17px;
    border-radius: 50px;
    background: white;
    cursor: pointer;
}

/* CHECKBOX WIDGETS */
.widget-checkbox{
    position: relative;
}
.widget-checkbox input[type='checkbox']{
    margin: 0px;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.widget-checkbox .checkmark{
  height: 25px;
  width: 25px;
  background-color: white;
  border: 1px solid #515151;
  border-radius: 6px;
}

/* When the checkbox is checked, add a blue background */
.widget-checkbox input:checked ~ .checkmark {
  background-color: #FF0A01;
}

/* Create the checkmark/indicator (hidden when not checked) */
.widget-checkbox .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.widget-checkbox input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.widget-checkbox .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

#student-view-footer {
    display: flex;
    justify-content: center;
    text-decoration: underline;
    cursor: pointer;
    padding: 16px 0;
}

#student-view-footer {
    cursor: pointer;
}

.student-view-footer-item {
    padding: 0 16px;
}

.student-view-footer-item.selected {
    font-weight: bold;
}
</style>
