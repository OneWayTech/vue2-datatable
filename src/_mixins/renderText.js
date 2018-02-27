export default {
    methods:{
        renderTitleOrLabel(col)
        {
            return this.getTitle(col) || this.getLabel();
        },
        renderTitle(col)
        {
            return this.getTitle(col);
        },
        getTitle(col)
        {
            return typeof(col.title) === 'function' ? col.title.apply() : col.title;
        },
        getLabel(col)
        {
            return typeof(col.label) === 'function' ? col.label.apply() : col.label;
        }
    }
}