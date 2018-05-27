# § Summary

> This Datatable is only for Vue 2.x.  
> But you can downgrade it according to [Migration from Vue 1.x](https://vuejs.org/v2/guide/migration.html).  
> (In most of the time, you just have to replace `ref / key / <hooks>`)

There are plenty of open-source Datatables, but none of them could meet all the scenarios.  
(if there is, this project has no meanings at all)

This documentation is dedicated to letting you comprehend the design and the source code.  
Under this premise, you could build the most suitable Datatable for your own scenario.

The dependencies of this project are shown as below:

* BootStrap 3 + Font Awesome（must available globally）
* [lodash: groupBy / throttle / debounce](https://lodash.com/docs)

P.S. *BootStrap* and *Font Awesome* can be replaced with other popular libraries.  
(It seems to me that you just have to replace some classes / styles)
