import mpg_data from "./data/mpg_data.js";
import {getStatistics, getSum} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: undefined,
    allYearStats: undefined,
    ratioHybrids: undefined,
};
    let sumCity = 0;
    let sumHighway = 0;
    let arrYear = [];
    let numberHybrids = 0;
    mpg_data.forEach((item)=>{
        sumCity+=item.city_mpg;
        sumHighway += item.highway_mpg
        arrYear.push(item.year);
        if (item.hybrid){
            numberHybrids++;
        }
    })
    allCarStats['avgMpg'] = {
        city: sumCity/mpg_data.length,
        highway: sumHighway/mpg_data.length
    }
    allCarStats['allYearStats'] = getStatistics(arrYear);
    allCarStats['ratioHybrids'] = numberHybrids/mpg_data.length;


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

export const moreStats = {
    makerHybrids: undefined,
    avgMpgByYearAndHybrid: undefined
};

    let output = [];
    mpg_data.forEach((item)=>{
        if (item['hybrid']){
            //判断make
            let key = item['make'];
            let count = 0;
            output.forEach((currentCheck)=>{
            if (currentCheck['make'] == key){
                count++;
                currentCheck['hybrids'].push(item['id']);
            }
        })
            if (!count){ //count = 0
                let newObj = {
                    make: key,  
                    hybrids: [item['id']]
                }
                output.push(newObj);
            }
        }
    })
        output.sort((firstItem,secondItem)=>{
            return secondItem.hybrids.length - firstItem.hybrids.length;
        })
        moreStats['makerHybrids']= output; 
        
        
        let arrayYear = mpg_data.reduce((previousCar,currentCar)=> {
                let currentyear = currentCar.year;
                //find the corresponding year element that matches with the year of currentcar, undefined if not found
                let value = previousCar.find(elem => Object.keys(elem)[0] == currentyear)
               if (value == undefined) {
                   let newObj = {
                       [currentyear]: {
                           hybrid:[],
                           notHybrid: []
                       }
                   }
                previousCar.push(newObj)
               }
                 if (currentCar.hybrid){
                   value[currentyear].hybrid.push({city:currentCar.city_mpg,highway:currentCar.highway_mpg})
                 }
                 else{
                    previousCar.find(elem => Object.keys(elem)[0] == currentyear)[currentyear].notHybrid.push({city:currentCar.city_mpg,highway:currentCar.highway_mpg})
                 }
               return previousCar
             }, [])
            
            /*let result = {};
            for (let i=0; i<arrayYear.length; i++){
                let currentyear = Object.keys(arrayYear[i])[0];
                let hybrid_avg = getAvg(arrayYear[i][currentyear].hybrid)
                let notHybrid_avg = getAvg(arrayYear[i][currentyear].notHybrid)
                result[currentyear] = {
                    hybrid: hybrid_avg,
                    notHybrid: notHybrid_avg
                }
            }*/
            
             
            let result =  arrayYear.reduce(function (previousValue, currentValue) {
                let currentyear = Object.keys(currentValue)[0]
                if(!previousValue[currentyear]){
                    previousValue[currentyear] = {}
                }
                  previousValue[currentyear].hybrid={
                    city:currentValue[currentyear].hybrid.map(elem => elem.city).reduce((a, b) => a + b, 0)/currentValue[currentyear].hybrid.length, 
                    highway:currentValue[currentyear].hybrid.map(elem => elem.highway).reduce((a, b) => a + b, 0)/currentValue[currentyear].hybrid.length}
                  
                    previousValue[currentyear].notHybrid={
                    city:currentValue[currentyear].notHybrid.map(elem => elem.city).reduce((a, b) => a + b, 0)/currentValue[currentyear].notHybrid.length, 
                    highway:currentValue[currentyear].notHybrid.map(elem => elem.highway).reduce((a, b) => a + b, 0)/currentValue[currentyear].notHybrid.length}
                
                return previousValue;
              },{})
        
              moreStats['avgMpgByYearAndHybrid'] = result;

              


            
         