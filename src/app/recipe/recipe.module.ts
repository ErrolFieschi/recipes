import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipesService } from './services/recipes.service';
import { SharedModule } from '../shared/shared.module';
import { RecipeListItemComponent } from './components/recipe-list-item/recipe-list-item.component';
import { SingleRecipeComponent } from './components/single-recipe/single-recipe.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { KeyValue } from '@angular/common';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeListItemComponent,
    SingleRecipeComponent,
    NewRecipeComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule
  ],
  providers: [
    RecipesService
  ]
})
export class RecipeModule { }
