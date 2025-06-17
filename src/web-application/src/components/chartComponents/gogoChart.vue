<template>
	<div class="charts-container" ref="chartsContainer">
		<div class="chart-container">
			<div class="chart-label">
				<span class="rotated">Model</span>
			</div>
			<div class="chart">
				<highcharts :options="chartOptions1" ref="chart1"></highcharts>
			</div>
			<div class="chart-label chart-label-2" v-if="settings.plotStyle !== 'Separate'">
				<span class="rotated cw">Real World</span>
				<span class="rotated cw label-2-y-axis">{{ chartOptions2.yAxis[0].title.text }}</span>
			</div>
		</div>
		<div class="chart-container" v-if="settings.plotStyle === 'Separate'">
			<div class="chart chart-2">
				<highcharts :options="chartOptions2" ref="chart2"></highcharts>
			</div>
			<div class="chart-label chart-label-2">
				<span class="rotated cw">Real World</span>
			</div>
		</div>
	</div>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
export default {
	name: "diffusionChartComponent",
	props: ["workspace", "dataset1", "dataset2", "settings"],
	components: {
		highcharts: Chart,
	},
	data() {
		return {
			ctx: "",
			isModelComplete: false,
			data: [],
			chartOptions1: {
				chart: {
					height: 145,
					// margin: [0, 10, 0, 10],
					spacing: [10, 10, 0, 10],
					title: "Model",
					events: {
						redraw: () => {
							this.refreshView(false);
						},
						// Hide export menu thing
						beforePrint:function() {
							this.exportSVGElements[0].box.hide();
							this.exportSVGElements[1].hide();
						},
						afterPrint:function() {
							this.exportSVGElements[0].box.show();
							this.exportSVGElements[1].show();
						}
					},
				},
				credits: {enabled: false},
				title: {text: null},
				// legend: {
				// 	enabled: true,
				// 	layout: "vertical",
				// 	backgroundColor: "#FFFFFF",
				// 	floating: true,
				// 	align: "right",
				// 	verticalAlign: "bottom",
				// 	margin: 50,
				// 	reversed: true,
				// },
				navigator: {
					enabled: false,
				},
				series: [
					{
						name: "Time",
						color: "#FF0000",
						type: 'line',
						data: [],
						pointStart: 0,
						pointInterval: 1,
					},
				],
				xAxis: {
					title: {
						text: "Time",
					},
					useHTML: true,
					style: {
						fontSize: '12px',
						fontFamily: 'proxima-nova,helvetica,arial,sans-serif',
						whiteSpace: 'nowrap',
						paddingLeft: '15px',
						paddingRight: '15px',
						paddingTop: '5px',
						paddingBottom: '5px',
					},
					// type: 'datetime',
					// dateTimeLabelFormats: {
					// 	minute: '%d %b %Y %H:%M'
					// },
					// startOnTick: true,
					// endOnTick: true,
					// showLastLabel: true
				},
				yAxis: [
					{
						title: {
							text: "",
						},
						labels: {
							formatter: function () {
								return this.value;
							}
						},
					},
					{
						title: {
							text: "",
						},
						labels: {
							formatter: function () {
								return this.value;
							}
						},
					}
				]
			},
			chartOptions2: {
				chart: {
					height: 145,
					// margin: [0, 10, 0, 10],
					spacing: [10, 10, 0, 10],
					title: "Real World",
					events: {
						redraw: () => {
							this.refreshView(false);
						},
						// Hide export menu thing
						beforePrint:function() {
							this.exportSVGElements[0].box.hide();
							this.exportSVGElements[1].hide();
						},
						afterPrint:function() {
							this.exportSVGElements[0].box.show();
							this.exportSVGElements[1].show();
						}
					},
				},
				credits: {enabled: false},
				title: {text: null},
				navigator: {
					enabled: false,
				},
				series: [
					{
						name: "Time",
						color: "#0000FF",
						type: 'line',
						data: [],
						// pointStart: 0,
						// pointInterval: 1,
					},
				],
				xAxis: {
					title: {
						text: "Time",
					},
					useHTML: true,
					style: {
						fontSize: '12px',
						fontFamily: 'proxima-nova,helvetica,arial,sans-serif',
						whiteSpace: 'nowrap',
						paddingLeft: '15px',
						paddingRight: '15px',
						paddingTop: '5px',
						paddingBottom: '5px',
					},
					// type: 'datetime',
					// dateTimeLabelFormats: {
					// 	minute: '%d %b %Y %H:%M'
					// },
					// startOnTick: true,
					// endOnTick: true,
					// showLastLabel: true
				},
				yAxis: [
					{
						title: {
							text: "",
						},
						labels: {
							formatter: function () {
								return this.value;
							}
						},
					},
					{
						title: {
							text: "",
						},
						labels: {
							formatter: function () {
								return this.value;
							}
						},
					}
				],
			},
		};
	},
	mounted() {
		this.setChartSettings();

		window.addEventListener("resize", this.refreshView);

		window.addEventListener('complete', () =>{
			this.isModelComplete = true;
			this.setChartData();
		});

		window.addEventListener("SetupComplete", () =>{
            this.isModelComplete = false;
			this.chartOptions1.series[0].data = [];
			this.setChartData();
        });
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.refreshView);
	},
	methods: {
		refreshView(reflow = true) {
			this.chartOptions1.chart.height = this.$refs['chartsContainer'].clientHeight;
			this.chartOptions2.chart.height = this.$refs['chartsContainer'].clientHeight;

			if (reflow) {
				this.$refs['chart1']?.chart?.reflow();
				this.$refs['chart2']?.chart?.reflow();
			}
		},
		setChartData() {
			// Set Chart 1 Data (Model)
			this.chartOptions1.series[0].data = this.$store.state.simulationData.map((el, index) => {
				return {
					x: el[0],
					y: el[1],
					color: this.isModelComplete && index == this.$store.state.simulationData.length - 1 ? "#1AD873" : "#FF0000",
					name: this.isModelComplete && index == this.$store.state.simulationData.length - 1 ? "Diffusion Complete!" : undefined
				}
			}) || [];

			if (this.settings.yAxis2 !== 'None') {
				this.$set(this.chartOptions1.series, 1, {
					name: this.settings.yAxis2,
					data: this.$store.state.simulationData?.map(el => el[0]) || [],
					type: this.settings.graphType.toLowerCase(),
					color: "#FF00FF",
					yAxis: 1,
				});
			} else {
				this.$delete(this.chartOptions1.series, 1);
			}

			// Set Chart 2 Data (Real World)
			// Solve start time
			let startTime = this.dataset2?.data?.[0]?.data?.[0] || 0;
			console.log(startTime);
			
			// Build data array
			let data = [];
			let datasetX = this.dataset2?.data?.[this.settings.xAxisRW]?.data || [];
			let datasetXName = this.dataset2?.data?.[this.settings.xAxisRW]?.name || "";
			let datasetY = this.dataset2?.data?.[this.settings.yAxisRW]?.data || [];
			let datasetYName = this.dataset2?.data?.[this.settings.yAxisRW]?.name || "";

			for(let i = 0; i < datasetY.length; i++) {
				// If axis is time, subtract start time from all values
				let valueX = datasetX[i];
				if (datasetXName === "Time") valueX = (valueX - startTime) / 1000;
				let valueY = datasetY[i];
				if (datasetYName === "Time") valueY = (valueY - startTime) / 1000;
				data.push([valueX, valueY]);
			}
			console.log("new chart 2 data", data);
			
			this.chartOptions2.series[0].data = data;

			let datasetY2 = this.dataset2?.data?.[this.settings.yAxis2RW - 1]?.data || [];
			let datasetY2Name = this.dataset2?.data?.[this.settings.yAxis2RW - 1]?.name || "";
			if (datasetY2.length) {
				let data2 = [];
				for(let i = 0; i < datasetY2.length; i++) {
					// If axis is time, subtract start time from all values
					let valueX = datasetX[i];
					if (datasetXName === "Time") valueX = (valueX - startTime) / 1000;
					let valueY = datasetY2[i];
					if (datasetY2Name === "Time") valueY = (valueY - startTime) / 1000;
					data2.push([valueX, valueY]);
				}
				this.chartOptions2.series[1] = {
					name: datasetY2Name,
					data: data2,
					type: this.settings.graphTypeRW.toLowerCase(),
					color: "#FF00FF",
					yAxis: 1,
				};
			} else {
				delete this.chartOptions2.series[1];
			}
		},
		setChartSettings() {
			this.chartOptions1.xAxis.title.text = this.settings.xAxis;
			this.chartOptions1.series[0].name = this.settings.yAxis;
			// this.chartOptions2.series[0].name = this.settings.xAxisRW === 4 ? "Time" : this.dataset2?.data[this.settings.xAxisRW]?.name; //this.settings.xAxisRW;
			this.chartOptions2.series[0].name = this.dataset2?.data?.[this.settings.yAxisRW]?.name;
			this.chartOptions1.series[0].type = this.settings.graphType.toLowerCase();
			this.chartOptions2.series[0].type = this.settings.graphTypeRW.toLowerCase();
			this.chartOptions2.xAxis.title.text = this.dataset2?.data?.[this.settings.xAxisRW]?.name;
			this.chartOptions1.yAxis[0].title.text = this.settings.yAxis;
			// this.chartOptions2.yAxis.title.text = this.settings.yAxisRW === 4 ? "Time" : this.dataset2?.data[this.settings.yAxisRW].name;
			this.chartOptions2.yAxis[0].title.text = this.dataset2?.data?.[this.settings.yAxisRW]?.name;

			// Trucate titles
			if (this.chartOptions2.yAxis[0].title.text === "Temperature") {
				this.chartOptions2.yAxis[0].title.text = "Temp.";
			}
			if (this.chartOptions2.xAxis.title.text === "Temperature") {
				this.chartOptions2.xAxis.title.text = "Temp.";
			}

			this.chartOptions2.yAxis[0].min = this.settings.yAxisRangeRW[0] !== "auto" ? this.settings.yAxisRangeRW[0] : undefined;
			this.chartOptions2.yAxis[0].max = this.settings.yAxisRangeRW[1] !== "auto" ? this.settings.yAxisRangeRW[1] : undefined;

			this.setChartData();

			if (this.chartOptions2.series[1]) {
				this.chartOptions2.yAxis[1].min = this.settings.yAxisRangeRW[0] !== "auto" ? this.settings.yAxisRangeRW[0] : undefined;
				this.chartOptions2.yAxis[1].max = this.settings.yAxisRangeRW[1] !== "auto" ? this.settings.yAxisRangeRW[1] : undefined;
			} else {
				this.chartOptions2.yAxis[1].min = undefined;
				this.chartOptions2.yAxis[1].max = undefined;
			}

			if (this.settings.plotStyle == "Separate") {
				this.$delete(this.chartOptions1.series, 1);

				// Clear Model chart range
				this.chartOptions1.yAxis[0].min = undefined;
				this.chartOptions1.yAxis[0].max = undefined;
			} else {
				this.$set(this.chartOptions1.series, 1,  this.chartOptions2.series[0]);

				// Set Model chart range
				this.chartOptions1.yAxis[0].min = this.chartOptions2.yAxis[0].min;
				this.chartOptions1.yAxis[0].max = this.chartOptions2.yAxis[0].max;

				if (this.chartOptions2.series[1]) {
					this.$set(this.chartOptions1.series, 2,  this.chartOptions2.series[1]);
				} else {
					this.$delete(this.chartOptions1.series, 2);
				}
			}

			// Fire window resize event to force chart redraw
			window.dispatchEvent(new Event('resize'));
		},
	},
	computed: {},
	watch: {
		settings: {
			handler(newVal, oldVal) {
				this.setChartSettings();

				console.log("settings changed", newVal, oldVal);
			},
			deep: true,
		},
		"$store.state.board.dataset": {
			handler(newVal, oldVal) {
				this.$set(this, "dataset1", newVal);
				// this.$set(this, "dataset2", newVal);
				this.setChartSettings();
			},
			deep: true,
		},
		"$store.state.simulationData": {
			handler(newVal, oldVal) {
				this.setChartSettings();
			},
			deep: true,
		},
		"$store.state.secondChart": {
			handler(newVal, oldVal) {
				this.setChartSettings();
			},
			deep: true,
		},
		// "dataset1": function(newVal, oldVal) {
		// 	this.setChartSettings();
		// },
		"dataset2": function(newVal, oldVal) {
			console.log("dataset2 changed", newVal, oldVal);
			this.setChartSettings();
		},
		"settings.plotStyle": function(newVal, oldVal) {
			this.$nextTick(() => {
				this.refreshView();
			});
		},
	}
};
</script>

<style scoped>
.charts-container {
	flex: 1;
	max-height: 90%;
	width: 100%;
	display: flex;
	justify-content: center;
}
.chart-container {
	font-weight: 500;
	height: 100%;
	/* width: 50%; */
	display: flex;
	flex: 1;
	justify-content: center;
	position: relative;
	overflow: hidden;
}
.chart {
	overflow: hidden;
	flex: 1;
}
.chart-2 {
	
}
.screenshot {
	/* display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-style: solid;
    border-color: #B5B5B6;
    border-width: 1px;
    border-radius: 7px;
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    padding: 0px;
    background-image: url('../../assets/camera.png');
    background-repeat: no-repeat;
    background-size: contain; */
	position: relative;
	bottom: 26%;
	left: 1%;
}

.chart-label {
	display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
	border: 2px solid;
    margin: 13px;
	padding: 15px;
    border-radius: 5px;
	color: red;
}

 .chart-label-2 {
	color: blue;
 }

 .label-2-y-axis {
	margin-left: -55px;
    margin-top: -85px;
    color: #000;
    font-size: 12px;
    font-weight: lighter;
    text-align: center;
 }

.rotated {
	position: absolute;
	min-width: 100px;
	transform: rotate(-90deg);
}

.rotated.cw {
	transform: rotate(90deg);
}
</style>