import React, { useState, useEffect } from "react";
import axios from "axios";

function Transactions() {
  const [acc_name_from, setAcc_name_from] = useState("");
  const [acc_no_from, setAcc_no_from] = useState("");
  const [acc_name_to, setAcc_name_to] = useState("");
  const [acc_no_to, setAcc_no_to] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentOption, setPaymentOption] = useState("Transfer Now");
  const [time, setTime] = useState("");

  // const user = "ASD";
  // const user_acc_no = 123323;

  const API = "http://localhost:8000/home/transactions/";
  const token = localStorage.getItem("accessToken");
  
  const handleTransfer = async () => {
    try {
      const res = await axios.post(
        API,
        {
          acc_name_from: acc_name_from,
          acc_no_from: acc_no_from,
          acc_name_to: acc_name_to,
          acc_no_to: acc_no_to,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Trnasaction created:", res.data);
    } catch (err) {
      console.error("Error creating Transaction:", err);
    }
  };

  useEffect(() => {
    
    handleTransfer();
  }, []);

  return (
    <>
      <h1>Transactions</h1>

      <input
        type="name"
        name="name"
        placeholder="name"
        value={acc_name_from}
        onChange={(e) => setAcc_name_from(e.target.value)}
      />
      <br />
      <input
        type="number"
        name="acc_no"
        placeholder="acc_no"
        value={acc_no_from}
        onChange={(e) => setAcc_no_from(e.target.value)}
      />
      <br />
      <input
        type="name"
        name="name"
        placeholder="name"
        value={acc_name_to}
        onChange={(e) => setAcc_name_to(e.target.value)}
      />
      <br />
      <input
        type="number"
        name="acc_no"
        placeholder="acc_no"
        value={acc_no_to}
        onChange={(e) => setAcc_no_to(e.target.value)}
      />
      <br />
      <input
        type="amount"
        name="amount"
        placeholder="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />

      <div>
        <select
          value={paymentOption}
          onChange={(e) => setPaymentOption(e.target.value)}
        >
          <option value="Transfer Now">Transfer Now</option>
          <option value="Schedule Payment">Schedule Payment</option>
        </select>
        <p>Selected Payment Option: {paymentOption}</p>
      </div>

      {paymentOption === "Schedule Payment" ? (
        <input
          name="time"
          placeholder="duration in minute"
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      ) : null}

      <br />
      <button onClick={handleTransfer}>Transfer</button>
    </>
  );
}

export default Transactions;
