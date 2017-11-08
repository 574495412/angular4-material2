
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {Router, Params} from '@angular/router'; 
import {FormControl, Validators} from '@angular/forms';
import {CashRegisterService} from '../cashregister.server';
import {MatPaginator} from '@angular/material';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { IPost } from '../models/post';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatSort } from '@angular/material';
import {MatDialog} from '@angular/material';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
// import { AnnualReporteDialog } from '../annual-report/annual-report.component';
// import { MonthlyReporteDialog } from '../monthly-report/monthly-report.component';
@Component({
  selector: 'annual-report-dialog',
  templateUrl: '../annual-report/annual-report-dialog.html',
  styleUrls: ['../manage-post/manage-post.component.scss']
})
export class AnnualReporteDialog implements OnInit {

  public dataSize: number;
  public dataSource: PostDataSource;
  public displayedColumns = ['check','date','orderQuantity', 'income', 'cash', 'card','mealTicket','other1' ,'other2','other3'];
  public deleteDataSource = new DeleteDataSource();
  public deleteOrderDataSource = new DeleteOrderDataSource();
  public deleteOrderDisplayedColumns = ['date','id','price','reason'];
  public deleteDisplayedColumns = ['type','typeNumber','orderQuantity','grossIncome', 'taxRate','taxIncome'];
  // @ViewChild('startDatePicker') startDatePicker: MdDatepicker<Date>;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router:Router, private postService: CashRegisterService,public dialog: MatDialog,private dateAdapter:DateAdapter<Date>) {
    dateAdapter.setLocale('LL');
   }
  print="printDate";
  cashStatements:any[];
  selectedId:number=0;
  index:number=9;
  ngOnInit() {
    this.getCashRegister();
  }

  /************************* 获取年报表 ********************************/
  getCashRegister() {

        this.postService.getCashAnnulReport()
          .then(
            res => {
              this.cashStatements=res;
              this.setPosts(res)
            },
            error => {
              console.log('获取报表失败');
              alert('Error ' + error)
            }
          )
      }
    getCashAnnualRegister() {
      this.postService.getCashAnnulReport()
        .then(
          res => {
            this.cashStatements=res;
            this.setPosts(res)
          },
          error => {
            console.log('获取报表失败');
            alert('Error ' + error)
          }
        )
    }
  delAllcashStatement(){
    this.cashStatements=[];
    this.setPosts(this.cashStatements);
  }
  setPosts(result): void {
    if (result.error) {
        alert('Web API error ' + result.message);
    }

    this.dataSource = new PostDataSource(result, this.sort);
    this.dataSize = result.length;
    console.dir(result);
  }
  onDateChange(e){
    this.router.navigate(['cashregister']); 
  }
  onAnnualDateChange(e){
    this.openAnnualDialog();
  }
  onMonthlyDateChange(e){
    this.openMonthlyDialog();
  }
  openAnnualDialog() {
    this.router.navigate(['cashregister/annualreport']); 
    // const dialogRef = this.dialog.open(AnnualReporteDialog, {
    //   height: 'auto'
    // });
    // this.print='printYear';
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  openMonthlyDialog() {
    // const dialogRef = this.dialog.open(DialogContent, {
    //   height: 'auto'
    // });
    this.router.navigate(['cashregister/monthlyreport']); 
    // this.print='printMonth';
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
export interface deleteOrderElement {
  date: string;
  id:string;
  price: string;
  reason: string;
}
['date','id','price','reason']
const deleteOrderData: deleteOrderElement[] = [
  {date:'2017-08-21 12:21',  id:'1', price: '200' ,reason: '下单失败'},
  {date:'2017-09-01 08:20',  id:'2', price: '312' ,reason: '取消订单'},
  {date:'2017-09-10 12:11',  id:'3', price: '426' ,reason: '过期删除'},
  {date:'2017-09-11 02:27',  id:'4', price: '436' ,reason: '过期删除'},
  {date:'2017-09-20 12:19',  id:'5', price: '459' ,reason: '下单失败'},
  {date:'2017-10-10 02:11',  id:'6', price: '526' ,reason: '取消订单'},
  {date:'2017-10-20 07:34',  id:'7', price: '670' ,reason: '过期删除'},
  {date:'2017-11-02 11:56',  id:'8', price: '732' ,reason: '取消订单'},
];

export class DeleteOrderDataSource extends DataSource<deleteOrderElement> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<deleteOrderElement[]> {
    return Observable.of(deleteOrderData);
  }

  disconnect() {}
}
export interface Element {
  type: string;
  typeNumber:string;
  orderQuantity: string;
  grossIncome: string;
  taxRate: string;
  taxIncome:string;
}

const data: Element[] = [
  {type:'餐饮类型',  typeNumber:'12',orderQuantity: '12', grossIncome: '2000' ,taxRate: '10%(200)',taxIncome:'1800'},
  {type:'打包类型', typeNumber:'12',orderQuantity: '12', grossIncome: '2000' ,taxRate: '10%(200)',taxIncome:'1800'},
  {type:'送包类型', typeNumber:'12',orderQuantity: '12', grossIncome: '2000' ,taxRate: '10%(200)',taxIncome:'1800'},
  {type:'常规税率', typeNumber:'其他税率1', orderQuantity: '其他税率2', grossIncome: '其他税率3' ,taxRate: '其他税率4',taxIncome:'总的税率'},
  {type:'300', typeNumber:'20%(200)',orderQuantity: '0%(0)', grossIncome: '0%(0)' ,taxRate: '0%(0)',taxIncome:'500'},
];

export class DeleteDataSource extends DataSource<Element> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data);
  }

  disconnect() {}
}
export class PostDataSource extends DataSource<IPost> {

  get data(): IPost[] { return this.dataChange.value; }
  dataChange: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  constructor(private posts: IPost[], private _sort: MatSort) {
    super();
  }

  connect(): Observable<IPost[]> {
    const displayDataChanges = [
      this.dataChange,
      this._sort.sortChange,
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }
  disconnect(): void {
  }
  /** Returns a sorted copy of the database data. */
 getSortedData(): IPost[] {
  const data = this.posts.slice();
  console.log(this._sort.active)
  if (!this._sort.active || this._sort.direction == '') { return data; }
  return data.sort((a, b) => {
    let propertyA: number|string = '';
    let propertyB: number|string = '';
    let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
  });
}
}
@Component({
  selector: 'dialog-content',
  template: '<router-outlet></router-outlet>'
})
export class DialogContent{}


