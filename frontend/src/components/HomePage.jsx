import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [newExpense, setNewExpense] = useState({
    id: "",
    description: "",
    amount: "",
    paid_by: window.sessionStorage.getItem("id"),
    category_id: "",
    paid_on: "",
  });
  const [participants, setParticipants] = useState(["", "", "", ""]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryIDs, setCategoryIDs] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [users, setUsers] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({
    USD: null,
    GBP: null,
    CHF: null,
  });

  let navigate = useNavigate();

  const fetchCategories = () => {
    axios
      .get("/api/categories", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "auth_token"
          )}`,
        },
      })
      .then((response) => {
        console.log("API response (categories):", response.data);
        const data = response.data.data;
        setCategories(data);
        setCategoryIDs(data.map((category) => category.id));
        setCategoryNames(data.map((category) => category.name));
      });
  };

  const fetchUsers = () => {
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "auth_token"
          )}`,
        },
      })
      .then((response) => {
        console.log("API response (users):", response.data);
        setUsers(response.data.data);
      });
  };

  const fetchExpenses = () => {
    axios
      .get(`/api/expenses?paid_by=${window.sessionStorage.getItem("id")}`, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "auth_token"
          )}`,
        },
      })
      .then((response) => {
        console.log("API response (expenses):", response.data);
        setExpenses(response.data.data);
      });
  };


  const fetchExchangeRates = () => {
    axios
      .get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json")
      .then((response) => {
        console.log("API response (exchangeRates):", response.data);
        setExchangeRates({
          USD: response.data.eur.usd,
          GBP: response.data.eur.gbp,
          CHF: response.data.eur.chf,
        });
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchUsers();
    fetchExpenses();
    fetchExchangeRates();
  }, []);

  function handleInput(e) {
    const { name, value } = e.target;
    setNewExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  }

  function handleParticipantChange(e, index) {
    const { value } = e.target;
    setParticipants((prevParticipants) => {
      const newParticipants = [...prevParticipants];
      newParticipants[index] = value;
      return newParticipants;
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "/api/expenses",
        {
          description: newExpense.description,
          amount: newExpense.amount,
          paid_by: window.sessionStorage.getItem("id"),
          category_id: newExpense.category_id,
          paid_on: newExpense.paid_on,
          participants: participants.filter((p) => p),
        },
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem(
              "auth_token"
            )}`,
          },
        }
      )
      .then((res) => {
        const expenseId = res.data.data.id;
        participants.map((participantId) => {
          console.log(participantId);
        });
        const participantPromises = participants
          .filter((p) => p)
          .map((participantId) => {
            return axios.post(
              "/api/expenseParticipants",
              {
                expense_id: expenseId,
                user_id: participantId,
                paid_by: window.sessionStorage.getItem("id"),
                amount_to_refund:
                  newExpense.amount /
                  (participants.filter((p) => p).length + 1),
              },
              {
                headers: {
                  Authorization: `Bearer ${window.sessionStorage.getItem(
                    "auth_token"
                  )}`,
                },
              }
            );
          });

        const paymentPromises = participants
          .filter((p) => p)
          .map((participantId) => {
            return axios.post(
              "/api/payments",
              {
                payer_id: participantId,
                payee_id: window.sessionStorage.getItem("id"),
                expense_id: expenseId,
                amount:
                  newExpense.amount /
                  (participants.filter((p) => p).length + 1),
                payment_date: newExpense.paid_on,
                status: "awaiting",
              },
              {
                headers: {
                  Authorization: `Bearer ${window.sessionStorage.getItem(
                    "auth_token"
                  )}`,
                },
              }
            );
          });

        return Promise.all(participantPromises).then((participantResponses) => {
          const paymentPromises = participantResponses.map((response) => {
            const participant = response.data.data;
            return axios.post(
              "/api/payments",
              {
                payer_id: participant.user_id,
                payee_id: window.sessionStorage.getItem("id"),
                expense_id: participant.expense_id,
                amount: participant.amount_to_refund,
                payment_date: newExpense.paid_on,
                status: "awaiting",
              },
              {
                headers: {
                  Authorization: `Bearer ${window.sessionStorage.getItem(
                    "auth_token"
                  )}`,
                },
              }
            );
          });

          return Promise.all(paymentPromises);
        });
      })
      .then(() => {
        setNewExpense({
          description: "",
          amount: "",
          paid_by: window.sessionStorage.getItem("id"),
          category_id: "",
          paid_on: "",
        });
        setParticipants(["", "", "", ""]);
        navigate("/");
      });
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <div className="container wrapper mt-5 py-4 rounded">
      <div className="container mb-5">
        <div className="row new-expense">
          <div className="col-12 mb-4">
            <h3>Exchange Rates (EUR to):</h3>
            <p>USD: {exchangeRates.USD}</p>
            <p>GBP: {exchangeRates.GBP}</p>
            <p>CHF: {exchangeRates.CHF}</p>
          </div>
          <button
            type="button"
            className="expense-controls__btn btn btn-block mb-5"
            disabled={true}
          >
            Add Expense
          </button>
          <div className="col-11 new-expense__controls mt-5 mb-3 px-4 py-4 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-8 col-lg-4">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={newExpense.description}
                    onChange={handleInput}
                  />
                </div>
                <div className="col-md-4 col-lg-3">
                  <label htmlFor="category_id">Category</label>
                  <select
                    className="form-control"
                    id="category_id"
                    name="category_id"
                    value={newExpense.category_id}
                    onChange={handleInput}
                  >
                    <option value="">Select Category</option>
                    {categoryIDs.map((id, index) => (
                      <option key={id} value={id}>
                        {categoryNames[index]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 col-lg-3">
                  <label htmlFor="amount">Amount</label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">€</span>
                    </div>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      className="form-control"
                      id="amount"
                      name="amount"
                      value={newExpense.amount}
                      onChange={handleInput}
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-2">
                  <label htmlFor="paid_on">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="paid_on"
                    name="paid_on"
                    value={newExpense.paid_on}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12">
                  <label>Participants (max 4)</label>
                  {participants.map((participant, index) => (
                    <div key={index} className="input-group mb-3">
                      <select
                        className="form-control"
                        value={participant}
                        onChange={(e) => handleParticipantChange(e, index)}
                      >
                        <option value="">Select Participant</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-11 new-expense__actions px-4 py-3 mx-auto d-flex justify-content-end">
                <button type="button" className="expense-controls__btn btn">
                  Cancel
                </button>
                <button type="submit" className="expense-controls__btn btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container expenses">
        <div className="row chart flex-nowrap">
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((month) => (
            <div
              className="col bar d-flex flex-column justify-content-end"
              key={month}
            >
              <div
                className="col fill p-0 flex-grow-0"
                style={{ height: "100%", flexBasis: "auto" }}
              ></div>
              <div className="col p-0 flex-grow-0">
                <span>{month}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="expense-list mt-5">
          {expenses.map((expense, id) => (
            <div className="row mx-2 expense-item mb-4 py-1" key={id}>
              <div className="col-sm-3 col-md-2 p-3 d-none d-sm-block">
                <div className="col-3 col-sm-2 col-md-2 d-flex align-items-center justify-content-center">
                  <span className="expense-category">
                    {getCategoryName(expense.category_id)}
                  </span>
                </div>
              </div>
              <div className="col-9 col-sm-7 col-md-8 d-flex justify-content-center flex-column py-2">
                <h2 className="expense-title">{expense.description}</h2>
                <span className="expense-date">{expense.paid_on}</span>
              </div>
              <div className="col-3 col-sm-2 col-md-2 d-flex align-items-center justify-content-center">
                <span className="expense-amount">€{expense.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
