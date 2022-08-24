function partition(nums, low, high, comparisons, swaps) {
    const pivot = nums[high]
    let i = low - 1
    for (let j = low; j < high; j++) {
        comparisons.push([j, high])
        let flag = false
        if (nums[j] < pivot) {
            i++
            flag = true
            swaps.push([i, j])
            const temp = nums[i]
            nums[i] = nums[j]
            nums[j] = temp
        }
        if (flag === false) {
            swaps.push([j, j])
        }
    }
    comparisons.push([i + 1, i + 1])
    swaps.push([i + 1, high])
    const temp = nums[i + 1]
    nums[i + 1] = nums[high]
    nums[high] = temp
    return i + 1
}

export function quickSort(nums, low, high, comparisons, swaps) {
    if (low < high) {
        const q = partition(nums, low, high, comparisons, swaps)
        quickSort(nums, low, q - 1, comparisons, swaps)
        quickSort(nums, q + 1, high, comparisons, swaps)
    }
}
