

export interface validateType {
    phone:RegExp, // 手机号码验证
	pwd:RegExp,// 6-16位数字加字母
	pay:RegExp,  // 6位支付密码
    code:RegExp,  // 验证码 code
	account:RegExp,// 账号  字母数字混合
	idCard:RegExp,//身份证号码
	email:RegExp,//邮箱正则
}

// 正则库 
export const reg:validateType  = {
	phone:/^1[3|4|5|6|7|8|9][0-9]{9}$/, // 手机号码验证
	pwd:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/	,// 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符：**
	pay:/^\d{6}$/,  // 6位支付密码
    code:/^\d{4}$/,  // 验证码 code
	account:/^[\u4e00-\u9fa5a-zA-Z0-9]{6,12}$/,// 账号  字母数字混合
	idCard:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,//身份证号码
	email:/^^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$$/,//邮箱正则
}