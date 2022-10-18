import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { StepsComponent } from './components/steps/steps.component';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { DialogSuppressComponent } from './components/dialog-suppress/dialog-suppress.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
    IngredientsComponent,
    StepsComponent,
    ShortenTextPipe,
    DialogSuppressComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    TimeAgoPipe,
    IngredientsComponent,
    StepsComponent,
    ShortenTextPipe,
    DialogSuppressComponent
   ]
})
export class SharedModule { }