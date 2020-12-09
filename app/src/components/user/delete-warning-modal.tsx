// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { IUser } from '../../store/users/types';

type Props = {
  onSubmitButtonClicked: () => void
  onCancel: () => void
  user: IUser
}

const DeleteWarningModal: React.FC<Props> = ({
  user,
  onSubmitButtonClicked,
  onCancel,
}) => (
  <Modal
    onClose={onCancel}
    open={user !== null}
  >
    <Modal.Header>Deleting user...</Modal.Header>
    <Modal.Content>
      If you proceed the user
      {' '}
      <strong>{user.username}</strong>
      {' '}
      will be deleted permanently. Proceed anyway?
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={onCancel} animated="vertical">
        <Button.Content hidden>Cancel</Button.Content>
        <Button.Content visible>
          <Icon name="cancel" />
        </Button.Content>
      </Button>
      <Button primary animated="vertical" onClick={onSubmitButtonClicked}>
        <Button.Content hidden>Proceed</Button.Content>
        <Button.Content visible>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
    </Modal.Actions>
  </Modal>
);

export default DeleteWarningModal;
