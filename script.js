
let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);
let program="notrunning";

slider.addEventListener("input", function () {
  if(program=="running")
    alert("Do not try to change the size while Sorting Visualizer running");
  else{
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
}
});

speed.addEventListener("input", (e) => {
  speedFactor = 205-parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  if(program=="running")
    alert("Do not try to change the array while Sorting Visualizer running");
  else{
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  program="running";
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "lightgreen";
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  program="notrunning";
  return array;
}

async function InsertionSort(array) {
  program="running";
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "lightgreen";
      await sleep(speedFactor);

      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "aqua";
        }
      }
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "red";
    await sleep(speedFactor);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
  }
  program="notrunning";
  
  return array;
}
async function selectionsort(array) {
  program="running";
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    bars[i].style.backgroundColor="red";
    let k=i;
    for(let j=i+1;j<array.length;j++)
      {
        bars[j].style.backgroundColor="lightgreen";
        await sleep(speedFactor);
        if(array[j]<array[k]){
          if(k!=i)
          bars[k].style.backgroundColor="aqua";
          k=j;
          bars[k].style.backgroundColor="green";
        }
        if(k!=j)
        bars[j].style.backgroundColor="aqua";
      }
      let temp = array[k];
      array[k] = array[i];
      array[i] = temp;
      bars[i].style.height = array[i] * heightFactor + "px";
      bars[i].style.backgroundColor = "green";
      bars[k].style.height = array[k] * heightFactor + "px";
      bars[k].style.backgroundColor = "red";
      await sleep(speedFactor);
      for(let x=0;x<array.length;x++)
        {
            bars[x].style.backgroundColor="aqua";
        }
   
  }
  program="notrunning";
  return array;
}
async function changecolor(bars){
  for(k=0;k<bars.length;k++){
    console.log("inside");
  bars[k].style.backgroundColor = "aqua";
  await sleep(speedFactor);
  }
}
async function swap1(items, leftIndex, rightIndex, bars) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
  bars[leftIndex].style.backgroundColor = "lightgreen";
  bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
  bars[rightIndex].style.backgroundColor = "lightgreen";
  await sleep(speedFactor);
}
async function partition(items, left, right) {
  console.log(unsorted_array);
   let bars = document.getElementsByClassName("bar");
   let pivotIndex =left;
   var pivot = items[pivotIndex]; 
   bars[pivotIndex].style.backgroundColor = "red";
  let i=left,j=right;
  do {
    do{
      i++;
    }while(items[i] <= pivot );
    do{
      j--;
    }while(items[j] > pivot );
    if (i < j) {
      await swap1(items, i, j, bars); 
    }
  }while(i<j);

  let temp = items[j];
  items[j]=items[left];
  items[left] = temp;
   bars[j].style.height = items[j] * heightFactor + "px";
   bars[j].style.backgroundColor = "green";
   bars[pivotIndex].style.height = items[pivotIndex] * heightFactor + "px";
   bars[pivotIndex].style.backgroundColor = "aqua";
   await sleep(speedFactor);
   for (let k = 0; k < bars.length; k++) {
    if (bars[k].style.backgroundColor == "lightgreen") {
      bars[k].style.backgroundColor = "aqua";
    }
  }
  return j;
}

async function quickSort(items, left, right) {
     let bars = document.getElementsByClassName("bar");
     if (left<right) {
     let  index = await partition(items, left, right); 
        await quickSort(items, left, index);
        await quickSort(items, index+1, right);
     }
     else if(left==right)
      {
        if(left<unsorted_array.length-1)
        bars[left].style.backgroundColor="green";
      }
   return items;
}
 async function QuickSort(items, left, right) {
    program="running";
    items.push(items.length+10);
    await quickSort(items, left, right+1);
    unsorted_array.pop();
    changecolor(document.getElementsByClassName("bar"));
    program="notrunning";
 }

async function swap(array, i, j, bars) {

  for (let k = 0; k < bars.length; k++) {
    if(bars[k].style.backgroundColor != "green"    )
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "aqua";
    }
  }

  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "red";
  await sleep(speedFactor);

  return array;
}

async function swap2(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "green";
  await sleep(speedFactor);
  bars[i].style.backgroundColor = "aqua";
  return array;
}

async function heapify(array, n, i) {
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(array, i, largest, bars);
    await heapify(array, n, largest);
  }
}

async function HeapSort(array) {
  program="running";
  let bars = document.getElementsByClassName("bar");
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    await swap2(array, 0, i, bars);
    await heapify(array, i, 0);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
    await sleep(speedFactor);
  }
  program="notrunning";
  return array;
}

sort_btn.addEventListener("click", function (e) {
  if(program=="running")
    alert("Do not try to change the Sorting type while Sorting Visualizer running");
  else{  
  switch (algotouse) {
    case "bubble":
      bubbleSort(unsorted_array);
      break;
    case "selection":
      selectionsort(unsorted_array);
      break;
    case "heap":
      HeapSort(unsorted_array);
      break;
    case "insertion":
      InsertionSort(unsorted_array);
      break;
    case "quick":
      QuickSort(unsorted_array, 0, unsorted_array.length - 1);
      break;
    default:
      bubbleSort(unsorted_array);
      break;
  }
     }
});
