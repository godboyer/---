<template>
 
    <n-list show-divider>
    <!-- <template #header>
    
    </template> -->
    <!-- <template #footer>
      fff
    </template> -->
    <n-list-item>
      <template #prefix>
          <swiperpic :card-data="cardData"/>
      </template>
      <template #suffix>
        <n-button>Suffix</n-button>
      </template>
      <n-thing title="Thing" title-extra="extra" description="description">
        Biu<br>
        Biu<br>
        Biu<br>
      </n-thing>
    </n-list-item>
    <!-- <n-list-item>
      <n-thing title="Thing" title-extra="extra" description="description" />
    </n-list-item> -->
  </n-list>
</template>


  

<script setup lang='ts'>
import swiperpic from './swiper/index.vue'

defineProps<{
  cardData:any
}>()
defineOptions({name:'cardfive'})


</script>

<style lang='scss' scoped>

:deep(.n-list-item__prefix){
  width:300px;
  height:200px;
  flex: 2 !important;
   aspect-ratio: 3/2;//容器的宽高比例
  cursor:pointer;
  img {
    width: 100%;
    object-fit: cover;
    // height: 220px;
    cursor:pointer;


  }
}

</style>