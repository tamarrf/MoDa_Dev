<template>
    <div class="charts">
        <div class="diffusion-chart1">
            <canvas id="chartCanvas"></canvas>
            <!-- <button class="screenshot" v-on:click="getChartImage()"></button> -->
        </div>
        <div class="diffusion-chart2">
           <canvas id="chart2Canvas"></canvas>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import Chart from 'chart.js/auto';
export default {
    name: 'diffusionChartComponent',
    props: ['workspace', 'dataset'],
    data(){
        return{
            ctx: '',
            data: [],
        }
    },
    mounted()
    {
        window.addEventListener('complete', () =>{
            // multi run
            // const length = this.$store.state.chart.data.datasets[this.$store.state.runCount].data.length;
            // this.$store.state.chart.data.datasets[this.$store.state.runCount].pointBackgroundColor[length - 1] = '#1AD873';
            // this.$store.state.chart.data.datasets[this.$store.state.runCount].pointBorderColor[length - 1] = '#1AD873';

            // single run
            const length = this.$store.state.chart.data.datasets[0].data.length;
            this.$store.state.chart.data.datasets[0].pointBackgroundColor[length - 1] = '#1AD873';
            this.$store.state.chart.data.datasets[0].pointBorderColor[length - 1] = '#1AD873';
            
            let diffusionCompleteImage = new Image();
            diffusionCompleteImage.src = this.$store.state.imagePrefix ? this.$store.state.imagePrefix + 'complete.png' : require('@/assets/complete.png');
            // multi run
            // this.$store.state.chart.data.datasets[this.$store.state.runCount].pointStyle[length - 1] = diffusionCompleteImage;
            // single run
            this.$store.state.chart.data.datasets[0].pointStyle[length - 1] = diffusionCompleteImage;

            this.$store.state.chart.update();
        })
        // change color on chart when click event is registered in netlogo
        window.addEventListener('message', (e) => {
            if (e.data.type === 'fv-canvas-click'){
                // check if simulation is running and there are blocks in the mouse click bracket
                if($('#go-button').hasClass('go-pause')){
                    // multi run
                    // const length = this.$store.state.chart.data.datasets[this.$store.state.runCount].data.length;
                    // this.$store.state.chart.data.datasets[this.$store.state.runCount].pointBackgroundColor[length - 1] = '#FF0A01';
                    // this.$store.state.chart.data.datasets[this.$store.state.runCount].pointBorderColor[length - 1] = '#FF0A01';
                    const length = this.$store.state.chart.data.datasets[0].data.length;
                    for (let i = 0; i < this.$store.state.chart.data.datasets.length; i++) {
                        this.$store.state.chart.data.datasets[i].pointBackgroundColor[length - 1] = '#FF0A01';
                        this.$store.state.chart.data.datasets[i].pointBorderColor[length - 1] = '#FF0A01';
                    }
                    this.$store.state.chart.update();

                    const length2 = this.$store.state.chart2.data.datasets[0].data.length;
                    for (let i = 0; i < this.$store.state.chart2.data.datasets.length; i++) {
                        this.$store.state.chart2.data.datasets[i].pointBackgroundColor[length2 - 1] = '#FF0A01';
                        this.$store.state.chart2.data.datasets[i].pointBorderColor[length2 - 1] = '#FF0A01';
                    }
                    this.$store.state.chart2.update();
                }
            }
        })

        if (this.$store.state.chart) {
            this.$store.state.chart.destroy();
        }

        if (this.$store.state.chart2) {
            this.$store.state.chart2.destroy();
        }

        Chart.defaults.font.family = "Poppins";
        Chart.defaults.font.size = 11;
        this.ctx = document.getElementById('chartCanvas').getContext('2d');
        this.$store.state.chart = new Chart(this.ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Alga',
                        borderColor: '#05AD21',
                        backgroundColor: '#05AD21',
                        pointBorderColor: ['#05AD21'],
                        pointBackgroundColor: ['#05AD21'],
                        pointStyle: 'circle',
                        data: [],
                        borderWidth: 1
                    },
                    {
                        label: 'Peixe',
                        borderColor: '#ED9911',
                        backgroundColor: '#ED9911',
                        pointBorderColor: ['#ED9911'],
                        pointBackgroundColor: ['#ED9911'],
                        pointStyle: 'circle',
                        data: [],
                        borderWidth: 1
                    },
                    {
                        label: 'Bactéria',
                        borderColor: '#895129',
                        backgroundColor: '#895129',
                        pointBorderColor: ['#895129'],
                        pointBackgroundColor: ['#895129'],
                        pointStyle: 'circle',
                        data: [],
                        borderWidth: 1
                    },
                    {
                        label: 'Matéria Orgânica',
                        borderColor: '#808080',
                        backgroundColor: '#808080',
                        pointBorderColor: ['#808080'],
                        pointBackgroundColor: ['#808080'],
                        pointStyle: 'circle',
                        data: [],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                interaction: {
                    mode: 'nearest',
                },
                showLine: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tempo (ticks)',
                            align: 'center',
                            padding: 0
                        },
                        ticks: {
                            callback: function(val) {
                                // Hide the decimal point labels
                                return Number.isInteger(val) ? this.getLabelForValue(val) : '';
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        suggestedMax: 40,
                        title: {
                            display: true,
                            text: ['Populações'],
                            align: 'center',
                            padding: 0
                        }
                    }
                },
                maintainAspectRatio: false,
                plugins: 
                {
                    tooltip: {
                        events:['mousemove', 'mouseout', 'touchstart', 'touchmove'],
                        callbacks: {
                            label: function(tooltipItem) {
                                // check if point is red
                                if(this._chart.data.datasets[tooltipItem.datasetIndex].pointBackgroundColor[tooltipItem.dataIndex] === '#FF0A01'){
                                    return ['Mouse Clicked!', this._chart.data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.parsed.y];
                                }
                                else{
                                    return [this._chart.data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.parsed.y];
                                }
                            }
                        }
                    },
                    legend: {
                        display: true,
                        labels: {
                        usePointStyle: true,
                        },
                    }
                }
            }
        });

        this.ctx = document.getElementById('chart2Canvas').getContext('2d');
        this.$store.state.chart2 = new Chart(this.ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Clorofila',
                        borderColor: '#05AD21',
                        backgroundColor: '#05AD21',
                        pointBorderColor: ['#05AD21'],
                        pointBackgroundColor: ['#05AD21'],
                        pointStyle: 'circle',
                        data: [],
                        borderWidth: 1
                    },
                    {
                        label: 'O2',
                        borderColor: '#ED4811',
                        backgroundColor: '#ED4811',
                        pointBorderColor: ['#ED4811'],
                        pointBackgroundColor: ['#ED4811'],
                        pointStyle: 'circle',
                        data: [],
                        borderWidth: 1
                    },
                    {
                        label: 'CO2',
                        borderColor: '#000000',
                        backgroundColor: '#000000',
                        pointBorderColor: ['#000000'],
                        pointBackgroundColor: ['#000000'],
                        pointStyle: 'rect',
                        data: [],
                        borderWidth: 1
                    },
                    {
                        label: 'Nutrientes',
                        borderColor: '#045C08',
                        backgroundColor: '#045C08',
                        pointBorderColor: ['#045C08'],
                        pointBackgroundColor: ['#045C08'],
                        pointStyle: 'triangle',
                        data: [],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                interaction: {
                    mode: 'nearest',
                },
                showLine: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tempo (ticks)',
                            align: 'center',
                            padding: 0
                        },
                        ticks: {
                            callback: function(val) {
                                // Hide the decimal point labels
                                return Number.isInteger(val) ? this.getLabelForValue(val) : '';
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        suggestedMax: 100,
                        title: {
                            display: true,
                            text: ['Populações'],
                            align: 'center',
                            padding: 0
                        }
                    }
                },
                maintainAspectRatio: false,
                plugins: 
                {
                    tooltip: {
                        events:['mousemove', 'mouseout', 'touchstart', 'touchmove'],
                        callbacks: {
                            label: function(tooltipItem) {
                                // check if point is red
                                if(this._chart.data.datasets[tooltipItem.datasetIndex].pointBackgroundColor[tooltipItem.dataIndex] === '#FF0A01'){
                                    return ['Mouse Clicked!', this._chart.data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.parsed.y];
                                }
                                else{
                                    return [this._chart.data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.parsed.y];
                                }
                            }
                        }
                    },
                    legend: {
                        display: true,
                        labels: {
                        usePointStyle: true,
                        },
                    }
                }
            }
        })
    },
    methods:
    {
        getChartImage(){
            let img;
            if(this.$store.state.chart){
                // change canvas background to white for screenshot button
                this.ctx.save();
                this.ctx.globalCompositeOperation = 'destination-over';
                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(0, 0, this.$store.state.chart.width, this.$store.state.chart.height);
                this.ctx.restore();
                img = this.$store.state.chart.toBase64Image();
            }
            let a = document.createElement("a"); //Create <a>
            a.href = img; //Image Base64 Goes here
            a.download = "chart"; //File name Here
            a.click(); //Downloaded file
        }
    },
    computed:{
        simRuns(){
            return this.$store.state.runCount;
        }
    },
    watch: {
        // simRuns(newCount) {
        //     const newDataset = {
        //         label: 'simulation run ' + (newCount - 1),
        //         borderColor: '#2671BC',
        //         pointBorderColor: ['#2671BC'],
        //         pointBackgroundColor: ['#2671BC'],
        //         pointStyle: ['circle'],
        //         data: [{x:0, y:0}],
        //         borderWidth: 1
        //     };
        //     this.$store.state.chart.data.datasets.push(newDataset);
        //     this.$store.state.chart.update();
        // }
  }
}
</script>

<style scoped>
.charts{
    height: 78%;
    width: 100%;
    display: flex;
}
.diffusion-chart1 {
    font-weight: 500;
    height: 100%;
    width: 50%;
    padding-top: 0.5%;
    padding-left: 0.5%;
    padding-right: 0.5%;
}
.diffusion-chart2 {
    font-weight: 500;
    height: 100%;
    width: 50%;
    padding-top: 0.5%;
    padding-left: 0.5%;
    padding-right: 0.5%;
    background-color: #3F91BB40;
}
.screenshot{
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
</style>