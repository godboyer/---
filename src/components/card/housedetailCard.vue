<template>
    <n-card>
        <n-thing>
            <template  #avatar>
                <swiper-house-pic :cardData="cardData" />
            </template>
            <template  #header>
                货币
            </template>
            <template  #header-extra>
                <n-button circle size="small">
                    <template #icon>
                        <cash-icon />
                    </template>
                </n-button>
            </template>
            <template  #description>
                描述
            </template>
            货币是为了提高交易效率而用于交换的中介商品。货币有多种形式，如贝壳粮食等自然物、金属纸张等加工品、银行卡信用卡等磁条卡、移动支付加密货币等APP。
            <template #footer>
                尾部
            </template>
            <template  #action>
                <n-space>
                    <n-button size="small">
                        <template #icon>
                            <n-icon>
                                <cash-icon />
                            </n-icon>
                        </template>
                        1 块钱
                    </n-button>
                    <n-button size="small">
                        <template #icon>
                            <n-icon>
                                <cash-icon />
                            </n-icon>
                        </template>
                        10 块钱
                    </n-button>
                    <n-button size="small">
                        <template #icon>
                            <n-icon>
                                <cash-icon />
                            </n-icon>
                        </template>
                        100 块钱
                    </n-button>
                </n-space>
            </template>
        </n-thing>



    </n-card>
</template>

<script setup lang='ts'>
import { useHouseStore } from '@/store';
import swiperHousePic from '../swiper/index.vue';
import { computed } from 'vue';

defineOptions({ name: 'houseDetailCard' });
const props = defineProps<{
    cardData: any;
}>();

const house = useHouseStore();


</script>

<style lang='scss' scoped></style>