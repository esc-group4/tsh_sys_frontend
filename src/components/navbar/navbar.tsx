import React, { useState } from "react";
import './navbar.css';
import { useAuth } from "../../contexts/UserContext";
import currentuserImage from "../../assets/profile.jpg"

const NavBar: React.FC = () => {
    const [selected, setSelected] = useState(-1);
    const { userData } = useAuth()
    let navItems = ["others","others2"]

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-1">
                        {navItems.map((item, index) => (
                            <li
                                key={item}
                                className="nav-item"
                                onClick={() => setSelected(index)}
                            >
                                <a
                                    className={selected === index ? "nav-link active fw-bold" : "nav-link"}
                                    href="#"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="d-flex align-items-center">
                    <div className="text-end me-2">
                        <p className="curruserName mb-0">{userData?.name}</p>
                        <p className="curruserRole mb-0">{userData?.role}</p>
                    </div>
                    <img
                        src={currentuserImage}
                        width="60"
                        height="60"
                        className="d-inline-block align-center rounded-circle ms-2"
                        alt="User"
                    />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
