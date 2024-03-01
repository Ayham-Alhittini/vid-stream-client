import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Video } from '../../../models/video';
import { Router } from '@angular/router';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {
  @Input() video: Video;
  @ViewChild('videoPreview') videoPreview: ElementRef<HTMLVideoElement>;

  preview = false;

  constructor(private router: Router, public uploadService: UploadService){}

  clickVideo() {
    this.router.navigateByUrl("watch?v=" + this.video.id);
  }


  mouseEnter(): void {
    this.preview = true;
    this.videoPreview.nativeElement.muted = true;
    this.videoPreview.nativeElement.play();
  }

  mouseLeave(): void {
    this.preview = false;
    this.videoPreview.nativeElement.pause();
  }

}
