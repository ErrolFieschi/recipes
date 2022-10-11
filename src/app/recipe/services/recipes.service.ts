import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, delay, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment"; // DEV MOD
import { Recipe } from "../models/recipe.model";

@Injectable()
export class RecipesService {

    constructor(private http: HttpClient) { }

    private _loading$ = new BehaviorSubject<boolean>(false);

    get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    };

    private _recipes$ = new BehaviorSubject<Recipe[]>([]);

    get recipes$(): Observable<Recipe[]> {
        return this._recipes$.asObservable();
    };

    private setLoadingStatus(loading: boolean) {
        this._loading$.next(loading);
    };

    private lastRecipeLoad = 0; //refresh automatique des données au bout de 5 min, évite que les données soient recharger à chaque appelle de la page


    getRecipesFromServer(){
        if (Date.now() - this.lastRecipeLoad <= 300000) {
            return;
        }
        this.setLoadingStatus(true);
        this.http.get<Recipe[]>(`${environment.apiUrl}/recipes`).pipe(
          delay(1000),
          tap(recipes => {
            this._recipes$.next(recipes);
            this.setLoadingStatus(false);
          })
        ).subscribe();
    };
    

    getRecipeById(id: number): Observable<Recipe> {
        if (!this.lastRecipeLoad) {
            this.getRecipesFromServer();
        }
        return this.recipes$.pipe(
            map(recipes => recipes.filter(recipe => recipe._id === id)[0])
        );
    };


}