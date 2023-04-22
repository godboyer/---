

/**获取当前应用变量 */
export function getAppVar(key: string) {
    return localStorage.getItem(key) || 'website';
}
    