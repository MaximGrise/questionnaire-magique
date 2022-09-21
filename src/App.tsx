import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import Questions, { QuestionData } from './Questions';

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['questionnaire-magique.formUrl']);
  const [questionData, setQuestionData] = useState([] as QuestionData[]);

  useEffect(() => {
    let url = cookies['questionnaire-magique.formUrl'];
    if (!url || !url.trim().length) {
      url = 'https://raw.githubusercontent.com/MaximGrise/questionnaire-magique/master/questionnaires/example.md';
      setCookie('questionnaire-magique.formUrl', url)
    }
    fetch(url)
      .then((response) => response.text()).then((formMarkdown) => {
        setQuestionData(parse(formMarkdown))
      });
  }, [cookies['questionnaire-magique.formUrl']])

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://github.com/MaximGrise/form-builder"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </header>
      <section>
        <input size={150} value={cookies['questionnaire-magique.formUrl']} onChange={(e) => {
          setCookie('questionnaire-magique.formUrl', e.currentTarget.value)

        }} />
        <Questions
          questionData={questionData}
          selectAnswer={(questionIndex, answerIndex) => {
            questionData[questionIndex].choiceSelected = answerIndex;
            setQuestionData([...questionData])
          }}
        />
      </section>
    </div>
  );
}

const parse = (text: string): QuestionData[] => {
  var lines = text.split('\n');
  var formData: QuestionData[] = [];
  for (var i = 0; i < lines.length; i++) {
    var currentLine = lines[i];
    if (currentLine.indexOf('## ') === 0) {
      formData.push({
        question: currentLine.replace('## ', ''),
        choices: [],
        answer: 0 // placeholder...
      });
    } else if (currentLine.indexOf(' -') === 0) {
      var choices = formData[formData.length - 1].choices;
      if (!choices) {
        formData[formData.length - 1].choices = [currentLine.replace(' -', '')];
      } else {
        choices.push(currentLine.replace(' -', ''));
      }
    } else if (currentLine.indexOf('### ') === 0) {
      formData[formData.length - 1].answer = Number(currentLine.replace('### ', ''));
    }
  }

  return formData;
};

export default App;
