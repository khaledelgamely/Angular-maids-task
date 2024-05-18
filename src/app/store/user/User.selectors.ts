
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './User.reducers';

export const selectUsersState = createFeatureSelector<fromUser.UsersState>(
  fromUser.userFeatureKey
);

export const selectUsers = createSelector(
  selectUsersState,
  state => state.users
);

export const selectLoading = createSelector(
  selectUsersState,
  state => state.loading
);

export const selectNumberOfPages = createSelector(
  selectUsersState,
  state => state.total_pages
);


export const selectSingleUser = createSelector(
  selectUsersState,
  state => state.user
);

export const selectSingleUserLoading = createSelector(
  selectUsersState,
  state => state.loading
);