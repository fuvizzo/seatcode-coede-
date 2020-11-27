import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Search,
  Table,
  Button,
  Container,
  Grid,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import User from './user-record';
import * as crudUserActions from '../../store/users/thunk';
import { uiActions } from '../../store/users/actions';
import { RootState } from '../../store';
import UserForm from './user-form';
import { IUser } from '../../store/users/types';
import DeleteWarningModal from './delete-warning-modal';

const connector = connect(
  (userList: RootState) => userList,
  { ...crudUserActions, ...uiActions },
);

const newUser: IUser = {
  id: 0,
  username: '',
  email: '',
  name: '',
  age: 0,
};

type PropsFromRedux = ConnectedProps<typeof connector>

export const UserList: React.FC<PropsFromRedux> = ({
  userList, ...actions
}) => {
  const {
    users, sort, loading, search: { query },
  } = userList;
  const [insertModeOn, setInsertModeOn] = React.useState<boolean>(false);
  const [pendingDeleteUser, setPendingDeleteUser] = React.useState<IUser | any>(null);
  const timeoutRef = React.useRef<any>();
  React.useEffect(() => {
    actions.getUsers();
  }, [actions.getUsers]);

  const createHandler = React.useCallback((user) => {
    setInsertModeOn(false);
    actions.createUser(user);
  }, [actions.createUser]);

  const deleteHandler = React.useCallback(
    () => {
      actions.deleteUser(pendingDeleteUser.id);
      setPendingDeleteUser(null);
    },
    [actions.deleteUser, pendingDeleteUser],
  );

  const confirmDeletionHandler = React.useCallback(
    (user: IUser | null) => setPendingDeleteUser(user),
    [setPendingDeleteUser],
  );

  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    actions.triggerUserSearch(data.value);
    timeoutRef.current = setTimeout(() => {
      actions.getFilteredUsers();
    }, 300);
  }, []);

  React.useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  }, []);

  if (insertModeOn) {
    return (
      <UserForm
        header="Add new user"
        user={newUser}
        onCancel={() => setInsertModeOn(false)}
        onSubmitButtonClicked={createHandler}
      />
    );
  }

  return (
    <Container>
      {pendingDeleteUser && (
      <DeleteWarningModal
        user={pendingDeleteUser}
        onSubmitButtonClicked={deleteHandler}
        onCancel={() => confirmDeletionHandler(null)}
      />
      )}
      <Grid divided="vertically" padded="vertically">
        <Grid.Row columns={2}>
          <Grid.Column textAlign="left">
            <Search
              placeholder="Enter any word here..."
              onSearchChange={handleSearchChange}
              value={query}
              showNoResults={false}
            />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button
              data-testid="new-user-btn"
              primary
              onClick={() => setInsertModeOn(true)}
            >
              Add new user

            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {loading ? (
        <Segment style={{ minHeight: 600 }}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      )
        : (
          <Table data-testid="table" sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={sort.column === 'username' ? sort.direction : undefined}
                  onClick={() => actions.sortUserBy('username')}
                >
                  Nickname
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={sort.column === 'name' ? sort.direction : undefined}
                  onClick={() => actions.sortUserBy('name')}
                >
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={sort.column === 'email' ? sort.direction : undefined}
                  onClick={() => actions.sortUserBy('email')}
                >
                  Email
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ width: 100 }}
                  sorted={sort.column === 'age' ? sort.direction : undefined}
                  onClick={() => actions.sortUserBy('age')}
                >
                  Age
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: 160, textAlign: 'center' }}>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row
                  key={user.id}
                  data-testid="table-row"
                >
                  <User
                    user={user}
                    updateUser={actions.updateUser}
                    confirmDeletion={() => confirmDeletionHandler(user)}
                  />
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer />
          </Table>
        )}
    </Container>
  );
};

export default connector(UserList);
