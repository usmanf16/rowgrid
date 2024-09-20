// simulation.model.ts
export interface Simulation {
    simGuid: string;
    simulationName: string;
    refineries: Refinery[];
  }
  
  export interface Refinery {
    refineryBaseDetails: RefineryBaseDetails;
    plants: Plant[];
  }
  
  export interface RefineryBaseDetails {
    refineryId: number;
    refineryName: string;
  }
  
  export interface Plant {
    id: number;
    type: string;
    plantNames: PlantName[];
  }
  
  export interface PlantName {
    id: number;
    name: string;
  }
  