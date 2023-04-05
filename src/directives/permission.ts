// import type { App, Directive } from 'vue';
// import { usePermission } from '@/composables';

// export default function setupPermissionDirective(app: App) {
//   const { hasPermission } = usePermission();

//   function updateElVisible(el: HTMLElement, permission: Auth.RoleType | Auth.RoleType[]) {
//     if (!permission) {
//       throw new Error(`need roles: like v-permission="'admin'", v-permission="['admin', 'test]"`);
//     }
//     if (!hasPermission(permission)) {
//       el.parentElement?.removeChild(el);
//     }
//   }

//   const permissionDirective: Directive<HTMLElement, Auth.RoleType | Auth.RoleType[]> = {
//     mounted(el, binding) {
//       updateElVisible(el, binding.value);
//     },
//     beforeUpdate(el, binding) {
//       updateElVisible(el, binding.value);
//     }
//   };

//   app.directive('permission', permissionDirective);
// }
import type { App, Directive } from 'vue';
import { usePermission } from '@/composables';

export default function setupPermissionDirective(app: App) {
  // 使用权限的 composable
  const { hasPermission } = usePermission();

  // 更新元素的可见性，基于所需的权限
  function updateElVisible(el: HTMLElement, permission: Auth.RoleType | Auth.RoleType[]) {
    // 如果未提供所需的权限，则抛出错误
    if (!permission) {
      throw new Error(`need roles: like v-permission="'admin'", v-permission="['admin', 'test]"`);
    }
    // 如果没有权限，从 DOM 中移除元素
    if (!hasPermission(permission)) {
      el.parentElement?.removeChild(el);
    }
  }

  // 创建一个权限指令，基于所需的权限来控制元素的可见性
  const permissionDirective: Directive<HTMLElement, Auth.RoleType | Auth.RoleType[]> = {
    // 指令挂载时更新元素可见性
    mounted(el, binding) {
      updateElVisible(el, binding.value);
    },
    // 指令更新前更新元素可见性
    beforeUpdate(el, binding) {
      updateElVisible(el, binding.value);
    }
  };

  // 向 Vue 应用注册权限指令
  app.directive('permission', permissionDirective);
}
