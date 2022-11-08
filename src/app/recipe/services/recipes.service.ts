import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, delay, map, Observable, switchMap, take, tap } from "rxjs";
import { environment } from "src/environments/environment.prod"; // DEV MOD
import { Recipe } from "../models/recipe.model";
import { FormGroup } from "@angular/forms";

@Injectable()
export class RecipesService {

    constructor(private http: HttpClient) { }

    private _loading$ = new BehaviorSubject<boolean>(false);

    get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    };

    private _myRecipes$ = new BehaviorSubject<Recipe[]>([]);

    private _recipes$ = new BehaviorSubject<Recipe[]>([]);

    get recipes$(): Observable<Recipe[]> {
        return this._recipes$.asObservable();
    };

    get myRecipes$(): Observable<Recipe[]> {
        return this._myRecipes$.asObservable();
    };

    private setLoadingStatus(loading: boolean) {
        this._loading$.next(loading);
    };

    private lastRecipeLoad = 0; //refresh automatique des données au bout de 5 min, évite que les données soient recharger à chaque appelle de la page


    /* getRecipesTest() :Observable<Recipe> {
         return this.http.get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-zec')
         .map((response: Response) => response.json());
       }
 */
    getRecipesFromServer() {
        if (Date.now() - this.lastRecipeLoad <= 300000) {
            return;
        }
        this.setLoadingStatus(true);
        this.http.get<Recipe[]>(`${environment.apiUrl}/recipes`).pipe(
            //delay(1000),
            tap(recipes => {
                this._recipes$.next(recipes);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    };

    getRecipesByUser() {
        if (Date.now() - this.lastRecipeLoad <= 300000) {
            return;
        }
        this.setLoadingStatus(true);
        this.http.get<Recipe[]>(`${environment.apiUrl}/recipes/recipes/my-recipes`).pipe(
            //delay(1000),
            tap(recipes => {
                this._myRecipes$.next(recipes);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    }

    getRecipeById(id: number): Observable<Recipe> {
        if (!this.lastRecipeLoad) {
            this.getRecipesFromServer();
        }
        return this.recipes$.pipe(
            map(recipes => recipes.filter(recipe => recipe._id === id)[0])
        );
    };

    deleteRecipe(id: number): void {
        this.setLoadingStatus(true);

        this.http.delete(`${environment.apiUrl}/recipes/${id}`).pipe(
            switchMap(() => this._recipes$),
            take(1),
            map(recipes => recipes.filter(recipe => recipe._id !== id)),
            tap(recipes => {
                this._recipes$.next(recipes);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    };


    addRecipe(data: any) {
        return this.http.post(`${environment.apiUrl}/recipes`, data);
    }


}