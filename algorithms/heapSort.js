function maxHeapify(nums, i, n, comparisons, swaps) {
    const left = 2 * i + 1, right = 2 * i + 2
    let largest = i
    if (left < n && nums[left] > nums[i]) {
        comparisons.push([left, i])
        swaps.push([i, i])
        largest = left
    }
    if (right < n && nums[right] > nums[largest]) {
        comparisons.push([right, largest])
        swaps.push([largest, largest])
        largest = right
    }
    if (largest != i) {
        comparisons.push([largest, i])
        swaps.push([largest, i])
        const temp = nums[largest]
        nums[largest] = nums[i]
        nums[i] = temp
        maxHeapify(nums, largest, n, comparisons, swaps)
    }
}

function buildHeap(nums, comparisons, swaps) {
    const n = nums.length
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        maxHeapify(nums, i, n, comparisons, swaps)
    }
}

export function heapSort(nums, comparisons, swaps) {
    buildHeap(nums, comparisons, swaps)
    const n = nums.length
    for (let i = n - 1; i > 0; i--) {
        comparisons.push([0, i])
        swaps.push([0, i])
        const temp = nums[i]
        nums[i] = nums[0]
        nums[0] = temp

        maxHeapify(nums, 0, i, comparisons, swaps)
    }
}
