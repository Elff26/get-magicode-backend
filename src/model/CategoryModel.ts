interface CategoryProperty{
    cd_categoria: number;
    nm_categoria: string;   
    ds_categoria: string;
}

export default class CategoryModel{
    constructor(category: CategoryProperty) {
        this.cd_categoria = category.cd_categoria
        this.nm_categoria = category.nm_categoria
        this.ds_categoria = category.ds_categoria
    }

    cd_categoria: number;
    nm_categoria: string;
    ds_categoria: string;
}