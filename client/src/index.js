import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StudentContextProvider } from './context/StudentContext';
import { AnswerContextProvider } from './context/AnswerContext';


ReactDOM.render(
  <React.StrictMode>
    <AnswerContextProvider>
      <StudentContextProvider>
        <App />
      </StudentContextProvider>
    </AnswerContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

