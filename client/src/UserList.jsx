import React, { useEffect, useState } from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState({ loading: true, error: "" });

    useEffect(() => {
        fetch("http://localhost:5000/api/users/")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json();
            })
            .then(setUsers)
            .catch((err) => setStatus({ loading: false, error: err.message }))
            .finally(() => setStatus((s) => ({ ...s, loading: false })));
    }, []);

    if (status.loading) return <div className="p-6">Loading...</div>;
    if (status.error) return <div className="p-6 text-red-500">Error: {status.error}</div>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Users List</h2>
            <table className="w-full bg-white border rounded shadow">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, i) => (
                        <tr key={u._id || u.id} className={i % 2 ? "bg-gray-50" : ""}>
                            <td className="py-2 px-4">{u.name}</td>
                            <td className="py-2 px-4">{u.email}</td>
                            <td className="py-2 px-4">{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
