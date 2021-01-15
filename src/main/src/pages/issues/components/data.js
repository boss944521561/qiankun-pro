export default [
    {
        title: '各应用不能共用一个node_modules问题',
        desc: '每个项目都要安装各自的UI、echarts等第三方依赖。项目的启动打包速度也变的很慢。启动所有子项目更慢',
        author: [
            {
                name: 'Mason',
                time: '2021-01-15',
                type: true,
                desc: '我在react中配置了webpack，更改了其默认不能访问本项目外的目录使其不再报错。寻找node_modules默认原则是由内向外层层寻找，请将we-pms根目录的node_modules作为公共依赖包'
            }
        ],
    },
    {
        title: '主应用跳转子应用问题',
        desc: '主应用跳转子应用请使用location.href重载机制，勿用路由方法（可修整）。因：渲染子应用DOM时，会将子应用HTML动态添加到主应用某个DOM节点下。如果使用浏览器push类跳转（如：路由pushState、浏览器前进、后退按钮等），框架会缓存子应用的HTML，固initSub方法重新加载子应用虽性能变好，但已有动画等会明显卡顿体验较差，及react等生命周期会再次执行，因现主渲染子在componentDidMount内，固会报警告一些异步操作没卸载',
        author: [
            {
                name: '',
                time: '2021-01-02',
                type: false,
                desc: '使用 props.history.push(path); 主跳转子后，回退回来再跳过去，会重新渲染子应用，但实际子已被缓存，相关调用方法会被叠加执行'
            },
            {
                name: 'Mason',
                time: '2021-01-07',
                type: true,
                desc: '建议主跳子使用 window.location.href 重载页面，可侧面规避以上问题，畅享动画效果。 如果一定要用路由跳转，需将主加载子的方法提出react生命周期，或用should做判断等.'
            },
        ],
    },
    {
        title: 'qiankun动态添加子节点，会让动画卡顿',
        desc: 'HTML内批量新增子节点树时，页面的animate动画会明显卡顿（看电脑配置）',
        author: [
            {
                name: 'Mason',
                time: '2021-01-02',
                type: true,
                desc: '为充分展示本项目的动画效果，侧栏动画（1s）结束后，再展示子节点（延迟800ms）展示。也可舍弃侧栏动画，迅速展示子应用模板。'
            }
        ],
    },
    {
        title: 'qiankun 使用 Material UI 的样式冲突问题',
        desc: 'Material UI会向根节点动态添加style标签。主子应用都使用UI框架时，CSS后者会覆盖前者，一些样式会有冲突（如：侧栏）',
        author: [
            {
                name: 'Mason',
                time: '2021-01-02',
                type: false,
                desc: '很遗憾我没有在MUI依赖包中找到相关源码，不能了解它的原理'
            },
            {
                name: 'Mason',
                time: '2021-01-15',
                type: true,
                desc: '临时解决方案：1. 在react入口js文件，暂做DOM树监听处理，捕捉到动态添加style且有Material标识的删掉。 2. 发现MuiButton动态添加至MuiMenuItem后面会有padding覆盖导致样式崩塌，故在子应用内对相关class padding属性加权处理'
            }
        ],
    },
    {
        title: 'vue项目内，vue-route跳转后，点击浏览器后退按钮，URL变了，页面不跳转',
        desc: '如最上面的react问题一样，vue路由跳转会缓存html（请参阅文档），因时间问题，暂不过多投入vue项目',
        author: [
            {
                name: 'Mason',
                time: '2021-01-02',
                type: false,
                desc: 'common下封装了history.pushState，临时处理方法'
            }
        ],
    },
    {
        title: '警告TypeError: Cannot read property appWrapperGetter of undefined at common.js:301',
        desc: '在删除Material UI DOM节点时报出警告',
        author: [
            {
                name: 'Mason',
                time: '2021-01-02',
                type: false,
                desc: '已查阅：react语法正常，但仍有警告，(如：{loading && <CircularProgress></CircularProgress>})。没投入时间继续。'
            }
        ],
    },
    {
        title: 'vue项目打包后在生产未渲染',
        desc: '因时间关系暂未修整发布后的优化',
        author: [
            {
                name: 'Mason',
                time: '2021-01-15',
                type: false,
                desc: '初步猜测相关生产依赖放置到了本地依赖中导致，已更改，如有发布留意一下'
            }
        ],
    },
]