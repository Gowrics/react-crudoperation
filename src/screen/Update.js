import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Update = () => {
   // const [data, setData] = useState([]);
    const { id } = useParams(); // Extracting 'id' from URL

    const [values,setValues]= useState({
        id:'',
        name:'',
        username:'',
        email:'',
        phone:'',
        location:''
    });

const navigate =useNavigate();
    
useEffect(() => {
  axios.get('http://localhost:8003/Careers/' + id)
    .then(res => {
      console.log('Fetched Data:', res.data);  // Log fetched data
      setValues(res.data);
    })
    .catch(err => console.log('Error fetching data:', err));
}, [id]);

const handleUpdate = (event) => {
    event.preventDefault();

    axios.put('http://localhost:8003/Careers/'+id, values)
    .then(res => {
        console.log('Update Success:', res.data);  // Log response
        navigate('/');  // Redirect on success
    })
    .catch(err => {
        console.error('Error in update:', err);  // Log error
        alert('Error occurred while updating. Please try again.');  // Show user-friendly message
    });
}
    
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>     
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
        <div className='me-2 '>
                <label htmlFor='id'>Id:</label>
                <input type='text' name='id' className='form-control' placeholder='Enter Id' value={values.id}
                  onChange={e=>setValues({...values,id:e.target.value})}/>
            </div>

            <div className='me-2 '>
                <label htmlFor='name'>Name:</label>
                <input type='text' name='name' className='form-control' placeholder='Enter Name' value={values.name}
                 onChange={e=>setValues({...values,name:e.target.value})}/>
            </div>
            <div className='me-2'>
                <label htmlFor='username'>User Name:</label>
                <input type='text' name='username' className='form-control' placeholder='Enter UserName' value={values.username}
                 onChange={e=>setValues({...values,username:e.target.value})}/>
            </div>
            <div className='me-2'>
                <label htmlFor='email'>Email:</label>
                <input type='email' name='email' className='form-control' placeholder='Enter Email' value={values.email}
                 onChange={e=>setValues({...values,email:e.target.value})}/>
            </div>
            <div className='me-3'>
                <label htmlFor='phone'>Phone:</label>
                <input type='text' name='phone' className='form-control' placeholder='Enter Phone Number' value={values.phone}
                  onChange={e=>setValues({...values,phone:e.target.value})}/>
            </div>
            <div className='me-3'>
                <label htmlFor='location'>Location:</label>
                <input type='text' name='location' className='form-control' placeholder='Enter Location' value={values.location}
                  onChange={e=>setValues({...values,location:e.target.value})}/>
            </div>
            <button className='btn btn-success mt-3'>Update</button>
            <Link to="/" className='btn btn-primary ms-3 mt-3' >Back</Link>
        </form>
        </div>
    </div>
  )
}

export default Update