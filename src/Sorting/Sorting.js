import React from "react";
import "./Sorting.css";
import { quickSortAlgo } from "../SortingAlgo/quickSort";
import { mergeSortAlgo } from "../SortingAlgo/mergeSort";
import { heapSortAlgo } from "../SortingAlgo/heapSort";
import $ from "jquery";
// const PRIMARY_COLOR = "rgb(255, 198, 92)";
const SECONDARY_COLOR = "#f6416c";
const THIRD_COLOR = "#726a95";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      array_length: 34,
      speed: 3,
    };
  }
  toggle_length(val) {
    this.setState({ array_length: val });
    this.resetArray();
  }
  componentDidMount() {
    this.resetArray();
  }
  resetArray() {
    const array = [];

    for (let i = 0; i < this.state.array_length; i++) {
      array.push(randomInt(10, 500));
    }
    this.setState({ array });
  }
  seeAnother() {
    window.location.reload();
  }
  btnClickSlow() {
    this.setState({ speed: 80 });
  }

  btnClickNormal() {
    this.setState({ speed: 40 });
  }
  enableButtons() {
    document.getElementById("shuffle").disabled = false;
    document.getElementById("speed").disabled = false;
    document.getElementById("slider").disabled = false;
    document.getElementById("quick").disabled = false;
    document.getElementById("heap").disabled = false;
    document.getElementById("merge").disabled = false;
  }
  render() {
    const { array } = this.state;
    let bar_size = "";
    const len = this.state.array_length;
    if (len <= 33) {
      bar_size = "30px";
    }
    if (len > 33 && len < 37) {
      bar_size = "28px";
    }
    if (len >= 37 && len <= 40) {
      bar_size = "25px";
    }
    if (len > 40 && len <= 43) {
      bar_size = "22px";
    }
    if (len > 43 && len <= 47) {
      bar_size = "20px";
    }
    if (len > 47 && len <= 50) {
      bar_size = "18px";
    }
    if (len > 50 && len <= 53) {
      bar_size = "17px";
    }
    if (len > 53 && len <= 58) {
      bar_size = "16px";
    }
    if (len > 58 && len <= 64) {
      bar_size = "14px";
    }
    if (len > 64 && len <= 66) {
      bar_size = "13px";
    }
    if (len > 66 && len <= 72) {
      bar_size = "12px";
    }
    if (len > 72 && len <= 80) {
      bar_size = "11px";
    }
    if (len > 80 && len <= 90) {
      bar_size = "10px";
    }
    if (len > 90 && len <= 100) {
      bar_size = "9px";
    }
    if (len > 100 && len <= 120) {
      bar_size = "7px";
    }
    if (len > 120 && len <= 137) {
      bar_size = "6px";
    }
    if (len > 137 && len <= 150) {
      bar_size = "5px";
    }
    if (len > 150 && len <= 183) {
      bar_size = "4px";
    }
    if (len > 183 && len <= 220) {
      bar_size = "3px";
    }
    if (len > 220 && len <= 280) {
      bar_size = "2px";
    }
    return (
      <div className="container">
        <div className="footer-buttons">
          <button
            type="button"
            id="merge"
            className="button-color button-hover"
            onClick={() => this.mergeSort()}
          >
            Merge Sort
          </button>
          <button
            type="button"
            id="quick"
            className="button-color button-hover"
            onClick={() => this.quickSort()}
          >
            Quick Sort
          </button>
          <button
            type="button"
            id="heap"
            className="button-color button-hover"
            onClick={() => this.heapSort()}
          >
            Heap Sort
          </button>
        </div>
        <div>
          <div className="slider">
            <div className="slider row justify-content-center">
              <label>How many bars do you want?</label>
              <input
                id="slider"
                className="slider1 custom-range"
                value={this.state.array_length}
                onChange={(e) => this.toggle_length(e.target.value)}
                name="arraySize"
                type="range"
                min="5"
                max="275"
              />
            </div>
          </div>
          <div className="upper-button" role="group" aria-label="First group">
            <button
              id="shuffle"
              type="button"
              className="button-tools"
              onClick={() => this.resetArray()}
            >
              Shuffle Array
            </button>
            <button
              id="try"
              type="button"
              className="button-tools"
              onClick={() => this.seeAnother()}
            >
              Random Array
            </button>
            <div className="speed">Select Speed (default speed-fast) : </div>
            <button
              className="button-color button-hover "
              onClick={this.btnClickNormal.bind(this)}
            >
              Normal
            </button>
            <button
              className="button-color  button-hover"
              onClick={this.btnClickSlow.bind(this)}
            >
              Slow
            </button>
          </div>
          {array.map((value, idx) => (
            <div className="array-container" key={idx}>
              <div
                className="numbers"
                id="numbers"
                textcontent={value}
                style={
                  this.state.array_length <= 40
                    ? {
                        fontSize: "90%",
                      }
                    : {
                        fontSize: "0%",
                      }
                }
              >
                {value}
              </div>
              <div
                className="array-bar"
                style={{
                  height: `${value}px`,
                  width: bar_size,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  mergeSort() {
    const animations = mergeSortAlgo(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const arrayBarsWithNo = document.getElementsByClassName(
        "array-container"
      );
      const numbersBars = document.getElementsByClassName("numbers");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const barOneStyleNo = arrayBarsWithNo[barOneIdx].style;
        const barTwoStyleNo = arrayBarsWithNo[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : THIRD_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          barOneStyleNo.backgroundColor = color;
          barTwoStyleNo.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          let newH = newHeight;
          newH = newH.toString().replace("px", "");
          numbersBars[barOneIdx].textContent = newH;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.speed);
      }
    }
  }

  heapSort() {
    this.animateAlgo(heapSortAlgo(this.state.array));
  }
  quickSort() {
    this.animateAlgo(quickSortAlgo(this.state.array));
  }

  animateAlgo(animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const arrayBarsWithNo = document.getElementsByClassName(
        "array-container"
      );
      const numbersBars = document.getElementsByClassName("numbers");
      const colorChange = i % 4 <= 1;
      if (colorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const barOneStyleNo = arrayBarsWithNo[barOneIdx].style;
        const barTwoStyleNo = arrayBarsWithNo[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : THIRD_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          barOneStyleNo.backgroundColor = color;
          barTwoStyleNo.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        const [, newHeight] = animations[i];
        let newH = newHeight;
        newH = newH.toString().replace("px", "");
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          numbersBars[barOneIdx].textContent = newH; //
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.speed);
      }
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
$(document).ready(function () {
  $(".dropdown-menu  button").click(function () {
    $(".dropdownMenuButton:first-child").html(
      $(this).text() + ' <span class="caret"></span>'
    );
  });
});
