import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import {Constants} from '../utils/constants';
import {StorageService} from '../services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(private router: Router, private  storageService: StorageService){

  }

  async canLoad(): Promise<boolean> {

    const hasSeenIntro =  await this.storageService.getStorage(Constants.INTRO_KEY);

    if (hasSeenIntro && ( hasSeenIntro.value === 'true')){
      return true;
    }else {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return true;

    }

  }
}
