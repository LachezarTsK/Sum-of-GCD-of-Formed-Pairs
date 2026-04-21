
/**
 * @param {number[]} input
 * @return {number}
 */
var gcdSum = function (input) {
    const prefixGreatestCommonDivisor = createPrefixGreatestCommonDivisor(input);
    return calculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(prefixGreatestCommonDivisor);
};

/**
 * @param {number[]} prefixGreatestCommonDivisor
 * @return {number}
 */
function calculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(prefixGreatestCommonDivisor) {
    prefixGreatestCommonDivisor.sort((x, y) => x - y);
    let sumOfGreatestCommonDivisorOfMinMaxPairs = 0;

    let front = 0;
    let back = prefixGreatestCommonDivisor.length - 1;

    // If the number of elements is odd, then the middle element is not included.
    while (front < back) {
        const minValue = prefixGreatestCommonDivisor[front];
        const maxValue = prefixGreatestCommonDivisor[back];
        sumOfGreatestCommonDivisorOfMinMaxPairs += findGreatestCommonDivisor(minValue, maxValue);
        ++front;
        --back;
    }
    return sumOfGreatestCommonDivisorOfMinMaxPairs;
}

/**
 * @param {number[]} input
 * @return {number[]}
 */
function createPrefixGreatestCommonDivisor(input) {
    let maxValueFromStart = 0;
    const prefixGreatestCommonDivisor = new Array(input.length);

    for (let i = 0; i < input.length; ++i) {
        maxValueFromStart = Math.max(maxValueFromStart, input[i]);
        prefixGreatestCommonDivisor[i] = findGreatestCommonDivisor(input[i], maxValueFromStart);
    }
    return prefixGreatestCommonDivisor;
}

/**
 * @param {number} smaller
 * @param {number} larger 
 * @return {number}
 */
function findGreatestCommonDivisor(smaller, larger) {
    if (smaller === 0) {
        return larger;
    }
    return findGreatestCommonDivisor(larger % smaller, smaller);
}
