import React, { Component } from 'react'
import { connect } from "react-redux";
import { Card, Skeleton, message } from 'antd';
import 'antd/dist/antd.css';
import Questions from './Questions';
import { getASNTSDetail } from "../store/actions/assignments";
import Hoc from "../hoc/hoc"
import Choices from '../components/Choices';
import { createGradedASNT } from '../store/actions/gradedAssignments';
import { Redirect } from "react-router-dom";
const cardStyle = {
    marginTop: "20px",
    marginBottom: "20px"
};

class AssignmentDetail extends Component {

    state = {
        usersAnswers: {},
        redirectToReferrer: false
    };

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getASNTSDetail(this.props.token, this.props.match.params.id);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getASNTSDetail(newProps.token, this.props.match.params.id);
            }
        }
    }

    onChange = (e, qId) => {
        const { usersAnswers } = this.state;
        usersAnswers[qId] = e.target.value;
        this.setState({ usersAnswers });
    };

    handleSubmit() {
        message.success("Submitting your assignment!");
        const { usersAnswers } = this.state;
        const asnt = {
            username: this.props.username,
            asntId: this.props.currentAssignment.id,
            answers: usersAnswers
        };
        this.props.createGradedASNT(this.props.token, asnt);
        this.setState({ redirectToReferrer: true })
    }

    render() {
        const { currentAssignment } = this.props;
        const { title } = currentAssignment;
        const { usersAnswers } = this.state
        console.log(currentAssignment)
        console.log(this.props)
        if (this.state.redirectToReferrer) {
            return <Redirect to={`/profile/${this.props.userID}`} />;
        }
        return (
            <Hoc>
                {Object.keys(currentAssignment).length > 0 ? (
                    <Hoc>
                        {
                            this.props.loading ? (
                                <Skeleton active />
                            ) : (
                                <Card title={title}>
                                    <Questions
                                        submit={() => this.handleSubmit()}
                                        questions={currentAssignment.questions.map(q => {
                                            return <Card
                                                style={cardStyle}
                                                type="inner"
                                                key={q.id}
                                                title={`${q.order}. ${q.question}`}
                                            >
                                                <Choices
                                                    questionId={q.order}
                                                    choices={q.choices}
                                                    change={this.onChange}
                                                    usersAnswers={usersAnswers}
                                                />
                                            </Card>
                                        })} />
                                </Card>
                            )
                        }
                    </Hoc>
                ) : <h1>Empty Assignment</h1>}
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        currentAssignment: state.assignments.currentAssignment,
        loading: state.assignments.loading,
        username: state.auth.username,
        userID: state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getASNTSDetail: (token, id) => dispatch(getASNTSDetail(token, id)),
        createGradedASNT: (token, asnt) => dispatch(createGradedASNT(token, asnt))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignmentDetail);
