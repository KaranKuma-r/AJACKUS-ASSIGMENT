import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/userApi";
import Header from "../components/header";
import UserTable from "../components/userTabel";
import UserForm from "../components/userForm";
import FilterPopup from "../components/filterPopup";
import Pagination from "../components/paginantion";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      const dataWithDept = data.map((u) => ({ ...u, department: "General" }));
      setUsers(dataWithDept);
      setFilteredUsers(dataWithDept);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddEdit = (user) => {
    if (editingUser) {
      const updatedUsers = users.map((u) =>
        u.id === editingUser.id ? { ...u, ...user } : u
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } else {
      const newUser = { ...user, id: users.length + 1 };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((u) => u.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleFilter = (filters) => {
    let filtered = [...users];
    if (filters.name) {
      filtered = filtered.filter((u) =>
        u.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.email) {
      filtered = filtered.filter((u) =>
        u.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.department) {
      filtered = filtered.filter((u) =>
        (u.department || "")
          .toLowerCase()
          .includes(filters.department.toLowerCase())
      );
    }
    setFilteredUsers(filtered);
    setPage(1);
  };

  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return (
    <div className="container">
      <Header />

      <div className="toolbar">
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add User"}
        </button>

        <select
          className="select-limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          {[10, 25, 50, 100].map((l) => (
            <option key={l} value={l}>
              {l} / page
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleAddEdit}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}

      <FilterPopup onFilter={handleFilter} />

      <UserTable
        users={paginatedUsers}
        onEdit={(user) => {
          setEditingUser(user);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      <Pagination
        total={filteredUsers.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default UserManagement;
