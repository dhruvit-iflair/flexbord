import { Component, OnInit } from '@angular/core';
import { fakedb } from "../../components/common/fakedb";
import { TableData } from '../../components/common/table-data';
import { Http } from "@angular/http";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
public rows:Array<any> = [];
public data:Array<any> =[] ;

public columns:Array<any> = [
  {title: 'Logo', name: 'logo', sort: false},
  {title: 'Name', name: 'name', sort: false},
  {title: 'Address', name: 'city', sort: false},
  {title: 'Registered', name: 'registered', sort: false},
  {title: 'Owner', name: 'email', sort: false},
  {title: 'Action', name: 'button', sort: false}
];
public page:number = 1;
public itemsPerPage:number = 10;
public maxSize:number = 5;
public numPages:number = 1;
public length:number = 0;

public config:any = {
  paging: true,
  sorting: {columns: this.columns},
  filtering: {filterString: '', columnName: 'position'}
};


  public constructor(public http:Http) {
    this.http.get(environment.api + "/organizer")
           .subscribe((res)=>{
             this.rows= res.json();
              if (this.rows) {
                this.rows.forEach(item => {
                  var src=environment.picpoint+'/orglogos/' +item.logo;
                  item['logo'] = '<img src="'+src+'" class="image_display" style="width:50px;height:50px;"></img>';
                   item['button'] = '<a class="btn btn_green tab_btn" style="background-color: #089468;color: #fff;"  [routerLink]="["/organizer/manage/'+item+']");" ><i class="fa fa-pencil" aria-hidden="true"></i></a><a [routerLink]="["/organizer/manage/'+item+']");" class="btn btn_red tab_btn"  style="background-color: #f55f5f;color: #fff;  margin-left:10px" (click)="delete('+item+');" ><i class="fa fa-trash" aria-hidden="true"></i></a>';
                });
                this.length = this.rows.length; 
            }
            this.data = res.json();
           })
  }

  ngOnInit():void {
  }
  // edit(orgData:any){
  //   console.log(orgData);
  // }
  // delete(orgData:any){
  //   console.log(orgData);
  // }
  changeItemsPerPage(it){
    this.itemsPerPage = it;
    this.onChangeTable(this.config);
  }
  public changePage(page:any, data:Array<any> = this.rows):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    if (this.rows) {
        let filteredData = this.changeFilter(this.rows, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }
  }

  public onMyCellClick(data: any, origin:any): any {
    console.log(data);
    console.log(origin);
  }
}

