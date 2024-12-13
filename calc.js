const express = require('express');
const CustomError = require('./error');

const app = express();

app.use(express.json());

function makeNumArr(vals) {
    let nums = vals.map(v => {
        return parseFloat(v)
    });
    return nums;
}

function checkAllNums(arr) {
    let check = arr.every(a => {
        if (isNaN(a)) {
            return false;
        } else {
            return true;
        }
    })
    if (check) return true;
    return false;
}

function getMean(arr) {
    let sum = arr.reduce((acc, currVal) => {
        return acc + currVal;
    })
    let mean = parseFloat((sum / arr.length).toFixed(2));
    return mean;
}

function getMedian(arr) {
    let sorted = arr.sort((a, b) => a - b);
    if (sorted.length % 2 !== 0) {
        let mid = Math.floor(arr.length / 2);
        return arr[mid];
    } else {
        let mid1 = sorted.length / 2 - 1;
        let mid2 = sorted.length / 2;
        let median = parseFloat(((sorted[mid1] + sorted[mid2])/2).toFixed(2));
        return median;
    }
}

function getMode(arr) {
    let counts = {};
    arr.forEach(n => {
        if (counts[n] === undefined) {
            counts[n] = 1;
        }
        counts[n] += 1;
    })
    let max = Object.keys(counts).reduce((a, b) => {
        return parseFloat(counts[a] > counts[b] ? a : b);
    })
    return max;
}

app.use((req, res, next) => {
    if (!req.query.nums) {
        let e = new CustomError('Numbers are required', 400);
        next(e);
    } else {
        next();
    }
})

app.get('/mean', (req, res, next) => {
    let vals = Array.from(req.query.nums.split(','));
    let nums = makeNumArr(vals);
    let checked = checkAllNums(nums);
    if (!checked) {
        let err = new CustomError('All values must be numbers', 400);
        next(err);
    } else {
        let mean = getMean(nums);
        return res.json({ Result: { operation: "mean", value: mean } });
    }
})

app.get('/median', (req, res, next) => {
    let vals = Array.from(req.query.nums.split(','));
    let nums = makeNumArr(vals);
    let checked = checkAllNums(nums);
    if (!checked) {
        let err = new CustomError('All values must be numbers', 400);
        next(err);
    } else {
        let median = getMedian(nums)
        return res.json({ Result: { operation: "median", value: median } });
    }
})

app.get('/mode', (req, res, next) => {
    let vals = Array.from(req.query.nums.split(','));
    let nums = makeNumArr(vals);
    let checked = checkAllNums(nums);
    if (!checked) {
        let err = new CustomError('All values must be numbers', 400);
        next(err);
    } else {
        let mode = getMode(nums)
        return res.json({ Result: { operation: "mode", value: mode } });
    }
})

app.get('/all', (req, res, next) => {
    let vals = Array.from(req.query.nums.split(','));
    let nums = makeNumArr(vals);
    let checked = checkAllNums(nums);
    if (!checked) {
        let err = new CustomError('All values must be numbers', 400);
        next(err);
    } else {
        let mean = getMean(nums);
        let median = getMean(nums);
        let mode = getMode(nums);
        return res.json({ Result: { operation: "all", mean, median, mode} });
    }
})

app.use((req, res, next) => {
    const e = new CustomError('Page Not Found', 404);
    next(e);
})

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let msg = err.msg;
    return res.status(status).json({ error: { msg, status } });
})

app.listen(3000, () => console.log('app on port 3000'));

module.exports = {
    makeNumArr, 
    checkAllNums,
    getMean, 
    getMedian, 
    getMode
}