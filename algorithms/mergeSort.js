function merge(nums, low, mid, high, comparisons, replacements) {
    const n1 = mid - low + 1
    const n2 = high - mid
    const left = [], right = []

    for (let i = 0; i < n1; i++) {
        left.push(nums[low + i])
    }
    for (let i = 0; i < n2; i++) {
        right.push(nums[mid + i + 1])
    }

    let i = 0, j = 0, k = low

    while (i < n1 && j < n2) {
        comparisons.push([low + i, mid + j + 1])
        if (left[i] < right[j]) {
            replacements.push([k, left[i]])
            nums[k++] = left[i++]
        }
        else {
            replacements.push([k, right[j]])
            nums[k++] = right[j++]
        }
    }
    while (i < n1) {
        comparisons.push([low + i, low + i])
        replacements.push([k, left[i]])
        nums[k++] = left[i++]
    }
    while (j < n2) {
        comparisons.push([mid + j + 1, mid + j + 1])
        replacements.push([k, right[j]])
        nums[k++] = right[j++]
    }
}

export function mergeSort(nums, low, high, comparisons, replacements) {
    if (low < high) {
        const mid = Math.floor(low + (high - low) / 2)
        mergeSort(nums, low, mid, comparisons, replacements)
        mergeSort(nums, mid + 1, high, comparisons, replacements)
        merge(nums, low, mid, high, comparisons, replacements)
    }
}