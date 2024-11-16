import React, { useEffect, useState } from 'react';
import {UserInterface} from "../../interfaces/UserInterface";
import {UserService} from "../../services/UserService";
import AddUserForm from "../../components/forms/AddUserForm";

function AdminUsers() {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await UserService.getAll();
                setUsers(usersData);
                console.log(usersData);
            } catch (error) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [showForm]);

    const handleDelete = async (userId: number) => {
        try {
            console.log("delete");
            await UserService.delete(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            setError(`Failed to delete user with ID ${userId}`);
        }
    };

    const handleFormToggle = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };

    const handleAddUser = async (user: { email: string, password: string }) => {
        try {
            await UserService.add(user);
            //setUsers([...users, addedUser]);
            setShowForm(false);
        } catch (error) {
            setError('Failed to add new user');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='px-12 pb-6 flex justify-between items-start'>
            <table className="w-1/2 border-collapse text-left">
                <thead>
                <tr className="border-b text-sm font-semibold">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Роль</th>
                    <th className="px-4 py-2">Притулок</th>
                    <th className="px-4 py-2">Дії</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-2">{user.id}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'ADMIN' ? 'bg-black text-white' : 'bg-gray-200 text-black'
                        }`}
                    >
                        {user.role}
                    </span>

                        </td>
                        <td className="px-4 py-2">{user.shelter ? user.shelter.name : 'Немає притулку'}</td>
                        <td className="px-4 py-2">
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded hover:bg-gray-800"
                            >
                                Видалити
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='flex flex-col gap-2 items-end w-1/2'>
                <button onClick={handleFormToggle} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">Додати користувача</button>
                {showForm && <AddUserForm onSubmit={handleAddUser} />}
            </div>
        </div>
    );
};

export default AdminUsers;
