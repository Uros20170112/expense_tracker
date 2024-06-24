import React from "react";

const HomePage = () => {
  return (
    <div className="container wrapper mt-5 py-4 rounded">
      <div className="container mb-5">
        <div className="row new-expense">
          <button type="button" className="expense-controls__btn btn btn-block mb-5">
            Add Expense
          </button>
          <div className="col-11 new-expense__controls mt-5 mb-3 px-4 py-4 mx-auto">
            <form>
              <div className="row">
                <div className="col-md-8 col-lg-6">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" />
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
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <label htmlFor="date">Date</label>
                  <input type="date" className="form-control" id="date" />
                </div>
              </div>
            </form>
          </div>
          <div className="col-11 new-expense__actions px-4 py-3 mx-auto d-flex justify-content-end">
            <div>
              <button type="button" className="expense-controls__btn btn">
                Cancel
              </button>
              <button type="submit" className="expense-controls__btn btn">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container expenses">
        <div className="row chart flex-nowrap">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
            <div className="col bar d-flex flex-column justify-content-end" key={month}>
              <div className="col fill p-0 flex-grow-0" style={{ height: "100%", flexBasis: "auto" }}></div>
              <div className="col p-0 flex-grow-0">
                <span>{month}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="expense-list mt-5">
          {[
            { title: "RTX 3070", date: "16 March 2021", amount: "$900.45" },
            { title: "RTX 3070", date: "16 March 2021", amount: "$900.45" },
            { title: "RTX 3070", date: "16 March 2021", amount: "$900.45" },
          ].map((expense, index) => (
            <div className="row mx-2 expense-item mb-4 py-1" key={index}>
              <div className="col-sm-3 col-md-2 p-3 d-none d-sm-block">
                <button type="button" className="expense-category btn px-lg-3 py-3 ml-lg-3">
                  Category
                </button>
              </div>
              <div className="col-9 col-sm-7 col-md-8 d-flex justify-content-center flex-column py-2">
                <h2 className="expense-title">{expense.title}</h2>
                <span className="expense-date">{expense.date}</span>
              </div>
              <div className="col-3 col-sm-2 col-md-2 d-flex align-items-center justify-content-center">
                <span className="expense-amount">{expense.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
