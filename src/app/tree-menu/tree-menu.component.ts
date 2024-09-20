 import { NgModule, OnInit } from '@angular/core'
 import { BrowserModule } from '@angular/platform-browser'
 import { FormsModule } from '@angular/forms'
 import { TreeViewModule } from '@syncfusion/ej2-angular-navigations'
 import { Component, ViewEncapsulation } from '@angular/core';
 import { Simulation } from './interfaces/ITreeMenu';
 import { TreeMenuService } from './tree-menu.service';

 @Component({
   selector: 'app-tree-menu',
   standalone: true,
   imports: [
     FormsModule, TreeViewModule
 ],
   templateUrl: './tree-menu.component.html',
   styleUrl: './tree-menu.component.css',
   providers: [TreeMenuService]
 })
 export class TreeMenuComponent implements OnInit{
   private treeMenu: Simulation[] = [];
   public localData: Object[] = [];
   public field:Object ={};
   public cssClass:string = "custom";
   public allowDragAndDrop : boolean = false;

   constructor(private treeMenuService: TreeMenuService) {
   }
   ngOnInit(): void {
     this.fetchSimulations();
     console.log("localdata", this.localData)
   }
   fetchSimulations(): void {
     this.treeMenuService.getSimulations().subscribe(
       (data: any) => {
         if (Array.isArray(data)) {
           this.treeMenu = data;
         } else if (data.simulation) {
           // If the API returns an object with a 'simulation' array inside
          this.treeMenu = data.simulation;         } else {
           console.error('Unexpected response format:', data);
           return;
        }
  
        this.localData = [];
  
        // Iterate through the simulations if it's now an array
        this.treeMenu.forEach(simulation => {
          const simObject = {
            id: simulation.simGuid,
            name: simulation.simulationName,
            eimg: '10',
            hasChild: simulation.refineries?.length > 0,
            expanded: true
           };
  
          this.localData.push(simObject);
          simulation.refineries.forEach(refinery => {
            const refineryObject = {
              id: refinery.refineryBaseDetails.refineryId,
              pid: simulation.simGuid,
               name: refinery.refineryBaseDetails.refineryName,
               eimg: '10',
               hasChild: refinery.plants?.length > 0,
               expanded: true
             };
  
            this.localData.push(refineryObject);
  
            refinery.plants.forEach(plant => {
             const plantObject = {
                id: plant.id,                 pid: refinery.refineryBaseDetails.refineryId ,
                name: plant.type,
                eimg: '10',
                hasChild: plant.plantNames?.length > 0,
                expanded: true
              };
  
              this.localData.push(plantObject);
  
              plant.plantNames.forEach(plantName => {
                const plantNameObject = {
                  id: plantName.id,
                  pid: plant.id,
                  name: plantName.name,
                 hasChild: false,
                  eimg: '10',
                  expanded: false
                };
  
                this.localData.push(plantNameObject);
              });
           });
           });
        });
        this.field = {
          dataSource: this.localData, // Bind the API response data to the TreeView
          id: 'id',
         parentID: 'pid',
         text: 'name',
           hasChildren: 'hasChild'
         };
      },
      (error) => {
         console.error('Error fetching simulations:', error);
      }
     );    console.log(this.localData)  }

}



/* interface HierarchicalNode {
  nodeId: string;        // Unique ID for the node
  nodeText: string;      // Display text
  icon?: string;         // Optional icon
  image?: string;        // Optional image (for picture nodes)
  expanded?: boolean;    // Optional expanded state
  nodeChild?: HierarchicalNode[]; // Child nodes, also of type HierarchicalNode
}
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeMenuService } from './tree-menu.service'; // Assuming you have a service to fetch the data
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations'

@Component({
  selector: 'app-container',
  templateUrl: './tree-menu.component.html', // Link your template

  imports:[TreeViewModule],
  encapsulation: ViewEncapsulation.None,
  providers: [TreeMenuService]
})
export class TreeMenuComponent implements OnInit {
  public hierarchicalData: HierarchicalNode[] = [];  // Initialize hierarchical data array

  constructor(private simulationService: TreeMenuService) {}

  ngOnInit(): void {
    // Fetch the API data on component initialization
    this.fetchSimulations();
  }

  fetchSimulations(): void {
    this.simulationService.getSimulations().subscribe(
      (data: any) => {
        this.hierarchicalData = this.transformData(data);
      },
      (error) => {
        console.error('Error fetching simulations:', error);
      }
    );
  }

  // Function to transform API data into hierarchical format
  transformData(apiData: any): HierarchicalNode[] {
    const hierarchicalData: HierarchicalNode[] = [];
  
    apiData.simulation.forEach((simulation: any) => {
      const simulationNode: HierarchicalNode = {
        nodeId: simulation.simGuid, // Ensure this is a string (use `.toString()` if needed)
        nodeText: simulation.simulationName,
        icon: 'folder',
        nodeChild: []
      };
  
      simulation.refineries.forEach((refinery: any) => {
        const refineryNode: HierarchicalNode = {
          nodeId: refinery.refineryBaseDetails.refineryId.toString(), // Ensure ID is a string
          nodeText: refinery.refineryBaseDetails.refineryName,
          icon: 'folder',
          nodeChild: []
        };
  
        refinery.plants.forEach((plant: any) => {
          const plantNode: HierarchicalNode = {
            nodeId: plant.id.toString(), // Ensure ID is a string
            nodeText: plant.type,
            icon: 'folder',
            nodeChild: []
          };
  
          plant.plantNames.forEach((plantName: any) => {
            const plantNameNode: HierarchicalNode = {
              nodeId: plantName.id.toString(), // Ensure ID is a string
              nodeText: plantName.name,
              icon: 'docx' // Choose appropriate icon
            };
  
            plantNode.nodeChild!.push(plantNameNode); // Use non-null assertion operator here
          });
  
          refineryNode.nodeChild!.push(plantNode);
        });
  
        simulationNode.nodeChild!.push(refineryNode);
      });
  
      hierarchicalData.push(simulationNode);
    });
  
    return hierarchicalData;
  }
  
}
 */