import React, { useState, useEffect } from 'react';
import './stylee.css';
//import './main.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [daysInMonth, setDaysInMonth] = useState([]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const years = Array.from({ length: (2024 - 1924 + 1) }, (_, index) => 1924 + index);

    useEffect(() => {
        function updateDays() {
            const monthIndex = months.indexOf(month);
            const days = new Date(year, monthIndex + 1, 0).getDate();
            setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));
        }
        if (month && year) {
            updateDays();
        }
    }, [month, year]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signup/Login with:', email, username, password, month, date, year, acceptPolicy);
    };

    return (
        <div className="container">
            <div className="illu">
                <h1 class='illu__header'>Welcome to CAKE</h1>
                <img src="../img/castle.png" alt="Castle illustration" class='illu__img' />
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <span className='form__email'>Email</span>
                <input className="form__email-input" type="text" value={email} onChange={e => setEmail(e.target.value)} />

                <span className="form__user">Username</span>
                <input className="form__user-input" type="text" value={username} onChange={e => setUsername(e.target.value)} />

                <span className="form__password">Password</span>
                <input className="form__password-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />


                <select className='form__select' value={month} onChange={e => setMonth(e.target.value)}>
                    <option value="">Month</option>
                    {months.map((m, index) => <option key={index} value={m}>{m}</option>)}
                </select>
                <select className='form__select-1' value={date} onChange={e => setDate(e.target.value)}>
                    <option value="">Date</option>
                    {daysInMonth.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <select className='form__select-2' value={year} onChange={e => setYear(e.target.value)}>
                    <option value="">Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <label className="form__control">
                    <input type="checkbox" checked={acceptPolicy} onChange={e => setAcceptPolicy(e.target.checked)} />
                    I accept Cake's policy
                </label>

                <button type="submit" className="signup-btn">Sign up</button>
                <button type="button" className="login-btn" onClick={() => alert("Redirect to login")}>Already have an account? Log in</button>
            </form>
        </div>
    );
}

export default Login;
