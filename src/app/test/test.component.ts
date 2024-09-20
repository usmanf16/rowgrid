import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule, EditService } from '@syncfusion/ej2-angular-grids';
import { ToolbarService,PageService,SearchService} from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { RowDDService, SelectionService, ReorderService } from '@syncfusion/ej2-angular-grids';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';


interface Specification {
  specificationName: string;
  specificationDescription: string;
  specificationValue: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  referenceStream: string;
  saleMode: string;
  delay: number;
  group: string;
  gradeType: string;
  tag: string;
  specifications: Specification[];
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [GridModule, DialogModule, RouterModule, CommonModule],
  providers: [SearchService,PageService,ToolbarService, EditService, RouterOutlet, RowDDService, SelectionService, ReorderService],
  styleUrls: ['./test.component.css'],
  template: `
    <div class="container">
      <ejs-grid [dataSource]="transposedData" height='270px'allowPaging='true'  [toolbar]='toolbarOptions' [toolbar]='toolbar' allowReordering='true' [allowRowDragAndDrop]='true' [selectionSettings]='selectOptions' [editSettings]="editSettings" width='80%' >
        <e-columns>
          <e-column field="field" headerText="Field" width="150"  ></e-column>
          <e-column *ngFor="let product of arr" field="{{product.id}}" width="150"   >
          </e-column>
        </e-columns>
      </ejs-grid>
    </div>
  `,
})

export class TestComponent implements OnInit {
  public arr: Product[] = [];
  public transposedData: any[] = [];
  public data?: object[];
    public toolbar?: ToolbarItems[];
    public editSettings?: EditSettingsModel;
    public selectOptions?: Object;
    public toolbarOptions?: ToolbarItems[];

  
   public validationRules: { [key: string]: Object } = {
      'field': { required: true, minLength: 3 },
      'name': {
        required: true,
        
        minLength: 3,
        regex: /^[a-zA-Z\s]*$/, // Allow only alphabetic characters and spaces
        custom: {
          validator: (args: { value: string }) => /^[a-zA-Z\s]*$/.test(args.value),
          message: 'Name should contain only alphabetic characters.'
      }
        
      },
      'description': {
    required: true,
  },
  'referenceStream': {
    required: true,
    },
  'delay': {
    required: true,
    min: 0,
    max: 100,
  },
      // Add more fields and their rules here
    };
  

    
    
    

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal' 
      
  };
  
  this.toolbar = [
      'Add',
      'Edit',
      'Delete',
      'Update',
      'Cancel',
      'Search'
  ];
    this.getdetails();
  }

  getdetails() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'SimGuid': 'D191DB0D-07E3-4122-8F50-9800A10C8AE9'
       
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http.get<Product[]>("http://localhost:5174/api/Product", requestOptions).subscribe(
      (res: Product[]) => {
        this.arr = res;
        this.transposeData();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  transposeData() {
    const fields = [
      'name',
      'description',
      'referenceStream',
      'saleMode',
      'delay',
      'group',
      'gradeType',
      'tag',
      'specifications'
    ];
  
    this.transposedData = fields.map(field => {
      const row: { [key: string]: any } = { field }; // Updated typing for row
      this.arr.forEach((product) => {
        row[product.id.toString()] = field === 'specifications' 
          ? product.specifications.map(spec => `${spec.specificationName}: ${spec.specificationValue}`).join(', ')
          : product[field as keyof Product];
      });
      return row;
    });
  }
}
