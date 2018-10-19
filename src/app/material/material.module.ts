import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatCardModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatCheckboxModule, MatGridListModule, MatSidenavModule, MatProgressSpinnerModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatGridListModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatGridListModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
    ]
})

export class MaterialModule {}