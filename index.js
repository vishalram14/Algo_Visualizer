import { mergeSort } from "./algorithms/mergeSort.js"
import { algoDetails } from "./algoDetails.js"
import { selectionSort } from "./algorithms/selectionSort.js"
import { bubbleSort } from './algorithms/bubbleSort.js'
import { insertionSort } from "./algorithms/insertionSort.js"
import { quickSort } from "./algorithms/quickSort.js"
import { heapSort } from "./algorithms/heapSort.js"

var bars = []
let idx = 0
let id = null
let turn = 0
let currentAlgo = ""
let clicks = 0

const algoToCall = {
    "Merge Sort": callMergeSort,
    "Quick Sort": callQuickSort,
    "Heap Sort": callHeapSort,
    "Insertion Sort": callInsertionSort,
    "Bubble Sort": callBubbleSort,
    "Selection Sort": callSelectionSort
}

function getRandomHeights(n) {
    var heights = [];
    for (var i = 0; i < n; i++) {
        heights.push(Math.random() * 400)
    }
    return heights
}

function getHeights() {
    var heights = bars.map((bar) => {
        let height = bar.style.height
        height = height.substring(0, height.length - 1)
        return parseFloat(height)
    })
    return heights
}

function getBars(n) {
    const heights = getRandomHeights(n)
    return heights.map((height) => {
        const width = getWidth(heights)
        const bar = document.createElement('div')
        bar.style.height = `${height}px`
        bar.style.width = `${width}px`
        bar.style.backgroundColor = "#036659"
        bar.style.margin = "3px"
        return bar
    })
}

function getWidth(heights) {
    if (heights.length >= 100) {
        return 4
    }
    else if (heights.length >= 75) {
        return 6
    }
    else if (heights.length >= 50) {
        return 8
    }
    return 10
}

function buildBars() {
    container.innerHTML = ""
    bars.forEach((bar) => {
        container.appendChild(bar)
    })
}

function generateBars() {
    const n = parseInt(document.getElementById('numOfBars').value)
    bars = getBars(n)
    buildBars()
}

function displayName() {
    const detailsCont = document.getElementById('algo-details')
    detailsCont.innerHTML = ""
    const heading = document.createElement('p')
    heading.textContent = currentAlgo
    heading.style.fontSize = '0.75rem'
    heading.style.margin = 0
    detailsCont.classList.add('display-algo')
    detailsCont.appendChild(heading)
    clicks = 0
}

function getDetails() {
    const detailsCont = document.getElementById('algo-details')
    if (detailsCont.innerHTML === "") {
        return
    }
    if (clicks % 2 == 1) {
        detailsCont.removeChild(document.getElementById('algo-desc'))
        detailsCont.removeChild(document.getElementById('algo-comp'))
        detailsCont.removeChild(document.getElementById('algo-link'))
        clicks++
        return
    }
    const para = document.createElement('p')
    para.textContent = algoDetails[currentAlgo].description
    para.style.fontSize = "0.5rem"
    para.style.margin = 0
    para.id = 'algo-desc'
    detailsCont.appendChild(para)
    const para1 = document.createElement('p')
    para1.textContent = `Complexity: ${algoDetails[currentAlgo].complexity}`
    para1.style.fontSize = "0.5rem"
    para1.style.margin = 0
    para1.id = 'algo-comp'
    detailsCont.appendChild(para1)
    const para2 = document.createElement('p')
    para2.innerHTML = `More on : <a href = ${algoDetails[currentAlgo].link}>${currentAlgo}</a>`
    para2.style.fontSize = '0.5rem'
    para2.style.margin = 0
    para2.id = 'algo-link'
    detailsCont.appendChild(para2)
    clicks++
}
function addButtonListeners() {
    document.getElementById("merge-sort").addEventListener("click", (event) => {
        currentAlgo = "Merge Sort";
        displayName()
    })
    document.getElementById("quick-sort").addEventListener("click", (event) => {
        currentAlgo = "Quick Sort";
        displayName()
    })
    document.getElementById("heap-sort").addEventListener("click", (event) => {
        currentAlgo = "Heap Sort";
        displayName()
    })
    document.getElementById("insertion-sort").addEventListener("click", (event) => {
        currentAlgo = "Insertion Sort";
        displayName()
    })
    document.getElementById("selection-sort").addEventListener("click", (event) => {
        currentAlgo = "Selection Sort";
        displayName()
    })
    document.getElementById("bubble-sort").addEventListener("click", (event) => {
        currentAlgo = "Bubble Sort";
        displayName()
    })
}

function animate(comparisons, len, replacements) {
    if (idx == len) {
        clearInterval(id)
    }
    else {
        const idx1 = comparisons[idx][0], idx2 = comparisons[idx][1]
        let bar1 = bars[idx1]
        let bar2 = bars[idx2]
        if (turn % 2 == 0) {
            bar1.style.backgroundColor = "#FF9B71"
            bar2.style.backgroundColor = "#FF9B71"
        }
        else {
            bar1.style.backgroundColor = "#036659"
            bar2.style.backgroundColor = "#036659"
            const rep_idx = replacements[idx][0]
            const bar = bars[rep_idx]
            bar.style.height = `${replacements[idx][1]}px`
            idx++
        }
        turn++
    }
}

function animateSwapping(comparisons, len, swaps) {
    if (idx === len) {
        clearInterval(id)
    }
    else {
        let idx1 = comparisons[idx][0], idx2 = comparisons[idx][1]
        let bar1 = bars[idx1]
        let bar2 = bars[idx2]
        if (turn % 2 == 0) {
            bar1.style.backgroundColor = "#FFFD82"
            bar2.style.backgroundColor = "#FFFD82"
        }
        else {
            bar1.style.backgroundColor = "#036659"
            bar2.style.backgroundColor = "#036659"
            idx1 = swaps[idx][0]
            idx2 = swaps[idx][1]
            bar1 = bars[idx1]
            bar2 = bars[idx2]
            const temp = bar1.style.height
            bar1.style.height = bar2.style.height
            bar2.style.height = temp
            idx++
        }
        turn++
    }
}

function callMergeSort() {
    var heights = getHeights()
    const comparisons = [], replacements = []
    mergeSort(heights, 0, heights.length - 1, comparisons, replacements)
    console.log(replacements)
    console.log(comparisons)
    id = setInterval(() => animate(comparisons, comparisons.length, replacements), 30)
    idx = 0
    turn = 0
}

function callSelectionSort() {
    var heights = getHeights()
    const comparisons = [], swaps = []
    selectionSort(heights, comparisons, swaps)
    console.log(heights)
    id = setInterval(() => animateSwapping(comparisons, comparisons.length, swaps), 15)
    idx = 0
    turn = 0
}

function callQuickSort() {
    var heights = getHeights()
    const comparisons = [], swaps = []
    quickSort(heights, 0, heights.length - 1, comparisons, swaps)
    console.log(heights)
    id = setInterval(() => animateSwapping(comparisons, comparisons.length, swaps), 15)
    idx = 0
    turn = 0
}

function callHeapSort() {
    var heights = getHeights()
    const comparisons = [], swaps = []
    heapSort(heights, comparisons, swaps)
    console.log(heights)
    id = setInterval(() => animateSwapping(comparisons, comparisons.length, swaps), 15)
    idx = 0
    turn = 0
}

function callInsertionSort() {
    var heights = getHeights()
    const comparisons = [], replacements = []
    insertionSort(heights, comparisons, replacements)
    console.log(heights)
    id = setInterval(() => animate(comparisons, comparisons.length, replacements), 15)
    idx = 0
    turn = 0
}

function callBubbleSort() {
    var heights = getHeights()
    const comparisons = [], swaps = []
    bubbleSort(heights, comparisons, swaps)
    id = setInterval(() => animateSwapping(comparisons, comparisons.length, swaps), 15)
    idx = 0
    turn = 0
}

window.onload = () => {
    const container = document.getElementById("container")
    const form = document.querySelector('form')
    form.addEventListener('submit', (event) => {
        generateBars()
        event.preventDefault()
    })
    addButtonListeners()
    document.getElementById('sort-btn').addEventListener('click', (event) => {
        algoToCall[currentAlgo]()
    })
    document.getElementById('algo-details').addEventListener('click', (event) => getDetails())
    bars = getBars(50)
    buildBars()
}




