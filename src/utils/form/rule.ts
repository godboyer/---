import type { Ref } from "vue";
import type { FormItemRule } from "naive-ui";
import {
  REGEXP_CODE_FOUR,
  REGEXP_CODE_SIX,
  REGEXP_EMAIL,
  REGEXP_PHONE,
  REGEXP_PWD,
} from "@/config";

/** 创建自定义错误信息的必填表单规则 */
export const createRequiredFormRule = (message = "不能为空"): FormItemRule => ({
  required: true,
  message,
});

export const requiredFormRule = createRequiredFormRule();

/** 表单规则 */
interface CustomFormRules {
  /** 手机号码 */
  phone: FormItemRule[];
  /** 密码 */
  pwd: FormItemRule[];
  /** 验证码 */
  code: FormItemRule[];
  /** 邮箱 */
  email: FormItemRule[];
  /** 标题 */
  title: FormItemRule[];
  /** 内容 */
  content: FormItemRule[];
  /**真实姓名*/
  realName: FormItemRule[];
  /**身份证号码*/
  idCard: FormItemRule[];
  /**面积 */
  area: FormItemRule[];
  /**价格 */
  price: FormItemRule[];
  /**房源标题 */
  houseTitle: FormItemRule[];
  /**房源描述 */
  houseDesc: FormItemRule[];
  /**房源地址 */
  Address: FormItemRule[];
  /**楼层 */
  floor: FormItemRule[];
  /**总楼层 */
  totalFloor: FormItemRule[];
}

/** 表单规则 */
export const formRules: CustomFormRules = {
  phone: [
    createRequiredFormRule("请输入手机号码"),
    { pattern: REGEXP_PHONE, message: "手机号码格式错误", trigger: "input" },
  ],
  pwd: [
    createRequiredFormRule("请输入密码"),
    {
      pattern: REGEXP_PWD,
      message: "密码为6-18位数字/字符/符号，至少2种组合",
      trigger: "input",
    },
  ],
  code: [
    createRequiredFormRule("请输入验证码"),
    { pattern: REGEXP_CODE_FOUR, message: "验证码格式错误", trigger: "input" },
  ],
  email: [{ pattern: REGEXP_EMAIL, message: "邮箱格式错误", trigger: "blur" }],
  title: [{...createRequiredFormRule("请输入标题"),trigger: "blur"} ],
  content: [createRequiredFormRule("请输入内容")],
  realName: [createRequiredFormRule("请输入真实姓名")],
  idCard: [createRequiredFormRule("请输入身份证号码")],
  area: [createRequiredFormRule("请输入面积")],
  price: [createRequiredFormRule("请输入价格")],
  houseTitle: [createRequiredFormRule("请输入房源标题")],
  houseDesc: [createRequiredFormRule("请输入房源描述")],
  Address: [createRequiredFormRule("请输入房源地址")],
  floor: [createRequiredFormRule("请输入楼层")],
  totalFloor: [createRequiredFormRule("请输入总楼层")],
};

/** 是否为空字符串 */
function isBlankString(str: string) {
  return str.trim() === "";
}

/** 获取确认密码的表单规则 */
export function getConfirmPwdRule(pwd: Ref<string>) {
  const confirmPwdRule: FormItemRule[] = [
    { required: true, message: "请输入确认密码" },
    {
      validator: (rule, value) => {
        if (!isBlankString(value) && value !== pwd.value) {
          return Promise.reject(rule.message);
        }
        return Promise.resolve();
      },
      message: "输入的值与密码不一致",
      trigger: "input",
    },
  ];
  return confirmPwdRule;
}

/** 获取图片验证码的表单规则 */
export function getImgCodeRule(imgCode: Ref<string>) {
  const imgCodeRule: FormItemRule[] = [
    { required: true, message: "请输入验证码" },
    {
      validator: (rule, value) => {
        if (!isBlankString(value) && value !== imgCode.value) {
          return Promise.reject(rule.message);
        }
        return Promise.resolve();
      },
      message: "验证码不正确",
      trigger: "blur",
    },
  ];
  return imgCodeRule;
}
