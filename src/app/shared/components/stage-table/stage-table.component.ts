import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { InputGroupNumberSwipeComponent } from "../../controls/input-group-number-swipe/input-group-number-swipe.component";
import { InputNumberSwipeComponent } from "../../controls/input-number-swipe/input-number-swipe.component";
import { IMatchPlayer } from 'src/app/core/models/match/match-players.model';
import { EStages } from 'src/app/core/enums/stages.enum';
import { BaseComponent } from '../base.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { StagePlayerDataSource } from 'src/app/core/models/stage/stage-player-datasource.model';
import { IStagePlayerList } from 'src/app/core/models/stage/stage-player-list.model';
import { IMatchPlayersStages } from 'src/app/core/models/match/match-players-stages.model';
import { mockStagePlayerList } from 'src/mocks/mock-stagePlayersList';
import { stagesList } from 'src/app/core/constants/stages.constante';

@Component({
  selector: 'app-stage-table',
  imports: [InputNumberSwipeComponent, 
            InputGroupNumberSwipeComponent, 
            MatTableModule, 
            MatIconModule, 
            TranslocoModule
          ],
  templateUrl: './stage-table.component.html',
  styleUrl: './stage-table.component.less'
})
export class StageTableComponent extends BaseComponent implements OnInit {
  @Input({ required: true}) playersList!: IMatchPlayer[];
  @Input({ required: true}) stage!: EStages;
  @Output() valueChange: any = new EventEmitter<IStagePlayerList>();

  stagePlayerDataSource = new StagePlayerDataSource();
  displayedColumns: string[] = ['table-player', 'table-score'];
  orderBy: any = 'asc';
  stagePlayerList: IStagePlayerList[] = [];

  eStages = EStages;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {
    super();
  }


  ngOnInit(): void {
    this._refreshDataSourceList();
  }

  ngAfterViewInit() {
    const headerRow = this.el.nativeElement.querySelector('.mat-mdc-header-row');
    if (headerRow) {
      this.renderer.setStyle(headerRow, 'background-color', this.getStageColor(0), 1);
      this.renderer.setStyle(headerRow, 'color', this.getStageColor(1), 1);
    }
  }

  private _refreshDataSourceList(): void {
    if (this.playersList && this.playersList.length > 0) {
      this.playersList.forEach((player: IMatchPlayer) => {
        const stage = player.stages.find((stage: IMatchPlayersStages) => stage.stage.stage === this.stage);
        if (stage) this.stagePlayerList.push({player: player.player, stages: stage});
      });
    }

    this.stagePlayerDataSource.setData(this.stagePlayerList);
  }

  private getValueStage(index: number): number | number[]{
    return this.stagePlayerList[index].stages.getStageScores(this.stage);
  }

  private getStageColor(index: number): string {
    return stagesList.find((stage) => stage.stage === this.stage)?.color[index] || (index === 0 ? '#000000' : '#ffffff');
  }

  public getValueStageAsNumber(index: number): number {
    return this.getValueStage(index) as number;
  }

  public getValueStageAsArray(index: number): number[] {
    return this.getValueStage(index) as number[];
  }

  public hasArrayValue(): boolean{
    return this.stage === EStages.SCIENCE;
  }

  public updateValue(value: number | number[], index: number) {
    this.stagePlayerList[index].stages.setStageScores(value, this.stage);
    this._refreshDataSourceList();
  }

}
