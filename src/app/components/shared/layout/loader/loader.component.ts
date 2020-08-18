import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  noOfSkeleton;
  constructor() { }

  ngOnInit(): void {
  }
  noOfLoader(n: number): any[] {
   return this.noOfSkeleton(n);
 }
}
