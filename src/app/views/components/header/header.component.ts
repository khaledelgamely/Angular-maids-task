import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersState } from '../../../store/user/User.reducers';
import { UserModel } from '../../../store/user/User.model';
import { Observable } from 'rxjs';
import { selectUsers } from '../../../store/user/User.selectors';
import { filterUsersById, resetUsersFilter } from '../../../store/user/User.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  public FilteredUsers: Observable<UserModel[]> = this.store.select(selectUsers);

  constructor (private store: Store<UsersState>, private _userService: UserService) {}

  searchId:any;


  // run the function that filter users and update the state each keyup to the input
  getUser(event:any) {
    this.searchId = event.target.value
    const id = parseInt(this.searchId, 10);
      if (this.searchId === '') {
        this.store.dispatch(resetUsersFilter());
      } else {
        this.store.dispatch(filterUsersById({ id }));
      }
  }
}
