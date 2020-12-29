import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PusherService } from 'src/app/pusher.service';
import { DataService } from 'src/app/shared/data service/data.service';
import { TokenService } from 'src/app/shared/token service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
keepLog=false
  constructor(private router:Router,private dataService:DataService, private formBulider:FormBuilder, private tokenService:TokenService) { }

  ngOnInit() {
    this.loginForm = this.formBulider.group({
      password:['',[Validators.required]],
      email:['',[Validators.required]]
    })
  }
showPassword()
{
  var x = <HTMLInputElement>document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
    document.getElementById('show').style.display = 'block';
    document.getElementById('hide').style.display = 'none'
  } else {
    x.type = "password";
    document.getElementById('show').style.display = 'none';
    document.getElementById('hide').style.display = 'block'
  }
}
keepLogged(event)
{
  this.keepLog = event.target.checked
}
logIn()
{
console.log("value",this.loginForm.value)
  this.dataService.post("user/login",this.loginForm.value).subscribe(
    (response:any) => {
      console.log("response",response)
    //  localStorage.setItem("storage",`${this.keepLog}`)
    PusherService.user = response.user
        this.tokenService.setToken(response.token)
       this.router.navigateByUrl("");
      //this.onEditHandler({ message: 'تم ', type: 'success' });
    },
    (err: any) => {
      // console.log("err",err);
      // this.onEditHandlerError();
      // this.onEditHandler({ message: 'حدث خطأ ما', type: 'error' });

    }

  )
}
// onEditHandler(data) {
//   const dialogConfig = new MatDialogConfig();
//   // The user can't close the dialog by clicking outside its body
//   dialogConfig.disableClose = true;
//   dialogConfig.id = "sucess";
//   dialogConfig.data = data
//   dialogConfig.height = "350px";
//   dialogConfig.width = "225px";
//   // https://material.angular.io/components/dialog/overview
//   this.matDialog.open(SuccessComponent, dialogConfig);
// }
}
