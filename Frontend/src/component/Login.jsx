import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://todo-list-project-ydmi.onrender.com/users/login', {
                email,
                password,
            });
            const token = response.data.accessToken;
            localStorage.setItem("token", token)
            console.log("Auth Token:", token)

            setMessage(response.data.message)

            Swal.fire({
                title: 'Success!',
                text: 'You have logged in successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/dashboard')
            });

            if (response.data.success) {
                navigate('/');
            }
        } catch (error) {
            setMessage(error.response.data.message);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
                <form className="col-md-9" onSubmit={handleLogin}>
                    <div className="AppForm  shadow-lg">
                        <div className="row">
                            <div className="col-md-6 d-flex justify-content-center align-items-center">
                                <div className="AppFormLeft">
                                    <h1 className='text-center pb-4'>User  Login</h1>
                                    <div className="form-group position-relative mb-4">
                                        <input
                                            type="text"
                                            className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                                            id="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <i className="fa fa-user px-3" />
                                    </div>
                                    <div className="form-group position-relative mb-4">
                                        <input
                                            type="password"
                                            className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <i className="fa fa-key px-3" />
                                    </div>

                                    <button className="btn btn-success btn-block shadow w-100 border-0 py-2 text-uppercase ">
                                        Login
                                    </button>
                                    <p className="text-center mt-3">
                                        Don't have an account?
                                        <span><Link to="/register" className='text-primary'> Create your account</Link></span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                                    <h2 className="position-relative px-4 pb-3 mb-4">Welcome to User Login </h2>
                                    <p>
                                        Lorem ipsuing elit. Molomos totam est voluptatum i omos totam
                                        est voluptatum i ure sit consectetur ill
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;