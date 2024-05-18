import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from '../../../../store/user/User.model';
import { selectLoading, selectNumberOfPages, selectUsers } from '../../../../store/user/User.selectors';
import { Observable } from 'rxjs';
import { UsersState } from '../../../../store/user/User.reducers';
import { loadUsers } from '../../../../store/user/User.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  public users: Observable<UserModel[]> = this.store.select(selectUsers);
  public total_pages: Observable<number> = this.store.select(selectNumberOfPages);
  public loading: Observable<boolean> = this.store.select(selectLoading);


  numberOfPages: any = [];
  pageNumber: number = 1;


  constructor(private store: Store<UsersState>, private router: Router) { }

  ngOnInit(): void {

    this.store.dispatch(loadUsers({ pageNumber: this.pageNumber }));

  // determine the number of bullets to display as a paginator
    this.total_pages.subscribe(state => {
      this.numberOfPages.length = state
    });
  }


  // Method to update page number and fetch users
  getPageNumber(id: number): void {
    this.pageNumber = id + 1;
    this.store.dispatch(loadUsers({ pageNumber: this.pageNumber }));
  }

  getUserDetails(id: number) {
    this.router.navigate(['/userDetails', id]);
  }
}
