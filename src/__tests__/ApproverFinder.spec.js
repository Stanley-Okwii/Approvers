import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { ApproverFinder } from '../components/ApproverFinder';

const users = {
    "stanley@aof.org": {
        "grade": "JG3"
    },
    "anne@oaf.org": {
        "grade": "JG4"
    },
    "bob@oaf.org": {
        "grade": "JG5"
    }
};

const approvers = {
    "stanley@oaf.org": ["anne@oaf.org", "bob@oaf.org"],
    "anne@oaf.org": ["bob@oaf.org"]
};

describe('Approver Finder', () => {
    const wrapper = mount(<ApproverFinder users={users} approvers={approvers} />);
    const instance = wrapper.instance();

    it('calls findApprover function when "Find Approver" button is clicked', () => {
        jest.spyOn(instance, 'findApprover');
        wrapper.find('.dropdown.icon').simulate('click');
        wrapper.find('.selected.item').simulate('click');

        expect(wrapper.find('.ui.selection.dropdown .text').at(0).text()).toBe('stanley@aof.org');

        wrapper.find('.ui.button.find-approver').simulate('click');

        expect(instance.findApprover).toHaveBeenCalled();
    });

    it('calls findNearestApprover function when "Find Nearest Approver" button is clicked', () => {
        jest.spyOn(instance, 'findNearestApprover');
        wrapper.find('.dropdown.icon').simulate('click');
        wrapper.find('.selected.item').simulate('click');

        expect(wrapper.find('.ui.selection.dropdown .text').at(0).text()).toBe('stanley@aof.org');

        wrapper.find('.ui.button.find-nearest-approver').simulate('click');

        expect(instance.findNearestApprover).toHaveBeenCalled();
    });

    it('finds nearest approver for a given user', () => {
        jest.spyOn(instance, 'findNearestApprover');
        wrapper.find('.dropdown.icon').simulate('click');
        wrapper.find('.selected.item').simulate('click');

        expect(wrapper.find('.ui.selection.dropdown .text').at(0).text()).toBe('stanley@aof.org');

        wrapper.find('.ui.button.find-nearest-approver').simulate('click');

        expect(instance.findNearestApprover).toHaveBeenCalled();
    });

    it('renders structure correctly', () => {
        const renderApprover = mount(<ApproverFinder users={users} approvers={approvers} />);

        expect(renderApprover.find('.ui.button.find-approver').text()).toBe('Find Approver');
        expect(renderApprover.find('.ui.button.find-nearest-approver').text()).toBe('Find Nearest Approver');
        expect(renderApprover.find('.default.text').text()).toBe('Select user');

        renderApprover.find('.dropdown.icon').simulate('click');
        renderApprover.find('.selected.item').simulate('click');

        expect(renderApprover.find('.ui.selection.dropdown .text').at(0).text()).toBe('stanley@aof.org');
    });
});

describe('Finder Approver function', () => {
    const wrapper = mount(<ApproverFinder users={users} approvers={approvers} />);
    const instance = wrapper.instance();
    
    it('sets content state to approvers when a user has approvers', () => {
        instance.setState({ selectedUser: 'stanley@oaf.org'});
        jest.spyOn(instance, 'findApprover');
        wrapper.find('.ui.button.find-approver').simulate('click');

        expect(instance.state.content).toBe('anne@oaf.org, bob@oaf.org');
    });

    it('sets content state to "Select user and try again" when no user is selected', () => {
        instance.setState({ selectedUser: ''});
        jest.spyOn(instance, 'findApprover');
        wrapper.find('.ui.button.find-approver').simulate('click');

        expect(instance.state.content).toBe('Select a user and try again');
    });


    it('sets content state to "No approvers found" when a user have default approvers', () => {
        instance.setState({ selectedUser: 'idonthaveapprovers@aof.org'});
        jest.spyOn(instance, 'findApprover');
        wrapper.find('.ui.button.find-approver').simulate('click');

        expect(instance.state.content).toBe('No approvers found');
    });
});

describe('Finder Nearest Approver function', () => {
    const wrapper = mount(<ApproverFinder users={users} approvers={approvers} />);
    const instance = wrapper.instance();
    
    it('sets content state to nearest approver when a user has approvers', () => {
        instance.setState({ selectedUser: 'stanley@oaf.org'});
        jest.spyOn(instance, 'findNearestApprover');
        wrapper.find('.ui.button.find-nearest-approver').simulate('click');

        expect(instance.state.content).toBe('anne@oaf.org');
    });

    it('sets content state to "Select user and try again" when no user is selected', () => {
        instance.setState({ selectedUser: ''});
        jest.spyOn(instance, 'findNearestApprover');
        wrapper.find('.ui.button.find-nearest-approver').simulate('click');

        expect(instance.state.content).toBe('Select a user and try again');
    });


    it('sets content state to "user@aof.org is at highest level" when a user have default approvers', () => {
        instance.setState({ selectedUser: 'bob@oaf.org'});
        jest.spyOn(instance, 'findNearestApprover');
        wrapper.find('.ui.button.find-nearest-approver').simulate('click');

        expect(instance.state.content).toBe('bob@oaf.org is at highest grade level');
    });
});
