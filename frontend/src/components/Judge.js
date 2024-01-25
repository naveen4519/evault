import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Judge = () => {
    const [acceptedCases, setAcceptedCases] = useState([]);
    const [judgmentInput, setJudgmentInput] = useState('');

    const fetchAcceptedCases = async () => {
        try {
            const response = await axios.get('http://localhost:3008/accepted-cases');
            setAcceptedCases(response.data);
        } catch (error) {
            console.error('Error fetching accepted cases:', error);
        }
    };
    useEffect(() => {

        fetchAcceptedCases();
    }, []);

    const handleJudgmentSubmit = async (caseId) => {
        try {
            await axios.patch(`http://localhost:3008/accepted-cases/${caseId}`, {
                judgment: judgmentInput,
            });
            console.log('Judgment submitted successfully');

            // Optionally, update the UI or perform other actions
            // For example, you might want to clear the judgment input field
            setJudgmentInput('');

            // Trigger re-fetch of accepted cases
            fetchAcceptedCases();
        } catch (error) {
            console.error('Error submitting judgment:', error);
        }
    };

    return (
        <div>
            <h1>Judge Portal</h1>
            <h2>Accepted Cases</h2>
            <table>
                <thead>
                    <tr>
                        <th>Case Description</th>
                        <th>Judgment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {acceptedCases.map((caseItem) => (
                        <tr key={caseItem._id}>
                            <td>{caseItem.caseDescription}</td>
                            <td>{caseItem.judgment || 'No Judgment'}</td>
                            <td>
                                {caseItem.judgment ? (
                                    'Done'
                                ) : (
                                    <button onClick={() => handleJudgmentSubmit(caseItem._id)}>
                                        Submit Judgment
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Input field for judgment */}
            <div>
                <label htmlFor="judgmentInput">Enter Judgment:</label>
                <textarea
                    id="judgmentInput"
                    value={judgmentInput}
                    onChange={(e) => setJudgmentInput(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Judge;
