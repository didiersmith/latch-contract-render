import { render, screen } from '@testing-library/react';
import App from './App';
import input from "./data/input.json";
import { numberClauses, getMentions } from "./utils";

test('renders agreement to provide services', () => {
    const mentions = getMentions(input[0])
    const marks = {
        bold: false,
        underline: false,
        italic: false,
    }
    const data = numberClauses(input, [], 0);
    render(<App data={data} mentions={mentions} marks={marks}/>)
    const agreementText = screen.getByText(/Agreement to Provide Services/i);
    expect(agreementText).toBeInTheDocument();
});
