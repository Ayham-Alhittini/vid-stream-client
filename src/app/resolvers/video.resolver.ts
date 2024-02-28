import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Video } from '../Models/video';
import { StreamingService } from '../services/streaming.service';

@Injectable({
  providedIn: 'root'
})
export class VideoResolver implements Resolve<Video> {

  constructor(private streamingService: StreamingService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Video> {
    const videoId = +route.queryParamMap.get('v');
    console.log(videoId);
    
    return this.streamingService.getVideoById(videoId);
  }
}
