export function quickSortAlgo(array) {
  const animations = [];
  let left = 0;
  let right = array.length - 1;
  doQuickSort(array, left, right, animations);
  return animations;
}

function doQuickSort(array, left, right, animations) {
  if (left >= right) 
    return;
  let pivot_index = partition(array, left, right, animations);
  doQuickSort(array, left, pivot_index - 1, animations);
  doQuickSort(array, pivot_index + 1, right, animations);
}

function partition(array, left, right, animations) {
  let pivot = array[left];
  let lower = left + 1;
  let upper = right;
  let cross = false;
  while (!cross) {
    while (array[lower] <= pivot && lower <= upper) {
      animations.push([left, lower]);
      animations.push([left, lower]);
      animations.push([
        0, array[0]
      ]);
      animations.push([
        0, array[0]
      ]);
      lower++;
    }
    while (array[upper] >= pivot && lower <= upper) {
      animations.push([left, upper]);
      animations.push([left, upper]);
      animations.push([
        0, array[0]
      ]);
      animations.push([
        0, array[0]
      ]);
      upper--;
    }
    if (upper < lower) {
      cross = true;
    } else {
      animations.push([lower, upper]);
      animations.push([lower, upper]);
      animations.push([
        lower, array[upper]
      ]);
      animations.push([
        upper, array[lower]
      ]);
      //swap
      let temp = array[lower];
      array[lower] = array[upper];
      array[upper] = temp;
    }
  }
  animations.push([left, upper]);
  animations.push([left, upper]);
  animations.push([
    left, array[upper]
  ]);
  animations.push([upper, pivot]);
  let temp = array[upper];
  array[upper] = pivot;
  array[left] = temp;
  return upper;
}