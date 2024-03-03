// ScoreCard.js
import React from 'react';
import { teas } from '@/data/teaanswers';
import { getCookie } from 'cookies-next';
import styles from "../app/page.module.css";
import { useState } from 'react';

const TeaScoreCard = ({ quizResult, questions, name }) => {
    const passPercentage = 60;

    const percentage = (quizResult.score / (questions.length * 5)) * 100;
    const status = percentage >= passPercentage ? 'Pass' : 'Fail';
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    const compareTeas = (tea: { name: string; attributes: string[]; link?: undefined; } | { name: string; link: string; attributes: string[]; }, result:any) => {
        let intersection = 0
        tea.attributes.forEach((tea) =>
            result.attributes.forEach((result) =>{if(tea == result){intersection++;}})
        )
        if (intersection >= 2) {
            return true
        }
        else{
            return false
        }
    }

    const onAnswerSelected = (answer, idx) => {
        setSelectedAnswerIndex(idx);
        setSelectedAnswer(answer);
        setAnswerChecked(true);
    };

    return (
        <>
            <div >
                <h3>Hello, {name}. You said you liked:</h3>

                <p>{quizResult.attributes.map((answer: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, idx: string) => (
                    answer + ", "
                ))}</p>
                <br/>
                <br/>
                
                {quizResult.attributes.map((attribute, idx) =>{
                    if(attribute === "Herbal"){
                        return <p key="decafRec">You said you like herbal tea! Did you know herbal tea is naturally caffiene free?
                        </p>
                    }
                })}
                
                <div className={styles.grid}>
                    <div className='card p-4'>
                    <h3>We Recommend These Teas:</h3>
                    <table className='table'>

                        <tbody>
                            {teas.teas.map((tea, idx) => {
                                if (compareTeas(tea, quizResult)){
                                    return (
                                        <li key={idx}
                                            onClick={() => onAnswerSelected(tea, idx)}
                                            className={
                                                'list-group-item ' +
                                                (selectedAnswerIndex ===
                                                    idx ? 'active' : '') +
                                                ' cursor-pointer'
                                            }>
                                            <p ><a className="text-dark" href={tea.link}>{tea.name}</a></p>
                                            <p >{tea.attributes.map(tea => tea + ", ")}</p>
                                        </li>)
                                }
                                else{
                                    return 
                                }
                            } )}
                        </tbody>
                    </table>

                    <button
                        onClick={() => window.location.reload()}
                        className='btn btn-primary mt-3'
                    >
                        Restart
                    </button>
                    </div>
                </div>
                {
                    selectedAnswer !== null &&
                        <div className='card p-4'>
                            <ol>
                                <li>Heat your water to {selectedAnswer.temp} °F.</li>
                                <li>Measure 1 teaspoon of looseleaf tea per 8 oz cup.</li>
                                <li>Place the measured tea in an infuser and place the infuser in your cup.</li>
                                <li>Pour your heated water over the infuser. Be sure the tea is covered completely.</li>
                                <li>Steep your tea for {selectedAnswer.duration} minutes, removing the infuser when done.</li>
                            </ol>

                            Tip - For a stronger brew, add more loose leaf tea rather than steeping longer! 
                        </div>
                }
                
            </div>
        </>
    );
};

export default TeaScoreCard;
