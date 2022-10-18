import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuppressComponent } from 'src/app/shared/components/dialog-suppress/dialog-suppress.component';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { DialogRef } from '@angular/cdk/dialog';

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

  onDelete(){
    this.recipe$.pipe(
      take(1),
      tap(recipe => {
        this.recipesService.deleteRecipe(recipe._id);
        this.onGoBack();
      })
    ).subscribe();
  }

  onGoBack() {
    this.router.navigateByUrl('/mes-recettes');
  };
  
  openDialog(){
    
    //let recipeName = this.dialog.open(DialogSuppressComponent, {data: {title: this.recipe$.title}})
    const dialogRef = this.dialog.open(DialogSuppressComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true'){
       this.onDelete();
      }
    });
  }
}


