class Person {
    constructor ( public firstName :string, public lastName : string){}

    getFullName() : string {
        return`${this.firstName}${this.lastName}`;
    }
}

class Employee extends Person{
    constructor(firstName:string, lastName:string, public jobTitle: string){

        super(firstName,lastName);
    }
    getDetails(): string{
        return `Name ${this.getFullName()}, ${this.jobTitle}`;
    }
}

function displayEmployee() : void {
    const firstName = (document.getElementById("firstName") as HTMLInputElement).value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement).value;

    const emp = new Employee (firstName ,lastName, jobTitle);
    (document.getElementById("result")as HTMLElement).innerText = emp.getDetails();

}