import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import { selectSingleUserLoading, selectSingleUser } from '../../../../store/user/User.selectors';
import { Store } from '@ngrx/store';
import { UsersState } from '../../../../store/user/User.reducers';
import { loadSingleUser } from '../../../../store/user/User.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId:number = 0;

  public userDetails: Observable<any> = this.store.select(selectSingleUser);
  public loading: Observable<boolean> = this.store.select(selectSingleUserLoading);

 

  constructor(private store: Store<UsersState>, public userService:UserService, private route: ActivatedRoute, private _location: Location) { }
  
  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.getUserInfo(this.userId);
  }

  getUserInfo(userId:number){
    this.store.dispatch(loadSingleUser({userId})); 
  }

  goBack(){
    this._location.back();
  }



}
