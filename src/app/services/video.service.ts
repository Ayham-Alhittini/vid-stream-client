import { Injectable } from '@angular/core';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() {}

  
  searchVideos(videos: Video[], query: string): Video[] {
    return videos
    .map(video => ({ video, score: this.calculateRelevance(video, query) }))
    .filter(videoWithScore => videoWithScore.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(videoWithScore => videoWithScore.video);
  }

  private calculateRelevance(video: Video, query: string): number {
    let score = 0;
    const queryLower = query.toLowerCase();
    const weights = { originalFileName: 3, ownerUserName: 2, videoDescription: 1 };
  
    if (video.originalFileName.toLowerCase().includes(queryLower)) score += weights.originalFileName;
    if (video.ownerUserName.toLowerCase().includes(queryLower)) score += weights.ownerUserName;
    if (video.videoDescription.toLowerCase().includes(queryLower)) score += weights.videoDescription;
  
    return score;
  }
  
}
