import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { createPermissionGuard } from './permission';

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
	/**beforeEach 守卫是一个异步函数，
	 * 它接收三个参数：to、from 和 next。
	 * 这些参数是表示当前路由、前一个路由和一个函数的对象，
	 * 该函数必须在允许导航之前调用。
	 * 这个守卫调用一个名为 createPermissionGuard 的函数，
	 * 并等待它完成后才调用 next() 函数以允许导航继续。
	 *
	 */
	router.beforeEach(async (to, from, next) => {
		// 开始 loadingBar
		window.$loadingBar?.start();
		// 页面跳转权限处理
		await createPermissionGuard(to, from, next);
	});

	/**
	 * afterEach 守卫是一个函数，它接收一个参数 to，
	 * 该参数表示当前路由。
	 * 该守卫使用 @vueuse/core 包中的 useTitle 函数
	 * 将文档标题设置为当前路由的 meta.title 属性。
	 * 如果存在加载进度条，该守卫还会停止它。
	 */

	router.afterEach((to) => {
		// 设置document title
		useTitle(to.meta.title);
		// 结束 loadingBar
		window.$loadingBar?.finish();
	});
}
