import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { IngredientsComponent } from './components/shared/components/ingredients/ingredients.component';
import { StepsComponent } from './components/shared/components/steps/steps.component';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';

@NgModule({
  declarations: [
    TimeAgoPipe,
    IngredientsComponent,
    StepsComponent,
    ShortenTextPipe
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
    ShortenTextPipe
   ]
})
export class SharedModule { }