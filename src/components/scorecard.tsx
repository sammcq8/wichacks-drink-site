// ScoreCard.js
import React from 'react';
import { coffees } from '@/data/coffeeanswers';
import { getCookie } from 'cookies-next';

const ScoreCard = ({ quizResult, questions, name }) => {
    const passPercentage = 60;

    const percentage = (quizResult.score / (questions.length * 5)) * 100;
    const status = percentage >= passPercentage ? 'Pass' : 'Fail';

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

    return (
        <>
            <div className='card p-4'>
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
                


                <h3>We Recommend These Coffees:</h3>
                <table className='table'>

                    <tbody>
                        {coffees.coffees.map((coffee, idx) => {
                            if (compareCoffees(coffee, quizResult)){
                                return (
                                    <tr key = { idx }>
                                        <td ><a href={coffee.link}>{coffee.name}</a></td>
                                        <td >{coffee.attributes.map(coffee => coffee + ", ")}</td>
                                    </tr>)
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
        </>
    );
};

export default ScoreCard;
