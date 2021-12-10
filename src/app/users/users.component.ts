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
  addNewUser: FormGroup;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    // get all users
    this.loadUsers();

    // add user form validation
    this.addNewUser = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  // get all users
  loadUsers() {
    return this.usersService.loadPage().subscribe(
      (response) => {
        // get users
        this.users = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Create a new User
  onCreateNewUser(values) {
    const User = {
      firstName: this.addNewUser.get("firstName").value,
      lastName: this.addNewUser.get("lastName").value,
      email: this.addNewUser.get("email").value,
    };
    return this.usersService.saveNewUser(User).subscribe(
      (response) => {
        let NewUser = {
          first_name: response.firstName,
          last_name: response.lastName,
          email: response.email,
          avatar: response.avatar ? response.avatar : "",
        };
        this.users.unshift(NewUser);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Delete an user
  onDeleteUser(user) {
    return this.usersService.deleteUser(user).subscribe((response) => {
      let index = this.users.indexOf(user);
      this.users.splice(index, 1);
      console.log(response);
    });
  }

  // Update a current user
  onUpdateUser(user) {
    this.addNewUser.controls["firstName"].setValue(user.first_name);
    this.addNewUser.controls["lastName"].setValue(user.last_name);
    this.addNewUser.controls["email"].setValue(user.email);
  }

  onupdateCurrentUser(values, user) {
    let UpdatedUser = {
      name: values.firstName + values.lastName,
      job: values.firstName,
    };

    return this.usersService.updateUser(UpdatedUser, user.id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  resetForm() {
    this.addNewUser.controls["firstName"].setValue("");
    this.addNewUser.controls["lastName"].setValue("");
    this.addNewUser.controls["email"].setValue("");
  }

  onClickAddNewUser() {
    this.resetForm();
  }

}
