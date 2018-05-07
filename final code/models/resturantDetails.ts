export class restaurantDetails {

    constructor(
    public name: string,
    public vicinity: string,
    public rating: any,
    public lat:any,
    public lng:any,
    public icon:any,
    ) {  }

    toString(){
      return "Name:"+this.name 
    }
  }
