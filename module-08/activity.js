const timeout = (ms) => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, ms);
    });
  }
  
   const inc = (a)=>{
     return timeout(2000).then(() => a +1);
   };


   const sum = (a,b)=>{
    return timeout(2000).then(() => a +b);
   }

   const max = (a, b) => {

    return timeout(2000).then(() =>a > b ? a : b);
  
  };
  
  const avg = (a, b) => {
    return timeout(2000).then(() =>sum(a, b).then((data)=>data/2));
  };


  const obj = {
    name: "Marcus Aurelius",
     split(sep = " ") {
      return timeout(2000).then(()=>this.name.split(sep));
    },
  };
  
  class Person {
    constructor(name) {
      this.name = name;
    }
  
    static of(name) {
      return timeout(2000).then(()=> new Person(name));
  
    }
  
     split(sep = " ") {
      return  timeout(2000).then(()=> this.name.split(sep));
    }
  }
  
  const person = new Person("Marcus Aurelius");

  inc(5).then(data => console.log(`Increment = ${data}`))
  .then(()=> sum(5,5)).then(data => console.log(`sum = ${data}`))
  .then(()=>max(5,15)).then(data => console.log(`Max = ${data}`))
  .then(()=>avg(5,5)).then(data=>console.log(`Average = ${data}`))
  .then(()=>obj.split()).then(data=>console.log(`Object Class Split = ${data}`))
  .then(()=>person.split()).then(data=>console.log(`Person Class Split = ${data}`));


