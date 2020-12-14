import * as React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import { IUser } from '../../store/users/types';
import UserForm from './user-form';

type Props = {
  user: IUser
  currentUserId: string
  confirmDeletion: (user: IUser) => void
  updateUser: (user: IUser) => void
  toggleSupervisedBy: (userId: string) => void
}

const User: React.FC<Props> = ({
  user,
  currentUserId,
  confirmDeletion,
  updateUser,
  toggleSupervisedBy,
}) => {
  const {
    id: userId,
    data: userData,
  } = user;

  const [editModeOn, setEditModeOn] = React.useState<boolean>(false);

  const updateHandler = React.useCallback((editedUserData: IUser) => {
    updateUser(editedUserData);
    setEditModeOn(false);
  }, []);

  const superviseHandler = React.useCallback(() => {
    toggleSupervisedBy(userId);
  }, [userData.supervisedBy]);

  return (
    <>
      {editModeOn && (
        <UserForm
          header="Edit user"
          user={user}
          onCancel={() => setEditModeOn(false)}
          onSubmitButtonClicked={updateHandler}
        />
      )}
      <Table.Cell>{userData.username}</Table.Cell>
      <Table.Cell>{userData.name}</Table.Cell>
      <Table.Cell>{userData.email}</Table.Cell>
      <Table.Cell>{userData.age}</Table.Cell>
      <Table.Cell textAlign="center">
        <Button
          primary
          size="small"
          animated="vertical"
          onClick={() => confirmDeletion(user)}
        >
          <Button.Content hidden>Delete</Button.Content>
          <Button.Content visible>
            <Icon name="user delete" />
          </Button.Content>
        </Button>
        <Button
          data-testid="edit-user-btn"
          primary
          size="small"
          animated="vertical"
          onClick={() => setEditModeOn(true)}
        >
          <Button.Content hidden>Edit</Button.Content>
          <Button.Content visible>
            <Icon name="edit outline" />
          </Button.Content>
        </Button>
        <Button
          data-testid="supervise-user-btn"
          primary
          size="small"
          disabled={userData.supervisedBy !== undefined && userData.supervisedBy !== currentUserId}
          onClick={superviseHandler}
        >
          <Button.Content>{userData.supervisedBy ? 'Supervised' : 'Supervise'}</Button.Content>
        </Button>
      </Table.Cell>
    </>
  );
};

export default React.memo(User);
