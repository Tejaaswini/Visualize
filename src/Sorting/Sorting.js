import React, { Component } from "react";
import './Sorting.css'
import {mergeSortAlgo} from '../SortingAlgo/mergeSort'
import {quickSortAlgo} from '../SortingAlgo/quickSort'

const ANIMATION_SPEED_MS = 200;
const NUMBER_OF_ARRAY_BARS = 40;
const PRIMARY_COLOR = '#16697a';
const SECONDARY_COLOR = '#db6400';

export class Sorting extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          array: [],
        };
      }
    
      componentDidMount() {
        this.resetArray();
      }
    
      resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
          array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array});
      }

      mergeSort() {
        const animations = mergeSortAlgo(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

      render() {
        const {array} = this.state;
    
        return (
          <div className="array-container">
            <h1>Visualize!</h1>
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                  marginTop:'3vh'
                }}></div>
            ))}
            <div className="button-class">
            <button onClick={() => this.resetArray()} className="gen-button">Generate New Array</button>
            <button onClick={() => this.mergeSort()} className="algo-button">Merge Sort</button>
            <button className="algo-button">Quick Sort</button>
            </div>
            
          </div>
        );
      }
    }
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Sorting;
