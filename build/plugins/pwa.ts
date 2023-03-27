import { VitePWA } from 'vite-plugin-pwa';

export default function setupVitePwa() {
  return VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],
    manifest: {
      name: 'SoybeanAdmin',
      short_name: 'SoybeanAdmin',
      theme_color: '#fff',
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }
  });
}
// 这段代码是一个用于配置 PWA 的函数，它使用了 vite-plugin-pwa 插件。首先，它使用 import 语句引入了 VitePWA 函数，然后定义了一个名为 setupVitePwa 的函数，用于配置 PWA。

// 在 setupVitePwa 函数中，它调用了 VitePWA 函数，并传入了一个包含配置信息的对象作为参数。这个对象包含了 registerType、includeAssets 和 manifest 等属性，用于配置 PWA 的行为和外观。

// 其中，registerType 属性指定了 PWA 的注册方式，这里使用了 'autoUpdate'，表示自动更新。includeAssets 属性指定了需要包含在 PWA 中的静态资源，这里包括了 favicon.ico 文件。

// manifest 属性指定了 PWA 的 manifest 文件，包括了应用的名称、短名称、主题颜色和图标等信息。其中，icons 属性指定了应用的图标，包括了不同尺寸和类型的图标。

// 这样，我们就成功地配置了 PWA。如果你想要了解更多关于 vite-plugin-pwa 的知识，你可以参考 vite-plugin-pwa 的官方文档。vite-plugin-pwa 的官方文档提供了非常详细的介绍和示例，可以帮助你更好地理解 vite-plugin-pwa 的原理和使用方法。

// 希望这些信息能够帮助到你。如果你有任何其他问题，请随时问我。