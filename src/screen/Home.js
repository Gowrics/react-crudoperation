import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);        // State for fetched data
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredData, setFilteredData] = useState([]); // State for filtered data

    useEffect(() => {
        axios.get('http://localhost:8003/Careers') // Fetch data from JSON db
            .then(res => {
                setData(res.data);
                setFilteredData(res.data); // Set initial filtered data
            })
            .catch(err => console.log(err));
    }, []);

const handleDelete = (id) => {
    const confirmDelete = window.confirm("Would you like to delete?");
    if (confirmDelete) {
        console.log("Attempting to delete user with ID:", id);
        axios.delete(`http://localhost:8003/Careers/${id}`)
            .then(res => {
                console.log("Deleted:", res.data); // Log the response
                // Update the states to remove the deleted user
                const newData = data.filter(item => item.id !== id);
                setData(newData);
                setFilteredData(newData);
            })
            .catch(err => console.error("Error deleting user:", err));
    }
};

    // Handle search input change and filter the data
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        // Filter data based on search criteria
        const filtered = data.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.username.toLowerCase().includes(query) ||
            item.email.toLowerCase().includes(query) ||
            item.phone.includes(query) ||
            item.location.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1>List Of Users</h1>
            <div className='w-100 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-between mb-3'>
                    <div className='d-flex justify-content-start w-100 mb-3'>
                        <input
                            type="text"
                            className="form-control w-50"
                            placeholder="Search by Name, Username, Email, Phone, or Location"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <Link to='/create' className='btn btn-success ms-5'>Add +</Link>
                    </div>
                </div>
                <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>USERNAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>LOCATION</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData.length > 0 ? (
                                    filteredData.map((d) => (
                                        <tr key={d.id}>
                                            <td>{d.id}</td>
                                            <td>{d.name}</td>
                                            <td>{d.username}</td>
                                            <td>{d.email}</td>
                                            <td>{d.phone}</td>
                                            <td>{d.location}</td>
                                            <td>
                                                <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                                                <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                                <button onClick={() => handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No users found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
