// ScoreCard.js
import React from 'react';
import { coffees } from '@/data/coffeeanswers';
import { getCookie } from 'cookies-next';
import styles from "../app/page.module.css";
import { useState } from 'react';

const CoffeeScoreCard = ({ quizResult, questions, name }) => {
    const passPercentage = 60;

    const percentage = (quizResult.score / (questions.length * 5)) * 100;
    const status = percentage >= passPercentage ? 'Pass' : 'Fail';
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answerChecked, setAnswerChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    const compareCoffees = (coffee: { name: string; attributes: string[]; link?: undefined; } | { name: string; link: string; attributes: string[]; }, result:any) => {
        let intersection = 0
        coffee.attributes.forEach((coffee) =>
            result.attributes.forEach((result) =>{if(coffee == result){intersection++;}})
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
                    if(attribute === "Decaf"){
                        return <p key="decafRec">You said you like decaf coffee! Did you know decaf coffee goes stale faster than caffinated coffee?
                            If you store your coffee in the freezer it will last much longer
                        </p>
                    }
                })}
                
                <div className={styles.grid}>
                    <div className='card p-4'>
                    <h3>We Recommend These Coffees:</h3>
                    <table className='table'>

                        <tbody>
                            {coffees.coffees.map((coffee, idx) => {
                                if (compareCoffees(coffee, quizResult)){
                                    return (
                                        <li key={idx}
                                            onClick={() => onAnswerSelected(coffee, idx)}
                                            className={
                                                'list-group-item ' +
                                                (selectedAnswerIndex ===
                                                    idx ? 'active' : '') +
                                                ' cursor-pointer'
                                            }>
                                            <p ><a className="text-dark" href={coffee.link}>{coffee.name}</a></p>
                                            <p >{coffee.attributes.map(coffee => coffee + ", ")}</p>
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
                <div className='card p-4'>
                    
                </div>
            </div>
        </>
    );
};

export default CoffeeScoreCard;
