<template>
    <div id="chart" class="chart-container">
        <!-- Top Title -->
        <div class="title">
            <div v-if="modelLanguage === 'pt_br'" class="label">Gráficos <span v-if="settings.rwDataset"> - {{ settings.rwDataset.name }}</span></div>
            <div v-else-if="modelLanguage === 'en'" class="label">Charts <span v-if="settings.rwDataset"> - {{ settings.rwDataset.name }}</span></div>
            <div class="component-buttons">
                <button class="btn-settings" @click="show.settings = !show.settings"><i class="fa fa-cog" aria-hidden="true"></i></button>
            </div>
        </div>
        <component :is="chartComponent" :workspace="workspace" :settings="settings" :dataset1="dataset1" :dataset2="dataset2"></component>
        <div v-if="show.settings" class="settings">
            <!-- Settings Tab -->
            <div class="settings-tabs">
                <div class="settings-tab" :class="{'selected': show.tab === 'real world'}" @click="show.tab = 'real world'">
                    Real World
                </div>
                <div class="settings-tab pad">|</div>
                <div class="settings-tab" :class="{'selected': show.tab === 'model'}" @click="show.tab = 'model'">
                    Model
                </div>
                <div class="settings-tab pad">|</div>
                <div class="settings-tab" :class="{'selected': show.tab === 'general'}" @click="show.tab = 'general'">
                    General
                </div>
            </div>
            <!-- Real World tab -->
            <div v-if="show.tab === 'real world'">
                <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='dsf'>dataset:</label>
                    <select class="settings-tab-field-value" v-model="settings.rwDataset">
                        <option v-for="dataset in $store.state.datasets" :value="dataset" :key="dataset.name">{{ dataset.name }}</option>
                    </select>
                </div>
                <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='xAxis'>x-axis:</label>
                    <select class="settings-tab-field-value" v-model="settings.xAxisRW" :disabled="settings.plotStyle === 'Merge'">
                        <option v-for="(axisType, index) in getRWAxisTypes()" :value="index" :key="axisType">{{ axisType }}</option>
                    </select>
                </div>
                <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='yAxis'>y-axis:</label>
                    <select class="settings-tab-field-value" v-model="settings.yAxisRW">
                        <option v-for="(axisType, index) in getRWAxisTypes()" :value="index" :key="axisType">{{ axisType }}</option>
                    </select>
                </div>
                <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='yAxis'></label>
                    <select class="settings-tab-field-value" v-model="settings.yAxis2RW">
                        <option v-for="(axisType, index) in getRWAxisTypes(true)" :value="index" :key="axisType">{{ axisType }}</option>
                    </select>
                </div>
                <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='dsf'>graph type:</label>
                    <select class="settings-tab-field-value" v-model="settings.graphTypeRW">
                        <option v-for="graphType in values.graphTypes" :value="graphType" :key="graphType">{{ graphType }}</option>
                    </select>
                </div>
                <!-- This works, it's only hidden to keep the UI simple -->
                <!-- <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='dsf'>graph range:</label>
                    <select class="settings-tab-field-value" v-model="yAxisRangeRW">
                        <option v-for="yAxisRange in values.yAxisRanges" :value="yAxisRange" :key="yAxisRange">{{ yAxisRange }}</option>
                    </select>
                </div> -->
            </div>
            <!-- Model tab -->
            <div v-if="show.tab === 'model'">
                <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='xAxis'>x-axis:</label>
                    <select class="settings-tab-field-value" v-model="settings.xAxis">
                        <option v-for="axisType in values.axisTypes" :value="axisType" :key="axisType">{{ axisType }}</option>
                    </select>
                </div>
                <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='yAxis'>y-axis:</label>
                    <select class="settings-tab-field-value" v-model="settings.yAxis">
                        <option v-for="axisType in values.axisTypes" :value="axisType" :key="axisType">{{ axisType }}</option>
                    </select>
                </div>
                <!-- <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='yAxis'></label>
                    <select class="settings-tab-field-value" v-model="settings.yAxis2">
                        <option v-for="axisType in values.axis2Types" :value="axisType" :key="axisType">{{ axisType }}</option>
                    </select>
                </div> -->
                <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='graphType'>graph type:</label>
                    <select class="settings-tab-field-value" v-model="settings.graphType">
                        <option v-for="graphType in values.graphTypes" :value="graphType" :key="graphType">{{ graphType }}</option>
                    </select>
                </div>
            </div>
            <!-- General tab -->
            <div v-if="show.tab === 'general'">
                <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='plots'>Plots Style:</label>
                    <select class="settings-tab-field-value" v-model="settings.plotStyle">
                        <option v-for="plotStyle in values.plotStyles" :value="plotStyle" :key="plotStyle">{{ plotStyle }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chartComponent',
    props: ['workspace'],
    data(){
        return{
            chartComponent: '',
            modelLanguage: '',
            dataset1: [],
            dataset2: [],
            datasets: [],
            show: {
                settings: false,
                tab: 'real world'
            },
            values: {
                plotStyles: ['Separate', 'Merge'],
                axisTypes: ['Time', 'Ink Spread %'],
                axis2Types: ['None', 'Time', 'Ink Spread %',],
                yAxisRanges: ['auto', '0-100', '20-80', '40-60'],
                graphTypes: ['Line', 'Scatter'],
                datasets: []
            },
            settings: {
                plotStyle: 'Separate',
                xAxis: 'Time',
                yAxis: 'Ink Spread %',
                yAxis2: 'None',
                graphType: 'Line',
                rwDataset: {},
                xAxisRW: 0,
                yAxisRW: 1,
                yAxis2RW: 0,
                yAxisRangeRW: [0, 100], // [min, max] or ["auto", "auto"]
                graphTypeRW: 'Line',
            },
            yAxisRangeRW: "0-100" // There is a watcher on this property that will update the settings.yAxisRangeRW property. This is to get around the fact that the select element does not support arrays as values.
        }
    },
    watch: {
        "$store.state.datasets": {
            handler(newVal) { //, oldVal
                console.log("datasets changed", newVal);
                // If there is no old value, set the most recent dataset as the default
                // if (!oldVal.length) {
                    this.settings.rwDataset = newVal[newVal.length - 1];
                // }
            },
            deep: true,
        },
        "$store.state.board.dataset": {
            handler(newVal) {
                this.$set(this, "dataset1", newVal);
                // this.$set(this, "dataset2", newVal);
            },
            deep: true,
        },
        "settings.rwDataset": {
            handler(newVal) {
                this.$set(this, "dataset2", newVal);
                console.log("dataset changed", newVal);
            },
            deep: true,
        },
        "yAxisRangeRW": {
            handler(newVal) {
                if (newVal === "auto") {
                    this.settings.yAxisRangeRW = ["auto", "auto"];
                } else {
                    this.settings.yAxisRangeRW = newVal.split("-").map(Number);
                }
            },
            deep: true,
        }
    },
    mounted()
    {
        if(this.$store.state.taskInfo.chart){
            const chartPath = this.$store.state.taskInfo.chart + '.vue';
            import(/* webpackChunkName: "[request]" */ `@/components/chartComponents/${chartPath}`).then(module => {
                this.chartComponent = module.default;
            });
        }
        if(this.$store.state.taskInfo.taskId?.endsWith('pt_br')){
            this.modelLanguage = 'pt_br';
        } else {
            this.modelLanguage = 'en';
        }
    },
    methods: {
        getRWAxisTypes: function (includeNone = false) {
            let axisTypes = [];
            if (includeNone) {
                axisTypes.push('None');
            }
            if (this.settings.rwDataset?.data) {
                this.settings.rwDataset.data.forEach(element => {
                    axisTypes.push(element.name);
                });
            }
            return axisTypes;
        }
    }
}
</script>

<style scoped>
.chart-container {
    font-weight: 500;
    height: 100%;
    display: flex;
    flex-direction: column;
	overflow: hidden;
}
.settings {
    position: absolute;
    background: white;
    right: -22px;
    /* top: -317px;  */
    transform: translate(0, -108%);
    width: 500px;
    min-height: 216px;
    border-radius: 50px;
    border: 1px solid #000;
    padding: 24px 44px;
}

.settings::after {
    content: '';
    position: absolute;
    bottom: -26px;
    right: 37px;
    border-style: solid;
    border-width: 28px 20px 0 20px;
    border-color: #FFFFFF transparent transparent transparent;
    filter: drop-shadow(0px 2px 0px #000);
}

.settings-tabs {
    display: flex;
    border-bottom: 5px solid #5b5b5b;
    width: 100%;
    padding: 5px 0;
    font-size: 1.1em;
}

.settings-tab {
    cursor: pointer;
}

.settings-tab.selected {
    font-weight: bold;
}

.settings-tab.pad {
    margin: 0 15px;
    cursor: initial;
}

.settings-tab-field {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.settings-tab-field-label {
    flex: 1;
}

.settings-tab-field-value {
    flex: 1;
}

.data-tab-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 15px;
}

.data-tab-table {
    width: 80%;
    height: 200px;
    margin: 20px 0;
    border: 1px solid #444;
    overflow: auto;
}

.data-tab-table-row {
    border: 1px solid #444;
    text-align: left;
    display: flex;
    flex-direction: row;
    padding: 5px;
}

.data-tab-table-row-data-title {
    font-size: 1.2em;
}

.data-tab-table-row-data {
    flex: 3;
    display: flex;
    flex-direction: column;
}

.data-tab-table-row-actions {
    flex: 1;
    display: flex;
    flex-direction: row;
    font-size: 1.8em;
}

.data-tab-table-row-actions i {
    padding: 10px;
    cursor: pointer;
}

.btn-settings {
    background: white;
    border-radius: 5px;
    border: 1px solid;
    color: #2671BC;
    font-size: 1.1em;
    cursor: pointer;
}
</style>