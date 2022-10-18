import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuppressComponent } from 'src/app/shared/components/dialog-suppress/dialog-suppress.component';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {

  
  recipe$!: Observable<Recipe>;
  loading$!: Observable<boolean>;

  constructor(private router: Router, private route: ActivatedRoute, private recipesService: RecipesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initObservable();
  }

  private initObservable() {
    this.loading$ = this.recipesService.loading$;
    this.recipe$ = this.route.params.pipe(
      switchMap(params => this.recipesService.getRecipeById(params['id'])) // le'+' transforme un string en number
    )
  }
  onGoBack() {
    this.router.navigateByUrl('/mes-recettes');
  };
  
  openDialog(){
    this.dialog.open(DialogSuppressComponent);
  }
}


