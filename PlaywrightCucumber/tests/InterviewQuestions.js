// Q1 - Can a javaobject hold a function as a property? Explain with an example.
const person = {
    name : "sandeep",
    age : 41,
    greet : function (){
        console.log("I am function and holding name :" + this.name + "; age :" + this.age)
    
    }
}

const name = person.name;
person.greet(); //I am function and holding name :sandeep; age :41

// Answer : Yes

//Q2 What are anonymous functions in JavaScript? Define their syntax and implementation
function sayHello(){
    return "Hello, I am a world";
}

const helloMsg = sayHello();
console.log(helloMsg);

const greet = function (name, age){
        return "I am function and holding name :" + name + "; age :" + age;
    }
console.log(greet);    
//Anwser - function without name is called anonymous function

// Q3 - 07:22 - What is the difference between var, const, and let? Explain with an example.
// 'var' is function-scoped or globally-scoped and can be redeclared and updated

function varExample(){
    var x =1;
    if (true){
        var x =2;
        console.log(x);    //2
    }
    console.log(x); //2
}

//Answer - 2 2

// 'let' is blocked-scoped and can be updated but not re-declared withing the same scope

function varExample(){
    let x =1;
    if (true){
        let x =2;
        y=3;            //Default variable type is 'var'
        console.log(x);    //2
    }
    
    console.log(y); //3
    console.log(x); //1
    x=5;
    console.log(x); //5

}
//Answer - 2 3 1

// 'const' is blocked-scoped and can not be updated and not re-declared

function varExample(){
    const x =1;
    if (true){
        const x =2;
        y=3;            //Default variable type is 'var'
        console.log(x);    //2
    }
    
    console.log(y); //3
    console.log(x); //1
    x=5; //not allowed - error
    

}
//Answer - 2 3 1 and error - not allowed 
