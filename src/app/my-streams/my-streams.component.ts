import { Component } from '@angular/core';
import { StreamingService } from '../services/streaming.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-streams',
  templateUrl: './my-streams.component.html',
  styleUrls: ['./my-streams.component.css']
})
export class MyStreamsComponent {
  loading = false;
  videos = [];

  constructor(private streamingService: StreamingService, private router: Router){}

  ngOnInit(): void {
      this.loading = true;
      this.streamingService.getAllVideos().subscribe({
        next: res => {
          this.videos = res;
          console.log(this.videos);
          this.loading = false;
        }
      })
  }

  onDeleteClick(videoId: number) {
    console.log(videoId);
  }

  goToVideo(videoId: number) {
    this.router.navigateByUrl("/watch?v=" + videoId);
  }

}
