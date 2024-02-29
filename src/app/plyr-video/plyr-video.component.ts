import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Plyr from 'plyr';
import { Subscription } from 'rxjs';
import { Video } from '../Models/video';
import { StreamingService } from '../services/streaming.service';

@Component({
  selector: 'app-plyr-video',
  templateUrl: './plyr-video.component.html',
  styleUrls: ['./plyr-video.component.css']
})
export class PlyrVideoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement: ElementRef;
  player: Plyr;
  video: Video = null;
  private viewIncremented: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private streamingService: StreamingService) {}

  ngOnInit() {
    this.getVideoId();
  }

  ngAfterViewInit(): void {
    this.player = new Plyr(this.videoElement.nativeElement);
    
    this.player.on('play', () => {
      if (!this.viewIncremented) {
        this.subscriptions.add(
          this.streamingService.incrementViews(this.video.id).subscribe()
        );
        this.viewIncremented = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.player.destroy();
    this.subscriptions.unsubscribe();
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
