import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { ICustomPaginator } from '../interface/ICustomPaginator.interface';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.scss'],
})
export class CustomPaginatorComponent
  extends BaseComponent
  implements OnDestroy
{
  @Output() changeEvent = new EventEmitter();
  @Input() totalRecords!: number;

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    BaseComponent.pageIndex = 0;
    BaseComponent.pageSize = 15;
  }

  paginatorUpdate(event: ICustomPaginator) {
    if (!event) {
      return;
    }

    BaseComponent.pageIndex = event.pageIndex!;
    BaseComponent.pageSize = event.pageSize!;
    this.changeEvent.emit();
  }
}
