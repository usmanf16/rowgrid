import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { GridModule, EditService } from '@syncfusion/ej2-angular-grids'
import { ToolbarService } from '@syncfusion/ej2-angular-grids'
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { RowDDService, SelectionService, ReorderService } from '@syncfusion/ej2-angular-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ContactComponent } from './contact/contact.component'








import { Component, OnInit } from '@angular/core';

import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
imports: [
        
        GridModule,DialogModule,RouterModule , HomeComponent,
        TestComponent ,
        ContactComponent,TestComponent 
    ],

providers: [ToolbarService, EditService,RouterOutlet, RowDDService, SelectionService, ReorderService ],
standalone: true,
    selector: 'app-root',
    
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  

})
export class AppComponent  {

  
    

}
