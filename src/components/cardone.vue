<template>
  <div class="pd-2">
     <n-card
    :bordered="false"
    :content-style="contentstyle"
    :header-style="headerstyle"
  >
    <template #cover class="cover">
      <swiperpic :cardData="Card1_Data"/>
     
    </template>

    <div>
      <div class="card_p">
        <p>
           <n-icon>
          <LocationSharp />
        </n-icon>
        <span>
          {{ Card1_Data?.location ?? "无" }}
        </span>
        </p>
       
      </div>
      <p class="card_p">
        <div> 
           <span>
          <n-icon>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_268_403)">
                <path
                  d="M11.9927 2.12696H3.00712C2.57476 2.12696 2.22303 2.47847 2.22303 2.91058V12.0895C2.22303 12.5218 2.57455 12.8735 3.00712 12.8735H11.9927C12.4249 12.8735 12.7766 12.522 12.7766 12.0895V2.91058C12.7764 2.47847 12.4249 2.12696 11.9927 2.12696ZM9.28364 9.36396H7.77209V5.94526L6.45737 8.0312L5.14787 5.94526V9.36418H3.64074V3.29503H5.14787L6.45737 5.38098L7.77209 3.29503H9.28364V9.36396ZM13.4629 0H1.53676C0.758887 0 0.128052 0.630799 0.128052 1.40856V13.5911C0.128052 14.3692 0.758887 15 1.53676 15H13.4631C14.241 15 14.8718 14.3692 14.8718 13.5911V1.40856C14.8718 0.630799 14.241 0 13.4629 0ZM13.332 12.0895C13.332 12.8278 12.7312 13.4288 11.9927 13.4288H3.00712C2.26872 13.4288 1.66772 12.828 1.66772 12.0895V2.91058C1.66772 2.17243 2.26851 1.57139 3.00712 1.57139H11.9927C12.731 1.57139 13.332 2.17218 13.332 2.91058V12.0895Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_268_403">
                  <rect width="15" height="15" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </n-icon>
          {{ Card1_Data.area }}
        </span>

        <span>
          <n-icon
            ><svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_277_143)">
                <path
                  d="M14.2377 2.95728H11.4975C11.0765 2.95728 10.7353 3.29822 10.7353 3.71936V5.69767H8.75705C8.33591 5.69767 7.99472 6.03849 7.99472 6.45966V8.43809H6.01641C5.59527 8.43809 5.2542 8.77941 5.2542 9.20012V11.2738H3.18094C2.97864 11.2738 2.78478 11.354 2.6419 11.4968C2.4989 11.6396 2.4187 11.8344 2.4187 12.0359L2.41895 13.6303C2.41895 14.0519 2.76026 14.3928 3.18116 14.3928H14.2377C14.6589 14.3928 14.9999 14.0519 14.9999 13.6303V3.71933C15 3.29822 14.6589 2.95728 14.2377 2.95728Z"
                  fill="black"
                />
                <path
                  d="M10.2266 0.760775C10.0304 0.559679 9.70912 0.555815 9.50814 0.751469C6.24859 3.9267 3.14766 7.02801 0.148905 10.0265C0.0534895 10.1219 0 10.2515 0 10.386V13.8635C0 14.1437 0.227408 14.3717 0.508119 14.3717C0.788553 14.3717 1.01636 14.1438 1.01636 13.8635V10.5963C3.96645 7.64611 7.01643 4.5977 10.2171 1.47927C10.418 1.28364 10.4221 0.961747 10.2266 0.760775Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_277_143">
                  <rect width="15" height="15" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </n-icon>
          {{ Card1_Data.des }}
        </span>
        </div>
       

         <div class="price">
         <span>
          {{Card1_Data.price.split('/').join('元/')}} 
         </span> 

        </div>
      </p>
    </div>
    <template #header>
      <n-ellipsis style="max-width: 200px">
        {{ Card1_Data?.title ?? "无标题" }}
      </n-ellipsis>
    </template>
    <template #header-extra>
      <n-avatar
        round
        :size="38"
        :src="
          Card1_Data?.Homeowner_info.pic ??
          'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        "
      />
    </template>

    <template #footer>
       <div  class="tag">
          <n-tag
         
        v-for="(v, idx) in Card1_Data?.tags"
        ize="small"
        :color="{ color: '#42B2B6', textColor: '#fff', borderColor: '#42B2B6' }"
        :key="idx"
        >{{ v }}</n-tag
      >
        </div>
      


    </template>
  </n-card>

  </div>
 
</template>

<script setup lang="ts">
import swiperpic from '@/components/swiper/index.vue'
import { reactive, Ref, ref } from "vue";
import {LocationSharp } from "@vicons/ionicons5";
import { IcardData, IhouseInfo } from "../typings/ApiInterface";
import { useRouter } from "vue-router";
// Import Swiper styles





defineProps<{
  Card1_Data: IcardData;
}>();

const contentstyle = reactive({
  fontSize: "12px",
  lineHeight: "22px",
  fontWeight: 400,
  color: "rgb(72,72,72)",
  padding: "0px",
  paddingLeft: "12px",
});

const headerstyle = reactive({
  padding: "12px",
});

</script>

<style lang="scss" scoped>
.con-card {
  padding: 0;
}
:deep(.n-card__footer) {
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 0;
  padding: 10px 12px 12px;
  .n-tag {
    height: 22px;
    color: #fff;
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
  }
}
.card_p {
  margin: 0;
  line-height: 22px;
  color: #767676;
  font-weight: 400;
  display: flex;
  column-gap: 12px;
  align-items: center;
  justify-content: space-between;
  .price{
    font-size: 18px;
    color: #222;
    font-weight: 700;
  }


}
.n-card {
  // max-width: 280px;
  width: 100%;
  // max-height: 318px;
  // margin: 5px;
  transition: width 5s ease-in-out;
 
}
.n-card-header {
  padding: 12px !important;
}
 :deep(.n-card-cover ){
  position: relative;
  object-fit: cover;
  aspect-ratio: 350/235;//容器的宽高比例
  cursor:pointer;
  img {
    width: 100%;

      object-fit: cover;
    // height: 220px;
    cursor:pointer;


  }
  button {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 8px;
    margin: -8px;
    width: 44px;
    height: 44px;
    border: 0px !important;
    z-index: 1;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }
    background: transparent !important;
  }
}

:deep(div[class="n-card-header__main"]) {
  font-size: 16px;
  font-weight: 800 !important;
}

.tag{
  display: flex;
  gap: 10px;
}

</style>
