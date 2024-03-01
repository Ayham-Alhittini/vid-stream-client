import { Component } from '@angular/core';
import { StreamingService } from '../services/streaming.service';
import { UploadService } from '../services/upload.service';
import { Video } from '../Models/video';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-streams',
  templateUrl: './my-streams.component.html',
  styleUrls: ['./my-streams.component.css']
})
export class MyStreamsComponent {
  loading = false;

  videos = [];

  constructor(private streamingService: StreamingService,
      private router: Router){}

  ngOnInit(): void {
      this.loadMyStreams();
  }

  videoDeleted(videoId: number) {
    this.videos = this.videos.filter(v => v.id != videoId);
  }

  videosUpdated(event: any) {
    this.loadMyStreams();
  }


  onClick(video: Video) {
    this.router.navigateByUrl("/my-streams?toEditVideo=" + video.id);
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
