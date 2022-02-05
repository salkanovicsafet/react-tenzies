import Die from "./components/Die";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice);
  const [won, setWon] = useState(false);

  function randomiseDie() {
    return Math.ceil(Math.random() * 6);
  }

  function handleClick() {
    if (won) {
      setWon(false);
      setDice(allNewDice());
      return;
    }
    let newDice = dice.map((x) => {
      if (!x.isHeld) {
        x.value = randomiseDie();
        return x;
      } else return x;
    });
    setDice(newDice);
    let win = 0;
    let prevValue = dice[0].value;
    for (let i = 0; i < 10; i++) {
      if (dice[i].value === prevValue) win++;
      else break;
    }
    if (win === 10) {
      setWon(true);
    }
  }

  function toggleHold(id) {
    let newDice = dice.map((x) => {
      if (x.id === id) {
        x.isHeld = !x.isHeld;
        return x;
      } else return x;
    });
    setDice(newDice);
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: randomiseDie(),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  const diceElements = dice.map((x) => (
    <Die
      value={x.value}
      key={x.id}
      id={x.id}
      isHeld={x.isHeld}
      toggleHold={toggleHold}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice">{diceElements}</div>
      <button onClick={handleClick} className="roll--btn">
        {won ? "New game" : "Roll"}
      </button>
      {won ? <Confetti /> : null}
    </main>
  );
}
