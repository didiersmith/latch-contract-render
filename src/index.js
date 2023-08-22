import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import input from "./data/input.json";
import { numberClauses, getMentions } from "./utils";


const mentions = getMentions(input)
const marks = {
    bold: false,
    underline: false,
    italic: false,
}
const data = numberClauses(input, [], 0);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App data={data} mentions={mentions} marks={marks}/>
  </React.StrictMode>
);
