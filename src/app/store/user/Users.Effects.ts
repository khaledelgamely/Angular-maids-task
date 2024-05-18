
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from './User.actions';
import { UserService } from '../../services/user.service';
import { loadUsersFailure, loadUsersSuccess } from './User.actions';


@Injectable()
export class UserEffects {

  // get users
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap((action) =>
        this.userService.getUsers(action.pageNumber).pipe(
          map((response) => loadUsersSuccess({ response })),
          catchError(
            error => of(loadUsersFailure({error}))
          )
        ))
    );
  });

  //get single user
  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadSingleUser),
      switchMap((action) =>
        this.userService.getUserById(action.userId).pipe(
          map((response) => UserActions.loadSingleUserSuccess({ response })),
          catchError(
            error => of(UserActions.loadSingleUserFailure({error}))
          )
        ))
    );
  });

  constructor(private actions$: Actions,
              private userService: UserService) {
  }

}