# § 概述

> 本 Datatable 仅支持 Vue 2.x  
> 若要运用在 Vue 1.x 的项目，请根据官方的 [Migration from Vue 1.x](https://vuejs.org/v2/guide/migration.html) 降级使用  
> （一般也只是替换掉 `ref / key / 钩子函数`）

任何开源的 Datatable 都未必能满足所有的业务需求（否则也不会有这个项目了）  
本文档致力于让您在理解组件设计以及源码的基础上，可自行定制出最适合您的 Datatable 

本 Datatable 的依赖如下：

* BootStrap 3 + Font Awesome（全局引入）
* [lodash: groupBy / throttle / debounce](https://lodash.com/docs)

注：*BootStrap* 以及 *Font Awesome* 的可替换性极强，您完全可以使用其他库替代（一般就是改一下类名即可）
