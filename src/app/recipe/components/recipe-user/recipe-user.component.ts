import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { RecipeSearchType } from '../../enum/recipe-search-type.enum';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-user',
  templateUrl: './recipe-user.component.html',
  styleUrls: ['./recipe-user.component.scss']
})
export class RecipeUserComponent implements OnInit {

  loading$!: Observable<boolean>;
  myRecipes$!: Observable<Recipe[]>;
  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: RecipeSearchType,
    label: string
  }[];

  constructor(private recipesServices: RecipesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.initObservable();
    this.recipesServices.getRecipesByUser();
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(RecipeSearchType.TITLE);
    this.searchTypeOptions = [
      { value: RecipeSearchType.TITLE, label: 'Nom de la recette' },
      { value: RecipeSearchType.TYPE, label: 'Type' },

    ];
  };

  private initObservable() {
    this.loading$ = this.recipesServices.loading$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );

    const searchType$: Observable<RecipeSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    )

    this.myRecipes$ = combineLatest([
      search$,
      searchType$,
      this.recipesServices.myRecipes$
    ]
    ).pipe(
      map(([search, searchType, recipes]) => recipes.filter(recipe => recipe[searchType]
        .toLowerCase()
        .includes(search as string)))
    );
  }
};