import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeUserComponent } from './components/recipe-user/recipe-user.component';
import { SingleRecipeComponent } from './components/single-recipe/single-recipe.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent},
  { path: 'my-recipes', canActivate: [AuthGuard], component: RecipeUserComponent},
  { path: 'new', canActivate: [AuthGuard], component: NewRecipeComponent },
  { path: ':id', component: SingleRecipeComponent},
  { path: '', pathMatch: 'full', redirectTo: 'recipe' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }