<template>
    <div>
        <button class="screenshot btn-settings" @click="show.settings = !show.settings"><i class="fa fa-cog"></i></button> <!-- <i class="fa fa-times"></i> -->
        <div class="btn-settings gogo-dataset-help">
            <a href="https://docs.google.com/document/d/1geO5FQRd_djtM_DH0yteVLSzJarPiirul3v5yVyjkwQ/edit?usp=sharing" target="_blank"><i class="fa fa-question"></i></a>
        </div>
        <div v-if='$hidCompatible'>
            <div class='gogo'>
                <div v-if="dataCollectionMode === 'online'">
                    <div class="gogo-dataset-name">
                        <div>
                            <label for='filename'><strong>Dataset Name:</strong></label> <input v-model="datasetName" type='text' id='filename' name='name' required/>
                            <button id='setup-button' v-on:click="setupOffline()" :disabled="!isUserLoggedIn() || ggbLoading" class="ui-buttons setup-button">Setup Board</button>
                        </div>
                    </div>
                    <div class="gogo-dataset-name">
                        <div class="center">
                            <button id='start-button' v-on:click="toggleStartRecordData()" :disabled="!isUserLoggedIn() || ggbLoading" class="ui-buttons setup-button"><span v-if="!ggbRecording">Start</span><span v-else>Stop</span> Record Data</button>
                        </div>
                    </div>
                    <div class="gogo-sensor-values">
                        <div class="gogo-sensor-value-container" v-for="sensorIndex in show.sensorCount">
                            <div class="gogo-sensor-label">Input {{sensorIndex}}:<br/>{{ settings["sensor"+sensorIndex] }}</div>
                            <div class="gogo-sensor-value green" :style="{height: convertSensorValueToChartHeight(getSensorValue(0), settings['sensor'+sensorIndex]) + '%'}">
                                <span class="gogo-sensor-value-label">{{ convertSensorValueToChartLabel(getSensorValue(0), settings["sensor"+sensorIndex]) }}</span>
                            </div>
                        </div>
                        <!-- <div class="gogo-sensor-value-container">
                            <div class="gogo-sensor-label">Sensor 2:<br/>{{ settings.sensor2 }}</div>
                            <div class="gogo-sensor-value yellow" :style="{height: convertSensorValueToChartHeight(getSensorValueByType(settings.sensor2), settings.sensor2 === 'Temperature' ? convertThermistorToTemp : convertThermistorToRH) + '%'}">
                                <span class="gogo-sensor-value-label">{{ settings.sensor2 === 'Temperature' ? (convertThermistorToTemp(getSensorValueByType(settings.sensor2), settings.units === 'Metric' ? 'C' : 'F')) : (convertThermistorToRH(getSensorValueByType(settings.sensor2)) + "%") }}</span>
                            </div>
                        </div> -->
                    </div>
                    <div class="gogo-dataset-name center">
                        <button class="item ui-buttons" v-on:click="syncOfflineDatalogRecords()" :disabled="!isUserLoggedIn() || ggbLoading">Load Data</button>
                        <div class="sync-status">
                            {{ syncStatus }} 
                            <!-- Note: computePacket is to process data using the VueJS loop -->
                            {{ computePacket }} 
                            <!-- {{ offlineDatalogStatus }} -->
                        </div>
                    </div>
                </div>

                <!-- <div class='collection-mode-container'>
                    <button id='online-gogo' class='collection-buttons selected-mode' v-on:click="swapModes($event.currentTarget.id)">Real Time Data Collection</button>
                    <button id='offline-gogo' class='collection-buttons' v-on:click="swapModes($event.currentTarget.id)">Offline Data Collection</button>
                </div> -->

                <!-- <div v-if="dataCollectionMode === 'online'">
                    <h4>GoGo Report</h4>
                    <ul>
                        <li>Sensor 1 Value: {{ sensorData[0] }}</li>
                        <li>Sensor 2 Value: {{ sensorData[1] }}</li>
                        <li>Sensor 3 Value: {{ sensorData[2] }}</li>
                        <li>Sensor 4 Value: {{ sensorData[3] }}</li>
                        <li>Temp: {{ convertThermistorToTemp(sensorData[0], 'C') }}</li>
                    </ul>
                    <button class='ui-buttons' v-on:click="recordData()">{{recordingStatus ? 'Stop Recording' : 'Record Data'}}</button>
                    <div>{{dataset}}</div>
                </div> -->

                <div v-else-if="dataCollectionMode === 'offline'" class="offline-container">
                    <div>
                        <h4>Start Collecting Data</h4>
                        <div class="offline-setup-buttons">
                            <label for='filename'>Name your dataset</label>
                            <input v-model='datasetName' type='text' id='filename' name='name' required>
                            <button id='setup-button' v-on:click="setupOffline()" :disabled="!datasetName.trim()" class="ui-buttons setup-button">Setup Board</button>
                        </div>
                    </div>

                    <div>
                        <h4>Upload Data from Board</h4>
                        <Dropdown
                        class="channel-dropdown"
                        :options="channelsList"
                        :selected="selectedChannel"
                        :placeholder="'Select channel to plot'"
                        v-on:updateOption="onSelectedChannel"
                        >
                        </Dropdown>
                    </div>

                    <div class="chart-container">
                        <datalog-chart ref="datalogChart" />
                    </div>

                    <div>
                        <div id="container">
                            {{ offlineDatalogStatus }}
                            {{ computePacket }}
                        </div>
                        <div class="progress-bar">
                        <progress-bar
                            v-if="startRetrivedOfflineDatalog"
                            size="medium"
                            bar-color="	#7CFC00"
                            :val="percentage"
                        />
                        </div>
                        <div class="gogo-buttons">
                            <button class="item ui-buttons-white" v-on:click="syncOfflineDatalogRecords()">Sync Data</button>
                            <button class="item ui-buttons-white" v-on:click="clearData()">Clear Data on Board</button>
                        </div>
                    </div>

                </div>
            </div>
            <!-- Device Disconnected -->
            <div class="gogo-disconnected" v-if='!$store.state.socket.isConnected'>
                <img :src="this.$store.state.imagePrefix ? this.$store.state.imagePrefix + 'broken-link.png' : require('@/assets/broken-link.png')" alt="GoGo Disconnected"><br/>
                Can't find a Gogo Board connected to this computer. Plug in the board.<br/><br/>
                <button class='ui-buttons' @click='connectGoGoDevice()'>Connect device</button>
            </div>
        </div>
        <div class="incompatible" v-else>
            <!-- Icon -->
            <i class="fa fa-cog"></i>
            <p>The Gogo Board is not compatible with this specific browser.</p>
            <p>Try using Edge (v 89 or later) or Chrome (v 89 or later) to enable this feature</p>
        </div>
        <div v-if="show.settings" class="settings">
            <!-- Settings Tab -->
            <div class="settings-tabs">
                <div class="settings-tab" :class="{'selected': show.tab === 'settings'}" @click="show.tab = 'settings'">
                    Settings
                </div>
                <div class="settings-tab pad">|</div>
                <div class="settings-tab" :class="{'selected': show.tab === 'data'}" @click="show.tab = 'data'">
                    Data
                </div>
            </div>
            <div v-if="show.tab === 'settings'">
                <div class="settings-tab-field" v-for="sensorIndex in show.sensorCount">
                    <label class="settings-tab-field-label" :for="'sensor' + sensorIndex">Input {{ sensorIndex }}:</label>
                    <select class="settings-tab-field-value" v-model="settings['sensor'+sensorIndex]">
                        <option v-for="sensorType in values.sensorTypes" :value="sensorType" :key="sensorType">{{ sensorType }}</option>
                    </select>
                </div>
                <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='dsf'>Measurement Interval:</label>
                    <div class="settings-tab-field-value">
                        <input v-model="settings.dsf" type='number' id='dsf' min=0.5 max=60 step=0.5 />
                        <span> Secs</span>
                    </div>
                </div>
                <!-- <div class="settings-tab-field">
                    <label class="settings-tab-field-label" for='units'>Units:</label>
                    <select class="settings-tab-field-value" v-model="settings.units">
                        <option v-for="unit in values.units" :value="unit" :key="unit">{{ unit }}</option>
                    </select>
                </div> -->
            </div>
            <!-- Data tab -->
            <div v-if="show.tab === 'data'">
                <div class="data-tab-container">
                    <div class="data-tab-table">
                        <div class="data-tab-table-row" v-for="(dataset, index) of this.$store.state.datasets" :key="index">
                            <div class="data-tab-table-row-data">
                                <div class="data-tab-table-row-data-title">
                                    {{dataset.name}}
                                </div>
                                <div class="data-tab-table-row-data-date">
                                    {{ formatDate(dataset.date) }} 
                                    <!-- April 4, 2022, 10:22 -->
                                </div>
                            </div>
                            <div class="data-tab-table-row-actions">
                                <div class="data-tab-table-row-actions-icon" :style="{ backgroundImage: 'url(' + ($store.state.imagePrefix ? $store.state.imagePrefix + 'trash.png' : require('@/assets/trash.png') ) + ')' }" @click="deleteFile(dataset)"></div>
                                <div class="data-tab-table-row-actions-icon" :style="{ backgroundImage: 'url(' + ($store.state.imagePrefix ? $store.state.imagePrefix + 'download.png' : require('@/assets/download.png') ) + ')' }" @click="downloadFile(dataset)"></div>
                            </div>
                        </div>
                    </div>
                    <button class="item ui-buttons" style="margin: 6px; padding: 15px;  width: 320px;" v-on:click="onPickFile()">Upload data from CSV file</button>
                    <button class="item ui-buttons-black" style="margin: 6px; padding: 15px;  width: 320px;" v-on:click="clearData()">Clear Data on Board</button>
                    <input
                        type="file"
                        style="display: none"
                        ref="fileInput"
                        accept=".csv"
                        @change="onUploadCSVFile"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Dropdown from 'vue-dropdowns';
import ProgressBar from "vue-simple-progress";
import DatalogChart from "@/components/gogoChart.vue";
import { CONST } from '@/store/const';
import $ from 'jquery';

const RUNNING_AVERAGE_DURATION = 15000; // 15 seconds

export default {
    name: 'gogoBoardComponent',
    components: {
        DatalogChart,
        Dropdown,
        ProgressBar,
    },
    data(){
        return{
            values: {
                sensorTypes: ["Temperature", "Humidity"],
                units: ["Metric", "Imperial"],
            },
            settings: {
                sensor1: "Temperature",
                sensor2: "Humidity",
                sensor3: "Humidity",
                sensor4: "Humidity",
                dsf: 1,
                units: "Metric",
                roundDigits: 1,
                roundDigitsHumidity: 1,
                roundDigitsTemperature: 1,
            },
            show: {
                settings: false,
                tab: 'settings',
                sensorCount: 2
            },
            logoProgram: '',
            cmdCategory: 0,
            cmdID: 0,
            cmdParams: '',
            recordingStatus: false,
            dataset: '',
            interval: '',
            dataCollectionMode: 'online',
            datasetName: '',
            offlineDatalogStatus: '',
            startRetrivedOfflineDatalog: false,
            dataChunk: [],
            lookupTable: [],
            datalogRecords: [],
            lookupTableFileSize: 0,
            datalogRecordsFileSize: 0,
            percentage: 0,
            channelsList: [],
            syncStatus: "",
            datasets: [],
            ggbLoading: false,
            ggbRecording: false,
            sensorData: [],
            sensorDataHistory: [],
            selectedChannel: {
                name: "select dataset",
            },
        }
    },
    props: {
        msg: String,
    },
    mounted(){
        this.queryForData();
        this.collectSensorDataTick();
    },
    watch: {
        startRetrivedOfflineDatalog: function (val) {
            if (val === false) {
                this.offlineDataSyncComplete();
            }
        },
        // "$store.state.socket.isConnected": function (val) {
        //     if (val === true) {
        //         this.collectSensorDataTick();
        //     }
        // },
    },
    methods:{
        ...mapActions(['connectDevice', 'sendHID', 'clearResponseHID']),

        isUserLoggedIn() {
            return !!window["__USER_ID__"];
        },

        collectSensorDataTick() {
            if (this.$store.state.socket.isConnected) {
                try{
                    this.processSensor();
                } catch (error) {
                    // Ignore
                    console.error("Error processing sensor data", error);
                }
            }
            window.requestAnimationFrame(() => this.collectSensorDataTick());
        },

        queryForData() {
            fv.getGraphs((data) => {
                this.$set(this.$store.state.board, 'dataset', this.dataset);

                // Convert data to datasets
                let datasets = [];
                data.forEach((dataset, index) => {
                    try {
                        let datasetObj = JSON.parse(atob(dataset.csv.replace("data:text/json;base64,", ""))); // Note: dataset.csv is a base64 encoded JSON object

                        // if (this.validateCSVData(datasetObj.csv).isValid) {
                            datasets.push({
                                id: dataset.id,
                                ...datasetObj
                            });
                        // }
                    } catch (error) {
                        console.error("Error parsing dataset", error);
                    }
                });
                this.$set(this.$store.state, 'datasets', datasets);
                console.log(datasets);
            });
        },

        onPickFile () {
            this.$refs.fileInput.click()
        },

        onUploadCSVFile (event) {
            const files = event.target.files;
            const filename = files[0].name;
            const fileReader = new FileReader();

            // Validate CSV file
            if (!filename.endsWith('.csv')) {
                alert('Please upload a CSV file');
                return;
            }

            fileReader.addEventListener('load', () => {
                let data = fileReader.result;
                let csvData = data.replace("data:text/csv;base64,", "");

                // Decode CSV file
                csvData = atob(csvData);

                // Validate CSV file
                let validationResults = this.validateCSVData(csvData);
                if (!validationResults.isValid) {
                    alert('There was a problem with the formatting of the CSV file. Please check the file and try again.\n\nReason: ' + validationResults.reason);
                    return;
                }

                let dataset = {
                    name: filename.replace('.csv', ''),
                    date: new Date(),
                    data: this.convertCSVToDataset(csvData)
                };

                fv.saveGraph("data:text/json;base64," + btoa(JSON.stringify(dataset)), (data) => {
                    this.queryForData();
                });
            })
            fileReader.readAsDataURL(files[0]);
            
            // Reset file input
            event.target.value = '';
        },

        validateCSVData(csvData) {
            let lines = csvData.trim().split('\n');
            let headers = lines[0].split(',');
            let headerLength = headers.length;
            let valid = true;
            let reason = '';

            if (headerLength < 2) {
                valid = false;
                reason = 'The CSV file must have at least 2 columns.';
            }

            // Validate that there are at least 2 rows of data
            if (lines.length < 2) {
                valid = false;
                reason = 'The CSV file must have at least 2 rows of data.';
            }

            // Validate each line has the same number of columns
            for (let i = 1; i < lines.length; i++) {
                let line = lines[i];
                let lineLength = line.split(',').length;

                if (lineLength !== headerLength) {
                    valid = false;
                    reason = 'Line ' + (i + 1) + ' has ' + lineLength + ' columns, but the header has ' + headerLength + ' columns.';
                    break;
                }
            }

            // Validate that all rows after header are numbers
            for (let i = 1; i < lines.length; i++) {
                let line = lines[i];
                let lineLength = line.split(',').length;

                for (let j = 0; j < lineLength; j++) {
                    let value = line.split(',')[j];

                    if (isNaN(value)) {
                        valid = false;
                        reason = 'Line ' + (i + 1) + ' has a non-numeric value in column ' + (j + 1) + '.';
                        break;
                    }
                }
            }

            if (!valid) console.error(reason);

            return {
                isValid: valid,
                reason: reason
            };
        },

        offlineDataSyncComplete() {
            console.log("Synced with GGB", this.gogoResponse);

            // let status = this.unpackOfflineDatalogPackets(this.gogoResponse);
            // console.log("Offline Datalog Status", status);
            
            this.syncStatus = "Success! Data synced with MoDa.";
                    
            this.$set(this.$store.state.board, 'dataset', this.dataChunk);

            // For each dataset coming from GGB, add it to the store
            this.$store.state.ggbDatasets.forEach((dataset) => {
                // // Convert to CSV (debug)
                // let csv = this.convertDatasetToCSV(dataset.data);
                // console.log(dataset.name, dataset, csv);

                // Add Time channel
                let timeChannel = {
                    name: "Time",
                    data: []
                };
                dataset.data[0].data.forEach((data, index) => {
                    // Round to nearest 0.5 seconds from milliseconds
                    let time = Math.round(data[0] / 500) * 500;
                    timeChannel.data.push(time);
                });
                // Remove time from channels
                dataset.data.forEach((channel) => {
                    channel.data = channel.data.map(el => el[1]);
                });

                let splitTemperatureChannels = false;

                if (splitTemperatureChannels) {
                    // If there's a temperature channel, add a temperature in F channel and temperature in C channel
                    let temperatureChannel = dataset.data.find(channel => channel.name === "Temperature");
                    if (temperatureChannel) {
                        let temperatureInFChannel = {
                            name: "Temperature (F)",
                            data: []
                        };
                        let temperatureInCChannel = {
                            name: "Temperature",
                            data: []
                        };
                        temperatureChannel.data.forEach((data, index) => {
                            temperatureInFChannel.data.push(this.convertThermistorToTemp(data, "F") * 1);
                            temperatureInCChannel.data.push(this.convertThermistorToTemp(data, "C") * 1);
                        });
                        dataset.data.push(temperatureInFChannel);
                        dataset.data.push(temperatureInCChannel);
                    }

                    // Remove old temperature channel
                    dataset.data = dataset.data.filter(channel => channel.name !== "Temperature");
                } else {
                    // OR Just push temperature channel (in C)
                    let temperatureChannel = dataset.data.find(channel => channel.name === "Temperature");

                    // Remove old temperature channel
                    dataset.data = dataset.data.filter(channel => channel.name !== "Temperature");

                    if (temperatureChannel) {
                        let temperatureInCChannel = {
                            name: "Temperature",
                            data: []
                        };
                        temperatureChannel.data.forEach((data, index) => {
                            temperatureInCChannel.data.push(this.convertThermistorToTemp(data, "C") * 1);
                        });
                        dataset.data.push(temperatureInCChannel);
                    }
                }
                
                // If there are tempterature and humidity channels, convert to dew point
                // let tempChannel = dataset.data.find(el => el.name === "Temperature");
                // let humidityChannel = dataset.data.find(el => el.name === "Humidity");
                // if (tempChannel && humidityChannel) {
                //     let dewPointChannel = {
                //         name: "Dew Point",
                //         data: []
                //     };
                //     tempChannel.data.forEach((temp, index) => {
                //         let humidity = humidityChannel.data[index];
                //         let dewPoint = this.calculateDewPoint(temp, humidity);
                //         dewPointChannel.data.push(dewPoint);
                //     });
                //     dataset.data.push(dewPointChannel);
                // }

                // Append Time channel to start of dataset
                dataset.data.unshift(timeChannel);

                let json = JSON.stringify(dataset);

                // Upload to server
                fv.saveGraph("data:text/json;base64," + btoa(json), (data) => {
                    this.queryForData();
                });
            });

            // Clear data on GGB
            this.clearData();

            setTimeout(() => {
                this.syncStatus = "";
            }, 5000);
        },

        convertDatasetToCSV(dataset){
            let csv = "";
            let startTime = 0;
            
            // Add headers
            // csv += `"Time"`;
            for (let channel of dataset) {
                if (csv) csv += `,`;
                csv += `"${channel.name}"`;
            }

            // Add data
            for (let i = 0; i < dataset[0].data.length; i++) {
                let row = "";
                // row += `${dataset[0].data[i][0]}`;
                for (let channel of dataset) {
                    let value = 0;
                    
                    if (channel.data[i]) {
                        // Convert timestamp to seconds
                        if (channel.name === 'Time') {
                            // Convert to integer
                            value = channel.data[i] * 1;
                            
                            // Convert to relative time
                            if (!startTime) startTime = value;
                            value -= startTime;

                            // Convert from milliseconds to seconds
                            value = value / 1000;
                        } else {
                            // TODO: Convert other data to correct units?
                            value = channel.data[i];
                        }
                    }

                    if (row) row += `,`;
                    row += `${value}`;
                }
                csv += `\n${row}`;
            }

            return csv;
        },

        convertCSVToDataset(CSV) {
            let lines = CSV.trim().split('\n');
            let headers = lines[0].split(',');
            let headerLength = headers.length;
            let dataset = [];

            // Create channels
            for (let i = 0; i < headerLength; i++) {
                // Remove quotes from header
                let header = headers[i].replace(/"/g, "");
                let channel = {
                    name: header,
                    data: []
                };
                dataset.push(channel);
            }

            // Add data
            for (let i = 1; i < lines.length; i++) {
                let line = lines[i];
                let value = line.split(',');

                for(let j = 0; j < value.length; j++) {
                    let channel = dataset[j];
                    // parseFloat() to convert to number
                    let data = parseFloat(value[j]);

                    // // Convert data to channel units
                    // if (channel.name === "Temperature") {
                    //     data = this.convertThermistorToTemp(data, "C") * 1;
                    // }
                    // if (channel.name === "Humidity") {
                    //     data = this.convertThermistorToRH(data);
                    // }

                    if (channel.name === "Time") {
                        // Convert to milliseconds
                        data = data * 1000;
                    }

                    channel.data.push(data);
                }
            }

            return dataset;
        },

        connectGoGoDevice() {
            this.connectDevice();
        },

        convertThermistorToTemp(sensorValue, type) {
            let Vref = 3.3
            let Vcc = 5

            let T0 = 25 + 273.15;	// T reference @ 25C in kelvin
            let B = 3450;    			// thermistor coefficiant (SDNT2012)
            let TR = 10000;  			// thermistor resistant
            let RD0 = 11000; 			// internal gogo resistant 3.3v divisor
            let RD = 22000;  			// internal gogo resistant 3.3v divider

            let Vread = sensorValue / 1023 * Vref;
            let RT = (Vcc * RD / Vread) - RD - RD0;
            let tempCelsius = (1 / ((Math.log(RT / TR) / B) + (1 / T0))) - 273.15;
            if(type === 'C'){
                return tempCelsius.toFixed(this.settings.roundDigits);
            }
            else if(type === 'F'){
                let tempFarenheit = (tempCelsius * 1.8) + 32;
                return tempFarenheit.toFixed(this.settings.roundDigits);
            }
        },

        convertThermistorToRH(sensorValue) {
            return Math.round(((sensorValue + 0) / 256) * 10000) / 100;
        },

        getSensorConversionFunction(sensorType) {
            if (sensorType === "Temperature") {
                return this.convertThermistorToTemp;
            }
            if (sensorType === "Humidity") {
                return this.convertThermistorToRH;
            }
            return function (val){ return val };
        },

        convertSensorValueToChartLabel(sensorValue, sensorType) {
            let conversionFn = this.getSensorConversionFunction(sensorType);

            let value = conversionFn(sensorValue, "C", false);
            let suffix = "";

            if (sensorType === "Temperature") {
                // Parse and round string value
                value = parseFloat(value).toFixed(this.settings.roundDigitsTemperature);
                suffix = (this.settings.units === 'Metric' ? '°C' : '°F');
            } else if (sensorType === "Humidity") {
                // Parse and round string value
                value = parseFloat(value).toFixed(this.settings.roundDigitsHumidity);
                suffix = " %";
            } else {
                // Parse and round string value
                value = parseFloat(value).toFixed(this.settings.roundDigits);
                suffix = "";
            }

            return value + " " + suffix;
        },

        convertSensorValueToChartHeight(sensorValue, sensorType) {
            let conversionFn = this.getSensorConversionFunction(sensorType);

            // Max height of chart (in %)
            let maxHeight = 60;
            return Math.min(Math.max((conversionFn(sensorValue, 'C', false) / 100) * maxHeight, 0), maxHeight);
        },

        getSensorValue(sensorIndex, useAverage = false) {
            if (!useAverage) this.processSensor[sensorIndex];

            // Find all values within the last 15 seconds
            let values = this.sensorDataHistory.filter((value) => {
                return value.time > (Date.now() - RUNNING_AVERAGE_DURATION);
            });
            let time = Date.now();
            let sum = 0;
            for (let sensorData of values) {
                sum += sensorData.values[sensorIndex];
            }
            let average = sum / values.length;

            return average || 0;
        },

        getSensorValueByType(type = ''){
            let index = -1;
            if (this.settings.sensor1 === type) index = 0;
            else if (this.settings.sensor2 === type) index = 1;

            if(index === -1) return 0;

            return this.getSensorValue(index);
        },

        recordData(){
            this.recordingStatus = !this.recordingStatus;
            const time = Date.now();
            if(this.recordingStatus){
                this.dataset = new Array();
                this.interval = window.setInterval(() => {
                    let obj = {
                        time: (Date.now() - time)/1000,
                        sensor1: this.sensorData[0],
                        sensor2: this.sensorData[1],
                        sensor3: this.sensorData[2],
                        sensor4: this.sensorData[3]
                    };
                    this.dataset.push(obj);

                    this.$set(this.$store.state.board, 'dataset', this.dataset);
                }, 1000);
            }
            else{
                console.log(this.dataset);
                clearInterval(this.interval);
                // save dataset to server
            }
        },

        toggleStartRecordData() {
            this.ggbRecording = !this.ggbRecording;

            //* sending beep packet
            var cmdList = [];
            cmdList[CONST.category_id_index] = 0;
            cmdList[CONST.command_id_index] = 13;
            cmdList[CONST.parameters_index] = this.ggbRecording ? 1 : 0;
            this.sendCommand(cmdList, null);
        },

        async sendCommand(data, callback) {
            var cmdPacket = new Array(64).fill(0); //? HID data 64 bytes ** include report ID
            for (var i in data) {
                cmdPacket[parseInt(i)] = data[i];
            }
            await this.sendHID(cmdPacket);
            if (typeof callback === 'function') {
                callback();
            }
        },

        setLogoMemoryPointer(callback) {
            var cmdList = [];
            cmdList[CONST.category_id_index] = 1;
            cmdList[CONST.command_id_index] = 1;
            cmdList[CONST.parameters_index] = 0;
            cmdList[CONST.parameters_index + 1] = 0;
            this.sendCommand(cmdList, callback);
        },

        writeLogoMemory(content, callback, offset) {
            offset = offset || 0;
            if (offset > content.length) {
                if (typeof callback === 'function') {
                callback();
                }
                return;
            }

            /* Write content to the flash memory */
            var txLength = content.length;
            var cmdList = [];
            cmdList[CONST.category_id_index] = 1;
            cmdList[CONST.command_id_index] = 3;

            //? set parameter 1 for content length
            //* # if the content cannot fit in one packet
            if (txLength - offset > 60) {
                cmdList[CONST.parameters_index] = 60;
            } else {
                cmdList[CONST.parameters_index] = txLength - offset;
            }

            // # copy the content to be transmitted to the output buffer
            for (var i = 0; i < cmdList[CONST.parameters_index]; i++) {
                cmdList[CONST.parameters_index + 1 + Number(i)] =
                content[offset + Number(i)];
            }
            offset += 60;

            this.sendCommand(cmdList, () => {
                setTimeout(() => {
                this.writeLogoMemory(content, callback, offset);
                }, 10);
            });
        },

        // Writes opcode to the board
        downloadOpcodeToBoard(logoOpcode) {
            this.setLogoMemoryPointer(() => {
                this.writeLogoMemory(
                logoOpcode,
                () => {
                    setTimeout(() => {
                        //* sending beep packet
                        var cmdList = [];
                        cmdList[CONST.category_id_index] = 0;
                        cmdList[CONST.command_id_index] = 11;
                        this.sendCommand(cmdList, null);
                    }, 15);
                },
                0
                );
            });
        },

        // This function is used to send the program code to the cloud and get the binary/opcode to send to the board
        downloadLogoProgram(programCode){
            if (programCode && this.boardStatus) {
                this.ggbLoading = true;

                var sendingData = {
                    logo: String(programCode),
                    firmware_version: this.gogoReport[CONST.firmware_version_index],
                    board_type: this.gogoReport[CONST.board_type_index],
                    board_version: this.gogoReport[CONST.board_version_index],
                };

                this.$http
                .post(CONST.compiler_url, sendingData, { emulateJSON: true })
                .then(
                    (response) => {
                        if (response.data.data != undefined) {
                            console.info(response.data);
                            this.downloadOpcodeToBoard(response.data.data);
                        } else {
                            console.error(response.data);
                        }
                        this.ggbLoading = false;
                    },
                    (response) => {
                        if (
                            response.data &&
                            response.data.status &&
                            response.data.status >= 500 &&
                            response.data.status < 600
                        ) {
                            console.error('syntax error');
                        } else {
                            console.error('cloud service unavailable');
                        }
                        this.ggbLoading = false;
                    }
                );
            } else {
                console.error('board not connected or no logo program to download');
            }
        },

        swapModes(id){
            this.dataCollectionMode = id.replace('-gogo', '');
            $('.selected-mode').removeClass('selected-mode');
            $('#' + id).addClass('selected-mode');
        },

        // This function writes a short program to be compiled and downloaded to the board
        setupOffline(){
            // If you do not specify a new data set name, it should use the last one adding brackets, e.g. (1)
            if (!this.datasetName) {
                let lastDataset = this.$store.state.datasets[this.$store.state.datasets.length - 1];
                if (lastDataset) {
                    let lastDatasetName = lastDataset.name;
                    
                    // Use regex to get the number at the end of the dataset name that is in brackets, e.g. (1)
                    let lastDatasetNameParts = lastDatasetName.split(" ");
                    let regex = /\((\d+)\)/;
                    let lastNumber = lastDatasetNameParts[lastDatasetNameParts.length - 1].match(regex) ? parseInt(lastDatasetNameParts[lastDatasetNameParts.length - 1].match(regex)[1]) : null;
                    
                    if (lastNumber == null) {
                        this.datasetName = lastDatasetName + " (1)";
                    } else {
                        this.datasetName = lastDatasetNameParts.slice(0, lastDatasetNameParts.length - 1).join(" ") + " (" + (lastNumber + 1) + ")";
                    }
                } else {
                    this.datasetName = "Dataset 1";
                }
            }

            let sensorNames = [];
            sensorNames[1] = this.settings.sensor1;
            sensorNames[2] = this.settings.sensor2;
            sensorNames[3] = this.settings.sensor3;
            sensorNames[4] = this.settings.sensor4;

            // If names match, add numbers
            for (let i = 1; i <= 4; i++) {
                for (let j = i + 1; j <= 4; j++) {
                    if (sensorNames[i] === sensorNames[j]) {
                        sensorNames[i] += " " + i;
                        sensorNames[j] += " " + j;
                    }
                }
            }

            let publiccloudrecords = "";
            for (let i = 0; i < this.show.sensorCount; i++){
                publiccloudrecords += `publiccloudrecord sensor${i+1} "${sensorNames[i+1]}" "${this.datasetName}"\n`;
            }

            const offlineCode = 
            `to start \n` +
                `setcloudrecordlocal 1 \n` +
                `forever \n` +
                `[ \n` +
                    publiccloudrecords +
                    `wait ${this.settings.dsf * 1000} \n` +
                `]\n` +
            `end`;
            this.downloadLogoProgram(offlineCode);
        },

        syncOfflineDatalogRecords(){
            if (!this.startRetrivedOfflineDatalog && this.boardStatus) {
                //? clear all variables
                this.dataChunk = [];
                this.lookupTable = [];
                this.datalogRecords = [];
                this.$store.state.ggbDatasets = [];
                this.lookupTableFileSize = 0;
                this.datalogRecordsFileSize = 0;
                this.percentage = 0;

                //? set flag to retrieve new packets
                this.startRetrivedOfflineDatalog = true;

                // Assign commands to retrieve offline datalog records
                var cmdList = [];
                cmdList[CONST.category_id_index] = CONST.response_packet_type;
                cmdList[CONST.command_id_index] = CONST.rcmd_get_offline_datalog;

                // Send commands to GGB
                this.sendCommand(cmdList, () => {
                    this.syncStatus = 'Retrieving offline datalog records...';
                });
            }
        },

        outputDataChunkAsCSV(dataChunk) {
            let CSV = dataChunk.join(",");

            return CSV;
        },

        unpackOfflineDatalogPackets(packet){
            if (packet.data) {
                this.dataChunk.push.apply(this.dataChunk, packet.data);

                //todo - update progress percentage by retrieved file size
                if (this.datalogRecordsFileSize + this.lookupTableFileSize) {
                    this.percentage +=
                        (packet.size /
                        (this.datalogRecordsFileSize + this.lookupTableFileSize)) *
                        100;
                    }

                    if (packet.status == CONST.offline_datalog_status_empty) {
                    this.startRetrivedOfflineDatalog = false;
                    this.clearResponseHID();

                    return "this file is empty";
                }

                //todo - retrieve files size
                else if (packet.status == CONST.offline_datalog_status_file_size) {
                    let startPoint = 0;
                    for (let i = 0; i < packet.size; i++) {
                        if (String.fromCharCode(this.dataChunk[i]) == "\n") {
                        let tmpSize = parseInt(
                            String.fromCharCode.apply(
                            String,
                            this.dataChunk.slice(startPoint, i)
                            )
                        );
                        !startPoint
                            ? (this.lookupTableFileSize = tmpSize)
                            : (this.datalogRecordsFileSize = tmpSize);
                        startPoint = i + 1;
                        }
                    }
                    this.dataChunk = [];
                    startPoint = 0;
                    console.log(this.lookupTableFileSize, this.datalogRecordsFileSize);
                    return "retrieved file size...";
                }

                //todo - retrieve lookup table
                else if (packet.status == CONST.offline_datalog_status_lookup_table) {
                    let startPoint = 0;
                    for (let i = 0; i < this.lookupTableFileSize; i++) {
                        if (String.fromCharCode(this.dataChunk[i]) == ",") {
                        this.lookupTable.push(
                            String.fromCharCode.apply(
                            String,
                            this.dataChunk.slice(startPoint, i)
                            )
                        );
                        startPoint = i + 1;
                        }
                    }
                    this.dataChunk = [];
                    console.log(this.lookupTable);
                    return "retrieved lookup table...";
                }

                //todo - retrieve datalog records
                else if (packet.status == CONST.offline_datalog_status_records) {
                    let eachRecord = [];
                    let records = [];
                    for (let i = 1; i <= this.datalogRecordsFileSize; i++) {
                        eachRecord.push(this.dataChunk[i - 1]);
                        if (i % CONST.offline_datalog_record_size == 0) {
                        records.push(eachRecord);
                        eachRecord = [];
                        }
                    }
                    records.forEach((record) => {
                        this.datalogRecords.push([
                        parseInt(
                            new BigUint64Array(new Uint8Array(record.slice(0, 8)).buffer)[0]
                        ),
                        this.lookupTable[
                            new Uint16Array(new Uint8Array(record.slice(8, 10)).buffer)[0]
                        ],
                        this.lookupTable[
                            new Uint16Array(new Uint8Array(record.slice(10, 12)).buffer)[0]
                        ],
                        new Float32Array(new Uint8Array(record.slice(12, 16)).buffer)[0],
                        ]);
                    });
                    this.dataChunk = [];

                    //todo - convert retrieved records to highcharts series object
                    this.datalogRecords = this.splitRecordsToChartSeries(
                        this.datalogRecords
                    );
                    console.log(this.datalogRecords);
                    
                    // Convert datalogRecords object to array and store
                    this.$store.state.ggbDatasets = Object.entries(this.datalogRecords).map(value => {
                        return {
                            name: value[0],
                            date: new Date(),
                            data: value[1]
                        }
                    });

                    //todo - push channel to dropdown list
                    this.channelsList = [];
                    Object.keys(this.datalogRecords).forEach((channel) => {
                        this.channelsList.push({
                        name: channel,
                        });
                    });
                    //? clearing all related data stream variables
                    this.startRetrivedOfflineDatalog = false;
                    this.clearResponseHID();

                    return "Done! Select dataset from dropdown.";
                }

                return "Syncing...";
            }
        },

        splitRecordsToChartSeries(retrievedRecords){
            let chartSeries = {};
            retrievedRecords.forEach((record) => {
                //! if channel exist
                if (record[1] in chartSeries) {
                //* every() -> it stops iterating through the array whenever the callback function returns a falsy value.
                let notFoundExistField = chartSeries[record[1]].every(
                    (eachFieldInChannel) => {
                    //! if field exist need to return false
                    if (eachFieldInChannel["name"] == record[2]) {
                        eachFieldInChannel["data"].push([record[0], record[3]]);
                        return false;
                    }
                    return true;
                    }
                );
                //! in case of field not exist
                if (notFoundExistField) {
                    chartSeries[record[1]].push({
                    name: record[2],
                    data: [[record[0], record[3]]],
                    animation: false,
                    });
                }
                } else {
                chartSeries[record[1]] = [
                    {
                    name: record[2],
                    data: [[record[0], record[3]]],
                    animation: false,
                    },
                ];
                }
            });
            return chartSeries;
        },

        onSelectedChannel(payload) {
            console.log(payload)
            this.selectedChannel = payload;
            // let nRecords = 0;

            //* pass new series data to highcharts
            this.$refs.datalogChart.chartOptions.series =
                this.datalogRecords[this.selectedChannel["name"]];

            // this.datalogRecords[this.selectedChannel["name"]].forEach((eachField) => {
            //     nRecords += eachField["data"].length;
            // });
            // this.offlineDatalogStatus =
                // this.selectedChannel.name + " with " + nRecords + " records.";
        },
        clearData() {
            if (!this.startRetrivedOfflineDatalog && this.boardStatus) {
                var cmdList = [];
                cmdList[CONST.category_id_index] = CONST.response_packet_type;
                cmdList[CONST.command_id_index] = CONST.rcmd_clear_offline_datalog;

                this.sendCommand(cmdList, null);
            }
        },
        downloadFile(dataset) {
            console.log('download', dataset);

            var element = document.createElement('a');
            // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.datasets[index]));
            element.setAttribute('href', 'data:text/csv;base64,' + btoa(this.convertDatasetToCSV(dataset.data)));
            element.setAttribute('download', dataset.name + ".csv");

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },
        deleteFile(dataset) {
            if (confirm("Are you sure you want to delete this dataset?")) {
                fv.deleteGraph(dataset.id, () => {
                    this.queryForData();
                });
            }
        },
        formatDate(date) {
            let d = new Date(date);
            return d.toLocaleString();
        },
        
        processSensor(){
            let sensor_values = new Uint16Array(CONST.sensor_count);
            for (var i = 0; i < CONST.sensor_count; i++)
            {
                let index = CONST.sensor_start_index + i * 2;
                sensor_values[i] = (this.gogoReport[index] << 8) + this.gogoReport[index + 1];
            }

            // Push sensor data to history
            this.sensorDataHistory.push({
                time: new Date(),
                values: sensor_values
            });

            this.$set(this, 'sensorData', sensor_values);

            // Remove old data
            if (this.sensorDataHistory.length > 60 * (RUNNING_AVERAGE_DURATION * 2)) { // 60 FPS * (RUNNING_AVERAGE_DURATION * 2)
                this.sensorDataHistory.shift();
            }

            return sensor_values;
        },
    },
    computed: {
        ...mapGetters(['gogoResponse', 'gogoReport', 'boardStatus']),

        computePacket(){
            if (this.startRetrivedOfflineDatalog) {
                this.offlineDatalogStatus = this.unpackOfflineDatalogPackets(
                    this.gogoResponse
                );
            }
        }
    }
}
</script>

<style scoped>
.collection-mode-container{
    border-style: solid;
    border-width: 0 0 1px 0;
    border-color: #2671BC;
    display: grid;
    grid-template-columns: minmax(0,1fr) minmax(0,1fr);
    grid-template-rows: 1fr;
    width: 100%;
    box-sizing: border-box;
}

.collection-buttons{
    border-radius: 10px 10px 0 0;
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: black;
}

.collection-buttons.selected-mode{
    background-color: #2671BC;
    color: white;
}

h4{
    margin: 10px 0px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

textarea {
  width: 100%;
  height: 200px;
}

.gogo{
    display: grid;
    grid-template-columns: minmax(0,1fr);
    grid-template-rows: minmax(0,1fr) minmax(0,15fr);
    width: 100%;
    height: 100%;
    /* text-align: center; */
}

.offline-setup-buttons{
    display: flex;
    justify-content: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.ui-buttons:disabled{
    background-color: #ADADAD;
    color: white;
}

.setup-button{
    margin: 8px;
}

.offline-container{
    display: grid;
    grid-template-columns: minmax(0,1fr);
    grid-template-rows: 
    minmax(0,3fr) 
    minmax(0,2fr) 
    minmax(0,7fr) 
    minmax(0,2fr);
}

.gogo-buttons{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.incompatible {
    text-align: center;
    padding: 50% 2%;
}

.btn-settings {
    position: absolute;
    top: 6px;
    right: 44px;
    color: #2671BC;
    font-size: 1.1em;
    padding-top: 3px;
    cursor: pointer;
}

.gogo-disconnected {
    width: 86%;
    height: 91%;
    top: 50px;
    position: absolute;
    background: hsla(0,0%,100%,0.95);
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    padding: 0 5%;
}

.gogo-disconnected img {
    width: 50%;
    margin: 0 auto;
}

.gogo-sensor-values {
    display: flex;
    justify-content: space-evenly;
}

.gogo-sensor-value-container {
    flex: 1;
    margin: 7%;
    min-height: 250px;
    border: 1px solid black;
    border-radius: 15px;
    text-align: center;
    overflow: hidden;
    position: relative;
}

.gogo-sensor-label {
    background-color: #2671BC;
    color: white;
    min-height: 52px;
}

.gogo-sensor-value {
    background: #d9ead3;
    border: 1px solid #39771e;
    width: 50%;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}

.gogo-sensor-value.green {
    background: #d9ead3;
    border-color: #39771e;
}

.gogo-sensor-value.yellow {
    background: #fff2cc;
    border-color: #bc8b00;
}

.gogo-sensor-value-label {
    margin-top: -10px;
    top: -25px;
    left: -25%;
    width: 150%;
    position: absolute;
}

.gogo-dataset-name {
    text-align: left;
}

.gogo-dataset-help {
    position: absolute;
    top: 1%;
    right: 2%;
    width: 26px;
    height: 22px;
    text-align: center;
    background: #fff;
    color: #2671BC;
    font-size: 1.1em;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid #2671BC;
    border-radius: 7px;
    padding-top: 6px;
}

.gogo-dataset-help a {
    color: #2671BC;
    text-decoration: none;
}

.center {
    text-align: center;
}

.settings {
    position: absolute;
    background: white;
    right: 0;
    top: 62px;
    width: 500px;
    min-height: 30%;
    border-radius: 50px;
    border: 1px solid #000;
    padding: 24px 44px;
}

.settings::after {
    content: "";
    position: absolute;
    top: -26px;
    right: 37px;
    border-style: solid;
    border-width: 0 20px 28px 20px;
    border-color: transparent transparent #fff  transparent;
    filter: drop-shadow(0 -2px 0 #000);
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
    min-height: 48px;
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

.data-tab-table-row-actions-icon {
    height: 32px;
    width: 32px;
    margin: 8;
    background: center no-repeat;
    background-size: cover;
    cursor: pointer;
}

.sync-status {
    margin-top: 8px;
    color: green;
}
</style>