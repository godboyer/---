<template>
    <div class="personal-container">
        <div class="w-1015px h-full p-t-45px personal-main">
            <div class="w-310px h-600px  b-rd-15px personal-aside">
                <div>
                    <upload-avatar>
                        <template #avatar="{ avatarUrl, click }">
                            <n-avatar round :size="120" :src="avatarUrl || avatar" />
                            <p @click="click" class="update-avatar">更新照片</p>
                        </template>
                    </upload-avatar>
                </div>
                <div class="p-t-20px w-310px">
                    <ul class="link-box">
                        <li class="link-item" v-for="item in menuOptions">
                            <RouterLink :to="item.path">

                                {{ item.label }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="w-full  bg-#fff p-25px">
                <transition name="fade-slide" mode="out-in" appear>
                    <component :is="activeModule.module" />
                </transition>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '@/store';
import { url } from '@/service/request';
import uploadAvatar from '@/components/common/uploadAvatar.vue';
import { collectionComp, commentComp, historyComp, feedbackComp, userinfoComp } from './components';
import { computed } from 'vue';
interface Props {
    module: string;

}
const props = defineProps<Props>()
const user = useAuthStore();



const avatar = computed(() => {
    return user.userInfo.avatar?.replace(/public/, url.replace(/\/api/, "")) || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg';
}

);
const userInfo = computed(() => user.userInfo);


interface MenuOptions {
    label: string;
    key: string;
    path: string;
    module?: any;
}


const menuOptions: MenuOptions[] = [
    {
        label: '个人信息',
        key: 'userinfo',
        path: '/personal/userinfo',
        module: userinfoComp
    },
    {
        label: '我的收藏',
        key: 'collection',
        path: '/personal/collection',
        module: collectionComp
    },
    {
        label: '我的评价',
        key: 'comment',
        path: '/personal/comment',
        module: commentComp
    },

    {
        label: '我的反馈',
        key: 'feedback',
        path: '/personal/feedback',
        module: feedbackComp

    },


]
const activeModule = computed(() => {
    const active = { ...menuOptions[0] }
    console.log('props: ', props);
    const moduleItem = menuOptions.find(item => item.key === props.module);

    if (moduleItem) {
        Object.assign(active, moduleItem);
    }

    return active;


})

</script>

<style lang='scss' scoped>
.update-avatar {
    color: #00a0e9;
    cursor: pointer;
    text-align: center;
    margin-top: 10px;
    text-decoration: underline;
}

.personal-container {
    width: 100%;
    height: 100vh;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    align-items: center;

    .personal-main {
        width: 1015px;
        height: 100%;

        display: flex;
        justify-content: space-between;
        column-gap: 75px;

        .w-310px {
            width: 310px;
        }

        .w-full {
            width: 100%;
        }
    }

    .personal-aside {
        background-color: #fff;

        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px;
        border: 1px solid #e5e5e5;

    }
}

.link-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    .link-item {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #e5e5e5;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            background-color: #e5e5e5;
        }
    }
}
</style>