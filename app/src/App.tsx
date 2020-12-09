import React from 'react';
import {
  useParams,
} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import './App.css';
import {
  Container, Dimmer, Loader, Segment,
} from 'semantic-ui-react';
import UserList from './components/user/list';

import * as currentUserActions from './store/current-user/thunk';
import { RootState } from './store';

const connector = connect(
  (state: RootState) => ({
    loading: state.ui.loading,
    currentUser: state.currentUser,
  }),
  currentUserActions,
);

type PropsFromRedux = ConnectedProps<typeof connector>

const App: React.FC<PropsFromRedux> = (props) => {
  const { getCurrentUser, loading, currentUser } = props;
  const { userId } = useParams<Record<string, string | undefined>>();

  React.useEffect(() => {
    if (userId) {
      getCurrentUser(Number(userId));
    }
  }, [userId]);

  return (
    <div className="App">
      <Container>
        {loading && (<Loader active inline>Loading</Loader>)}
        {currentUser.name !== '' && (`Current user: ${currentUser.name} (userId: ${currentUser.id})`)}
        <UserList />
      </Container>
    </div>
  );
};

export default connector(App);
