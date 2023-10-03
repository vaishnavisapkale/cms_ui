

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1111', 
});

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
};

const thStyle = {
    background: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
    cursor: 'pointer',
};

const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ccc',
};

function CounselorTable() {
    const [counselors, setCounselors] = useState([]);
    const [sortedCounselors, setSortedCounselors] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchCounselors();
    }, []);

    const fetchCounselors = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:1111/counselors/getall');

            if (response.status === 200) {
                setCounselors(response.data);
                setSortedCounselors([...response.data]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        const sortedData = [...sortedCounselors].sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return newSortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });

        setSortedCounselors(sortedData);
    };

    return (
        <div>
            <h2>Counselor Data</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle} onClick={handleSort}>
                            Counselor Name {sortOrder === 'asc' ? '▲' : '▼'}
                        </th>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Daily Demo</th>
                        <th style={thStyle}>Weekly Demo</th>
                        <th style={thStyle}>Callyzer Report</th>
                        <th style={thStyle}>Talk Time</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCounselors.map((counselor) => (
                        <tr key={counselor.id}>
                            <td style={tdStyle}>{counselor.name}</td>
                            <td style={tdStyle}>{counselor.date}</td>
                            <td style={tdStyle}>{counselor.dailyDemo}</td>
                            <td style={tdStyle}>{counselor.weeklyDemo}</td>
                            <td style={tdStyle}>{counselor.callyzerReport}</td>
                            <td style={tdStyle}>{counselor.talkTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CounselorTable;
