import React from "react";
import { Form, Dropdown, Button, Grid, Header, Message } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import "../ui/styles.css";
export class ApproverFinder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedUser: "",
            content: "",
            success: false,
            cache: [
                { user: "", approver: "" }
            ]
        };
    }

    render() {
        return (
            <div>
                <Grid textAlign='center' style={{ height: '60%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 600 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            One Acre Fund: Approver Finder
                        </Header>
                        <Form size="large">
                            <Form.Field>
                                <Dropdown
                                    placeholder="Select user"
                                    scrolling={false}
                                    selection
                                    options={this.createOptions(this.props.users)}
                                    onChange={(metaData, selected) => this.setState({ selectedUser: selected.value, content: "", success: false })}
                                />
                            </Form.Field>
                            <Button className='find-approver' onClick={() => this.findApprover(this.state.selectedUser)}>
                                Find Approver
                            </Button>
                            <Button className='find-nearest-approver' onClick={() => this.findNearestApprover(this.state.selectedUser)}>
                                Find Nearest Approver
                            </Button>
                            <Button className='find-nearest-approver-extended' onClick={() => this.findNearestApproverExtended(this.state.selectedUser)}>
                                Find Approver Extended
                            </Button>
                        </Form>
                        <Message header="Approvers" content={this.state.content} success={this.state.success} />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

    getUserIndex = (username) => {
        const grade = this.props.users[username]["grade"];
        return Number(grade[grade.length - 1])
    }

    createOptions = (users) => {
        const userArray = Object.entries(users);
        this.options = userArray.map(([name, { grade }]) => {
            return {
                text: name,
                value: name
            }
        });

        return this.options;
    }

    findApprover = (user) => {
        if (user) {
            const possibleApprovers = this.props.approvers[user];
            if (possibleApprovers) {
                this.setState({ content: possibleApprovers.join(", "), success: true })
            } else {
                this.setState({ content: `No approvers found` });
            }
        } else {
            this.setState({ content: `Select a user and try again` });
        }
    }

    findNearestApprover = (user) => {
        if (user) {
            let possibleApprovers = this.props.approvers[user];
            let newApprover = "";
            const userArray = Object.entries(this.props.users);
            if (possibleApprovers && possibleApprovers.length >= 1) {
                this.setState({ content: possibleApprovers[0], success: true })
            } else {
                userArray.forEach(([name, { grade }]) => {
                    const newGrade = Number(grade[grade.length - 1]);
                    const difference = Math.abs(this.getUserIndex(user) - newGrade);
                    if ((difference === 1) && (this.getUserIndex(user) < newGrade)) {
                        newApprover = name;
                        this.setState({ content: newApprover, success: true })
                    } else {
                        this.setState({ content: `${this.state.selectedUser} is at highest grade level`, success: false })
                    }
                });
            }
        } else {
            this.setState({ content: `Select a user and try again` });
        }
    }

    findNearestApproverExtended = (user) => {
        if (user) {
            let possibleApprovers = this.props.approvers[user];
            let newApprover = "";
            const userArray = Object.entries(this.props.users);
    
            const searchedUser = this.state.cache.filter(option => option.user === user);
            if (searchedUser.length > 0) {
                newApprover = searchedUser[0].approver;

                this.setState({ content: newApprover, success: true });

                return;
            }

            if (possibleApprovers && possibleApprovers.length >= 1) {
                this.cacheUpdate = this.state.cache;
                this.cacheUpdate.push({ user: user ,approver: possibleApprovers[0] });
                this.setState({ content: possibleApprovers[0], success: true , cache: this.cacheUpdate });
            } else {
                userArray.forEach(([name, { grade }]) => {
                    const newGrade = Number(grade[grade.length - 1]);
                    const difference = Math.abs(this.getUserIndex(user) - newGrade);

                    
                    if ((difference === 1) && (this.getUserIndex(user) < newGrade)) {
                        newApprover = name;
                        this.cacheUpdate = this.state.cache;
                        this.cacheUpdate.push({ user: user, approver: newApprover });
                        this.setState({ content: newApprover, success: true, cache: this.cacheUpdate });
                    } else {
                        this.cacheUpdate = this.state.cache;
                        this.cacheUpdate.push({ user: user, approver: `${this.state.selectedUser} is at highest grade level` });
                        this.setState({ content: `${this.state.selectedUser} is at highest grade level`, success: false, cache: this.cacheUpdate });
                    }
                });
            }
        } else {
            this.setState({ content: `Select a user and try again` });
        }
    }
}
