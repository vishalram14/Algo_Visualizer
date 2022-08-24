export function insertionSort(nums, comparisons, replacements) {
    const n = nums.length
    for (let i = 1; i < n; i++) {
        const key = nums[i]
        let j = i - 1
        while (j >= 0 && nums[j] > key) {
            comparisons.push([j, i])
            replacements.push([j + 1, nums[j]])
            nums[j + 1] = nums[j]
            j--
        }
        comparisons.push([i, i])
        replacements.push([j + 1, key])
        nums[j + 1] = key
    }
}
