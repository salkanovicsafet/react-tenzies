import Die from "./components/Die";
import { useState } from "react";

export default function App() {
  const [dice, setDice] = useState(allNewDice);

  function handleClick() {
    setDice(allNewDice());
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  const diceElements = dice.map((x) => <Die value={x} />);

  return (
    <main>
      <div className="dice">{diceElements}</div>
      <button onClick={handleClick} className="roll--btn">
        Roll
      </button>
    </main>
  );
}
