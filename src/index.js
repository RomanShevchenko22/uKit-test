import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// --------------------------- IIFE
const Person = (function() {
  let name = 'Roman';
  let surname = 'Shevchenko';
  let personInner = function() {
    this.getName = function() {
        return name;
    };  
    this.getSurName = function() {
        return surname;
    };  
    this.getFullName = function() {
        return `${name} ${surname}`;
    };  
  };
  return personInner;
})();

const person = new Person();
person.name = "Maxim";            // has no effect on the name in Person object
console.log(person.getName());
console.log(person.getSurName());
console.log(person.getFullName());

document.getElementById('iife').textContent = `
person.getName(): ${person.getName()}|-----|
person.getSurName(): ${person.getSurName()}|-----|
person.getFullName(): ${person.getFullName()} 
`;


// --------------------------- Object prototype
const Human = function(options) {
  this.type = 'world';
  this.name = options.name;
  this.surname = options.surname;
  this.age = options.age;
}
Human.prototype.language = function() {
  return 'I can speak';
};

const Russian = function(options) {
  Human.call(this, options);
  this.type = 'country';
  this.city = options.city
}

Russian.prototype = Object.create(Human.prototype);
Russian.prototype.constructor = Russian;

Russian.prototype.language = function() {  
  return 'I can speak Russian';
};

const me = new Russian({
  name: 'Roman', 
  surname: 'Shevchenko', 
  age: 24, 
  message: 'Russian',
  city: 'Rostov',
  a: 42,
  b: '24'
});

document.getElementById('proto').textContent = me.language();
console.log('me', me);


// --------------------------- Object class
class Human1 {
  static type = 'HUMAN';
  constructor(options) {
    this.name = options.name
    this.surname = options.surname
    this.age = options.age
  }
  language() {
    return 'I can speak';
  }
};

class Russian1 extends Human1 {
  static type = 'RUSSIAN';
  constructor (options) {
    super (options);
    this.country = options.country
  }
  language() {
    return 'I can speak Russian';
  }
};

const me1 = new Russian1 ({
  name: 'Roman',
  surname: 'Shevchenko',
  age: 24,
  country: 'Russia',
  skills: ['JavaScript', 'HTML', 'CSS', 'Photography', 'Physics'],
  getSkills: function(skill) { 
    function findElem(arr, skill) {
      if(arr.indexOf(skill) !== -1) {
        return true;
      } else {
        return false;
      }
    } 
    return findElem(this.skills, skill);      
  }
});

console.log('me1', me1);


// --------------------------- Promise
const resultTest = true;
// Promise
const willIGetWork = new Promise(
  (resolve, reject) => {
    if (resultTest) {
      const work = {
        company: 'uKit',
        position: 'Junior front-end developer'
      };
      resolve(work);
    } else {
        const reason = new Error('Skills are weak');
        reject(reason);
    }
  }
);

const share = function (work) {
  const message = `Hey friend, I got a work in ${work.company} company on ${work.position} position`;
    return Promise.resolve(message);
};

// Call Promise
const askHr= function () {
  willIGetWork
    .then(share)
    .then(responce => {
      console.log('responce: ', responce);
      document.getElementById('promise').textContent = responce;
    })
    .catch(error => console.log(error.message));
};

askHr();