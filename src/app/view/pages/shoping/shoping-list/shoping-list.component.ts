import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { filter, map, pairwise, throttleTime } from 'rxjs';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.scss'],
  providers:[],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopingListComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  responseData: any[] = [];
  emptyArray = [];
  shoppinglistData
  rohit = 'rohit'
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  itemSize = 80;
  constructor(
    private shoppingService:ShoppingService,
    private ngZone :NgZone
  ) { }

  ngOnInit(): void {
    this.getShopingListData();
    console.log('after',this.emptyArray.forEach(res =>{
      console.log(res )
    }))
  }
  getShopingListData(){
    this.shoppingService.getShoppingList().subscribe( (response: any) => {
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
}
