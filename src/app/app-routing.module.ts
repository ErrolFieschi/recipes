import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'recipes', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
  { path: 'inscription', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'auth/login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: 'recipes' } //wildcard permet de rediriger toute route non reconnu vers la social-media
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
