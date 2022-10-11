import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipe!: Recipe;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onContinue(recipeId: number){
    this.router.navigateByUrl(`mes-recettes/${recipeId}`); // cette méthode est utilisable dans les components contrairement à routerlinks
  }



}
