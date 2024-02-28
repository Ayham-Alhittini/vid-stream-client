import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Video } from '../Models/video';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {
  @Input() video: Video;
  @ViewChild('videoPreview') videoPreview: ElementRef<HTMLVideoElement>;

  constructor(private router: Router){}

  clickVideo() {
    this.router.navigateByUrl("watch?v=" + this.video.id);
  }


  mouseEnter(): void {
    this.videoPreview.nativeElement.play();
  }

  mouseLeave(): void {
    this.videoPreview.nativeElement.pause();
  }

}
