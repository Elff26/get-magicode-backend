import ICategoryProperty from "../interfaceType/ICategoryProperty";

export default class CategoryModel{
    constructor(category: ICategoryProperty) {
        this.categoryID = category.categoryID
        this.name = category.name
        this.description = category.description
    }

    categoryID: number;
    name: string;
    description: string;
}