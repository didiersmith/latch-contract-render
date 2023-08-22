export function getMentions(data) {
    // Extract all the mentions from data and return a dictionary mapping
    // mention ID to value.
    if (data.type === "mention") {
        return {
            [data.id]: data.value
        }
    }
    if (data.hasOwnProperty("children")) {
        data = data.children
    }
    if (!Array.isArray(data)) {
        return {}
    }
    return data.reduce((accum, child) => {
        const childMentions = getMentions(child)
        return {...accum,...childMentions}
    } , {})
}

export function numberClauses(data, parentClause, siblingClause) {
    // Modify data such that each node has a _clause property.
    // _clause is an array of numbers, eg. [1, 2, 3]
    let clause = parentClause;
    if (data.type === "clause") {
        clause = [...parentClause, siblingClause+1]
    }
    data["_clause"] = clause;
    if (data.hasOwnProperty("children")) {
        data = data.children;
    }
    if (!Array.isArray(data)) {
        return data;
    }
    let lastSiblingClause = 0;
    if (clause.length === 0 && siblingClause > 0) {
        // Hack: Sibling clauses can apparently be declared on different levels
        // (3. Agreement to Provide Services appears inside a <p>).
        // No time to solve this properly.
        lastSiblingClause = siblingClause;
    }
    for (let i = 0; i < data.length; i++) {
        numberClauses(data[i], clause, lastSiblingClause);
        if (data[i].type === "clause") {
            lastSiblingClause++;
        }
    }
    return data;
}

