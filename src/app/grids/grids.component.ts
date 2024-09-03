import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { Product } from './models/simr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.css']
})
export class GridsComponent implements OnInit {
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  public gridOptions: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'SimGuid': 'D191DB0D-07E3-4122-8F50-9800A10C8AE9',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http.get<Product[]>('http://localhost:5174/api/Product', requestOptions).subscribe(
      (res: Product[]) => {
        this.rowData = this.transposeData(res);
        this.createColumns();
        console.log('Transposed Data:', this.rowData);  // Debug log
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  transposeData(data: Product[]): any[] {
    console.log('Original Data:', data);  // Log original data
  
    if (!data || data.length === 0) return [];
  
    const headers = Object.keys(data[0]);
    console.log('Headers:', headers);  // Log headers
  
    const transposedData = headers.map((header) => {
      const row: { [key: string]: any } = { Field: header };
  
      data.forEach((item, rowIndex) => {
        row[`Row ${rowIndex + 1}`] = item[header as keyof Product]; // Ensure correct type casting
      });
  
      return row;
    });
  
    console.log('Transposed Data:', transposedData);  // Log transposed data
    return transposedData;
  }
  

  createColumns() {
    if (this.rowData.length > 0) {
      // Create columns from transposed data
      this.columnDefs = Object.keys(this.rowData[0]).map(key => ({
        headerName: key,
        field: key,
        width: 150,
        // Optionally specify column type
        // type: typeof this.rowData[0][key] === 'number' ? 'numericColumn' : 'textColumn'
      }));
    }
  }
}
