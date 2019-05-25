//temp until dabase connection
let idCounter = 2;
export class Users {
    id: number;
    // ? mean optional, ts does not yell at you
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    pwr:string;

    constructor(){
        this.id = idCounter;
        // this.first_name = '';
        // this.last_name ='';
        // this.email ='';
        // this.password ='';
        idCounter++;
    }

}