# § Preface

> This Datatable only support Vue 2.x  
> But you can degrade it according to [Migration from Vue 1.x](https://vuejs.org/v2/guide/migration.html)  
> (In most of the time, you just need to replace `ref / key / <hooks>`)

There are plenty of open-source Datatables, but none of them could meet all the business requirements  
(if there is, this project is meaningless)

This documentation is dedicated to letting you comprehend the design and the source.  
Under this premise, you can build the most suitable Datatable yourself.

The dependencies of this project shown below:

* BootStrap 3.x + Font Awesome 4.x（available globally）
* [lodash.orderBy](https://lodash.com/docs/4.17.4#orderBy)
* [replace-with](https://github.com/OneWayTech/replace-with)

P.S. *BootStrap* and *Font Awesome* can be replaced with other popular libraries (just with different classnames but do the same things)
