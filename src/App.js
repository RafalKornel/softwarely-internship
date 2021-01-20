import React from "react";
import Tree from "./structure.json";

class App extends React.Component {


    render() {
        return (
            <div className="App">
                <div 
                    className="App-header" 
                    // VERY important step, it forces react to re-render entire tree, hence
                    // allowing to get state from DOM. Then components are "hydrated" with dom state,
                    // which is great because dom handles radio buttons out of box.
                    onClick={() => this.forceUpdate()}>
                    <Radio value="hello" id="hello" name="test" />
                    <Radio value="world" id="world" name="test" />

                    {Tree.map(node => (
                        <Node {...node} open={true} parentName="root" />
                    ))}

                </div>
            </div>
        );
    }
}

class Radio extends React.Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }

    render() {
        return (
            <>
                <input
                    type="radio"
                    id={this.props.id}
                    ref={this.ref}
                    name={this.props.name}
                />
                <label htmlFor={this.props.id}>{this.props.value}</label>
            </>
        );
    }
}

class Node extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.props.open || false,
        }
        this.ref = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState(state => ({ open: !state.open }));
    }

    handleChange(e) {
        //console.log(e.target.value);
        if (this.ref) {
            this.setState({ open: this.ref.checked });
        }
    }

    componentDidMount(prevProps, prevState) {
        if (this.ref) {
            this.setState({ open: this.ref.checked});
        }
    }

    

    /*
    componentDidMount() {
        console.log(this.ref);
        if (this.ref) {

            /*
            this.ref.addEventListener("change", (event) => {
                console.log(this.props.name);
                console.log(this.ref);
                console.log(this.ref.checked)
                //this.setState({ open: event.target.value })
            })

            const config = { attributes: true, childList: false, subtree: false }
            const callback = mutations => console.log("mutations: ", mutations);
            const observer = new MutationObserver(callback);
            observer.observe(this.ref, config);
        }


    }
            */
    

    opened() {
        if (this.ref) { return this.ref.checked }
        return false;
    }

    render() {
        return (
            <div className="node">
                <div className="wrap">
                    {this.props.type !== "text" &&
                        <>
                            <input
                                type={this.props.type}
                                name={this.props.parentName}
                                id={this.props.name}
                                ref={el => this.ref = el}
                                defaultChecked={this.props.parentName==="root" && true}
                            />
                            <label htmlFor={this.props.name}>{this.props.name}</label>
                            <br />
                            <span>{this.state.open ? "open" : "closed"}</span>
                        </>
                    }

                </div>

                <div className={this.opened() ? "children" : "hidden"}>
                    {this.props.children.length > 0 &&
                        this.props.children.map(node => (<Node {...node} parentName={this.props.name} />))}
                </div>

            </div>
        );
    }
}

function NodeFunc(props) {
    const nodeRef = useRef(null);

    function shouldBeOpened() {
        if (nodeRef.current) {
            return nodeRef.current.checked;
        }
        if (props.parentName === "root") {
            return true;
        }
        return false;
    }

    function handleClick(e) {
        if (shouldBeOpened()) {
            console.log(e.target);
            //nodeRef.current.checked = !e.target.checked;
        }
    }

    return (
        <div className="node">
            <div className="header">
                {props.type !== "text" &&
                    <>
                        <input
                            type={props.type}
                            name={props.parentName}
                            id={props.name}
                            ref={nodeRef}
                            onClickCapture={handleClick}
                            defaultChecked={props.parentName === "root" && true}
                        />
                        <label htmlFor={props.name}>{props.name}</label>
                    </>
                }
            </div>
            <div className={"contents " + (shouldBeOpened() ? "children" : "hidden")}>
                {props.subNodes.length > 0 &&
                    props.subNodes.map((subNode, i) => (
                        <Node
                            {...subNode}
                            parentName={props.name}
                            key={i} />
                    ))
                }
            </div>
        </div>
    );
}

export default App;
