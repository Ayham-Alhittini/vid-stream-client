import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  // private baseUrl = "http://localhost:8082/api";
  private baseUrl = "http://host.docker.internal:9082/api";

  uploadVideo(model: any) {
    return this.http.post<Video>(this.baseUrl + "/upload", model);
  }

  deleteVideo(videoId: number) {
    return this.http.delete(this.baseUrl + "/delete/" + videoId);
  }

  editVideo(videoId: number, model: any) {
    return this.http.put<Video>(this.baseUrl + '/edit/' + videoId, model);
  }

  getTimeFormat(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    timeInSeconds %= 3600;

    const mintues = Math.floor(timeInSeconds / 60);
    timeInSeconds %= 60;

    const seconds = timeInSeconds;


    let result = '';

    if (hours > 0) {
      result += (hours < 10 ? '0' : '') + hours + ':';
    }

    result += (mintues < 10 ? '0' : '') + mintues + ':';

    result += (seconds < 10 ? '0' : '') + seconds;
    return result;
  }

  
  calculateVideoDuration(video: ElementRef, callback: (duration: number) => void): void {
    video.nativeElement.onloadedmetadata = () => {
      const duration = Math.floor(video.nativeElement.duration);
      callback(duration); 
    };

    
    if (video.nativeElement.readyState >= 1) {
      const duration = Math.floor(video.nativeElement.duration);
      console.log(duration); 
      callback(duration); 
    }
  }


  generateFileUrl(file : File): string {
    return file ? URL.createObjectURL(file) : null;
  }


  previewFile(element: ElementRef, file: File) {
    element.nativeElement.src = URL.createObjectURL(file);
  }


  isVideo(file: File): boolean {
    return file && file.type.startsWith('video/');
  }


  isImage(file: File): boolean {
    return file && file.type.startsWith('image/');
  }
  
}


