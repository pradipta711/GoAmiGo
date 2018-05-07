export class atmDetails {

    constructor(
    public name: string,
    public lat:any,
    public lng:any,
    public vicinity: string,
    ) {  }

    toString(){
      return "Name:"+this.name 
    }
  }