import { Component, OnDestroy } from '@angular/core';
import { StreamingService } from '../../services/streaming.service';
import { Video } from '../../models/video';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnDestroy {

  searchSub: Subscription;
  videos: Video[] = [];

  search_query: string = '';

  constructor(private streamingService: StreamingService, private route: ActivatedRoute, private videoService: VideoService){}

  ngOnInit(): void {
      this.loadResults();
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

  private loadResults() {
    this.searchSub = this.route.queryParams.subscribe(query => {
      this.search_query = query['search_query'];

      this.streamingService.getAllVideos().subscribe({
        next: res => {
          this.videos = this.videoService.searchVideos(res, this.search_query);
        }
      })
    })
  }


}
