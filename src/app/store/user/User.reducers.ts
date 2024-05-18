
import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './User.actions';
import { UserModel } from './User.model'


export const userFeatureKey = 'userState';


//initial state interface
export interface UsersState {
  readonly user: null;
  users: UserModel[];
  copiedUsers: UserModel[];
  loading: boolean;
  pageNumber: number;
  total_pages: number;
  error: null;
}

// an initial state
export const initialUserState: UsersState = {
  users: [],
  user: null,
  copiedUsers: [],
  loading: false,
  pageNumber: 1,
  total_pages:1,
  error: null
};

// 2. reducer functions to manipulate the state
const usersReducer = createReducer(
  initialUserState,

 // first endpoint fetch users
  on(UserActions.loadUsers, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loadUsersSuccess, (state, {response}) => {
    return {
      ...state,
      users: response.data,
      copiedUsers:response.data,
      total_pages: response.total_pages,
      loading: false,
      error: null
    }
  }),
  on(UserActions.loadUsersFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),

  // second endpoint fetch single user
  on(UserActions.loadSingleUser, (state, action) => {
    return {
      ...state,
      loading: true,
    }
    }),
  on(UserActions.loadSingleUserSuccess, (state, {response}) => {
    return {
      ...state,
      user: response,
      loading: false,
      error: null
    }
  }),
  on(UserActions.loadSingleUserFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),

  //updating the state when searching for specific user by id
  on(UserActions.filterUsersById, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id === id)
  })),
  on(UserActions.resetUsersFilter, (state) => ({
    ...state,
    users: state.copiedUsers
  }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}