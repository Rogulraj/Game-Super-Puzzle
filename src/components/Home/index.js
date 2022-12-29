import { Component } from "react";
import { Navigate } from "react-router-dom";
import { BsPatchExclamationFill } from "react-icons/bs";

import Loader from "react-loader-spinner";

import UserInputTable from "../UserInputTable";

import GameResult from "../GameResult";

import "./index.css";

export default class Home extends Component {
  state = {
    N: "",
    isCreateBtn: false,
    userPuzzleList: [],
    superPuzzle: [],
    number: "",
    result: "",
  };

  setN = (event) => {
    const { value } = event.target;
    console.log(value);
    this.setState({
      N: value,
      isCreateBtn: false,
    });
  };

  setIsCreateBtn = () => {
    const { N, number } = this.state;

    const newNumber = number.split(",").map((num) => parseInt(num));
    const numRequire = parseInt(N) * parseInt(N);

    const range = [...Array(N * N - 1 - 0 + 1).keys()];
    const isRange = newNumber.every((num) => num in range);

    const updatedInput = [...Array(N - 1 - 0 + 1).keys()].map((index) =>
      newNumber.slice(index * N, (index + 1) * N)
    );

    if (N !== "" && N > 0 && newNumber.length === numRequire && isRange) {
      this.setState({
        isCreateBtn: true,
        userPuzzleList: updatedInput,
        superPuzzle: newNumber,
      });
    }
  };

  resultSetter = (value) => {
    this.setState({
      result: value,
    });
  };

  solvePuzzle = () => {
    const { userPuzzleList, superPuzzle, isCreateBtn, N } = this.state;

    if (isCreateBtn === true) {
      let matrix = userPuzzleList;
      let newNumber = superPuzzle;
      let range = [...Array(N * N - 1 - 0 + 1).keys()];
      let findSuperPuzzleRange = range.slice(1, range.length);
      findSuperPuzzleRange.push(0);

      let subArrays = [...Array(N - 1 - 0 + 1).keys()].map((index) =>
        findSuperPuzzleRange.slice(index * N, (index + 1) * N)
      );

      let sequence = [];
      sequence.push(matrix);

      const findX = (r, c, grid) => {
        let index_list = [
          [r - 1, c],
          [r + 1, c],
          [r, c - 1],
          [r, c + 1],
        ];
        let testArray = [];
        let counter = [];

        for (let i in index_list) {
          let [row, col] = [...index_list[parseInt(i)]];

          if (row >= 0 && col >= 0 && row < N && col < N) {
            let test = grid.map((each) => [...each]);
            let count = [];
            test[r][c] = grid[row][col];
            test[row][col] = 0;
            testArray.push(test);
            for (let rowIndex in test) {
              for (let colIndex in test) {
                if (
                  subArrays[rowIndex][colIndex] !== test[rowIndex][colIndex] &&
                  test[rowIndex][colIndex] !== 0
                ) {
                  count.push(test[rowIndex][colIndex]);
                }
              }
            }
            counter.push(count.length);
          }
        }
        sequence.push(testArray[counter.indexOf(Math.min(...counter))]);
      };

      const sequenceMaker = () => {
        for (let i in matrix) {
          let zeroFinder =
            sequence[sequence.length - 1][parseInt(i)].indexOf(0);
          if (zeroFinder !== -1) {
            findX(
              parseInt(i),
              parseInt(zeroFinder),
              sequence[sequence.length - 1]
            );
            break;
          }
        }
      };

      const conditionChecker = () => {
        for (let rowIndex in sequence[sequence.length - 1]) {
          for (let colIndex in sequence[sequence.length - 1]) {
            if (
              subArrays[rowIndex][colIndex] !==
                sequence[sequence.length - 1][rowIndex][colIndex] &&
              sequence[sequence.length - 1][rowIndex][colIndex] !== 0
            ) {
              return true;
            }
          }
        }
        return false;
      };
      let conditionCounter = 0;

      let countList = [];
      const Checker = newNumber.map((item, index, array) => {
        if (item !== 1 && item !== 0) {
          array.slice(index).map((num, numIndex) => {
            if (num < item && num !== 0) {
              countList.push(num);
            }
          });
        } else {
          return null;
        }
      });

      const gameResult = () => {
        if (countList.length % 2 === 0 && countList.length !== 0) {
          while (conditionCounter < 1000 && conditionChecker() === true) {
            sequenceMaker();
            conditionCounter += 1;
            if (conditionCounter === 1000) {
              return null;
              break;
            }
          }
        } else {
          return null;
        }
      };

      const main = gameResult() !== null ? sequence : null;

      this.resultSetter(main);
    }
  };

  setNumber = (event) => {
    this.setState({
      number: event.target.value,
      isCreateBtn: false,
    });
  };

  render() {
    const checkValidUser = JSON.parse(localStorage.getItem("userDetails"));

    if (checkValidUser === null) {
      return <Navigate to="/signup" />;
    }
    const { N, isCreateBtn, userPuzzleList, superPuzzle, number, result } =
      this.state;

    return (
      <div className="game-main-container">
        <h1 className="game-main-heading">Super Puzzle</h1>
        <img
          src="https://res.cloudinary.com/dy0mnmvem/image/upload/v1671877536/super-puzzle/10780710_19198684_yzdx86.jpg"
          alt="puzzle-img"
          className="puzzle-img-style"
        />
        <label htmlFor="N" className="game-n-label">
          Enter the Nth value:
        </label>

        <input
          type="text"
          placeholder="Enter the N  ex: 4"
          className="game-n-input-field"
          value={N}
          onChange={this.setN}
          id="N"
        />
        <div className="game-exclamation-icon">
          <BsPatchExclamationFill size={17} />
          <p className="game-n-refer">
            N refers to N x N List/Array
            <br />
            {`(Positive Integer)`}
          </p>
        </div>

        <label htmlFor="puzzle-list" className="game-puzzle-label">
          Shuffled Puzzle
        </label>
        <input
          id="puzzle-list"
          type="text"
          value={number}
          onChange={this.setNumber}
          className="game-puzzle-input"
          placeholder="Ex: 1, 5, 2, 0, 3, 4, 6, 7, 8"
        />
        <div className="game-exclamation-icon">
          <BsPatchExclamationFill size={17} />
          <p className="game-n-refer">
            Make sure all the number from
            <br /> {`the range 0 - (N * N - 1)`}
          </p>
        </div>

        <button
          type="button"
          onClick={this.setIsCreateBtn}
          className="game-create-table-btn"
        >
          Create Table
        </button>
        {isCreateBtn ? (
          <UserInputTable num={parseInt(N)} userPuzzleList={userPuzzleList} />
        ) : (
          <p>
            Please enter the Nth value and Range then click Create Table button
          </p>
        )}
        {isCreateBtn ? (
          <>
            <button className="solve-btn" onClick={this.solvePuzzle}>
              Solve
            </button>
            <hr />
          </>
        ) : null}
        {typeof result === "object" &&
          result !== "" &&
          result !== null &&
          isCreateBtn && (
            <ul className="game-move-table">
              {result.map((each, index) => (
                <li key={index}>
                  <h1 className="game-move-heading">Move{index + 1}</h1>
                  <GameResult solvedList={each} num={parseInt(N)} />
                </li>
              ))}
            </ul>
          )}
        {result === null && isCreateBtn && <h1>null</h1>}
      </div>
    );
  }
}
