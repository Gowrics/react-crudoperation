import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
    const [values, setValues] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        location: ''
    });
    const [lastId, setLastId] = useState(0); // State to hold the last ID
    const navigate = useNavigate();

    // Fetch existing users to get the last ID
    useEffect(() => {
        axios.get('http://localhost:8001/Careers')
            .then(res => {
                const users = res.data;
                // Calculate the last ID
                const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
                setLastId(maxId); // Set the last ID in state
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            ...values,
            id: lastId + 1 // Set the new user's ID to the last ID + 1
        };

        axios.post('http://localhost:8001/Careers', newUser)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Add a User</h1>
                <form onSubmit={handleSubmit}>
                    <div className='me-2 '>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' className='form-control' placeholder='Enter Name'
                            onChange={e => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div className='me-2'>
                        <label htmlFor='username'>User Name:</label>
                        <input type='text' name='username' className='form-control' placeholder='Enter UserName'
                            onChange={e => setValues({ ...values, username: e.target.value })} />
                    </div>
                    <div className='me-2'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' name='email' className='form-control' placeholder='Enter Email'
                            onChange={e => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className='me-3'>
                        <label htmlFor='phone'>Phone:</label>
                        <input type='text' name='phone' className='form-control' placeholder='Enter Phone Number'
                            onChange={e => setValues({ ...values, phone: e.target.value })} />
                    </div>
                    <div className='me-3'>
                        <label htmlFor='location'>Location:</label>
                        <input type='text' name='location' className='form-control' placeholder='Enter Location'
                            onChange={e => setValues({ ...values, location: e.target.value })} />
                    </div>

                    <button className='btn btn-success mt-3'>Submit</button>
                    <Link to="/" className='btn btn-primary ms-3 mt-3'>Back</Link>
                </form>
            </div>
        </div>
    );
}

export default Create;
