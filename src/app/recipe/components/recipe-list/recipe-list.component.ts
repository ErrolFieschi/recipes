import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes$!: Observable<Recipe[]>;

  constructor(private route: ActivatedRoute, recipesServices: RecipesService) { }

  ngOnInit(): void {
    this.recipes$ = this.route.data.pipe(
      map(data => data['recipes'])
    )
    
  }

}
