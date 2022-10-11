import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { RecipeSearchType } from '../../enum/recipe-search-type.enum'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements OnInit {

  loading$!: Observable<boolean>;
  recipes$!: Observable<Recipe[]>;
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
    this.recipesServices.getRecipesFromServer();
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

    this.recipes$ = combineLatest([
      search$,
      searchType$,
      this.recipesServices.recipes$
    ]
    ).pipe(
      map(([search, searchType, recipes]) => recipes.filter(recipe => recipe[searchType]
        .toLowerCase()
        .includes(search as string)))
    );
  };
}
