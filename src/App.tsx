import React, { useEffect, useState } from "react";
import "./App.css";
import LetterCounter from "./components/LetterCounter";
import PlayerInput from "./components/PlayerInput";
import Table from "./components/Table";
import WordsList from "./utils/words.json";

function App() {
  const [row, setRow] = useState(0);
  const [wordSelected, setWordSelected] = useState<string>("");
  const [playerInputValue, setPlayerInputValue] = useState<string>("");
  const [reloadGame, setReloadGame] = useState(false);
  const [counterLetter, setCounterLetter] = useState<Array<string>>([]);

  useEffect(() => {
    const words: Array<string> = WordsList;
    const wordPostion: number = Math.floor(Math.random() * words.length);
    setWordSelected(words[wordPostion]);
  }, [reloadGame]);

  const onChangePlayerInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const word = event.target.value.replace(" ", "").toLowerCase();
    setPlayerInputValue(word);

    // set value to row in table
    const rowElement = document.getElementsByClassName("row")[row];
    Array.from(rowElement.children).forEach((column, index) => {
      column.innerHTML = Array.from(word)[index] || "";
    });
  };

  const onSubmit = () => {
    if (playerInputValue.length === 5) {
      const wordSelectedAsArray = Array.from(wordSelected);
      const playerInputValueAsArray = Array.from(playerInputValue);
      const rowElement = document.getElementsByClassName("row")[row];
      const columns = rowElement.children as HTMLCollectionOf<HTMLElement>;

      playerInputValueAsArray.forEach((letter, pivLetterIndex) => {
        if (wordSelectedAsArray[pivLetterIndex] === letter) {
          columns[pivLetterIndex].style.backgroundColor = "#6aa964";
          columns[pivLetterIndex].style.color = "#fff";
          columns[pivLetterIndex].style.border = "none";
        } else if (wordSelectedAsArray.includes(letter)) {
          columns[pivLetterIndex].style.backgroundColor = "#c9b458";
          columns[pivLetterIndex].style.color = "#fff";
          columns[pivLetterIndex].style.border = "none";
        } else {
          columns[pivLetterIndex].style.backgroundColor = "#787c7e";
          columns[pivLetterIndex].style.color = "#fff";
          columns[pivLetterIndex].style.border = "none";

          if (!counterLetter.includes(letter)) {
            const letterElement = document.createElement("div");
            letterElement.innerHTML = letter;
            document
              .getElementById("letter-counter")
              ?.appendChild(letterElement);
            const counterLetterAux = counterLetter;
            counterLetterAux.push(letter);
            // counterLetterAux.sort((a: string, b: string) => (a > b ? 1 : -1));
            setCounterLetter(counterLetterAux);
          }
        }
      });
      if (wordSelected === playerInputValue) {
        alert("Congrats, you won!");
        setReloadGame(!reloadGame);
        setRow(0);
      } else {
        setRow(row + 1);
      }
      setPlayerInputValue("");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Wordle by <a href="https://github.com/Guuri11" target="_blank" className="text-blue" rel="noreferrer">Guuri11</a></h1>
      <div className="flex justify-center">
        <Table />
      </div>
      <PlayerInput
        onChangePlayerInput={onChangePlayerInput}
        playerInputValue={playerInputValue}
        onSubmit={onSubmit}
      />
      <LetterCounter />
    </div>
  );
}

export default App;
