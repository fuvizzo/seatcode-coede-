import * as React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import { IUser } from '../../store/users/types';
import UserForm from './user-form';

type Props = {
  user: IUser
  confirmDeletion: () => void
  updateUser: (user: IUser) => void
}

const User: React.FC<Props> = ({ user, confirmDeletion, updateUser }) => {
  const [editModeOn, setEditModeOn] = React.useState<boolean>(false);

  const updateHandler = React.useCallback((editedUserData:IUser) => {
    updateUser(editedUserData);
    setEditModeOn(false);
  }, [updateUser]);

  return (
    <>
      {editModeOn && (
      <UserForm
        header="Edit user"
        user={{ ...user }}
        onCancel={() => setEditModeOn(false)}
        onSubmitButtonClicked={updateHandler}
      />
      )}
      <Table.Cell>{user.username}</Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.age}</Table.Cell>
      <Table.Cell textAlign="center">
        <Button primary animated="vertical" onClick={confirmDeletion}>
          <Button.Content hidden>Delete</Button.Content>
          <Button.Content visible>
            <Icon name="user delete" />
          </Button.Content>
        </Button>
        <Button
          data-testid="edit-user-btn"
          primary
          animated="vertical"
          onClick={() => setEditModeOn(true)}
        >
          <Button.Content hidden>Edit</Button.Content>
          <Button.Content visible>
            <Icon name="edit outline" />
          </Button.Content>
        </Button>
      </Table.Cell>
    </>
  );
};

export default User;
