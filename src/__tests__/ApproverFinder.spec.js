import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Form, Dropdown, Button, Grid, Header, Message } from 'semantic-ui-react';

import { ApproverFinder } from '../components/ApproverFinder';

describe('Approver Finder',() => {
  it('finds all approvers for a given user', () => {
    const addMock = jest.spyOn(ApproverFinder, "findApprover");
    // const fullRender = mount(<ApproverFinder />);
    expect(addMock).toHaveBeenCalledWith(1, 2);

    // // const mockFn = jest.fn()('findApprover');
    // console.log(mockFn.results());
    // const findApprover = jest.spyOn(fullRenderInstance, "findApprover").and.callThrough()
    // const signaturePadInstance = wrapper.instance();
    // console.log(wrapper.debug())
    // console.log(signaturePadInstance)//   const welcome = <h2>Welcome to React</h2>
    // expect(wrapper.contains(welcome)).toBe(true);
  //   expect(wrapper.contains(welcome)).toEqual(true);
  });

  it('renders structure correctly', () => {
    const renderApprover = shallow(<ApproverFinder />);
    // const renderApproverInstance = renderApprover.instance();

    const ApproverStructure = 
      <div>
      <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column>
              <Header as='h2' color='teal' textAlign='center'>
                  One Acre Fund: Approver Finder
              </Header>
              <Form size="large">
                  <Form.Field>
                      <Dropdown
                          placeholder="Select user"
                          scrolling={true}
                          selection
                          options={[]}
                          onChange={jest.fn()}
                      />
                  </Form.Field>
                  <Button onClick={jest.fn()}>
                      Find Approver
                  </Button>
                  <Button onClick={jest.fn()}>
                      Find Nearest Approver</Button>
              </Form>
              <Message header="Approvers" content="" success={false} />
          </Grid.Column>
      </Grid>
  </div>;

  // expect(renderApprover).tob(ApproverStructure);
  });


});