// simr.ts
export interface Specification {
    specificationName: string;
    specificationDescription: string;
    specificationValue: number;
  }
  
  export class Product {
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
  
    constructor(
      id: number,
      name: string,
      description: string,
      referenceStream: string,
      saleMode: string,
      delay: number,
      group: string,
      gradeType: string,
      tag: string,
      specifications: Specification[]
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.referenceStream = referenceStream;
      this.saleMode = saleMode;
      this.delay = delay;
      this.group = group;
      this.gradeType = gradeType;
      this.tag = tag;
      this.specifications = specifications;
    }
  }
  