import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  FantasyService
} from '../../services/fantasy.service';
import {
  Nominee,
  ResultEntity
} from 'src/app/models/oscars.model';
import {
  MovieDetailComponent
} from '../movie-detail/movie-detail.component';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-nominees',
  templateUrl: './nominees.component.html',
  styleUrls: ['./nominees.component.scss']
})
export class NomineesComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  nominees: Nominee[] = [];

  @ViewChild('accordion', {
    static: true
  }) Accordion: MatAccordion;

  constructor(public authService: AuthService, public dialogForm: MatDialog, private fantasyService: FantasyService) {}

  ngOnInit() {
    this.getNominees();
  }

  getNominees(){
    /*
    this.fantasyService.getNominees().subscribe(data => {
      this.nominees = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {},
          isDisabled:false,
          isExpanded:false
        } as Nominee;
      });
    });
    */
    this.fantasyService.getNominees().subscribe(data => {
      console.log(data);
      var cont = 1;
      for(var k in data.data.sections.nominees){
        this.nominees.push(
          {
            id:  cont++,
            isDisabled:false,
            isExpanded:false,
            ...data.data.sections.nominees[k]
          } as Nominee
          );
        }
    });
  }
  onDetail(item: ResultEntity) {
    const dialogFormConfig = new MatDialogConfig();
    dialogFormConfig.disableClose = true;
    dialogFormConfig.autoFocus = true;
    dialogFormConfig.width = '95%';
    dialogFormConfig.maxWidth = '95%';
    if (item.nominee_category_dict[0].name.includes("Actor") || item.nominee_category_dict[0].name.includes("Actress")) {
      item.post_title = item.nominee_description;
      dialogFormConfig.data = item;
    } else {
      dialogFormConfig.data = item;
    }
    this.dialogForm.open(MovieDetailComponent, dialogFormConfig);
    // this.dialogForm.afterAllClosed.pipe(
    //   first(),
    //   // takeUntil(this.onDestroy)
    // ).subscribe(() => this.getNominees());
  }



  beforePanelClosed(panel) {
    panel.isExpanded = false;
  }
  beforePanelOpened(panel) {
    panel.isExpanded = true;
  }

  afterPanelClosed() {}
  afterPanelOpened() {}

  closeAllPanels() {
    this.Accordion.closeAll();
  }

  openAllPanels() {
    this.Accordion.openAll();
  }

  ngOnDestroy() {

  }
}
