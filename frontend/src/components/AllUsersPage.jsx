import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  useEffect(() => {
    fetchUsers(currentPage, perPage);
  }, [currentPage, perPage]);

  const fetchUsers = (page, perPage) => {
    axios
      .get(`/api/users?page=${page}&per_page=${perPage}`, {
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
          setUsers(data);
          setLastPage(response.data.meta.last_page); // Assuming you use a meta field to provide pagination info
        }
      });
  };

  function handleCheckboxCheck(e) {
    const { value, checked } = e.target;
    let newSelectedUsers = selectedUsers.slice();

    console.log(newSelectedUsers);
    if (checked) {
      newSelectedUsers.push(value);
    } else {
      const index = newSelectedUsers.indexOf(value);
      if (index > -1) {
        newSelectedUsers.splice(index, 1);
      }
    }

    setSelectedUsers(newSelectedUsers);
  }

  const handleDeleteSelected = () => {
    const authToken = window.sessionStorage.getItem("auth_token");
    const data = { ids: selectedUsers };

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/api/usersdestroymultiple",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      data: data,
    };

    axios.request(config).then((response) => {
      console.log("Deleted users:", JSON.stringify(response.data));
      fetchUsers(currentPage, perPage); // Refresh the current page
    });
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when perPage changes
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button onClick={handleDeleteSelected} className="btn btn-danger">
          Delete Selected Users
        </button>
        <div>
          <label htmlFor="perPage" className="me-2">
            Users per page:
          </label>
          <select
            id="perPage"
            value={perPage}
            onChange={handlePerPageChange}
            className="form-select"
          >
            {[10, 20, 30, 40, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.role !== "Administrator" && (
                  <input
                    type="checkbox"
                    value={user.id}
                    onChange={handleCheckboxCheck}
                  />
                )}
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination d-flex align-items-center justify-content-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="btn btn-sm btn-primary me-3"
        >
          Previous
        </button>
        <span className="mx-2">
          {" "}
          Page {currentPage} of {lastPage}{" "}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === lastPage}
          className="btn btn-sm btn-primary ms-3"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
