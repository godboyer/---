import { computed, ref } from "vue";
import { REGEXP_PHONE } from "@/config";
import { fetchCaptcha, fetchPhonePrefix } from "@/service";
import { useLoading } from "../common";
import useCountDown from "./useCountDown";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";

/**
 * 发送验证码
 * @returns
 */
export default function useCaptcha() {
  const { loading, startLoading, endLoading } = useLoading();
  const { counts, start, isCounting } = useCountDown(60);

  const initLabel = "获取验证码";
  const phonePrefixs = ref<SelectMixedOption[] >([]);
  const countingLabel = (second: number) => `${second}秒后重新获取`;
  const label = computed(() => {
    let text = initLabel;
    if (loading.value) {
      text = "";
    }
    if (isCounting.value) {
      text = countingLabel(counts.value);
    }
    return text;
  });

  /** 判断手机号码格式是否正确 */
  function isPhoneValid(phone: string | number) {
    let valid = true;
    if (String(phone).trim() === "") {
      window.$message?.error("手机号码不能为空！");
      valid = false;
    } else if (!REGEXP_PHONE.test(String(phone))) {
      window.$message?.error("手机号码格式错误！");
      valid = false;
    }
    return valid;
  }

  /**
   * 获取短信验证码
   * @param phone - 手机号
   */
  async function getCaptcha(phone: string | number,ctcode?:string | number) {
    const valid = isPhoneValid(phone);
    if (!valid || loading.value) return;
    
    startLoading();
    const {error,data} = await fetchCaptcha(phone,ctcode as string );
    if (!error) {
      start();
      window.$message?.success("验证码发送成功！");
    }
    endLoading();
  }

  async function getPhonePrefix() {
    let { error, data } = await fetchPhonePrefix();
    if (!error) {
      phonePrefixs.value = data?.map((item) => {
        return {
          label: item.ch + "(+" + item.prefix + ")",
          value: item.prefix,
        };
      }) as SelectMixedOption[];
    }
  }

  return {
    label,
    start,
    isCounting,
    getCaptcha,
    loading,
    phonePrefixs,
    getPhonePrefix,
  };
}
