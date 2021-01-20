import React from "react";
import Node from "./Node";
import data from "../structure.json";



export default class Tree extends React.Component {
    /**
     * I am using class components here instead of 
     * functional, stateless component just for *this.forceUpdate*
     * method. It is neccessary, because it forces react to recalculate 
     * every render function on every click, allowing us to pull current 
     * state from pure DOM, after every interaction. I am doing so, because 
     * DOM can manage radio buttons state very easily. I am aware, that this 
     * is not very *React* way of doing things, but it is dictated by 
     * specification of task.
     */
    render() {
        return (
            <div 
                className="tree" 
                onClick={() => this.forceUpdate()} >
                {data.map((node, i) => (
                    <Node
                        {...node}
                        key={i}
                        parentName="root" />
                ))}
            </div>
        );
    }
}