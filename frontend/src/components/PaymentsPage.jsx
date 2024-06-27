import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentsPage = () => {
  const [awaitingPayments, setAwaitingPayments] = useState([]);
  const [completedPayments, setCompletedPayments] = useState([]);
  const userId = window.sessionStorage.getItem("id");
  // useEffect(() => {
  //   axios
  //     .get("/api/users", {
  //       headers: {
  //         Authorization: `Bearer ${window.sessionStorage.getItem(
  //           "auth_token"
  //         )}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("API response:", response.data);
  //       const data = response.data.data;
  //       if (Array.isArray(data)) {
  //         setUsers(data);
  //       }
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get("/api/payments", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "auth_token"
          )}`,
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        const data = response.data.data;
        if (Array.isArray(data)) {
          const filteredPayments = data.filter(
            (payment) => payment.payer_id === parseInt(userId)
          );
          const awaiting = filteredPayments.filter(
            (payment) => payment.status === "awaiting"
          );
          const completed = filteredPayments.filter(
            (payment) => payment.status === "completed"
          );
          setAwaitingPayments(awaiting);
          setCompletedPayments(completed);
        }
      });
  }, [userId]);

  const handlePay = (paymentId) => {
    const authToken = window.sessionStorage.getItem("auth_token");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:8000/api/payments/${paymentId}/pay`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios.request(config).then((response) => {
      console.log("Payment processed:", response.data);
      setAwaitingPayments((prev) =>
        prev.filter((payment) => payment.id !== paymentId)
      );
      setCompletedPayments((prev) => [...prev, response.data]);
    });
  };

  return (
    <div className="container">
      <h2>Awaiting Payments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {awaitingPayments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.payer_id}</td>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handlePay(payment.id)}
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Completed Payments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {completedPayments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.payer_id}</td>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsPage;
