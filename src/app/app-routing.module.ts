import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'mes-recettes', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
  { path: '**', redirectTo: 'mes-recettes' } //wildcard permet de rediriger toute route non reconnu vers la social-media
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
