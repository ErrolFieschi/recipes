import { Comment } from "src/app/core/models/comment.model";

export class Recipe {
    id!: number;
    title!: string;
    description!: string;
    steps!: string[];
    ingredients!: string[][];
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


