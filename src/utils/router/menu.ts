import { useIconRender } from "@/composables";

/**
 * 将权限路由转换成菜单
 * @param routes - 路由
 */
export function transformAuthRouteToMenu(
	routes: AuthRoute.Route[]
): App.GlobalMenuOption[] {
	const globalMenu: App.GlobalMenuOption[] = [];
	routes.forEach((route) => {
		const { name, path, meta } = route;
		const routeName = name as string;
		let menuChildren: App.GlobalMenuOption[] | undefined;
		if (route.children) {
			menuChildren = transformAuthRouteToMenu(route.children);
		}
		const menuItem: App.GlobalMenuOption = addPartialProps({
			menu: {
				key: routeName,
				label: meta.title,
				routeName,
				routePath: path,
			},
			icon: meta.icon,
			localIcon: meta.localIcon,
			children: menuChildren,
		});

		if (!hideInMenu(route)) {
			globalMenu.push(menuItem);
		}
	});

	return globalMenu;
}


export async function convertToNaiveUiMenuData(data: any): Promise<any[]> {
	const result: any[] = [];

	for (const child of data) {
		const { menuName, menuIcon, menuType, paths, component } = child;

		const routeName = menuName as string;
		let menuChildren: App.GlobalMenuOption[] | undefined;
		if (child.children) {
			menuChildren = await convertToNaiveUiMenuData(child.children);
		}
		let icon = menuIcon as string;
		// if (menuIcon.startsWith("el-icon")) {
		// 	icon = getIcon(menuIcon);
		// }
		const menuItem: App.GlobalMenuOption = addPartialProps({
			menu: {
				key: paths,
				label: routeName,
				routeName: paths,
				routePath: component,
			},
			icon: icon,
			localIcon: menuType,
			children: menuChildren,
		});

		if (hideInMenu(child)) {
			result.push(menuItem);
		}
	}

	// Return a Promise that resolves with the converted menu data.
	return Promise.resolve(result);
}


/**
 * 获取当前路由所在菜单数据的paths
 * @param activeKey - 当前路由的key
 * @param menus - 菜单数据
 */
export function getActiveKeyPathsOfMenus(
	activeKey: string,
	menus: App.GlobalMenuOption[]
) {
	const keys = menus
		.map((menu) => getActiveKeyPathsOfMenu(activeKey, menu))
		.flat(1);
	return keys;
}

function getActiveKeyPathsOfMenu(
	activeKey: string,
	menu: App.GlobalMenuOption
) {
	const keys: string[] = [];
	if (activeKey.includes(menu.routeName)) {
		keys.push(menu.routeName);
	}
	if (menu.children) {
		keys.push(
			...menu.children
				.map((item) =>
					getActiveKeyPathsOfMenu(activeKey, item as App.GlobalMenuOption)
				)
				.flat(1)
		);
	}
	return keys;
}

/** 路由不转换菜单 */
// function hideInMenu(route: AuthRoute.Route) {
//   return Boolean(route.meta.hide);
// }
function hideInMenu(route: any) {
	return Boolean(route?.isShow);
}

/** 给菜单添加可选属性 */
function addPartialProps(config: {
	menu: App.GlobalMenuOption;
	icon?: string;
	localIcon?: string;
	children?: App.GlobalMenuOption[];
}) {
	const { elIconRender } = useIconRender();

	const item = { ...config.menu };

	const { icon, children } = config;

	// if (localIcon) {
	// 	Object.assign(item, { icon: iconRender({ localIcon }) });
	// }
	// console.log(iconRender({ icon }));
	// console.log(elIconRender(icon as string));
	if (icon) {
		Object.assign(item, { icon: elIconRender(getIcon(icon)) });
		// Object.assign(item, { icon: iconRender({ icon }) });
	}
	// if (icon?.startsWith("el-icon") ) {
	// 	Object.assign(item, { icon: () => h(myIcon, { icon: icon }) });
	// } else if (icon) {
	// 	Object.assign(item, { icon: iconRender({ icon }) });
	// }

	if (children) {
		Object.assign(item, { children });
	}
	return item;
}

function getIcon(str: string) {
	const arr = str.split("-");
	return arr[arr.length - 1];
}
