import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Header, Table, Button, Container,
} from 'semantic-ui-react';
import User from './user-record';
import * as userCRUDActions from '../../store/users/thunk';
import { UIActions } from '../../store/users/actions';
import { RootState } from '../../store';
import UserForm from './user-form';
import { IUser } from '../../store/users/types';
import DeleteWarningModal from './delete-warning-modal';

const connector = connect(
  (userList: RootState) => userList,
  { ...userCRUDActions, ...UIActions },
);

const newUser: IUser = {
  id: 0,
  username: '',
  email: '',
  name: '',
};

type PropsFromRedux = ConnectedProps<typeof connector>

const UserList: React.FC<PropsFromRedux> = ({
  userList,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  sortUserBy,
}) => {
  const { users, sort } = userList;
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
      <Header textAlign="right">
        <Button primary onClick={() => setInsertModeOn(true)}>Add new user</Button>
      </Header>
      <Table sortable celled fixed>
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
            <Table.Row>
              <User
                key={user.id}
                user={user}
                updateUser={updateUser}
                confirmDeletion={() => confirmDeletionHandler(user)}
              />
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          {/*  <Table.Row>
              <Table.HeaderCell colSpan='4'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a'>4</Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row> */}
        </Table.Footer>
      </Table>
    </Container>
  );
};

export default connector(UserList);
