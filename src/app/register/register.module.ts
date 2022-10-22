import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/register.component';
import { RegisterRoutingModule } from './register.routing.module';
import { RegisterService } from './services/register.service';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule
  ],
  providers: [
    RegisterService
  ]
})
export class RegisterModule { }
