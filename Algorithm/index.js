const lodash = require('lodash');

function section3(l = 0, t = 0) {
    let bigArray = [];
    let i = 0;
    let smallArray = [];
    
    for (let d = 0; d <= 9; d++) {
        for (let j = 1; j <= 9; j++) {
                smallArray.push(j);
                if (l - 1 == i) {
                    if (lodash.sum(smallArray) == t) {
                        if (l > 1) {
                            if (lodash.intersection(bigArray.flat(), smallArray).length == l) {
                                smallArray.pop();
                                smallArray[i - 1] = smallArray[i - 1] + 1;
                                break;
                            } else if (lodash.uniq(smallArray).length < l) {
                                i = 0;
                                smallArray = [];
                                break;
                            } else if (lodash.intersection(bigArray.flat(), smallArray).length == l - 1) {
                                smallArray.push(j);
                                i++;
                                break;
                            } else {
                                bigArray.push(smallArray);
                                i = 0;
                                smallArray = [];
                                break;
                            }
                        } else if (lodash.filter(bigArray, smallArray).length == 0 && bigArray.length > 0 && l == 1) {
                            i = 0;
                            smallArray = [];
                            break;
                        } else {
                            bigArray.push(smallArray);
                            i = 0;
                            smallArray = [];
                            break;
                        }
                    } else {
                        smallArray.pop();
                        i--;
                    }  
                }
                i++;
        };
    }

    return bigArray;
}

console.log(section3(3, 8));