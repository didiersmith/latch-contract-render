import input from "./data/input.json";
import { numberClauses, getMentions } from "./utils";

test('getMentions', () => {
    const mentions = getMentions(input);
    expect(mentions).toEqual({
        "Client": "James Inc",
        "Contract Date": "November 17, 2021",
        "Governing Law Jurisdiction": "Auckland",
        "Provider": "Blackmoon",
        "Term": "1 year",
    });
});

test('numberClauses', () => {
    const data = numberClauses(input, [], 0);
    // Note: This is a terrible way to write a test, I should be using a
    // smaller isolated input dataset embedded in this file. C'est la vie for
    // now.
    expect(data[0].children[3]._clause).toEqual([1]);
    expect(data[0].children[4]._clause).toEqual([2]);
    expect(data[0].children[4].children[1]._clause).toEqual([2, 1]);
    expect(data[0].children[4].children[2]._clause).toEqual([2, 2]);
    expect(data[0].children[5].children[0]._clause).toEqual([3]);
});
