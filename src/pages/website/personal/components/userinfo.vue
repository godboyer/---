<template>
    <div>
        <n-list bordered>
            <template #header>
                你好！ {{username  }}
            </template>
 
            
      
            <n-list-item>
                <n-thing title="姓名" :title-extra="extra" :description="trueName" />
              
              
            </n-list-item>
            <n-list-item>
                <n-thing title="邮箱"  :description="email"></n-thing>
            </n-list-item>
            <n-list-item>
                <n-thing title="地址"  :description="address"></n-thing>
            </n-list-item>
            <n-list-item>
                <n-thing title="手机号"  :description="phone"></n-thing>
            </n-list-item>
        </n-list>
    </div>
</template>

<script setup lang='ts'>
import { useAuthStore } from '~/src/store';
import { fetchUserInfo } from '~/src/service';
import dayjs from 'dayjs';
import { computed } from 'vue';
const user = useAuthStore();
const userInfo = computed(() => user.userInfo);


const extra = computed(() => `注册时间：${ dayjs(user.userInfo.createtime).format('YYYY')}`)
const phone = computed(() => String(user.userInfo.phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))
const email = computed(() => user.userInfo.email as string)
const username = computed(() => user.userInfo.username)
const trueName = computed(() => user.userInfo?.true_name)
const address = computed(() => user.userInfo?.address)
defineOptions({ name: 'userinfoComp' })


</script>

<style lang='scss' scoped></style>