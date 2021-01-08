# 这是qiankun + Material UI 打造的后台管理系统，而我将用以下为示例开展工作：


# 性能监控系统
## PMS（Performance Monitoring System）
### 欢迎来到前端性能监控联盟，在这里你可以执笔绘制属于自己的监控模型，监控属于你的"犄角旮旯🧐"。

### 在这里你将铸造自己的技术壁垒，丰富技术视野，让俺们一起完善它吧~
### Let's Go！💪  
______________________________________________________
  
  
  
**启动脚本**
```
"scripts": {
    "i": "yarn un && yarn in",
    "dev": "npm-run-all --parallel dev:*",
    "build": "npm-run-all --serial build:*",
  }

***首先请保证你在此项目根目录***

yarn i 安装依赖
yarn dev 启动全部技术栈
yarn build 打包全部技术栈

yarn dev:react 启动react技术栈
yarn build:react 打包react技术栈
yarn dev:vue 启动vue技术栈
yarn build:vue 打包vue技术栈

--parallel 异步（并行）
--serial 同步（逐一）

如果你只负责开发某个模块，且不受主应用逻辑困扰，你可以单独运行。

你也可以同时启动整个项目，它的原理就是逐一启动所有项目。这里使用了 npm-run-all 省去了多开终端的困扰。
当然，这么做也会让编译、监听的工作量变大。
```
  
  
**技术栈**  
[qiankun](https://qiankun.umijs.org/zh/)
```
阿里系  
主应用：react  
子应用：react、vue  
  
  
主应用：
这是一套试验性架构，俺们希望借此机会顺手搭建一套前端微服务。

希望它：
1. 可以给予团队中不同技术爱好者参与的机会。
2. 它可以单独发布任一模块，跨团队协作互不干扰，保障生产其它模块稳定性。
3. 它可以用于新技术训练营，如react15、react16分开玩。

基于以上重要前提，希望不要玩的它性能受损，请分清主、子结构及全局加载的控制。也希望开发者不要太花心，搞成了垃圾堆，增加其管理成本。  
  
  
子应用：
react16
vue3
结合自身所需搭建适合自己的框架。适合自己的才是最好的~！
```


**UI库**
[github](https://github.com/mui-org/material-ui/stargazers)
[MATERIAL-UI](https://material-ui.com/zh/)
```
为什么选择它?
1. 它相对较轻
2. 完整的UI体系，且很清洁
3. 语法更贴合react，更优雅
4. 动画相对动感、更有活力

注：vue暂不用UI框架，涉及到UI体系的暂用react开发
1. 目前为止，支持vue3的后台UI框架较少
2. 关注Muse-UI，因与material-ui整体体系近似，社区相对完善，建议支持vue3后引入使用
```


**项目结构**
```
we-pms
├─ src
│  ├─ main 主应用
│  │  ├─ public 静态资源
│  │  ├─ src 工程目录
│  │  └─ webpack.config.js 打包入口

│  ├─ react 子应用pmsr
│  │  ├─ public 静态资源
│  │  ├─ src 工程目录
│  │  └─ .rescriptsrc.js 打包入口

│  └─ vue 子应用pmsv
│     ├─ public 静态资源
│     ├─ src 工程目录
│     └─ vue.config.js 打包入口

```
