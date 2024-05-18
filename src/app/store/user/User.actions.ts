import { createAction, props } from '@ngrx/store'

export const loadUsers = createAction(
  '[User] Load Users',
  props<{pageNumber: number }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ response: any }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);


export const loadSingleUser = createAction(
  '[singleUser] Load User',
  props<{ userId: number }>()
);

export const loadSingleUserSuccess = createAction(
  '[singleUser] Load User Success',
  props<{ response:any }>()
);

export const loadSingleUserFailure = createAction(
  '[singleUser] Load User Failure',
  props<{ error: any }>()
);

export const filterUsersById = createAction(
  '[User] Filter Users By ID',
  props<{ id: number }>()
);


export const resetUsersFilter = createAction('[User] Reset Users Filter');