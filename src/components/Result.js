import React from "react";
// import { Progress } from "antd";
import { Progress, Segment } from 'semantic-ui-react'

const Result = props => (
    <div>
        <Segment>
            <h3>{props.title}</h3>
            <Progress percent={props.grade} color='grey' progress />
        </Segment>
        <h3>  </h3>
    </div>
);

export default Result;
