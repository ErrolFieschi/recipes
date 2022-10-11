import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements OnInit {

  loading$!: Observable<boolean>;
  recipes$!: Observable<Recipe[]>;

  constructor(private recipesServices: RecipesService) { }

  ngOnInit(): void {
    this.initObservable();
    this.recipesServices.getRecipesFromServer();    
  }

  private initObservable(){
    this.loading$ = this.recipesServices.loading$;
    this.recipes$ = this.recipesServices.recipes$;
  }

}
