const {makeNumArr, checkAllNums, getMean, getMedian, getMode} = require('./calc')

describe('Set up helper functions', () => {
    let data;
    beforeEach( () => data = ['1', '2', '3', '4', '5']);
    test('create array of numbers from data obtained in res.query', () => {
        let nums = makeNumArr(data);
        expect(nums).toEqual([1,2,3,4,5]);
        data.push('x');
        nums = makeNumArr(data);
        expect(nums).toEqual([1,2,3,4,5,NaN]);
    })
    test('Check to be sure all items in array are numbers', () => {
        let nums = makeNumArr(data);
        expect(checkAllNums(nums)).toBe(true);
        nums.push(NaN);
        expect(checkAllNums(nums)).toBe(false);
    })
})

describe('operation functions', () => {
    let nums = [1,2,3,4,4,5,6]
    test('get mean from nums', () => {
        let mean = getMean(nums);
        expect(mean).toEqual(3.57);
    })
    test('get median from nums with odd number of values in array', () => {
        let median = getMedian(nums);
        expect(median).toEqual(4);
        nums.pop();
        median = getMedian(nums);
        expect(median).toEqual(3.50);
    })
    test('get mode from nums', () => {
        let mode = getMode(nums);
        expect(mode).toEqual(4);
    })
})