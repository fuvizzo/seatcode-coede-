import * as React from "react"
import { connect, ConnectedProps } from "react-redux"
import User from './user-record'
import * as  userCRUDActions from '../../store/users/thunk'
import { sortUserBy } from '../../store/users/actions';
import { Icon, Header, Menu, Table, Button, Container } from 'semantic-ui-react'
import { RootState } from "../../store"
import UserForm from "./user-form"
import { IUser } from "../../store/users/types"


const connector = connect(
  (userList: RootState) => userList,
  { ...userCRUDActions, sortUserBy }
)

const newUser: IUser = {
  id: 0,
  username: "",
  email: "",
  name: ""
}

type PropsFromRedux = ConnectedProps<typeof connector>

const UserList: React.FC<PropsFromRedux> = ({
  userList,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  sortUserBy,
}) => {
  const [insertModeOn, setInsertModeOn] = React.useState<boolean>(false);

  React.useEffect(() => {
    getUsers()
  }, [getUsers]);

  const createHandler = React.useCallback((user) => {
    setInsertModeOn(false);
    createUser(user);
  }, [createUser]
  );

  if (insertModeOn) {
    return <UserForm
      header="Add new user"
      user={newUser}
      onCancel={() => setInsertModeOn(false)}
      onSubmitButtonClicked={createHandler} />
  }
  else {
    return (
      <Container>
        <Header textAlign="right">
          <Button primary onClick={() => setInsertModeOn(true)}>Add new user</Button>
        </Header>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                onClick={() => sortUserBy('name')}
              >Nickname
              </Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {userList.users.map(user =>
              <Table.Row>
                <User
                  key={user.id}
                  user={user}
                  updateUser={updateUser}
                  removeUser={deleteUser} /></Table.Row>
            )}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
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
            </Table.Row>
          </Table.Footer>
        </Table>

      </Container >
    )
  }

}

export default connector(UserList)
