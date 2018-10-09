import React from "react";
import ReactDOM from "react-dom";
import { ApproverFinder } from './components/ApproverFinder';

const users = require("./data/users.json");
const approvers = require("./data/approvers.json");
const rootElement = document.getElementById("root");

ReactDOM.render(
    <ApproverFinder
        users={users}
        approvers={approvers}
    />, rootElement);
