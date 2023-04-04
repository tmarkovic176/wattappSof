import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EditDto } from 'src/app/models/editDto';
import { ProsumerService } from 'src/app/services/prosumer.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  currentPass : string =''
  newPass : string = ''
  confirmNewPass : string = ''

  failure : boolean = false;
  success : boolean = false;
  dontMatch : boolean = false;
  incorrectCurrent : boolean = false;
  empty : boolean = false;

  constructor(private userService : ProsumerService, private cookie : CookieService) {}

  ngOnInit(): void {
    this.allToFalse();
  }

  changePass()
  {
    if(this.newPass =="" || this.confirmNewPass =="") // || this.currentPass==""
    {
      this.allToFalse();
      this.empty = true;
    }
    else if(this.newPass != this.confirmNewPass)
    {
      this.allToFalse();
      this.dontMatch = true;
    }
    else
    {
      //prvo da se pozove fja da se potvrdi trenutna sifra pa ako je to uspesno da se pozove f-ja za izmenu
      let dto : EditDto = new EditDto();
      dto.password = this.newPass;

      this.userService.editInfo(this.cookie.get('id'), dto)
      .subscribe({
        next:(res)=>{
          this.allToFalse();
          this.success = true;
        },
        error:(err)=>{
          this.allToFalse();
          console.log(err.error);
          this.failure = true;
        }
      });
    }
  }

  private allToFalse()
  {
    this.failure = false;
    this.success = false;
    this.dontMatch = false;
    this.incorrectCurrent = false;
    this.empty = false;
  }
}
