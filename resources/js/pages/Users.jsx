import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../services/api";
import "../styles/page.css";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");        // kosong
    const [password, setPassword] = useState("");  // kosong
    const [role, setRole] = useState("customer");  // default customer

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data);
        } catch (err) {
            console.error(err);
            setUsers([]);
        }
    };

    const addUser = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Add New User",
            html:
                '<input id="swal-name" class="swal2-input" placeholder="Full Name">' +
                '<input id="swal-email" class="swal2-input" type="email" placeholder="Email">' +
                '<input id="swal-password" class="swal2-input" type="password" placeholder="Password">' +
                '<select id="swal-role" class="swal2-input">' +
                '<option value="admin">Admin</option>' +
                '<option value="customer" selected>Customer</option>' +
                '</select>',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Add",
            preConfirm: () => {
                const name = document.getElementById("swal-name").value;
                const email = document.getElementById("swal-email").value;
                const password = document.getElementById("swal-password").value;
                const role = document.getElementById("swal-role").value;

                if (!name || !email || !password) {
                    Swal.showValidationMessage("Please fill all required fields");
                    return null;
                }
                return { name, email, password, role };
            },
        });

        if (formValues) {
            try {
                await api.post("/users", formValues);
                Swal.fire("Added!", `User ${formValues.name} added successfully`, "success");
                fetchUsers();
            } catch (err) {
                Swal.fire("Error", "Failed to add user", "error");
            }
        }
    };

    const editUser = async (user) => {
        const { value: formValues } = await Swal.fire({
            title: "Edit User",
            html:
                `<input id="swal-name" class="swal2-input" placeholder="Full Name" value="${user.name}">` +
                `<input id="swal-email" class="swal2-input" type="email" placeholder="Email" value="${user.email}">` +
                `<select id="swal-role" class="swal2-input">
                    <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
                    <option value="customer" ${user.role === "customer" ? "selected" : ""}>Customer</option>
                </select>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Update",
            preConfirm: () => {
                const name = document.getElementById("swal-name").value;
                const email = document.getElementById("swal-email").value;
                const role = document.getElementById("swal-role").value;
                if (!name || !email) {
                    Swal.showValidationMessage("Please fill all required fields");
                    return null;
                }
                return { name, email, role };
            },
        });

        if (formValues) {
            try {
                await api.put(`/users/${user.id}`, formValues);
                Swal.fire("Updated!", `User ${formValues.name} updated successfully`, "success");
                fetchUsers();
            } catch (err) {
                Swal.fire("Error", "Failed to update user", "error");
            }
        }
    };

    const deleteUser = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/users/${id}`);
                Swal.fire("Deleted!", "User has been deleted.", "success");
                fetchUsers();
            } catch (err) {
                Swal.fire("Error", "Failed to delete user", "error");
            }
        }
    };

    return (
        <div className="page">
            <h2 className="page-title">User Management</h2>

            <button className="btn-primary" onClick={addUser}>
                + Add User
            </button>

            <div className="table-card" style={{ marginTop: "20px" }}>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((u, index) => (
                                <tr key={u.id}>
                                    <td>{index + 1}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email ?? "-"}</td>
                                    <td>Hash</td>
                                    <td>
                                        <span className={`badge ${u.role}`}>{u.role}</span>
                                    </td>
                                    <td className="action-cell">
                                        <button className="icon-btn edit" onClick={() => editUser(u)} title="Edit">
                                            <FaEdit />
                                        </button>
                                        <button className="icon-btn delete" onClick={() => deleteUser(u.id)} title="Hapus">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    No users
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
