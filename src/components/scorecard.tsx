// ScoreCard.js
import React from 'react';

const ScoreCard = ({ quizResult, questions, name }) => {
    const passPercentage = 60;

    const percentage = (quizResult.score / (questions.length * 5)) * 100;
    const status = percentage >= passPercentage ? 'Pass' : 'Fail';

    return (
        <>
            <div className='card p-4'>
                <h3>Hello, {name}. Here is your Result Analysis</h3>
                <table className='table'>
                    <ul className='list-group'>                        
                    </ul>
                    <tbody>
                        {quizResult.attributes.map((answer, idx) => (
                            <tr key={'raw_result' + idx}>
                                <td>{answer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={() => window.location.reload()}
                    className='btn btn-primary mt-3'
                >
                    Restart
                </button>
            </div>
        </>
    );
};

export default ScoreCard;
