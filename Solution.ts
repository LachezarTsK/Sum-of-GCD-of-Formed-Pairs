
function gcdSum(input: number[]): number {
    const prefixGreatestCommonDivisor = createPrefixGreatestCommonDivisor(input);
    return calculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(prefixGreatestCommonDivisor);
};

function calculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(prefixGreatestCommonDivisor: number[]): number {
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

function createPrefixGreatestCommonDivisor(input: number[]): number[] {
    let maxValueFromStart = 0;
    const prefixGreatestCommonDivisor = new Array(input.length);

    for (let i = 0; i < input.length; ++i) {
        maxValueFromStart = Math.max(maxValueFromStart, input[i]);
        prefixGreatestCommonDivisor[i] = findGreatestCommonDivisor(input[i], maxValueFromStart);
    }
    return prefixGreatestCommonDivisor;
}

function findGreatestCommonDivisor(smaller: number, larger: number): number {
    if (smaller === 0) {
        return larger;
    }
    return findGreatestCommonDivisor(larger % smaller, smaller);
}
