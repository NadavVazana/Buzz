<template>
    <section v-if="statuses"  :key="this.$store.getters.statuses"   class="status-list">
        <div v-for="status in statuses" :key="status._id">
            <status-preview @remove="this.$emit('remove')" @edit="$emit('edit')" :status="status"></status-preview>

        </div>
        
        <div :key="this.$store.getters.loaderText" class="scroll" v-observe-visibility="handleScroll">{{msg}}</div>
    </section>
</template>

<script>
import statusPreview from './status-preview.vue'
import { statusService } from '../services/status.service'
export default {
    methods:{
        async handleScroll(isVisible){
      if(!isVisible) return
          this.$store.dispatch({type:'getMorePosts'})
    },
    },
  components: { statusPreview },
  async created(){
    const statuses = await statusService.query()
    this.$store.dispatch({type:'setStatuses',statuses})
    // const statuses =await this.$store.getters.statuses
    this.msg = this.$store.getters.loaderText
    this.statuses = this.$store.getters.statuses
    console.log(this.statuses);
    
  },

  async updated(){
    const statuses =await this.$store.getters.statuses
    this.msg = this.$store.getters.loaderText
    this.statuses = statuses
    
  },
   
    data(){
        return {
            statuses:null,
            msg:''
            
        }
    },
    components:{
      statusPreview
    }

}
</script>

<style lang="scss">
.status-list{
  .scroll{
      text-align: center;
  }
  width: 100%;

}

</style>