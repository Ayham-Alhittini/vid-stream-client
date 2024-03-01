import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../model/video';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://host.docker.internal:9083/api/streaming";

  getAllVideos() {
    return this.http.get<Video[]>(this.baseUrl + "/get-all-videos");
  }

  getMyStreams() {
    return this.http.get<Video[]>(this.baseUrl + "/get-my-streams");
  }


  getVideoById(videoId: number) {
    return this.http.get<Video>(this.baseUrl + "/get-video/" + videoId);
  }


  incrementViews(videoId: number) {
    return this.http.put(this.baseUrl + '/increment-views/' + videoId, null);
  }


}
