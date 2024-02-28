import { Component, Input } from '@angular/core';
import { Video } from '../Models/video';

@Component({
  selector: 'app-video-card-list-item',
  templateUrl: './video-card-list-item.component.html',
  styleUrls: ['./video-card-list-item.component.css']
})
export class VideoCardListItemComponent {
  @Input() video: Video;
}
