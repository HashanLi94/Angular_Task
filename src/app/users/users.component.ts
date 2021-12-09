import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "./users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: any = [];
  pageOfItems = [];
  pager = {};
  addNewUser: FormGroup;
  SelectedUser = {}
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((x) => this.loadPage(x.page || 1));

    // add user form validation
    this.addNewUser = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  loadPage(page) {
    return this.usersService.loadPage(page).subscribe(
      (response) => {
        // get users
        this.users = response.data;
        // pagination
        let Obj = {
          pages: response.total_pages,
          currentPage: response.per_page,
        };
        this.pager = Obj;
        this.pageOfItems = response.per_page;
        console.log(response.total_pages);
        console.log(response.total);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCreateNewUser(values) {
    const User = {
      firstName: this.addNewUser.get("firstName").value,
      lastName: this.addNewUser.get("lastName").value,
      email: this.addNewUser.get("email").value,
    };
    return this.usersService.saveNewUser(User).subscribe(
      (response) => {
        console.log(response);
        let NewUser = {
          first_name: response.firstName,
          last_name: response.firstName,
          email: response.firstName,
          avatar: response.avatar ? response.avatar : "",
        };
        this.users.unshift(NewUser);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeleteUser(user) {
    return this.usersService.deleteUser(user).subscribe (
      response => {
        let index = this.users.indexOf(user);
        this.users.splice(index, 1);
        console.log(response);
      }
    )
  }

  onUpdateUser(user) {
    this.addNewUser.controls['firstName'].setValue(user.first_name);
    this.addNewUser.controls['lastName'].setValue( user.last_name);
    this.addNewUser.controls['email'].setValue(user.email);
  }

  onupdateCurrentUser(values, user) {
    let UpdatedUser = {
      name: values.firstName + values.lastName,
      job: values.firstName,
    }

    return this.usersService.updateUser(UpdatedUser, user.id)
    .subscribe( response => {
      console.log(response);
    },
    error => {
      console.log(error);
    })
  }
}
