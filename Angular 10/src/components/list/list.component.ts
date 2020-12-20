import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LandMarkDto } from 'src/app/models/land-mark.model';
import { LandMarkService } from 'src/services/landmark.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  landMarkList: LandMarkDto[];
  landMarkListDataSource: any;
  displayedColumns: string[] = ['landmarkName', 'address', 'pointOrder', 'distance'];
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private router: Router, private _service: LandMarkService) { }

  ngOnInit(): void {
    this._service.getData().pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      this.landMarkList = x;
      this.landMarkListDataSource = new MatTableDataSource<LandMarkDto>(this.landMarkList);
    })
  }
  routeAdd = () => {
    this.router.navigate(['/add']);
  }
  getAddress(address: string): string {
    return (address?.length >= 15) ? (address?.substring(0, 15) + ' <span class="extra-address">...</span>') : address;
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
