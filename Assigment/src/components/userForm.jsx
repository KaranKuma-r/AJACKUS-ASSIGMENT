import React, { useState, useEffect } from "react";

export default function UserForm({ user, onSubmit, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", department: "" });

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Name and Email required");
    onSubmit(form);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="form-input"
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="form-input"
      />
      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        className="form-input"
      />
      <div className="form-buttons">
        <button type="submit" className="btn btn-submit">
          {user ? "Update" : "Add"}
        </button>
        <button type="button" onClick={onClose} className="btn btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
}
