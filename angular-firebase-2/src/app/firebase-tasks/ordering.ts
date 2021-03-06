
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cuisinesRef: AngularFireList<any[]>; // to use a PUSH method on it later
  restaurantsRef: AngularFireList<any[]>;
  cuisines: Observable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {

    this.cuisinesRef = this.db.list('cuisines', ref => ref.orderByValue()); // byValue
    // this.cuisinesRef = this.db.list('cuisines', ref => ref.orderByKey()); // byKey
    this.cuisines = this.cuisinesRef.snapshotChanges();

    // this.restaurantsRef = this.db.list('restaurants', ref => ref.orderByChild('name'));
    this.restaurantsRef = this.db.list('restaurants', ref => ref.orderByChild('address/city'));
    this.restaurants = this.restaurantsRef.valueChanges();

  }

}
