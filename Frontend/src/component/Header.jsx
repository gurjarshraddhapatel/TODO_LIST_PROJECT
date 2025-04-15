import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post('https://todo-list-project-ydmi.onrender.com/users/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem("token");
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (
        <>
            <main>
                <header>
                    <nav>
                        <div className="dropdown-wrapper">
                            <input
                                type="checkbox"
                                id="dropdown-toggle"
                                className="dropdown-toggle"
                            />
                            <label htmlFor="dropdown-toggle" className="dropdown-label" />
                            <div className="dropdown-menu dropdown-menu--display shadow">
                                <div className="upper-triangle shadow" />
                                <ul className="dropdown-list">
                                    <li onClick={handleLogout}>
                                      
                                        <span className='logout-text'><i className="fa-solid fa-right-from-bracket mx-1"></i>Logout</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </main>
        </>
    );
};

export default Header;