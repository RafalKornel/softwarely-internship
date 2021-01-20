import React from "react";
import Tree from "./Tree";
import Explanation from "./Explanation";
import data from "../structure.json";

const App = (props) => (
    <>
        <Tree data={data} />
        <Explanation />
    </>
);

export default App;