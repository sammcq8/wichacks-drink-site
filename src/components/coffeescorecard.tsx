// ScoreCard.js
import React from 'react';
import { coffees } from '@/data/coffeeanswers';
import { deleteCookie, getCookie } from 'cookies-next';
import styles from "../app/page.module.css";
import { useState } from 'react';

const CoffeeScoreCard = ({ quizResult, questions, name }) => {
    const passPercentage = 60;

    const percentage = (quizResult.score / (questions.length * 5)) * 100;
    const status = percentage >= passPercentage ? 'Pass' : 'Fail';
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    const compareCoffees = (coffee: { name: string; attributes: string[]; link?: undefined; } | { name: string; link: string; attributes: string[]; }, result:any) => {
        let intersection = 0
        coffee.attributes.forEach((coffee) =>
            result.attributes.forEach((result) =>{if(coffee.toLowerCase() == result.toLowerCase()){intersection++;}})
        )
        if (intersection >= 3) {
            return true
        }
        else{
            return false
        }
    }

    const onAnswerSelected = (answer:any, idx:any) => {
        setSelectedAnswerIndex(idx);
        setSelectedAnswer(answer);
        setAnswerChecked(true);
    };

    const womanOwned = (attributes:String[]) => {return attributes.filter(attribute => attribute === "woman owned").length > 0}

    const getItem = (bev: any, idx: number, active:boolean) => {
        let activeString = active ? 'active': ''
        return <li key={idx}
            onClick={() => onAnswerSelected(bev, idx)}
            className={
                'list-group-item '+activeString+' cursor-pointer'
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
            <div>
                <h3>Hello, {name}. You said you liked:</h3>

                <p>{quizResult.attributes.map((answer: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, idx: string) => (
                    answer + ", "
                ))}</p>
                
                {quizResult.attributes.map((attribute:string, idx:number) =>{
                    if(attribute === "Decaf"){
                        return <p key="decafRec">You said you like decaf coffee! Did you know decaf coffee goes stale faster than caffinated coffee?
                            If you store your coffee in the freezer it will last much longer
                        </p>
                    }
                })}
                
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3>We Think You&apos;ll Love These Coffees:</h3>
                    <table className='table'>

                        <tbody>
                            {coffees.coffees
                                    .sort(coffee => womanOwned(coffee.attributes) ? 0:3)
                                    .map((coffee, idx) => 
                                        compareCoffees(coffee, quizResult) ? 
                                        getItem(coffee, idx, selectedAnswerIndex === idx) : null
                                    )
                            }                       
                        </tbody>
                    </table>

                    <button
                        onClick={() => {window.location.reload()
                                        deleteCookie("coffeeAttributes")}}
                        className='btn btn-primary mt-3'
                    >
                        Restart
                    </button>
                    </div>
                
                {
                    selectedAnswer !== null &&
                    <div className={styles.card}>
                        <h4>Pour over instructions:</h4>
                        <ol >
                            <li>Bring at least 600 grams (20 oz) of water to a boil.</li>
                                {"Light Roast" in selectedAnswer && <li>For Light Roasts measure out 22 grams for every 350 grams water.</li>}
                                {"Light Roast"! in selectedAnswer.attributes && <li>For Medium and Dark Roasts measure out 30 grams of coffee</li>} 
                                <li>Grind coffee to a coarseness resembling sea salt.</li>
                                <li>Place a filter in your pour over dripper, and pour some water over it to wet it.</li>
                                <li>Add the ground coffee to the filter and gently tap it to level the surface of the grounds.</li>
                            <li>Pour 60 grams of water onto the coffee grounds and let it sit for 45 seconds.</li>
                            <li>Once the coffee has sat for 45 seconds, add another 90 grams of water, pouring in a spiral from the center. Wait an additional 45 seconds</li>
                            <li>Repeat the previous step, adding 90 grams of water.</li>
                            <li>Once the water has moved completely through the coffee you can pour your coffee into a cup and enjoy!</li>


                        </ol>

                    </div>
                }
                </div>
            </div>
        </>
    );
};

export default CoffeeScoreCard;
