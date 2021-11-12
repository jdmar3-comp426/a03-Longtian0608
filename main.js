import {sumToString} from "./src/mild/mild_1.js";
console.log ("sumToString(3,4): ");
console.log(sumToString(3,4));

import {getIncreasingArray} from "./src/mild/mild_1.js";
console.log ("getIncreasingArray(3,8): ");
console.log(getIncreasingArray(3,8));

import {maxAndMin } from "./src/mild/mild_1.js";
console.log ("maxAndMin(528340): ");
console.log(maxAndMin("528340"));

import { countArray } from "./src/mild/mild_1.js";
console.log("countArray([2,2,4,3,4,5,2,1,4,5,6,7,8]): ");
console.log(countArray([2,2,4,3,4,5,2,1,4,5,6,7,8]));

import { identifyVariable, removeKeyNonDestructive } from "./src/mild/mild_2.js";
console.log("identifyVariable(4): ");
console.log(identifyVariable(4));

import { identifyArray } from "./src/mild/mild_2.js";
console.log("identifyArray(['some', 3, [3, 4], false])");
console.log(identifyArray(['some', 3, [3, 4], false]));

import { removeKey } from "./src/mild/mild_2.js";
let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
/*console.log("removeKey(obj, password): ");
console.log(removeKey(obj,'password'));*/

/*
obj = removeKeyNonDestructive(obj, 'password');
console.log("removeKeyNonDestructive(obj, 'password'): ");
console.log(obj);
console.log(removeKeyNonDestructive(obj,'password'));
*/

import {removeKeys} from "./src/mild/mild_2.js";
console.log("removeKeys(obj, ['password', 'age']): ");
console.log(removeKeys(obj, ['password', 'age']));
