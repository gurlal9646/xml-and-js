const data = [
    { born: 1870, died: 1924 },
    { born: 1893, died: 1976 },
    { born: 1869, died: 1948 },
    { born: 1901, died: 1989 },
  ];

const age = data.map(({died,born})=> died - born);

console.log(age);


const filtered = age.filter(item => item > 75);

console.log(filtered);



const oldest =  filtered.reduce((accum, item) => {
    return accum < item ? item : accum;
  }, 0);

console.log(oldest);


const chainOldest =data.map(({died,born})=> died - born).
filter(item => item > 75).
reduce((accum, item) => {
    return accum < item ? item : accum;
  }, 0);

 console.log(chainOldest);



