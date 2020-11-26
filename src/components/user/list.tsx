import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Search, Table, Button, Container, Grid,
} from 'semantic-ui-react';
import User from './user-record';
import * as userActions from '../../store/users/thunk';
import { RootState } from '../../store';
import UserForm from './user-form';
import { IUser } from '../../store/users/types';
import DeleteWarningModal from './delete-warning-modal';

const connector = connect(
  (userList: RootState) => userList,
  userActions,
);

const newUser: IUser = {
  id: 0,
  username: '',
  email: '',
  name: '',
};

type PropsFromRedux = ConnectedProps<typeof connector>

export const UserList: React.FC<PropsFromRedux> = ({
  userList,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  sortUserBy,
  searchUser,
}) => {
  const {
    users, sort, loading, search: { query },
  } = userList;
  const [insertModeOn, setInsertModeOn] = React.useState<boolean>(false);
  const [pendingDeleteUser, setPendingDeleteUser] = React.useState<IUser | any>(null);

  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  const createHandler = React.useCallback((user) => {
    setInsertModeOn(false);
    createUser(user);
  }, [createUser]);

  const deleteHandler = React.useCallback(
    () => {
      deleteUser(pendingDeleteUser.id);
      setPendingDeleteUser(null);
    },
    [deleteUser, pendingDeleteUser],
  );

  const confirmDeletionHandler = React.useCallback(
    (user: IUser | null) => setPendingDeleteUser(user),
    [setPendingDeleteUser],
  );

  const handleSearchChange = React.useCallback((e, data) => {
    searchUser(data.value);
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
              loading={loading}
              onSearchChange={handleSearchChange}
              value={query}
            />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button primary onClick={() => setInsertModeOn(true)}>Add new user</Button>
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
            <Table.HeaderCell>Actions</Table.HeaderCell>
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
                updateUser={updateUser}
                confirmDeletion={() => confirmDeletionHandler(user)}
              />
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer />
      </Table>
    </Container>
  );
};

export default connector(UserList);
