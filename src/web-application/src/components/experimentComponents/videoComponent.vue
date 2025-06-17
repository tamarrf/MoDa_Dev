<template>
    <div class="videos" v-if="hasVideos">
        <div class="video-selection">
            <label v-if="modelLanguage === 'pt_br'" for="task-videos">Selecione um vídeo: </label>
            <label v-else-if="modelLanguage === 'en'" for="task-videos">Select a video: </label>
            <select name="task-videos" id="task-videos" class="task-videos" v-model="selected" @input="logDataInteraction('select', $event)">
                <option id="selected-video"
                v-for="video in $store.state.taskInfo.videos" 
                :key="video.title" 
                :value="video.source">
                    {{ video.title }}
                </option>
            </select>
        </div>
        <div class="video-container">
            <video controls class="video" :src="selected"
            @play="logDataInteraction('play', $event)"
            @pause="logDataInteraction('pause', $event)"
            @seeking="logDataInteraction('seek_start', $event)"
            @seeked="logDataInteraction('seek_end', $event)">

                Your browser does not support the video tag.
            </video>
        </div>
    </div>
</template>

<script>
export default {
    name: 'videoComponent',
    data(){
        return{
            selected: '',
            hasVideos: false,
            modelLanguage: ''
        }
    },
    mounted(){
        if(this.$store.state.taskInfo.videos.length > 0){
            this.hasVideos = true;
            this.selected = this.$store.state.taskInfo.videos[0].source;
        }
        if(this.$store.state.taskInfo.taskId?.endsWith('pt_br')){
            this.modelLanguage = 'pt_br';
        } else {
            this.modelLanguage = 'en';
        }
    },
    methods:
    {
      logDataInteraction(type, event){
        let dataLog = {
          component_type: "video",
          component_data: {
            action: type,
            video: this.selected,
            video_time: (event.target.currentTime ? event.target.currentTime : '0:00')
          }
        }
        let logString = JSON.stringify(dataLog)
        if (window.fv && window["__USER_ID__"]) {
          window.fv.log(logString)
        }
      }
    }
}
</script>

<style scoped>
.videos{
    display: grid;
    align-items: center;
    justify-items: center;
    height: 100%;
    max-width: 100%;
    grid-template-columns: 100%;
    grid-template-rows: minmax(0,2fr) minmax(0,14fr);
}

.video-container{
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
}

.task-videos{
    font-family: Poppins, sans-serif;
}

.label{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
}

.video{
    max-width: 100%; 
    max-height: 100%;
}
</style>
