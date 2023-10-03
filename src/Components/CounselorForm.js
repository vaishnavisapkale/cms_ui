

import React, { useState } from 'react';
import axios from 'axios';
import './CounselorForm.css'; 

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1111', 
});

function CounselorForm() {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        dailyDemo: '',
        weeklyDemo: '',
        callyzerReport: '',
        talkTime: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/counselors/save', formData);

            if (response.status === 200) {
                alert('Data submitted successfully!');
                setFormData({
                    name: '',
                    date: '',
                    dailyDemo: '',
                    weeklyDemo: '',
                    callyzerReport: '',
                    talkTime: '',
                });
            } else {
                alert('Error submitting data.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error submitting data.');
        }
    };

    return (
        <div className="form-container">
            <h2>Submit Counselor Data</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Daily Demo:</label>
                    <input
                        type="number"
                        name="dailyDemo"
                        value={formData.dailyDemo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Weekly Demo:</label>
                    <input
                        type="number"
                        name="weeklyDemo"
                        value={formData.weeklyDemo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Callyzer Report:</label>
                    <input
                        type="number"
                        name="callyzerReport"
                        value={formData.callyzerReport}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Talk Time:</label>
                    <input
                        type="number"
                        name="talkTime"
                        value={formData.talkTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default CounselorForm;
