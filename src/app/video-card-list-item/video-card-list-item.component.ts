import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Video } from '../Models/video';
import { UploadService } from '../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-card-list-item',
  templateUrl: './video-card-list-item.component.html',
  styleUrls: ['./video-card-list-item.component.css']
})
export class VideoCardListItemComponent {
  @Input() video: Video;
  @Input() myVideo: boolean = false;
  @Output() videoDeleted: EventEmitter<number> = new EventEmitter<number>();


  preview = false;
  @ViewChild('videoPreview') videoPreview: ElementRef<HTMLVideoElement>;

  constructor(public uploadService: UploadService, private toaster: ToastrService, private router: Router){}

  deleteVideo(videoId: number) {
    const response = confirm("Are you sure?");

    if (response) {
      this.videoDeleted.emit(videoId);
      this.uploadService.deleteVideo(videoId).subscribe({
      next: () => {
        this.toaster.success("Video deleted");
      }
    })
    }
  }


  openInNewTab(videoId: number): void {
    this.router.navigateByUrl("/watch?v=" + videoId);
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
