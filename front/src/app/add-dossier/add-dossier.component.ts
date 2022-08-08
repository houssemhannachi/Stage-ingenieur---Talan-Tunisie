import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {DossierCandidature} from "../_services/dossier.candidature";
import {DossierService} from "../_services/dossier.service";
import {CandidatService} from "../_services/candidat.service";
import {UserService} from "../_services/user.service";


@Component({
  selector: 'app-add-dossier',
  templateUrl: './add-dossier.component.html',
  styleUrls: ['./add-dossier.component.css']
})
export class AddDossierComponent implements OnInit {


  dossier: DossierCandidature = new DossierCandidature();
  dossiers: any;
  candidats: any;
  managers: any;


  constructor(private DossierService: DossierService, private router: Router, private candidatService: CandidatService, private userService: UserService) {
  }


  getCandidats(nom:string,prenom:string){
    this.candidatService.getCandidatsByName(nom,prenom).subscribe(data => {
      this.candidats = data;
      console.log(this.candidats)


    });
  }



  getManager(name:string) {
      this.userService.getUsersByNameAndRole(name,"ROLE_MANAGER")
        .subscribe(data => {
        this.managers = data;
        console.log(this.managers)
      });;
  }



    ngOnInit(): void {

  }


    save(){
      this.DossierService.create(this.dossier).subscribe( data =>{

        this.goToList();
      },
      error => console.log(error));
    }

    goToList(){
      this.router.navigate(['/dossier']);
    }

    onSubmit(){
      this.save();
    }


  selectManager(target: EventTarget|null) {
    console.log((target as HTMLInputElement).value)
  }
}



