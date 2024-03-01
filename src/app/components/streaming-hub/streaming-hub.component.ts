import { Component, OnInit } from '@angular/core';
import { StreamingService } from '../../services/streaming.service';

@Component({
  selector: 'app-streaming-hub',
  templateUrl: './streaming-hub.component.html',
  styleUrls: ['./streaming-hub.component.css']
})
export class StreamingHubComponent implements OnInit{

  constructor(private streamingService: StreamingService){}

  videos = [];

  ngOnInit(): void {
      this.streamingService.getAllVideos().subscribe({
        next: res => {
          this.videos = res;
        }
      })
  }
  
}
