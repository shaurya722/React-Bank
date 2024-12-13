import React, { useState, useEffect } from "react";
import axios from "axios";

function Acc() {
  const API = "http://localhost:8000/home/accounts/";
  const token = localStorage.getItem("accessToken");

  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  const [acc_type, setAcc_type] = useState('');
  const [paymentOption, setPaymentOption] = useState('withdraw'); 

  // Fetch customer data on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res); // Log the full response

        setCustomers(res.data); // Set customers in state
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Error fetching customers");
      }
    };

    fetchCustomers();
  }, []);

  const handleDeposit = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/home/deposit/',
        {
          account: acc_type,
          amount: amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Deposit created:', res.data);
    } catch (err) {
      console.error('Error creating deposit:', err);
    }
  };

  const handleWithdraw = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/home/withdraw/',
        {
          account: acc_type,
          amount: amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Withdraw created:', res.data);
    } catch (err) {
      console.error('Error creating withdraw:', err);
    }
  };

  return (
    <>
      <div>
        <h3>Accounts:</h3>
        {customers && customers.length > 0 ? (
          <ul>
            {customers.map((customer,i) => (
              <li key={i}>
                <h3>id: {customer.id}</h3>
                <h2>Account Type: {customer.account_type}</h2>
                <p>Balance: {customer.balance}</p>
                <p>Bank: {customer.bank}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No customers available.</p>
        )}
      </div>

      <div>
        <div>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
          >
            <option value="withdraw">Withdraw</option>
            <option value="deposit">Deposit</option>
          </select>
          <p>Selected Payment Option: {paymentOption}</p>
        </div>

        <input 
          type="number" 
          name="acc_type" 
          placeholder="Which account ID" 
          value={acc_type} 
          onChange={(e) => setAcc_type(e.target.value)} 
        />
        <br />
        <input 
          type="number" 
          name="amount" 
          placeholder="Enter the amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />
        <br />
        <br />
        {paymentOption === "deposit" ? (
          <button onClick={handleDeposit}>Deposit</button>
        ) : (
          <button onClick={handleWithdraw}>Withdraw</button>
        )}
      </div>
    </>
  );
}

export default Acc;
