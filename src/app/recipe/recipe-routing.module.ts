import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { SingleRecipeComponent } from './components/single-recipe/single-recipe.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent},
  { path: 'new', component: NewRecipeComponent},
  { path: ':id', component: SingleRecipeComponent},
  { path: '', pathMatch: 'full', redirectTo: 'mes-recettes' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }