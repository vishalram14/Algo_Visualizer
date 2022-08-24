export function bubbleSort(nums, comparisons, swaps) {
    const n = nums.length
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comparisons.push([j, j + 1])
            let flag = false
            if (nums[j] > nums[j + 1]) {
                swaps.push([j, j + 1])
                const temp = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = temp
                flag = true
            }
            if (flag == false) {
                swaps.push([j, j])
            }
        }
    }
}
