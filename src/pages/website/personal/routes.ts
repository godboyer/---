export default [
    {
        path: '/personal',
        name: 'personal',
        component: () => import('@/views/personal/index.vue'),
        meta: {
            title: '个人中心',
            icon: 'el-icon-user-solid',
            roles: ['admin', 'editor']
        },
        children: [
            {
                path: '/personal/collection',
                name: 'collection',
                component: () => import('@/views/personal/components/collection.vue'),
                meta: {
                    title: '我的收藏',
                    icon: 'el-icon-star-on',
                    roles: ['admin', 'editor']
                }
            },
            {
                path: '/personal/comment',
                name: 'comment',
                component: () => import('@/views/personal/components/comment.vue'),
                meta: {
                    title: '我的评论',
                    icon: 'el-icon-chat-line-square',
                    roles: ['admin', 'editor']
                }
            },
            {
                path: '/personal/history',
                name: 'history',
                component: () => import('@/views/personal/components/history.vue'),
                meta: {
                    title: '浏览历史',
                    icon: 'el-icon-time',
                    roles: ['admin', 'editor']
                }
            }
        ]
    }



]