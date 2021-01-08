/**
 * @title 跳转方法 history.pushState
 * @copyRight https://developer.mozilla.org/en-US/docs/Web/API/History/pushState#Description
 * @author Mason<mason.meng@wehotelglobal.com>
 */
export function historyPush() {
    if (!window || arguments[0] === undefined) return;
    // 分隔整体启动与单启动根路径
    if (window.__POWERED_BY_QIANKUN__SUB !== undefined) {
        arguments[0] = window.__POWERED_BY_QIANKUN__SUB + arguments[0];
    }
    // 跳转
    if (arguments.length > 1) { // 3参
        window.history.pushState(arguments[0], arguments[1], arguments[2]);
    } else { // 1参
        window.history.pushState(null, null, arguments[0]);
    }
};
