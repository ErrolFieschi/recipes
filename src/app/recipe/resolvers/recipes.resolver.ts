import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../models/recipe.model";
import { RecipesService } from "../services/recipes.service";

@Injectable()

export class RecipeResolver implements Resolve<Recipe[]> {
    constructor(private recipesService: RecipesService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {

        return this.recipesService.getRecipes();
        
    }
}