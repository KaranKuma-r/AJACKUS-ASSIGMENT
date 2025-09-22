import React from "react";

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.department || "N/A"}</td>
            <td className="actions">
              <button className="btn btn-edit" onClick={() => onEdit(user)}>
                Edit
              </button>
              <button className="btn btn-delete" onClick={() => onDelete(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
