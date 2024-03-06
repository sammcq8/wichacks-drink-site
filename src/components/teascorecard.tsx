// ScoreCard.js
import React from 'react';
import { teas } from '@/data/teaanswers';
import { getCookie } from 'cookies-next';
import styles from "../app/page.module.css";
import { useState } from 'react';

const TeaScoreCard = ({ quizResult, questions, name }) => {

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    const compareTeas = (tea: { name: string; attributes: string[]; link?: undefined; } | { name: string; link: string; attributes: string[]; }, result:any) => {
        let intersection = 0
        tea.attributes.forEach((tea) =>
            result.attributes.forEach((result:string) =>{if(tea.toLowerCase() == result.toLowerCase()){intersection++;}})
        )
        return intersection
    }

    const onAnswerSelected = (answer, idx) => {
        setSelectedAnswerIndex(idx);
        setSelectedAnswer(answer);
        setAnswerChecked(true);
    };

    const womanOwned = (attributes:string[]) => {return attributes.filter(attribute => attribute === "Woman Owned").length > 0}

    const getItem = (bev: any, idx: number, active: boolean) => {
        let activeString = active ? 'active' : ''
        return <li key={idx}
            onClick={() => onAnswerSelected(bev, idx)}
            className={
                'list-group-item ' + activeString + ' cursor-pointer'
            }>
            <p >
                <a className={"text-" + (womanOwned(bev.attributes) && selectedAnswerIndex !== idx ? 'secondary' : 'dark')}
                    href={bev.link}
                    target="_blank"
                    rel="noopener noreferrer">
                    {(womanOwned(bev.attributes) ? '*** ' : '') + bev.name}
                </a>
            </p>
            <p > {bev.attributes.map((attribute: any) => attribute + ", ")}</p>
        </li>
    }


    return (
        <>
            <div >
                <h3>Hi {name}! You said you liked:</h3>

                <p>{quizResult.attributes.map((answer: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, idx: string) => (
                    answer + ", "
                ))}</p>
                <br/>
                <br/>
                
                {quizResult.attributes.map((attribute:string, idx:number) =>{
                    if(attribute === "Caffeine Free"){
                        return <p key="decafRec">You said you like caffeine free tea! Did you know most herbal teas are naturally caffeine free?
                        </p>
                    }
                })}
                
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3>We Think You&apos;ll Love These Teas:</h3>
                    <table className='table'>

                        <tbody>
                                {teas.teas
                                    .filter(tea => compareTeas(tea, quizResult) >=2)
                                    .sort((teaA, teaB) => (compareTeas(teaA, quizResult)  + (womanOwned(teaA.attributes) ? 0 : 3)) - 
                                                          (compareTeas(teaB, quizResult) + (womanOwned(teaB.attributes) ? 0 : 3)))
                                    .map((tea, idx) => getItem(tea, idx, selectedAnswerIndex === idx))
                                } 
                        </tbody>
                    </table>

                    <button
                        onClick={() => window.location.reload()}
                        className='btn btn-primary mt-3'
                    >
                        Restart
                    </button>
                    </div>
                {
                    selectedAnswer !== null &&
                        <div className={styles.card}>
                            <h4> Brewing Instructions</h4>
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

            </div>
        </>
    );
};

export default TeaScoreCard;
