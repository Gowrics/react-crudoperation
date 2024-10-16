import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Create = () => {
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    location: ''
  });

  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = { ...values };
    axios.post('http://localhost:8003/Careers', newUser)
      .then(res => {
        console.log(res);
        navigate('/'); // Navigate to the home route
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className='me-2'>
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
