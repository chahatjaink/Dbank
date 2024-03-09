import { useEffect, useState } from "react";
import { dbank_backend } from "declarations/dbank_backend";

function App() {
  const [inputAmount, setInputAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    setCurrentValue();
  }, []);

  async function setCurrentValue() {
    const value = await dbank_backend.getCurrentValue();
    const updatedValue = Math.round(value * 100) / 100;
    setCurrentAmount(updatedValue);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (inputAmount !== 0 || withdrawAmount !== 0) {
      await dbank_backend.topUp(inputAmount);
      await dbank_backend.withdraw(withdrawAmount);
      await dbank_backend.compound();
      setCurrentValue();
      setInputAmount(0);
      setWithdrawAmount(0);
    }
  }

  return (
    <div className="container">
      <img src="dbank_logo.png" alt="DBank logo" width="100" />
      <h1>
        Current Balance: $<span id="value">{currentAmount}</span>
      </h1>
      <div className="divider"></div>
      <form action="#" onSubmit={handleSubmit}>
        <h2>Amount to Top Up</h2>
        <input
          id="input-amount"
          type="number"
          step="0.01"
          min={0}
          name="topUp"
          value={inputAmount}
          onChange={(e) => setInputAmount(parseFloat(e.target.value))}
        />
        <h2>Amount to Withdraw</h2>
        <input
          id="withdrawal-amount"
          type="number"
          name="withdraw"
          step="0.01"
          min={0}
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
        />
        <input id="submit-btn" type="submit" value="Finalise Transaction" />
      </form>
    </div>
  );
}

export default App;
