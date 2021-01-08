import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.__POWERED_BY_QIANKUN__SUB = '';

// 解决样式冲突问题：
// UI框架，会动态添加style标签至根节点，微服务项目会各新增一次
// 同域下相同style标签，后者会覆盖前者，一些样式有冲突

// Plan A. 监听新增节点，有漏洞
// window.addEventListener('DOMSubtreeModified', (e) => {
//   if (e.target.nodeName === "STYLE") {
//     const dataMeta = e.target.dataset.meta;
//     console.log(2222222, dataMeta)
//     let len = document.querySelectorAll(`style[data-meta=${dataMeta}]`);
//     console.log(`%c[UI库样式表已渲染]`, 'color: black;font-weight:bold;', len.length);
//     len.forEach((v, i) => {
//       if (i > 0) {
//         len[i].remove();
//         // remove无法真实删除DOM中的节点，重新渲染时会重载回来，避免内存占用过大，暂刷新处理
//         if (len.length > 200){
//           window.location.reload();
//         }
//       }
//     })
//   }
// }, false);

// Plan B. 监听子节点的父容器内DOM树变化
// https://developer.mozilla.org/zh-cn/docs/web/api/mutationobserver
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
var target = document.querySelector('#subview-container');
if (target) {
  window.__POWERED_BY_QIANKUN__SUB = '/pms/r';
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length && mutation.addedNodes[0].nodeName === "STYLE") {
        const dataMeta = mutation.addedNodes[0].dataset.meta;
        let len = document.querySelectorAll(`style[data-meta=${dataMeta}]`);
        len.forEach((v, i) => {
          if (i > 0) {
            len[i].remove();
            // remove无法真实删除DOM中的节点，重新渲染时会重载回来，避免内存占用过大，暂刷新处理
            // if (len.length > 200){
            //   window.location.reload();
            // }
            // console.log(`%c[UI库样式表已渲染]`, 'color: black;font-weight:bold;', len.length);
          }
        })
      }
    });
  });
  observer.observe(target, { attributes: true, childList: true, subtree: true });
}

function render(props) {
  const { container } = props;
  ReactDOM.render(<App {...props}/>, container ? container.querySelector('#pmsr') : document.querySelector('#pmsr'));
}

function storeTest(props) {
  props.onGlobalStateChange((value, prev) => {
    console.log(`%c[子应用${props.name}接收状态]`, 'color: red;font-weight:bold;', value, prev);
  }, true);
  props.setGlobalState({
    user: {
      name: props.name,
    },
  });
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap(props) {
  console.log(`%c[子应用${props.name}生命周期bootstrap]`, 'color: green;font-weight:bold;', props);
}

export async function mount(props) {
  console.log(`%c[子应用${props.name}生命周期mount]`, 'color: green;font-weight:bold;', props);
  storeTest(props);
  render(props);
}

export async function unmount(props) {
  console.log(`%c[子应用${props.name}生命周期unmount]`, 'color: green;font-weight:bold;', props);
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#pmsr') : document.querySelector('#pmsr'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
