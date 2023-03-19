
import fs from 'fs';

// const { each } = require("cheerio/lib/api/traversing");
// let keys = ['index', 'city', 'house_category', 'address', 'price', 'des', 'first_picture', 'house_description', 'Homeowner_info', 'exam_status', 'create_time', 'operation']
// let lables = ['序号', '所在城市', '房屋类别', '地址', '月租费(元/月)', '面积/楼层', '房屋图片', '房屋介绍', '房东', '审核状态', '发布时间', '操作']


function transformTableField(keys, lables) {
  let TableTh = keys.map((key, i) => {

    return { key, lable: lables[i] }
  })

  fs.writeFile(`../data/TableTh.js`, JSON.stringify(TableTh), function (err) {
    if (!err) {
      console.log("文件写入完毕");
    }
  });
}




