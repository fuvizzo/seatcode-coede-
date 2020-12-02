import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Search,
  Table,
  Button,
  Container,
  Grid,
} from 'semantic-ui-react';
import User from './user-record';
import * as userListActions from '../../store/users/thunk';
import uiActions from '../../store/ui/actions';

import UserForm from './user-form';
import { IUser } from '../../store/users/types';
import DeleteWarningModal from './delete-warning-modal';
import { RootState } from '../../store';

const connector = connect(
  (state: RootState) => ({
    ...state.userList,
    ...state.ui.search,
    currentUserId: state.currentUser.id,
  }),
  { ...userListActions, ...uiActions },
);

const newUser: IUser = {
  id: 0,
  username: '',
  email: '',
  name: '',
  age: 0,
  enabled: false,
};

type PropsFromRedux = ConnectedProps<typeof connector>

export const UserListComponent: React.FC<PropsFromRedux> = (props) => {
  const {
    getUsers,
    getFilteredUsers,
    triggerUserSearch,
    updateUser,
    createUser,
    deleteUser,
    sortUserBy,
    currentUserId,
    users,
    sort,
    query,
  } = props;

  const [insertModeOn, setInsertModeOn] = React.useState<boolean>(false);
  const [pendingDeleteUser, setPendingDeleteUser] = React.useState<IUser | any>(null);
  const timeoutRef = React.useRef<any>();

  React.useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  }, []);

  React.useEffect(() => {
    getUsers();
  }, []);

  const createHandler = React.useCallback((user: IUser) => {
    setInsertModeOn(false);
    createUser(user);
  }, []);

  const deleteHandler = React.useCallback(
    () => {
      deleteUser(pendingDeleteUser.id);
      setPendingDeleteUser(null);
    },
    [pendingDeleteUser],
  );

  const confirmDeletionHandler = React.useCallback(
    (user: IUser | null) => setPendingDeleteUser(user),
    [],
  );

  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    triggerUserSearch(data.value);
    timeoutRef.current = setTimeout(() => {
      getFilteredUsers();
    }, 300);
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
      <h1>Display Users Account Details</h1>
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
      <Table data-testid="table" sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={sort.column === 'username' ? sort.direction : undefined}
              onClick={() => sortUserBy('username')}
            >
              Nickname
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sort.column === 'name' ? sort.direction : undefined}
              onClick={() => sortUserBy('name')}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sort.column === 'email' ? sort.direction : undefined}
              onClick={() => sortUserBy('email')}
            >
              Email
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ width: 100 }}
              sorted={sort.column === 'age' ? sort.direction : undefined}
              onClick={() => sortUserBy('age')}
            >
              Age
            </Table.HeaderCell>
            <Table.HeaderCell style={{ textAlign: 'center' }}>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user: IUser) => (
            <Table.Row
              key={user.id}
              data-testid="table-row"
            >
              <User
                currentUserId={currentUserId}
                user={user}
                updateUser={updateUser}
                confirmDeletion={confirmDeletionHandler}
              />
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer />
      </Table>
    </Container>
  );
};

export default connector(UserListComponent);
