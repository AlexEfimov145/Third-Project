import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import vacationService from "../../../services/Vacations";
import notify from "../../../services/Notify";
import { json2csv } from 'json-2-csv';
import "./VacationReport.css";


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VacationReport: React.FC = () => {
    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: []
    });
    const [csvData, setCsvData] = useState<any[]>([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVacations = async () => {
            try {
                const vacationsWithLikes = await vacationService.getAllVacationsWithLikes();

                const labels = vacationsWithLikes.map(vacation => vacation.destination);
                const likesData = vacationsWithLikes.map(vacation => vacation.likes);

                const data = {
                    labels,
                    datasets: [
                        {
                            label: 'Likes',
                            data: likesData,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                setChartData(data);

                // Prepare CSV data with only destination and likes
                const csvData = vacationsWithLikes.map(vacation => ({
                    destination: vacation.destination,
                    likes: vacation.likes
                }));

                setCsvData(csvData);
            } catch (error) {
                notify.error("Failed to load vacation likes data");
            }
        };

        fetchVacations();
    }, []);

    const downloadCsv = async () => {
        try {
            const csv = await json2csv(csvData);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            link.setAttribute('href', url);
            link.setAttribute('download', 'vacations_likes_report.csv');
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            notify.error("Failed to generate CSV");
        }
    };
    function handleCancel() {
        navigate('/adminPage'); // Navigates back to the admin page
    }

    return (
        <div className="VacationReport">
            <h2>Vacations Report</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Vacations Report',
                        },
                    },
                }}
            />
            <button onClick={downloadCsv} className="download-csv-button">Download CSV</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default VacationReport;
