import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Plyr from 'plyr';
import { StreamingService } from '../services/streaming.service';
import { Video } from '../Models/video';

@Component({
  selector: 'app-plyr-video',
  templateUrl: './plyr-video.component.html',
  styleUrls: ['./plyr-video.component.css']
})
export class PlyrVideoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement: ElementRef;
  player: Plyr;

  video: Video = null;

  constructor(private route: ActivatedRoute, private router: Router, private streamingService: StreamingService) {
    this.getVideoId();
  }

  ngOnInit() {
    this.getVideoId();
  }

  ngAfterViewInit(): void {
    this.player = new Plyr(this.videoElement.nativeElement);
  }

  ngOnDestroy(): void {
    this.player.destroy();
  }


  private getVideoId() {
    this.route.data.subscribe(data => {
      this.video = data.video as Video;
      if (!this.video) {
        this.router.navigateByUrl('/not-found');
        return;
      }
      
    });
  }
}
