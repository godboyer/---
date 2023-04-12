<template>
    <button class="btn-bg" @click.stop="handleClickCollection">
        <icon-local-love v-if="isCollected" class="text-24px" />
        <icon-local-love-on v-else class="text-24px" />
    </button>
</template>

<script setup lang='ts'>
import { useAuthStore } from '@/store';
import { useBoolean } from '@/hooks';
import { fetchCollect } from '@/service'
import { computed } from 'vue';
defineOptions({ name: 'collectionBtn' });
const auth = useAuthStore();
const {openLoginModel } = useAuthStore();
const { bool: isLogin } = useBoolean(auth.isLogin);


const props = defineProps<{
    house_id: string
}>();

const isCollected = computed(
    () => auth.collectList?.findIndex((item) => item.house_id === props.house_id)! == -1
)

async function handleClickCollection() {
       console.log('isLogin.value: ', isLogin.value);
    if (isLogin.value) {
     
        let params = {
            house_id: props.house_id,
        }
        let { error, data } = await fetchCollect(params)
        if (!error) {
            if (isCollected && data?.is_collect === '1') {
                window.$message?.success('收藏成功')
            }

            if (  data?.is_collect === '0') {
                window.$message?.success('取消收藏成功')
            }
        }
        await auth.getCollectList()
    } else {
       window.$message?.error('请先登录')
       openLoginModel()
    }


}



</script>

<style lang='scss' scoped>
.btn-bg{
    background-color: transparent !important;
}

</style>