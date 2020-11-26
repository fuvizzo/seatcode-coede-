import React from 'react';
import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { UserList } from '../list';
import jsonData from '../../../../mock/db.json';
import { IUserList } from '../../../store/users/types';

const { users } = jsonData;
const mock :IUserList = {
  loading: false,
  users,
  search: { query: '' },
  sort: {
    column: 'username',
    direction: 'ascending',
  },
};

const mockedCRUDFn = () => {};

const UserListComponent = (
  <UserList
    getUsers={mockedCRUDFn}
    createUser={mockedCRUDFn}
    deleteUser={mockedCRUDFn}
    updateUser={mockedCRUDFn}
    sortUserBy={mockedCRUDFn}
    searchUser={mockedCRUDFn}
    userList={mock}
  />
);

describe('UserList', () => {
  it('shoud render properly', () => {
    render(UserListComponent);
  });

  it('shoud render a Table component', () => {
    render(UserListComponent);
    const table = screen.queryByTestId('table');
    expect(table).toBeTruthy();
  });

/*   it(`shoud render ${users.length} Table Row components`, () => {
    const userListLenght = users.length;
  }); */
});
