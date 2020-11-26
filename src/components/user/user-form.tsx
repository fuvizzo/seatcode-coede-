import * as React from "react"
import { IUser } from "../../store/users/types"
import { Button, Icon, Modal, Form } from 'semantic-ui-react'

type Props = {
  onSubmitButtonClicked: (user: IUser) => void
  onCancel: () => void
  user: IUser,
  header: string
}

const UserForm: React.FC<Props> = ({
  header,
  user,
  onSubmitButtonClicked,
  onCancel
}) => {
  const [userData, setUserData] = React.useState<IUser>(user)

  const handleUserData = (e: React.FormEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  const handelSubmitButtonClick = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmitButtonClicked(userData)
  }

  return (
    <Modal
      onClose={onCancel}
      onOpen={() => userData !== null}
      open={userData !== null}
    >
      <Modal.Header>{header}</Modal.Header>

      <Modal.Content>
        <Form >
          <Form.Input fluid
            type="text"
            id="username"
            name="username"
            value={userData.username}
            placeholder="Username"
            onChange={handleUserData}
          />
          <Form.Input fluid
            type="text"
            id="name"
            name="name"
            value={userData.name}
            placeholder="First name and last name"
            onChange={handleUserData}
          />
          <Form.Input fluid
            type="text"
            id="email"
            name="email"
            value={userData.email}
            placeholder="Email"
            onChange={handleUserData}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onCancel} animated='vertical'>
          <Button.Content hidden>Cancel</Button.Content>
          <Button.Content visible>
            <Icon name='cancel' />
          </Button.Content>
        </Button>
        <Button onClick={handelSubmitButtonClick} primary animated='vertical'>
          <Button.Content hidden>Save</Button.Content>
          <Button.Content visible>
            <Icon name='save' />
          </Button.Content>
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default UserForm;