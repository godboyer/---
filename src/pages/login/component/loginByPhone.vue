<template>
  <div class="login-form">
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="phone" label="手机号">
        <n-input-group>
          <n-select
            size="large"
            label-field="label"
            :consistent-menu-width="false"
            :style="{ width: '25%' }"
            v-model:value="model.value"
            :options="options"
            :fallback-option="(value:string | number) => ({ label: '中国(+86)'})"
          />
          <n-input
            size="large"
            placeholder="请输入手机号"
            v-model:value="model.phone"
            @keydown.enter.prevent
          />
        </n-input-group>
      </n-form-item>
      <n-form-item path="captcha" label="验证码">
        <n-input-group>
          <n-input
            size="large"
            v-model:value="model.captcha"
            type="password"
            @input="handlecaptchaInput"
            @keydown.enter.prevent
            placeholder="请输入验证码"
          />
          <n-button size="large" @click="sendCaptcha" :disabled="!showCapt">
            <span v-if="!active">发送验证码</span>

            <n-countdown
              v-else
              :render="renderCountdown"
              :duration="60 * 1000"
              :active="active"
              :on-finish="
                () => {
                  showCapt = true;
                  active = !active;
                }
              "
            />
          </n-button>
        </n-input-group>
      </n-form-item>

      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div
            style="display: flex; justify-content: space-around"
            class="login-btn"
          >
            <n-button
              :disabled="model.phone === null"
              round
              type="primary"
              color="#42B2B6"
              @click="handleValidateButtonClick"
            >
              登录
            </n-button>
            <n-button color="#42B2B6" round type="primary" @click="resetClick">
              重置
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>

    <!-- <pre
      >{{ JSON.stringify(model, null, 2) }}
  </pre
    > -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef, toRefs } from "vue";
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules,
  CountdownProps,
} from "naive-ui";
import { reg } from "../../../utils/validate";
import {
  CaptchaLogin,
  GetPhonePrefixList,
  SendCaptchaAPI,
} from "../../../server/api";
import { IapiResponse, Iphoneprefix } from "../../../typings/ApiInterface";
import { useRouter } from "vue-router";

interface ModelType {
  phone: string | null;
  captcha: string | null;
  value: string | null;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const formRef = ref<FormInst | null>(null);
    const rcaptchaFormItemRef = ref<FormItemInst | null>(null);
    const message = useMessage();
    const modelRef = reactive<ModelType>({
      phone: null,
      captcha: null,
      value: "86",
    });
    const active = ref(false);
    const showCapt = ref(false);
    const renderCountdown: CountdownProps["render"] = ({
      minutes,
      seconds,
    }) => {
      // console.log(hours, minutes, seconds);
      return `倒计时${String(minutes * 60 + seconds).padStart(2, "0")}S`;
    };
    let phoneprefix = ref<Array<any>>([]);

    async function sendCaptcha() {
      active.value = true;
      showCapt.value = false;
      console.log("发送验证码");
      console.log("modelRef", toRefs(modelRef));

      // let res = (await SendCaptchaAPI({
      //   phone: toRefs(modelRef).phone.value,
      //   ctcode: toRefs(modelRef).value.value,
      // })) as unknown as IapiResponse<any>;

      // if (res.code === 200) {
      //   message.success(res.msg);
      // }
    }

    async function GetPhonePrefix() {
      let res =
        (await GetPhonePrefixList()) as unknown as IapiResponse<Iphoneprefix>;
      phoneprefix.value = (res.data as Array<Iphoneprefix>).map(
        (item: { ch: string; prefix: string }) => {
          return {
            label: item.ch + "(+" + item.prefix + ")",
            value: item.prefix,
          };
        }
      );
      return res.data;
    }
    GetPhonePrefix();
    console.log("phoneprefix", phoneprefix);
    const rules: FormRules = {
      phone: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            showCapt.value = reg.phone.test(value);
            return reg.phone.test(value);
          },
          trigger: ["input"],
          message: "请输入正确的手机号",
        },
      ],
      captcha: [
        {
          required: true,
          message: "请输入验证码",
        },
        {
          required: true,
          trigger: ["input"],
          validator(rule: FormItemRule, value: string) {
            return reg.code.test(value);
          },
          message: "验证码格式错误,应为4位数字",
        },
      ],
    };

    return {
      formRef,
      rcaptchaFormItemRef,
      model: modelRef,
      rules,
      active,
      showCapt,
      renderCountdown,
      sendCaptcha,
      handlecaptchaInput() {
        console.log("输入验证码");
      },
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault();

        // console.log("formRef.value", );

        formRef.value?.validate(async (errors) => {
          console.log(errors);
          if (!errors) {
            message.success("验证成功");
            router.push("/admin");

            //调用登录接口
            let res = (await CaptchaLogin({
              phone: toRefs(modelRef).phone.value,
              captcha: toRefs(modelRef).captcha.value,
            })) as unknown as IapiResponse<any>;
            if (res.code == 200 && res.data && res.isRegistration) {
              console.log(res);
              //正常登录跳转
              router.push("/admin");
            } else {
              //继续完善信息登录
            }
          } else {
            console.log(errors);
            message.error("验证失败");
          }
        });
      },
      options: phoneprefix,
      resetClick(e: MouseEvent) {
        e.preventDefault();

        modelRef.phone = null;
        modelRef.captcha = null;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
// .n-card{
//   height: 400px;
// }
.login-form {
  width: 100%;
  height: 400px;
}

.login-btn {
  .n-button {
    flex: 1;

    :deep(.n-button__content) {
      font-weight: bold;
      font-size: 16px;
      color: #222;
    }
  }
}
</style>
