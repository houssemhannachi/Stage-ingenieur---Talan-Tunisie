import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Candidat} from "../_services/Candidat";
import { CandidatService } from '../_services/candidat.service';

@Component({
  selector: 'app-candidat-list',
  templateUrl: './candidat-list.component.html',
  styleUrls: ['./candidat-list.component.css']
})
export class CandidatListComponent implements OnInit {

  candidats:any;
  p:number=1;
  nom:any;

  constructor(private candidatService: CandidatService,private router: Router) { }

  ngOnInit(): void {
    this.getCandidats();
  }
  key:string='nom';
  reverse:boolean=false;
  sort(key:string){
  this.key=key;
  this.reverse=!this.reverse;
}
  private getCandidats(){
    this.candidatService.getList().subscribe(data => {
      this.candidats = data;
    });
  }

  create(){
    this.router.navigate(['add-candidat']);
  }
  candidatDetails(id: number){
    this.router.navigate(['candidat-details', id]);
  }

  update(id: number){
    this.router.navigate(['update-candidat', id]);
  }

  delete(id: number){

    if (confirm(`Voulez-vous supprimer le candidat #${id}`)) {
      this.candidatService.delete(id)
        .pipe(first())
        .subscribe(
          success => console.log('candidat supprimé'),
          error2 => console.error(' suppression du candidat annulé')

        );
    }
  }

  exportpdf():void{
    let DATA: any = document.getElementById('candidat-table');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('liste candidat.pdf');
    });
  }
}
