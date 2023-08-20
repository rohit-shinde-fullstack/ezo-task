import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, filter, map, pairwise, takeUntil, throttleTime, timer } from 'rxjs';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.scss'],
  providers:[],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopingListComponent implements OnInit, AfterViewInit,OnDestroy{
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  responseData: any[] = [];
  private destroy$ = new Subject();
  emptyArray = [];
  shoppinglistData
  rohit = 'rohit'
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  itemSize = 80;
  loading:boolean = false;
  constructor(
    private shoppingService:ShoppingService,
    private ngZone :NgZone
  ) { }

  ngOnInit(): void {
    this.getShopingListData();
    this.loading = true;
  }
  getShopingListData(){
    this.shoppingService.getShoppingList().pipe(takeUntil(this.destroy$)).subscribe( (response: any) => {
      this.responseData = response.items;
      console.log(this.responseData)
       // Assign the API response to the variable
    },
    (error) => {
      console.error('Error fetching API data:', error);
    })
};
ngAfterViewInit(): void {
  this.scroller.elementScrolled().pipe(
    map(() => this.scroller.measureScrollOffset('bottom')),
    pairwise(),
    filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
    throttleTime(200)
  ).subscribe(() => {
    this.ngZone.run(() => {
     this.getShopingListData();
    });
  })

}
ngOnDestroy(): void {
  this.destroy$.next(null);  // trigger the unsubscribe
  this.destroy$.complete(); // finalize & clean up the subject stream
}
}
