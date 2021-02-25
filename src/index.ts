
// interface Human {//interface는 JS로 컴파일되지 않는다. (넣고싶으면 class 써라)
//   name: string;  //interface를 쓰는 것이 calss 보다 더 안전해(TS 측면에서)
//   age: number;
//   gender: string;
// }

class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender?: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const ihl = new Human("ihl", 33);

// const person = {
//   name: "ihl",
//   age: 22,
//   gender: "female"
// }

const sayHi = (person: Human): string => {
  return `There are ${person.name} ${person.age}, your are ${person.gender}`;
};

console.log(sayHi(ihl));

//이 파일이 모듈이 될 것이라는 의미
//없으면 내부에서 const name = "ihl"; 선언 불가능
export { };