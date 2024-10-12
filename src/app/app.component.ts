import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  array: number[] = [];
  arraySize: number = 50;
  barWidth: number = 100 / this.arraySize;
  speed: number = 1;
  selectedAlgorithm: string = 'bubble';
  sortingInProgress: boolean = false;  // Disable UI during sorting

  constructor() {
    this.generateNewArray();
  }

  generateNewArray() {
    this.array = [];
    for (let i = 0; i < this.arraySize; i++) {
      this.array.push(Math.floor(Math.random() * 300) + 20);
    }
    this.barWidth = 100 / this.arraySize;
  }

  updateArray(event: Event) {
    const target = event.target as HTMLInputElement;
    this.arraySize = Number(target.value);
    this.generateNewArray();
  }
  
  setSpeed(event: Event) {
    const target = event.target as HTMLInputElement;
    this.speed = Number(target.value);
  }

  setAlgorithm(algorithm: string) {
    this.selectedAlgorithm = algorithm;
  }

  async startSorting() {
    if (this.sortingInProgress) return;  
    this.sortingInProgress = true;
  
    switch (this.selectedAlgorithm) {
      case 'bubble':
        await this.bubbleSort();
        break;
      case 'selection':
        await this.selectionSort();
        break;
      case 'insertion':
        await this.insertionSort();
        break;
      case 'merge':
        await this.mergeSort(0, this.array.length - 1);
        break;
      case 'quick':
        await this.quickSort(0, this.array.length - 1);
        break;
      case 'heap':
        await this.heapSort();
        break;
      default:
        break;
    }
  
    this.sortingInProgress = false;
  }
  
  async bubbleSort() {
    let n = this.array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (this.array[j] > this.array[j + 1]) {
          [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
          this.array = [...this.array];  
          await this.sleep(this.speed);  
        }
      }
    }
  }
  
  async selectionSort() {
    let n = this.array.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (this.array[j] < this.array[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [this.array[i], this.array[minIdx]] = [this.array[minIdx], this.array[i]];
        this.array = [...this.array];  
        await this.sleep(this.speed);
      }
    }
  }
  
  async insertionSort() {
    let n = this.array.length;
    for (let i = 1; i < n; i++) {
      let key = this.array[i];
      let j = i - 1;
      while (j >= 0 && this.array[j] > key) {
        this.array[j + 1] = this.array[j];
        j--;
        this.array = [...this.array];  
        await this.sleep(this.speed);
      }
      this.array[j + 1] = key;
    }
  }
  
  async mergeSort(left: number, right: number) {
    if (left >= right) return;
    let mid = Math.floor((left + right) / 2);
    await this.mergeSort(left, mid);
    await this.mergeSort(mid + 1, right);
    await this.merge(left, mid, right);
  }
  
  async merge(left: number, mid: number, right: number) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = this.array.slice(left, mid + 1);
    let R = this.array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
  
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        this.array[k] = L[i];
        i++;
      } else {
        this.array[k] = R[j];
        j++;
      }
      this.array = [...this.array];  
      await this.sleep(this.speed);
      k++;
    }
  
    while (i < n1) {
      this.array[k] = L[i];
      i++;
      k++;
      this.array = [...this.array];  
      await this.sleep(this.speed);
    }
  
    while (j < n2) {
      this.array[k] = R[j];
      j++;
      k++;
      this.array = [...this.array];  
      await this.sleep(this.speed);
    }
  }
  
  async quickSort(low: number, high: number) {
    if (low < high) {
      let pi = await this.partition(low, high);
      await this.quickSort(low, pi - 1);
      await this.quickSort(pi + 1, high);
    }
  }
  
  async partition(low: number, high: number) {
    let pivot = this.array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (this.array[j] < pivot) {
        i++;
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        this.array = [...this.array];  
        await this.sleep(this.speed);
      }
    }
    [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
    this.array = [...this.array];  
    await this.sleep(this.speed);
    return i + 1;
  }
  
  async heapSort() {
    let n = this.array.length;
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(n, i);
    }
  
    for (let i = n - 1; i > 0; i--) {
      [this.array[0], this.array[i]] = [this.array[i], this.array[0]];
      this.array = [...this.array];  
      await this.sleep(this.speed);
      await this.heapify(i, 0);
    }
  }
  
  async heapify(n: number, i: number) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
  
    if (left < n && this.array[left] > this.array[largest]) {
      largest = left;
    }
  
    if (right < n && this.array[right] > this.array[largest]) {
      largest = right;
    }
  
    if (largest !== i) {
      [this.array[i], this.array[largest]] = [this.array[largest], this.array[i]];
      this.array = [...this.array];  
      await this.sleep(this.speed);
      await this.heapify(n, largest);
    }
  }
  

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
