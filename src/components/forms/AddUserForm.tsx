import React, { useState } from 'react';

interface NewUserFormProps {
    onSubmit: (user: { email: string, password: string }) => void;
}

const AddUserForm: React.FC<NewUserFormProps> = ({ onSubmit }) => {
    const [newUser, setNewUser] = useState<{ email: string, password: string }>({ email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser(prevNewUser => ({ ...prevNewUser, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newUser);
        setNewUser({ email: '', password: '' });
    };

    return (
        <form onSubmit={handleFormSubmit} className='p-6 border rounded-2xl shadow-sm flex flex-col gap-2 w-1/2'>
            <div className='flex flex-col gap-1'>
                <label className='text-sm font-semibold'>Email</label>
                <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    className='border rounded p-2 text-sm'
                    required
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-sm font-semibold'>Password</label>
                <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    className='border rounded p-2 text-sm'
                    required
                />
            </div>
            <button type="submit" className="mt-4 w-full bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">Add User</button>
        </form>
    );
};

export default AddUserForm;
