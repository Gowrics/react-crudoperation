import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import 'Link' from 'react-router-dom'

const Read = () => {
  const [data, setData] = useState([]);
  const { id } = useParams(); // Extracting 'id' from URL

  useEffect(() => {
    axios.get('http://localhost:8001/Careers/' + id)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id]); // Add 'id' to the dependency array

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-100 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h3>Details of User</h3>
        <div className='mb-2'>
          <strong>ID: {data.id}</strong>
        </div>
        <div className='mb-2'>
          <strong>Name: {data.name}</strong>
        </div>
        <div className='mb-2'>
          <strong>Username: {data.username}</strong>
        </div>
        <div className='mb-2'>
          <strong>Email: {data.email}</strong>
        </div>
        <div className='mb-2'>
          <strong>Phone: {data.phone}</strong>
        </div>
        <div className='mb-2'>
          <strong>Location: {data.location}</strong>
        </div>

        {/* Use Link from React Router for navigation */}
        <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
        <Link to="/" className='btn btn-primary ms-3'>Back</Link>
      </div>
    </div>
  );
}

export default Read;
