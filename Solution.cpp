
#include <span>
#include <ranges>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {

public:
    long long gcdSum(vector<int>& input) {
        vector<int> prefixGreatestCommonDivisor = createPrefixGreatestCommonDivisor(input);
        return calculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(prefixGreatestCommonDivisor);
    }

private:
    static long long calculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(span<int> prefixGreatestCommonDivisor) {
        ranges::sort(prefixGreatestCommonDivisor);
        long sumOfGreatestCommonDivisorOfMinMaxPairs = 0;

        int front = 0;
        int back = prefixGreatestCommonDivisor.size() - 1;

        // If the number of elements is odd, then the middle element is not included.
        while (front < back) {
            int minValue = prefixGreatestCommonDivisor[front];
            int maxValue = prefixGreatestCommonDivisor[back];
            sumOfGreatestCommonDivisorOfMinMaxPairs += findGreatestCommonDivisor(minValue, maxValue);
            ++front;
            --back;
        }
        return sumOfGreatestCommonDivisorOfMinMaxPairs;
    }

    static vector<int> createPrefixGreatestCommonDivisor(span<const int> input) {
        int maxValueFromStart = 0;
        vector<int> prefixGreatestCommonDivisor(input.size());

        for (int i = 0; i < input.size(); ++i) {
            maxValueFromStart = max(maxValueFromStart, input[i]);
            prefixGreatestCommonDivisor[i] = findGreatestCommonDivisor(input[i], maxValueFromStart);
        }
        return prefixGreatestCommonDivisor;
    }

    static int findGreatestCommonDivisor(int smaller, int larger) {
        if (smaller == 0) {
            return larger;
        }
        return findGreatestCommonDivisor(larger % smaller, smaller);
    }
};
