// Quiz.js
import React, { useState } from 'react';
import '../../bootstrap.min.css';
import { quiz } from '../data/coffeequestionset';
import CoffeeScoreCard from './coffeescorecard';
import { setCookie, getCookie, CookieValueTypes } from "cookies-next";

function useCookieState() {


}

const Quiz = ({ name:string }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answerChecked, setAnswerChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [quizResult, setQuizResult] = useState({
        attributes: [],
    });

    const cookie = getCookie("coffeeAttributes")

    const cookieToArray = (cookie:CookieValueTypes) => {
        return cookie?.split(":")[1].replaceAll("[", "").replaceAll("\"", "").replaceAll("]", "").replaceAll("}", "").split(",")
    }

    const { questions } = quiz;
    const { question, answers } =
        questions[currentQuestionIndex];

    const onAnswerSelected = (answer, idx) => {
        setSelectedAnswerIndex(idx);
        setSelectedAnswer(answer);
        setAnswerChecked(true);
    };

    const handleNextQuestion = () => {
        setQuizResult((prev) => ({
            ...prev,
            attributes: [...prev.attributes, selectedAnswer]
        }));
        console.log(quizResult)
        if (currentQuestionIndex !== questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setShowResults(true);
            setCookie("coffeeAttributes", quizResult)
        }
        setSelectedAnswer('');
        setSelectedAnswerIndex(null);
        setAnswerChecked(false);
    };

    return (
        <div className='container mt-5'>
            {cookieToArray(cookie)}
            <div>
                {!showResults ? (
                    <div className='card p-4'>
                        <h4>{question}</h4>
                        <ul className='list-group'>
                            {answers.map((answer, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => onAnswerSelected(answer, idx)}
                                    className={
                                        'list-group-item ' +
                                        (selectedAnswerIndex ===
                                            idx ? 'active' : '') +
                                        ' cursor-pointer'
                                    }
                                >
                                    {answer}
                                </li>
                            ))}
                        </ul>
                        <div className='d-flex justify-content-between mt-3'>
                            <b>Question
                                {currentQuestionIndex + 1}/{questions.length}
                            </b>
                            <button
                                onClick={handleNextQuestion}
                                className='btn btn-primary'
                                disabled={!answerChecked}
                            >
                                {currentQuestionIndex === questions.length - 1 ?
                                    'Submit' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <CoffeeScoreCard
                        quizResult={quizResult}
                        questions={questions}
                        name={name}
                    />
                )}
            </div>
        </div>
    );
};

export default Quiz;
