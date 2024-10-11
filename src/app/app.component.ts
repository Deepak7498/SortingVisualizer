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
        //await this.selectionSort();
        break;
      case 'insertion':
        //await this.insertionSort();
        break;
      case 'merge':
        //await this.mergeSort(this.array, 0, this.array.length - 1);
        break;
      case 'quick':
        //await this.quickSort(this.array, 0, this.array.length - 1);
        break;
      case 'heap':
        //await this.heapSort();
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
          // Swap elements
          [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
          this.array = [...this.array];  
          await this.sleep(this.speed);  
        }
      }
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
