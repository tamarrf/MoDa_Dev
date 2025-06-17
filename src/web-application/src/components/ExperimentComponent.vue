<template>
  <div class="experiment-component">
        <!-- Top Title -->
        <div class="title">
            <div v-if="modelLanguage === 'pt_br'" class="label">Dados</div>
            <div v-else-if="modelLanguage === 'en'" class="label">Data</div>
            <!-- <input type="image" class="screenshot" :src="$store.state.imagePrefix ? $store.state.imagePrefix + 'camera.png' : require('@/assets/camera.png')" alt="camera" > -->
        </div>
        <div class="experiment-body">
            <component :is="experimentComponent"></component>
            <!-- <div v-else>
                View Code from Blocks for debugging
                <div class="code">
                    <button v-on:click="getCodeFromBlocks()" class="ui-buttons">Show NetLogo Code</button>
                    <pre v-html="code"></pre>
                </div>
            </div> -->
        </div>
        
  </div>
</template>

<script>
import Blockly from 'blockly';
import { netlogoGenerator } from '@/blocklyHelpers/netlogoGenerator';
export default {
    name: 'ExperimentComponent',
    props: ['workspace'],
    data(){
        return{
            experimentComponent: '',
            modelLanguage: ''
        }
    },
    mounted(){
        if(this.$store.state.taskInfo.taskId?.endsWith('pt_br')){
            this.modelLanguage = 'pt_br';
        } else {
            this.modelLanguage = 'en';
        }
        let unsubscribe = null;
        unsubscribe = this.$store.subscribeAction({
            after: (action) => {
                if (action.type === 'initTask') {
                    if(this.$store.state.taskInfo.experiment){
                        const experimentPath = this.$store.state.taskInfo.experiment + '.vue';
                        import(/* webpackChunkName: "[request]" */ `@/components/experimentComponents/${experimentPath}`).then(module => {
                            this.experimentComponent = module.default;
                        });
                    }
                    unsubscribe();
                }
            }
        }, { prepend: true })
    },
    methods:
    {
        getCodeFromBlocks(){
            this.code = netlogoGenerator.workspaceToCode(this.$props.workspace) || netlogoGenerator.workspaceToCode(Blockly.getMainWorkspace());
        },
    }
}
</script>

<style scoped>
.experiment-component{
    display: grid;
    grid-template-rows: 41px minmax(0, 1fr);
    grid-template-columns: 100%;
}
.experiment-body{
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
}
.title{
    display: flex;
    border-style: solid;
    border-width: 0 0 2px 0;
    border-color: #B5B5B6;
    padding: 5px 10px;
    justify-content: space-between;
    background-color: #E0E0E0;
}
.code{
    overflow: scroll;
    padding: 10px;
}
pre{
    max-height: 88%;
}
</style>
