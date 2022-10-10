import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { environment } from "src/environments/environment"; // DEV MOD
import { Recipe } from "../models/recipe.model";

@Injectable()
export class RecipesService {

    constructor(private http: HttpClient){}

    getRecipes(): Observable<Recipe[]>{

        return this.http.get<Recipe[]>(`${environment.apiUrl}/recipes`);
        
    };
}