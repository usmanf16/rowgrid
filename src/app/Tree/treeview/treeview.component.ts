import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-treeview',
  standalone: true,
  imports: [TreeViewModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {

  public field!: Object;
  public treeData: any[] = []; // Holds the tree structure

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch data from the API
    this.http.get('/api/TreeView/GetTreeStructure').subscribe((response: any) => {
      console.log('API Full Response:', response);  // Log the full response
    
      if (response && response.result && response.result.simulation) {
        this.treeData = this.mapTreeData(response.result.simulation);
        console.log('Mapped Tree Data:', this.treeData);
        
        // Update the TreeView fields configuration
        this.field = {
          dataSource: this.treeData,
          id: 'id',
          text: 'name',
          hasChildren: 'hasChildren',
          child: {
            id: 'id',
            text: 'name',
            hasChildren: 'hasChildren'
          }
        };
      } else {
        console.error('API response does not contain the expected simulation data.');
      }
    });
  }
    

  public show(): void {
    const popup = document.getElementById('loading') as HTMLElement;
    if (popup) popup.style.display = 'block';
  }
  
  public hide(): void {
    const popup = document.getElementById('loading') as HTMLElement;
    if (popup) popup.style.display = 'none';
  }
  

  // Function to map the data from the API to the structure expected by the TreeView
  private mapTreeData(simulations: any[]): any[] {
    return simulations.map((sim: any) => {
      return {
        id: sim.simGuid,
        name: sim.simulationName,
        hasChildren: true,
        children: sim.refineries.map((refinery: any) => ({
          id: refinery.refineryBaseDetails.refineryId,
          name: refinery.refineryBaseDetails.refineryName,
          hasChildren: true,
          children: refinery.plants.map((plant: any) => ({
            id: plant.id,
            name: plant.plantNames[0].name,
            hasChildren: true,
            children: refinery.products.map((product: any) => ({
              id: product.id,
              name: product.name,
              hasChildren: false // Products don't have children
            }))
          }))
        }))
      };
    });
  }
}
