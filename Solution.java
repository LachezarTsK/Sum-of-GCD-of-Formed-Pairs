
import java.util.Arrays;

public class Solution {

    public long gcdSum(int[] input) {
        int[] prefixGreatestCommonDivisor = createPrefixGreatestCommonDivisor(input);
        return calculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(prefixGreatestCommonDivisor);
    }

    private static long calculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(int[] prefixGreatestCommonDivisor) {
        Arrays.sort(prefixGreatestCommonDivisor);
        long sumOfGreatestCommonDivisorOfMinMaxPairs = 0;

        int front = 0;
        int back = prefixGreatestCommonDivisor.length - 1;

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

    private static int[] createPrefixGreatestCommonDivisor(int[] input) {
        int maxValueFromStart = 0;
        int[] prefixGreatestCommonDivisor = new int[input.length];

        for (int i = 0; i < input.length; ++i) {
            maxValueFromStart = Math.max(maxValueFromStart, input[i]);
            prefixGreatestCommonDivisor[i] = findGreatestCommonDivisor(input[i], maxValueFromStart);
        }
        return prefixGreatestCommonDivisor;
    }

    private static int findGreatestCommonDivisor(int smaller, int larger) {
        if (smaller == 0) {
            return larger;
        }
        return findGreatestCommonDivisor(larger % smaller, smaller);
    }
}
