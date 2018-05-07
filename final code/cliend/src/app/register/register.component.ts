import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      // Email Input
      email: ['', Validators.required],
      // Username Input
      username: ['', Validators.required],
      // Password Input
      password: ['', Validators.required],

      image:['',Validators.required]
    });
  }

  onRegisterSubmit(){
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value

    }
    
    
    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; 
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data.message; // Set a success message
        // After 2 second timeout, navigate to the login page
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login view
        }, 2000);
      }
  });
}
  ngOnInit() {
  }

}