import { Component, Input, OnInit } from '@angular/core';
import { EditDto } from 'src/app/models/editDto';
import { EditableInfo } from 'src/app/models/editableInfo';
import { ProsumerService } from 'src/app/services/prosumer.service';

@Component({
  selector: 'app-edit-info-form',
  templateUrl: './edit-info-form.component.html',
  styleUrls: ['./edit-info-form.component.css']
})
export class EditInfoFormComponent implements OnInit{

  @Input() userData:any;

  firstName : string = '';
  lastName : string = '';
  email : string = '';
  notFilled : boolean = false;
  success : boolean = false;
  failure : boolean = false;

  privremeniId:string = '6e2e9369-1386-4be4-8690-a4b7545ecbce';

  constructor(private userService : ProsumerService) {}

  ngOnInit(): void {
    this.loadInfo()
    this.allToFalse();
  }

  loadInfo()
  {
    this.firstName = this.userData.firstName;
    this.lastName = this.userData.lastName;
    this.email = this.userData.email;
  }
  editInfo()
  {
    //console.log(dto);
    if(this.firstName!="" && this.lastName!="" && this.email!="")
    {
      this.allToFalse();

      let dto : EditDto = new EditDto();
      dto.firstName = this.firstName;
      dto.lastName = this.lastName;
      dto.email = this.email;

      this.userService.editInfo(this.privremeniId,dto)
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
      })
    }
    else
    {
      this.allToFalse();
      this.notFilled = true;
    }
  }

  private allToFalse()
  {
    this.notFilled = false;
    this.success = false;
    this.failure = false;
  }

}
