import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
    imports: [MatSnackBarModule,MatProgressBarModule,MatTooltipModule],
    exports: [MatSnackBarModule,MatProgressBarModule,MatTooltipModule],
})
export class MaterialModule { }