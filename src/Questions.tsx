import React, { ReactElement, useState } from 'react';
import './Questions.css';

export type QuestionData = {
    question: string
    choices: string[]
    answer: number
    choiceSelected?: number
}
export type QuestionsProps = {
    questionData: QuestionData[]
    selectAnswer: (questionIndex: number, answerIndex: number) => void
}

const Questions = (props: QuestionsProps): ReactElement<QuestionsProps> => {
    console.log(props.questionData)
    return (<div className='questions'>
        {
            props.questionData.map((data, questionIndex) => (
                <div className='question' key={questionIndex}>
                    <h3 className='question-title'>
                        {data.question}
                    </h3>
                    <div className='question-choices'>
                        {
                            data.choices.map((choice, choiceIndex) => (
                                <div className={`question-choice ${data.choiceSelected !== undefined && data.choiceSelected === choiceIndex ? 'selected' : ''}`} key={choiceIndex} onClick={() => props.selectAnswer(questionIndex, choiceIndex)}>{choice}</div>
                            ))
                        }
                    </div>
                    <h4 className={`question-answer ${data.choiceSelected !== undefined ? data.choiceSelected === data.answer ? 'valid' : 'invalid' : ''}`}>
                        {data.choices[data.answer]}
                    </h4>
                </div>
            ))
        }
    </div>

    );
}

export default Questions;
