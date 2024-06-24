// AllUsersPage.jsx
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
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/users/multiple',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${authToken}`, 
      'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log("Deleted users:", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error("There was an error deleting the users!", error);
    });

    // axios
    //   .delete("/api/users", {
    //     headers: {
    //       Authorization: `Bearer ${authToken}`,
    //       "Content-Type": "application/json",
    //     },
    //     data: {
    //       ids: selectedUsers,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Deleted users:", response.data);
    //     setUsers((prevUsers) =>
    //       prevUsers.filter((user) => !selectedUsers.includes(user.id))
    //     );
    //     setSelectedUsers([]);
    //   });
  };

  return (
    <div className="container">
      <button onClick={handleDeleteSelected}>Delete Selected Users</button>
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
    </div>
  );
};

export default AllUsers;
