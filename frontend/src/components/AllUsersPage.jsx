import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users", {
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
        }
      });
  }, []);

  const handleCheckboxChange = (e) => {
    const userId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }
  };

  const handleDeleteSelected = () => {
    const authToken = window.sessionStorage.getItem("auth_token");

    axios
      .delete("/api/users", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "auth_token"
          )}`,
          "Content-Type": "application/json",
        },
        data: {
          ids: selectedUsers,
        },
      })
      .then((response) => {
        console.log("Deleted users:", response.data);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => !selectedUsers.includes(user.id))
        );
        setSelectedUsers([]);
      });
  };
  return (
    <div className="container">
      <button
        onClick={handleDeleteSelected}
        disabled={selectedUsers.length === 0}
      >
        Delete All Selected Users
      </button>
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
                    onChange={handleCheckboxChange}
                    checked={selectedUsers.includes(user.id)}
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
    </div>
  );
};

export default AllUsers;
