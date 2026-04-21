
using System;

public class Solution
{
    public long GcdSum(int[] input)
    {
        int[] prefixGreatestCommonDivisor = CreatePrefixGreatestCommonDivisor(input);
        return CalculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(prefixGreatestCommonDivisor);
    }

    private static long CalculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(int[] prefixGreatestCommonDivisor)
    {
        Array.Sort(prefixGreatestCommonDivisor);
        long sumOfGreatestCommonDivisorOfMinMaxPairs = 0;

        int front = 0;
        int back = prefixGreatestCommonDivisor.Length - 1;

        // If the number of elements is odd, then the middle element is not included.
        while (front < back)
        {
            int minValue = prefixGreatestCommonDivisor[front];
            int maxValue = prefixGreatestCommonDivisor[back];
            sumOfGreatestCommonDivisorOfMinMaxPairs += FindGreatestCommonDivisor(minValue, maxValue);
            ++front;
            --back;
        }
        return sumOfGreatestCommonDivisorOfMinMaxPairs;
    }

    private static int[] CreatePrefixGreatestCommonDivisor(int[] input)
    {
        int maxValueFromStart = 0;
        int[] prefixGreatestCommonDivisor = new int[input.Length];

        for (int i = 0; i < input.Length; ++i)
        {
            maxValueFromStart = Math.Max(maxValueFromStart, input[i]);
            prefixGreatestCommonDivisor[i] = FindGreatestCommonDivisor(input[i], maxValueFromStart);
        }
        return prefixGreatestCommonDivisor;
    }

    private static int FindGreatestCommonDivisor(int smaller, int larger)
    {
        if (smaller == 0)
        {
            return larger;
        }
        return FindGreatestCommonDivisor(larger % smaller, smaller);
    }
}
