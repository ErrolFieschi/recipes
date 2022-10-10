import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipesService } from './services/recipes.service';
import { RecipeResolver } from './resolvers/recipes.resolver';
import { SharedModule } from '../shared/shared.module';
import { RecipeListItemComponent } from './components/recipe-list-item/recipe-list-item.component';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeListItemComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule
  ],
  providers: [
    RecipesService,
    RecipeResolver

  ]
})
export class RecipeModule { }
