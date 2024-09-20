import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule, EditService } from '@syncfusion/ej2-angular-grids';
import { ToolbarService, PageService, SearchService } from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { RowDDService, SelectionService, ReorderService } from '@syncfusion/ej2-angular-grids';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

interface ProductSpecification {
  specificationName?: string;
  specificationDescription?: string;
  specificationValue?: number;
}

interface ProductDefinition {
  id: number;
  name?: string;
  description?: string;
  referenceStream?: string;
  saleMode?: string;
  delay: number;
  group?: string;
  gradeType?: string;
  tag?: string;
  specifications: ProductSpecification[];
}

interface ProductComposition {
  productId: number;
  connectionId: number;
  prodName?: string;
  prodDescription?: string;
  streamName?: string;
  value?: number;
}

interface ProductBoundItem {
  streamName?: string;
  connectionId: number;
  compositionId: number;
  boundId: number;
}

interface ProductBound {
  id: number;
  boundName?: string;
  boundDescription?: string;
  productId: number;
  productName?: string;
  unit?: string;
  min: number;
  max: number;
  productBoundItems: ProductBoundItem[];
}

interface ProductMarketItems {
  productMarketId: number;
  productSales?: string;
  productDescription?: string;
  distributionLosses?: number;
  unit?: string;
}

interface ProductMarket {
  id: number;
  product?: string;
  productMarketItems: ProductMarketItems[];
}

interface ProductAggregate {
  productDefinition: ProductDefinition[];
  productCompositions: ProductComposition[];
  productBounds: ProductBound[];
  productMarkets: ProductMarket[];
}


@Component({
  selector: 'app-rowwise',
  standalone: true,
  imports: [GridModule, DialogModule, RouterModule, CommonModule],
  providers: [SearchService, PageService, ToolbarService, EditService, RouterOutlet, RowDDService, SelectionService, ReorderService],
  styleUrls: ['./rowwise.component.css'],
  template: `
    <button (click)="toggleView()">{{ isRowView ? 'Switch to Column View' : 'Switch to Row View' }}</button>
    <div class="container">
    

      <ejs-grid [dataSource]="isRowView ? transposedData : arr" height='270px' allowPaging='true' 
        [toolbar]='toolbarOptions' allowReordering='true' [allowRowDragAndDrop]='true' 
        [selectionSettings]='selectOptions' [editSettings]="editSettings" width='80%'>
        
        <e-columns>
          <ng-container *ngIf="isRowView; else columnView">
            <e-column field="field" headerText="Field" width="150" textAlign = "Left"></e-column>
            <e-column *ngFor="let product of arr; let i = index" field="Product {{i + 1}}" width="150"     ></e-column>
          </ng-container>
          
          <ng-template #columnView>
            <!-- Dynamically generate columns based on the fields returned from the API, excluding 'id' -->
            <e-column *ngFor="let column of dynamicColumns" 
                      [field]="column.field" 
                      [headerText]="column.headerText" 
                      [width]="150" 
                     [valueAccessor]="column.field === 'specifications' ? specificationsFormatter : null">
            </e-column>
          </ng-template>
        </e-columns>
      </ejs-grid>
    </div>
  `,
})
export class RowwiseComponent implements OnInit {
  public arr: ProductDefinition[] = [];
  public transposedData: any[] = [];
  public data?: object[];
  public toolbar?: ToolbarItems[];
  public editSettings?: EditSettingsModel;
  public selectOptions?: Object;
  public toolbarOptions?: ToolbarItems[];
  public isRowView: boolean = true; // Toggle state for row/column view
  public textAligns?: Number;
  public dynamicColumns: Array<{ field: string, headerText: string }> = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
    };

    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    this.getdetails();
  }

  toggleView() {
    this.isRowView = !this.isRowView;
  }

  getdetails() {
    const params = new HttpParams().append('SimGuid', 'D191DB0D-07E3-4122-8F50-9800A10C8AE9');
  
    this.http.get<ProductAggregate>('/api/Product/GetProducts', { params }).subscribe(
      (res: ProductAggregate) => {
        this.arr = res.productDefinition; // Assuming you're interested in ProductDefinition
        this.generateDynamicColumns();
        this.transposeData();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
   // Dynamically generate the columns based on the  fields from the API , excluding 'id'
  
   generateDynamicColumns() {
    if (this.arr.length > 0) {
      const firstProduct = this.arr[0]; // Assuming all products have the same structure
      const fields = Object.keys(firstProduct);
  
      // Filter out 'id' if it's not needed
      this.dynamicColumns = fields
        .filter(field => field !== 'id') // Exclude 'id' if needed
        .map(field => ({
          field,
          headerText: this.capitalizeFirstLetter(field)
        }));
    }
  }
  

  // Capitalize the first letter of the field names for better display in header
  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

 
  // Exclude 'id' from row-wise transposition as well
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
      'specifications',
    ];
  
    this.transposedData = fields.map(field => {
      const row: { [key: string]: any } = { field };
  
      this.arr.forEach((product, index) => {
        row[`Product ${index + 1}`] = field === 'specifications'
          ? product.specifications.map(spec => `${spec.specificationName}: ${spec.specificationValue}`).join(', ')
          : product[field as keyof ProductDefinition];
      });
  
      return row;
    });
  }
  

  specificationsFormatter(field: string, data: any, column: any) {
    return data.specifications
      .map((spec: ProductSpecification) => `${spec.specificationName}: ${spec.specificationValue}`)
      .join(', ');
  }
}
