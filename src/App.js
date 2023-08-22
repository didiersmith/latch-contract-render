import './App.css';

function H1({data, mentions, marks}) {
    return (
        <h1>
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </h1>
    )
}

function H2({data, mentions, marks}) {
    return (
        <h2>
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </h2>
    )
}

function H3({data, mentions, marks}) {
    return (
        <h3>
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </h3>
    )
}

function H4({data, mentions, marks}) {
    return (
        <h4>
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </h4>
    )
}

function H5({data, mentions, marks}) {
    return (
        <h5>
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </h5>
    )
}

function H6({data, mentions, marks}) {
    return (
        <h6>
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </h6>
    )
}

function Block({data, mentions, marks}) {
    return (
        <div>
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </div>
    )
}

function Ul({data, mentions, marks}) {
    return (
        <ul>
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </ul>
    )
}

function Li({data, mentions, marks}) {
    return (
        <li>
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </li>
    )
}

function Lic({data, mentions, marks}) {
    return (
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
    )
}

function Clause({data, mentions, marks}) {
    function formatClause(clause) {
        switch (clause.length) {
            case 0:
                return "";
            case 1:
                return clause[0] + ".";
            case 2:
                // Start numbering from a again if we go over 26, this is
                // almost certainly wrong.
                return "(" + String.fromCharCode((clause[1] % 26)+96) + ")";
            default:
                return clause[clause.length-1] + ".";
        }
    }
    return (
        <div>
            <div className="clause">{formatClause(data._clause)}</div>
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </div>
    )
}

function Text({data, marks}) {
    const style = {
        fontWeight: marks.bold ? 'bold' : 'normal',
        textDecoration: marks.underline ? 'underline' : 'none',
        fontStyle: marks.italic ? 'italic' : 'normal',
    }
    const lines = data.text.split('\n');
    if (lines.length === 1) {
        return <span style={style}>{data.text}</span>
    }
    let res = [];
    for (let i = 0; i < lines.length; i++) {
        res.push(<span style={style} key={i}>{lines[i]}</span>)
        res.push(<br key={"br_"+i} />)
    }
    res.pop(); // Remove final <br />
    return res;
}

function P({data, mentions, marks}) {
    return (
        <div className="paragraph">
            <Nodes dataArray={data.children} mentions={mentions} marks={marks} />
        </div>
    )
}

function Mention({data, mentions, marks}) {
    const style = {
        backgroundColor: data.color,
        color: 'white',
        paddingTop: '.2em',
        paddingBottom: '.2em',
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 3,
    }
    // NOTE: Assuming that mentions can only have a single text child.
    const mentionValue = mentions[data.id];
    // Use the first child's data in case it has marks.
    const textData = {
        ...data.children[0], 
        text: mentionValue
    }
    return (
        <span style={style}>
            <Text data={textData} marks={marks} />
        </span>
    )
}

function Node({data, mentions, marks}) {
    const newMarks = {
        bold: data.hasOwnProperty('bold') ? data.bold : marks.bold,
        underline: data.hasOwnProperty('underline') ? data.underline : marks.underline,
        italic: data.hasOwnProperty('italic') ? data.italic : marks.italic,
    }

    if (data.hasOwnProperty("text")) {
        return <Text data={data} marks={newMarks} />
    }
    switch (data.type) {
        case 'block':
            return <Block data={data} mentions={mentions} marks={newMarks} />
        case 'clause':
            return <Clause data={data} mentions={mentions} marks={newMarks} />
        case 'h1':
            return <H1 data={data} mentions={mentions} marks={newMarks} />
        case 'h2':
            return <H2 data={data} mentions={mentions} marks={newMarks} />
        case 'h3':
            return <H3 data={data} mentions={mentions} marks={newMarks} />
        case 'h4':
            return <H4 data={data} mentions={mentions} marks={newMarks} />
        case 'h5':
            return <H5 data={data} mentions={mentions} marks={newMarks} />
        case 'h6':
            return <H6 data={data} mentions={mentions} marks={newMarks} />
        case 'p':
            return <P data={data} mentions={mentions} marks={newMarks} />
        case 'ul':
            return <Ul data={data} mentions={mentions} marks={newMarks} />
        case 'li':
            return <Li data={data} mentions={mentions} marks={newMarks} />
        case 'lic':
            return <Lic data={data} mentions={mentions} marks={newMarks} />
        case 'mention':
            return <Mention data={data} mentions={mentions} marks={newMarks} />
        default:
            console.error("Unhandled node type", data.type)
    }
}

function Nodes({dataArray, mentions, marks}) {
    return dataArray.map((nodeData, index) => {
        return <Node data={nodeData} mentions={mentions} marks={marks} key={index} />
    })
}

function App({data, mentions, marks}) {
  return (
    <div className="App">
      <Nodes dataArray={data} mentions={mentions} marks={marks} />
    </div>
  );
}

export default App;
