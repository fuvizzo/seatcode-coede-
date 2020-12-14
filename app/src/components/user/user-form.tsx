import * as React from 'react';
import {
  Button, Icon, Modal, Form,
} from 'semantic-ui-react';
import { IUser, IUserData } from '../../store/users/types';

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
  onCancel,
}) => {
  const [userData, setUserData] = React.useState<IUserData>(user.data);

  const handleUserData = (e: React.FormEvent<HTMLInputElement>) => {
    let { value }: any = e.currentTarget;
    if (e.currentTarget.type === 'number') {
      value = Number(value);
    }
    setUserData({
      ...userData,
      [e.currentTarget.name]: value,
    });
  };

  const handelSubmitButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitButtonClicked({
      id: user.id,
      data: userData,
    });
  };

  return (
    <Modal
      data-testid="user-from-modal"
      onClose={onCancel}
      onOpen={() => userData !== null}
      open={userData !== null}
    >
      <Modal.Header>{header}</Modal.Header>

      <Modal.Content>
        <Form>
          <Form.Input
            fluid
            disabled={user.id !== ''}
            type="text"
            id="username"
            name="username"
            value={userData.username}
            placeholder="Username"
            onChange={handleUserData}
          />
          <Form.Input
            fluid
            type="text"
            id="name"
            name="name"
            value={userData.name}
            placeholder="First name and last name"
            onChange={handleUserData}
          />
          <Form.Input
            fluid
            type="text"
            id="email"
            name="email"
            value={userData.email}
            placeholder="Email"
            onChange={handleUserData}
          />
          <Form.Input
            fluid
            type="number"
            id="age"
            name="age"
            value={userData.age}
            placeholder="Age"
            onChange={handleUserData}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onCancel} animated="vertical">
          <Button.Content hidden>Cancel</Button.Content>
          <Button.Content visible>
            <Icon name="cancel" />
          </Button.Content>
        </Button>
        <Button
          data-testid="save-changes-btn"
          onClick={handelSubmitButtonClick}
          primary
          animated="vertical"
        >
          <Button.Content hidden>Save</Button.Content>
          <Button.Content visible>
            <Icon name="save" />
          </Button.Content>
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default UserForm;
