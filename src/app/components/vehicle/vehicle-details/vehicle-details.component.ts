import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
   images = [
      'https://images.unsplash.com/photo-1498887960847-2a5e46312788?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&h=1000&q=80',
      'https://images.unsplash.com/photo-1470162015499-2b9772941cde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=80',
      'https://images.unsplash.com/photo-1471174617910-3e9c04f58ff5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&h=1000&q=80'
   ];
 
   @ViewChild('carousel', {static : false}) carousel: NgbCarousel;
 
  
 

  ngOnInit(): void {
  }

}
