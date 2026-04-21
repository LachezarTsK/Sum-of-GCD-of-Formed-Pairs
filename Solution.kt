
import kotlin.math.max

class Solution {

    fun gcdSum(input: IntArray): Long {
        val prefixGreatestCommonDivisor : IntArray = createPrefixGreatestCommonDivisor(input)
        return calculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(prefixGreatestCommonDivisor)
    }

    private fun calculateSumOfGreatestCommonDivisorOfMinMaxPairsInPrefix(prefixGreatestCommonDivisor: IntArray) : Long{
        prefixGreatestCommonDivisor.sort()
        var sumOfGreatestCommonDivisorOfMinMaxPairs : Long= 0

        var front = 0
        var back = prefixGreatestCommonDivisor.size - 1

        // If the number of elements is odd, then the middle element is not included.
        while (front < back) {
            val minValue = prefixGreatestCommonDivisor[front]
            val maxValue = prefixGreatestCommonDivisor[back]
            sumOfGreatestCommonDivisorOfMinMaxPairs += findGreatestCommonDivisor(minValue, maxValue)
            ++front
            --back
        }
        return sumOfGreatestCommonDivisorOfMinMaxPairs
    }

    private fun createPrefixGreatestCommonDivisor(input:IntArray):IntArray {
        var maxValueFromStart = 0
        val prefixGreatestCommonDivisor = IntArray(input.size)

        for (i in input.indices) {
            maxValueFromStart = max(maxValueFromStart, input[i])
            prefixGreatestCommonDivisor[i] = findGreatestCommonDivisor(input[i], maxValueFromStart)
        }
        return prefixGreatestCommonDivisor
    }

    private fun findGreatestCommonDivisor(smaller:Int, larger:Int):Int {
        if (smaller == 0) {
            return larger
        }
        return findGreatestCommonDivisor(larger % smaller, smaller)
    }
}
