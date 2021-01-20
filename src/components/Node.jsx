import React from "react";

class Node extends React.Component {
    constructor(props) {
        super(props);

        /**
         * This property is not in state, because I don't want to 
         * trigger any re-render on mutation. It's updated every time
         * user interacts with parent (tree) component, and is used 
         * to allow user to uncheck radio input.
         */
        this.checked = props.parentName === "root";
        this.nodeRef = React.createRef();
    }

    shouldBeOpened() {
        if (this.nodeRef.current) {
            let checked = this.nodeRef.current.checked;
            this.checked = checked;
            return checked;
        }
        if (this.props.parentName === "root") {
            return true;
        }
        return false;
    }

    handleClick = () => {
        /**
         * This function is called onClick, it is neccesary to
         * chech wheter clicked input should be unchecked.
         * Without it, radio buttons cannot be unchecked.
         */
        if (this.checked) {
            this.nodeRef.current.checked = false;
        }
    }

    button() {
        return (
            <>
                <input
                    type={this.props.type}
                    name={this.props.parentName}
                    id={this.props.name}
                    ref={this.nodeRef}
                    onClick={this.handleClick}
                    defaultChecked={this.props.parentName === "root"}
                />
                <label htmlFor={this.props.name}>{this.props.name}</label>
            </>);
    }

    text() {
        return (<span className="node__text">{this.props.name}</span>);
    }

    subNodes() {
        return (
            this.props.subNodes.map((subNode, i) => 
                <Node
                    {...subNode}
                    parentName={this.props.name}
                    key={i} />
            )
        );
    }

    shouldRenderButton() {
        return (this.props.type === "checkbox" || this.props.type === "radio")
    }

    render() {
        const isClickable = this.shouldRenderButton();

        return (
            <div className={"node" + ( isClickable ? "" : " node--text") }>
                <div className="node__header">
                    { isClickable
                        ? this.button() 
                        : this.text() }
                </div>
                <div className={"node__children" + (this.shouldBeOpened() ? "" : "--hidden")}>
                    { this.props.subNodes.length > 0 && this.subNodes() }
                </div>
            </div>
        );
    }
}

export default Node;