import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../Models/video';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8083/api/streaming";

  getAllVideos() {
    return this.http.get<Video[]>(this.baseUrl);
  }

}
