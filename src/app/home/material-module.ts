import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatTableModule, MatDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [MatButtonModule, 
    MatCheckboxModule, 
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatTableModule, 
    MatDialogModule,],
  exports: [MatButtonModule, 
    MatCheckboxModule, 
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatTableModule, 
    MatDialogModule,
  ]
})

export class MaterialModule { }
