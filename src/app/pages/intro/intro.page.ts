import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { IonSlides } from '@ionic/angular';
import {StorageService} from '../../services/storage.service';
import {Constants} from '../../utils/constants';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router, private  storageService: StorageService){

  }

  ngOnInit() {
  }

  next(){

    this.slides.slideNext();
  }

  async start(){
    await  this.storageService.saveToStorage(Constants.INTRO_KEY, true);
    this.router.navigateByUrl('/login', { replaceUrl: true });

  }

}
