import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    paid_by: window.sessionStorage.getItem("id"),
    category_id: "",
    paid_on: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryIDs, setCategoryIDs] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

  let navigate = useNavigate();

  const getAllCategories = () => {
    return axios
      .get("/api/categories", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "auth_token"
          )}`,
        },
      })
      .then((response) => {
        console.log("API response (categories):", response.data);
        return response.data.data;
      });
  };

  const getAllExpenses = () => {
    return axios
      .get("/api/expenses?paid_by=" + window.sessionStorage.getItem("id"), {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "auth_token"
          )}`,
        },
      })
      .then((response) => {
        console.log("API response (expenses):", response.data);
        return response.data.data;
      });
  };

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data);
      setCategoryIDs(data.map((category) => category.id));
      setCategoryNames(data.map((category) => category.name));
    });

    getAllExpenses().then((data) => {
      setExpenses(data);
    });
  }, []);

  function handleInput(e) {
    const { name, value } = e.target;
    setNewExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
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
        console.log(res.data);
        if (res.data.success) {
          setNewExpense({
            description: "",
            amount: "",
            paid_by: window.sessionStorage.getItem("id"),
            category_id: "",
            paid_on: "",
          });
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
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
                      <span className="input-group-text">$</span>
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
                <span className="expense-amount">${expense.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
