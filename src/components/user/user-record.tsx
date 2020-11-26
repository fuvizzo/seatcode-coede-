import * as React from "react"
import { IUser } from "../../store/users/types"
import UserForm from "./user-form"
import { Table, Icon, Button } from 'semantic-ui-react'

type Props = {
  user: IUser
  confirmDeletion: (user: IUser) => void
  updateUser: (user: IUser) => void
}

const User: React.FC<Props> = ({ user, confirmDeletion, updateUser }) => {
  const [dataToEdit, setDataToEdit] = React.useState<IUser | null>();

  const updateHandler = React.useCallback((user) => {
    setDataToEdit(null);
    updateUser(user);
  }, [updateUser]
  );

  if (dataToEdit) {
    return <UserForm
      header="Edit user"
      user={dataToEdit}
      onCancel={() => setDataToEdit(null)}
      onSubmitButtonClicked={updateHandler} />

  }
  else {
    return (<>
      <Table.Cell>{user.username}</Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell collapsing>
        <Button primary animated='vertical' onClick={() => confirmDeletion(user)}>
          <Button.Content hidden>Delete</Button.Content>
          <Button.Content visible>
            <Icon name='user delete' />
          </Button.Content>
        </Button>
        <Button primary animated='vertical' onClick={() => setDataToEdit({ ...user })}>
          <Button.Content hidden>Edit</Button.Content>
          <Button.Content visible>
            <Icon name='edit outline' />
          </Button.Content>
        </Button>
      </Table.Cell>
    </>)
  }
}

export default User