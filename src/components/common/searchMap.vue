<template>
  <n-card>
    <div class="wh-full relative h410px">
      <div ref="domRef" class="h410px"></div>
    </div>

    <div
      id="searchResultPanel"
      class="search-result-panel"
      style="
        border: 1px solid #c0c0c0;
        width: 250px;
        height: 500px;
        display: none;
      "
    ></div>
  </n-card>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, h, useSlots } from "vue";
import { useScriptTag } from "@vueuse/core";
import {
  BAIDU_MAP_SEARCH_SDK_URL,
  BAIDU_MAP_SDK_URL,
  BAIDU_MAP_SEARCH_SDK_URL_TWO,
} from "@/config";
import { NTag, SelectOption } from "naive-ui";
import Useexpose from "../useexpose.vue";
// console.log("BAIDU_MAP_SEARCH_SDK_URL: ", BAIDU_MAP_SEARCH_SDK_URL);

defineOptions({ name: "searchBaiduMap" });
const { scriptTag, load, unload } = useScriptTag(
  BAIDU_MAP_SEARCH_SDK_URL,
  () => {
    // do something
    //创建和初始化地图函数：
    renderMap();
  },
  { manual: true }
);
const props = defineProps<{
  value: string;
  autolocaltion: any;
  inputDom?: HTMLInputElement | string;
}>();

interface SearchResult {
  address: string;
  point:BMap.Point;
}


/**
 * 暴露方法
 */
const emit = defineEmits<{
  (e: "clicksearch"): (value: string) => void;
  (e: "searchAddressResult",params: SearchResult) : void;
}>(); // 传入的参数是一个对象，对象的 key 是事件名，value 是事件的参数类型

const domRef = ref<HTMLDivElement>();
const imputRef = ref<HTMLInputElement>();
const searchText = ref("");
const mapObject = reactive<{
  map: any;
  ac: any;
  local: any;
  pp: any;
  marker: any;
  myValue: string;
}>({
  map: null,
  ac: null,
  local: null,
  pp: null,
  marker: null,
  myValue: '',
});
defineExpose({
  handleSearchMapHandle,
  mapObject,
  createAutoSearch,
});
const slots = useSlots();
interface SearchOption {
  forceLocal: boolean;
  customData?: any;
}

function handleSearchMapHandle(
  keyword: String | Array<String>,
  option: Object
) {
  mapObject.local.search(keyword, option);
}

function handleSearchMap() {
  console.log("mapObject.local: ", mapObject.local);
  console.log("searchText.value: ", searchText.value);

  mapObject.local.search(searchText.value);
}


const valueRef = ref("");


function clickMarkerShowHouseInfoHandle(e: any) {
  console.log("e: ", e);
  var opts = {
    width: 200, // 信息窗口宽度
    height: 300, // 信息窗口高度
    title: "海底捞王府井店", // 信息窗口标题
    enableMessage: true, //设置允许信息窗发送短息
    message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~",
  };
  console.log("点击了标记e: ", e);
  var infoWindow = new BMap.InfoWindow(
    "地址：北京市东城区王府井大街88号乐天银泰百货八层",
    opts
  ); // 创建信息窗口对象

  mapObject.map.openInfoWindow(infoWindow, e.point);
}

// 创建地图实例
const mapContainer = computed(() => {
  return domRef.value;
});
//搜索容器
const searchContainer = computed(() => {
  return props.inputDom || imputRef.value;
});

const Autocompletelocation = computed(() => {
  return props.autolocaltion || mapObject.map;
});

function createAutoSearch(
  input: string | HTMLElement,
  location: string | BMap.Map | BMap.Point | undefined
) {
  // local.search("中关村");
  mapObject.ac = new BMap.Autocomplete({
    //建立一个自动完成的对象
    input,
    // location表示检索区域，其类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定，且搜索结果的标注将自动加载到地图上，并支持调整地图视野层级；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会在该城市内进行
    location,
  });
  mapObject.ac.addEventListener("onhighlight", onhighlight); //鼠标放在下拉列表上的事件

  mapObject.ac.addEventListener("onconfirm", onconfirm); //鼠标点击下拉列表后的事件
}
function G(id: any) {
  return document.getElementById(id) as HTMLElement;
}
function onconfirm(e: any) {
  console.log("onconfirme: ", e);
  var _value = e.item.value;
  mapObject.myValue =
    _value.province +
    _value.city +
    _value.district +
    _value.street +
    _value.business;
  let html = `onconfirm<br />index =${e.item.index}<br />myValue = ${mapObject.myValue}`;
  console.log("html: ", html);
  G("searchResultPanel").innerHTML =
    "onconfirm<br />index = " + e.item.index + "<br />myValue = " + mapObject.myValue;
  setPlace();
}
function onhighlight(e: any) {
  var str = "";
  var _value = e.fromitem.value;
  var value = "";
  if (e.fromitem.index > -1) {
    value =
      _value.province +
      _value.city +
      _value.district +
      _value.street +
      _value.business;
  }
  str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

  value = "";
  if (e.toitem.index > -1) {
    _value = e.toitem.value;
    value =
      _value.province +
      _value.city +
      _value.district +
      _value.street +
      _value.business;
  }
  str +=
    "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;

  G("searchResultPanel").innerHTML = str;
}
function setPlace() {
  mapObject.map.clearOverlays(); //清除地图上所有覆盖物
  mapObject.local.search(mapObject.myValue);
}
function renderMap() {
  if (!domRef.value) return;
  mapObject.map = new BMap.Map(domRef.value); // 创建地图实例
  const point = new BMap.Point(114.05834626586915, 22.546789983033168); // 创建点坐标
  mapObject.map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
  mapObject.map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
  // console.log("mapObject.map: ", mapObject.map);
  // console.log("mapObject.mapkeys ", Object.keys(mapObject.map));
  var top_left_control = new BMap.ScaleControl({
    anchor: BMAP_ANCHOR_BOTTOM_LEFT,
  }); // 左上角，添加比例尺
  var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
  var top_right_navigation = new BMap.NavigationControl({
    anchor: BMAP_ANCHOR_TOP_RIGHT,
    type: BMAP_NAVIGATION_CONTROL_SMALL,
  }); //右上角，仅包含平移和缩放按钮
  /*缩放控件type有四种类型:
	BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
  mapObject.map.addControl(top_left_control);
  mapObject.map.addControl(top_left_navigation);
  mapObject.map.addControl(top_right_navigation);

  // local.search("中关村");
  // mapObject.ac = new BMap.Autocomplete({
  //   //建立一个自动完成的对象
  //   input: searchContainer.value,
  //   // location表示检索区域，其类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定，且搜索结果的标注将自动加载到地图上，并支持调整地图视野层级；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会在该城市内进行
  //   location: "武汉",
  // });
  mapObject.local = new BMap.LocalSearch(mapObject.map, {
    // renderOptions: {
    //   map: mapObject.map,
    // },
    // //标注添加完成后的回调函数
    // onMarkersSet: function (pois: Array<BMap.LocalResultPoi>) {
    //   console.log("pois: ", pois);
    //   mapObject.map.centerAndZoom(pois[0].point, 18);
    // },
    // // 	标注气泡内容创建后的回调函数
    // onInfoHtmlSet: function (poi: BMap.LocalResultPoi) {
    //   console.log("poi: ", poi);
    // },
    // // 	结果列表添加完成后的回调函数
    // onResultsHtmlSet: function (container: HTMLElement) {
    //   console.log("container: ", container);
    // },
    // pageCapacity: 1,
    //智能搜索
    onSearchComplete: myFun,
  }) as any;


  function myFun(e: any) {
    //清除地图上所有覆盖物
    mapObject.map.clearOverlays();
    debugger;
    mapObject.pp = mapObject.local.getResults().getPoi(0).point; //获取第一个智能搜索的结果

    mapObject.map.centerAndZoom(mapObject.pp, 18);
    // mapObject.map.addOverlay(new BMap.Marker(mapObject.pp)); //添加标注
    mapObject.marker = new BMap.Marker(mapObject.pp, {
      // 指定Marker的icon属性为Symbol
      icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
        scale: 1.4, //图标缩放大小
        fillColor: "#409eff", //填充颜色
        fillOpacity: 0.8, //填充透明度
      }) as any,
    });
    emit("searchAddressResult",{address:mapObject.myValue,point:mapObject.pp});
    mapObject.map.addOverlay(mapObject.marker); // 将标注添加到地图中
    mapObject.marker.disableDragging(); // 不可拖拽
    mapObject.marker.addEventListener("click", clickMarkerShowHouseInfoHandle);
  }
}

onMounted(async () => {
  await load(true);
});
onUnmounted(() => {
  unload();
});
</script>

<style lang="scss" scoped>
#r-result {
  // position: absolute;
  // top: 30px;
  // left: 50%;
  // transform: translateX(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ccc;
  width: 355px;

  .search-icon {
    width: 65px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    background: #409eff;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    &:hover {
      background: #66b1ff;
    }
  }
}
.search-input {
  width: 125px;
  height: 45px;
  padding: 0 10px;
  box-sizing: border-box;
  outline: none;
  font-size: 14px;
  color: #333;
  background: #fff;
  transition: all 0.3s;
  &:focus {
    border-color: #409eff;
  }
}

.search-result-panel {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ccc;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
}
</style>
