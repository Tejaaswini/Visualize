export function heapSortAlgo(array) {
    const animations = [];
    doHeapSort(array, animations);
    console.log(animations);
    return animations;
  }
  
  function doHeapSort(array, animations) {
    let n = array.length;
    for (let i = Math.floor(n / 2); i >= 0; i--) {
      buildMaxHeap(array, n, i, animations);
    }
    //remove root node
    for (let j = n - 1; j > 0; j--) {
      swap(array, 0, j, animations);
  
      //heapify the reduced heap
      n--;
      buildMaxHeap(array, n, 0, animations);
    }
  }
  
  function buildMaxHeap(array, n, i, animations) {
    let largest = i;
    let left_child = i * 2 + 1;
    let right_child = i * 2 + 2;
  
    if (left_child < n && array[left_child] > array[largest]) {
      //console.log(left_child);
      //console.log(right_child);
      //console.log(animations);
      animations.push([left_child, largest]); //color 2 bars
      animations.push([left_child, largest]); //uncolor them
      animations.push([
        0, array[0]
      ]);
      animations.push([
        0, array[0]
      ]);
      largest = left_child;
    }
    if (right_child < n && array[right_child] > array[largest]) {
      animations.push([right_child, largest]); //color 2 bars
      animations.push([right_child, largest]);
      animations.push([
        0, array[0]
      ]);
      animations.push([
        0, array[0]
      ]);
      largest = right_child;
    }
    if (largest !== i) {
      swap(array, i, largest, animations);
      //heapidy the subtree
      buildMaxHeap(array, n, largest, animations);
    }
  }
  
  function swap(a, i, j, animations) {
    animations.push([i, j]);
    animations.push([i, j]);
    animations.push([
      i, a[j]
    ]); //swapped in bars
    animations.push([
      j, a[i]
    ]); //swapped in bars
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }