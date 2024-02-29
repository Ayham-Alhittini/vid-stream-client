import { Component } from '@angular/core';
import { StreamingService } from '../services/streaming.service';
import { Router } from '@angular/router';
import { UploadService } from '../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { Video } from '../Models/video';

@Component({
  selector: 'app-my-streams',
  templateUrl: './my-streams.component.html',
  styleUrls: ['./my-streams.component.css']
})
export class MyStreamsComponent {
  loading = false;
  videoReset = null;
  imageReset = null;
  videos = [];
  
  model: any = {
    originalFilename: '',
    videoDescription: '',
    videoFile: null,
    thumbnailImageFile: null,
    videoDuration: 0
  };


  constructor(private streamingService: StreamingService,
      private router: Router,
      private uploadService: UploadService,
      private toaster: ToastrService){}

  ngOnInit(): void {
      this.loadMyStreams();
  }

  videoDeleted(videoId: number) {
    this.videos = this.videos.filter(v => v.id != videoId);
  }

  videosUpdated(event: any) {
    this.loadMyStreams();
  }


  goToVideo(videoId: number) {
    this.router.navigateByUrl("/watch?v=" + videoId);
  }

  onClick(video: Video) {
    this.uploadService.toEditVideo.emit(video);
  }


  private loadMyStreams() {
    this.loading = true;
      this.streamingService.getMyStreams().subscribe({
        next: res => {
          this.videos = res;
          this.loading = false;
        }, error: () => this.loading = false
      })
  }



}
