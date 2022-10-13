import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  recipeForm!: FormGroup;
  recipeFormSimple!: FormGroup;
  form!: FormGroup;
  recipePreview$!: Observable<Recipe>;

  constructor(private router: Router, private formBuilder: FormBuilder, private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.testForm();
    this.intitFormRecipeBuilder();

  }

  testForm() {
    this.form = this.formBuilder.group({
      title: ['', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(60)
        ],
        updateOn: 'blur'
      }],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      prepTime: ['', Validators.required],
      cookTime: ['', Validators.required],
      eaters: ['', Validators.required],
      type: ['dishe', Validators.required],
      createdDate: new Date(),
      steps: this.formBuilder.array([]),
      ingredients: this.formBuilder.array([])
    })
  }

  get steps() {
    return this.form.controls["steps"] as FormArray;
  };

  get ingredients() {
    return this.form.controls["ingredients"] as FormArray;
  }

  addSteps() {
    const stepForm = this.formBuilder.group({
      title: ['', Validators.required]
    })
    this.steps.push(stepForm);
  };

  addIngredients() {
    const ingredientForm = this.formBuilder.group({
      title: ['', Validators.required],
      number: ['', Validators.required],
      unit: ['g', Validators.required]

    })
    this.ingredients.push(ingredientForm);
  };

  deleteStep(stepIndex: number) {
    this.steps.removeAt(stepIndex);
  };

  deleteIngredient(ingredientIndex: number) {
    this.ingredients.removeAt(ingredientIndex);

  };

  sendForm() {
    console.warn(this.form.value);
    //this.recipesService.addRecipe(this.form.value).subscribe((result) => console.warn(result));
  };
















  intitFormRecipeBuilder() {
    this.recipeFormSimple = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      steps: new FormArray([
        new FormControl(null, Validators.required)
      ]),
      ingredients: new FormArray([
        new FormControl(null)
      ]),
      imageUrl: new FormControl(null, Validators.required),
      prepTime: new FormControl(null, Validators.required),
      cookTime: new FormControl(null, Validators.required),
      eaters: new FormControl(null, Validators.required),
      gallery: new FormArray([
        new FormControl(null)
      ]),
      type: new FormControl(null, Validators.required),
    })
  }

  initFormRecipe() {
    this.recipeForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      steps: [[], Validators.required],
      ingredients: [[], Validators.required],
      imageUrl: [null, Validators.required],
      prepTime: [null, Validators.required],
      cookTime: [null, Validators.required],
      eaters: [null, Validators.required],
      gallery: [null],
      type: [null, Validators.required],
    }, {
      updateOn: 'blur'
    })
    this.recipePreview$ = this.recipeForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        creatDate: new Date(),
        likes: 0
      }))
    )
  };


}
