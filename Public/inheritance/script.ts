class Person {
    name: string;
    age: number;
  
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  
  class Employee extends Person {
    salary: number;
  
    constructor(name: string, age: number, salary: number) {
      super(name, age);
      this.salary = salary;
    }
  
    getDetails(): string {
      return `Name: ${this.name}<br>Age: ${this.age}<br>Salary: $${this.salary}`;
    }
  }
  
  // This function is called when the user clicks the "Submit" button
  function submitDetails(): void {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const age = parseInt((document.getElementById("age") as HTMLInputElement).value);
    const salary = parseFloat((document.getElementById("salary") as HTMLInputElement).value);
  
    const emp = new Employee(name, age, salary);
    const outputDiv = document.getElementById("output")!;
    outputDiv.innerHTML = emp.getDetails();
  }
  