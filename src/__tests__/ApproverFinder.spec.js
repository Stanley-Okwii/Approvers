import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Form, Dropdown, Button, Grid, Header, Message } from 'semantic-ui-react';

import { ApproverFinder } from '../components/ApproverFinder';

describe('Approver Finder',() => {
    const mockFindApprover = jest.fn();
    jest.mock('./sound-player', () => {
      return jest.fn().mockImplementation(() => {
        return {FindApprover: mockFindApprover};
        // Now we can track calls to playSoundFile
      });
    });

    beforeEach(() => {
        FindApprover.mockClear();
        FindApprover.mockClear();
      });

  it('finds all approvers for a given user', () => {
  
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