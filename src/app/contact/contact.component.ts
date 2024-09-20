import { Component, OnInit } from '@angular/core';

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { GridModule, EditService } from '@syncfusion/ej2-angular-grids'
import { ToolbarService } from '@syncfusion/ej2-angular-grids'
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { RowDDService, SelectionService, ReorderService } from '@syncfusion/ej2-angular-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ GridModule,DialogModule,RouterModule ,
    ContactComponent
],

providers: [ToolbarService, EditService,RouterOutlet, RowDDService, SelectionService, ReorderService ],

  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})






export class ContactComponent implements OnInit {

    public data?: object[];
    public toolbar?: ToolbarItems[];
    public editSettings?: EditSettingsModel;
    public selectOptions?: Object;
    arr:any[]=[];
  isVisible?: boolean;
  
    constructor(private http : HttpClient){


    }


    ngOnInit(): void {
 

        this.editSettings = {
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
        };
        this.toolbar = [
            'Add',
            'Edit',
            'Delete',
            'Update',
            'Cancel',
        ];
        this.getdetails();
        this.selectOptions = { type: 'Multiple' };
}
getdetails(){
  const headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'SimGuid': 'D191DB0D-07E3-4122-8F50-9800A10C8AE9',
  }
  
  const requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(headerDict), 
  };
  
  
  this.http.get<any[]>("https://jsonplaceholder.typicode.com/users",requestOptions).subscribe((res:any)=>{

    this.arr = res;
    
    
  })
    } 
   

     
}
