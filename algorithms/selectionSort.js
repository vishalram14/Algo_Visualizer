export function selectionSort(nums, comparisons, swaps) {
    for (let i = 0; i < nums.length; i++) {
        let min = i
        for (let j = i + 1; j < nums.length; j++) {
            comparisons.push([min, j])
            swaps.push([min, min])
            if (nums[min] > nums[j]) {
                min = j
            }
        }
        comparisons.push([min, min])
        swaps.push([min, i])
        const temp = nums[min]
        nums[min] = nums[i]
        nums[i] = temp
    }
}
