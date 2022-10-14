import { Comment } from "src/app/core/models/comment.model";
import { Ingredient } from "src/app/core/models/ingredient.model";
import { Step } from "src/app/core/models/step.model";

export class Recipe {
    _id!: number;
    title!: string;
    description!: string;
    steps!: Step[];
    ingredients!: Ingredient[];
    imageUrl!: string;
    createdDate!: Date;
    prepTime!: number;
    cookTime!: number;
    eaters!: number;
    likes!: number;
    comments!: Comment[];
    gallery!: string[];
    type!: string;
}


