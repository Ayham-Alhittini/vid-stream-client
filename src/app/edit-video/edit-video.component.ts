import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '../services/upload.service';
import { Video } from '../Models/video';
import { Subscription } from 'rxjs';
import { StreamingService } from '../services/streaming.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements AfterViewInit, OnDestroy{

  video: Video;

  editVideoSubscribtion: Subscription;
  @ViewChild('videoPreview') videoPreview: ElementRef;
  @ViewChild('imagePreview') imagePreview: ElementRef;
  @ViewChild('videoModel') videoModel: ElementRef;

  @Output('videosUpdated') videosUpdated = new EventEmitter<void>();

  loading = false;
  imageReset = null;


  model: any = {
    originalFilename: '',
    videoDescription: '',
    thumbnailImageFile: null,
  };


  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private streamingService: StreamingService,
      private uploadService: UploadService,
      private toaster: ToastrService,
      private renderer: Renderer2
  ){}


  ngAfterViewInit(): void {

    this.editVideoSubscribtion = this.route.queryParams.subscribe({
      next: query => {
        const videoId = +query['toEditVideo'];
        if (videoId) {

          this.streamingService.getVideoById(videoId).subscribe(video => {
            this.initializeModel(video);
            this.openModal();
          });
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.editVideoSubscribtion.unsubscribe();
  }


  submit() {

    this.loading = true;

    const formData = new FormData();

    formData.append('originalFilename', this.model.originalFilename);
    formData.append('thumbnailImageFile', this.model.thumbnailImageFile);
    formData.append('videoDescription', this.model.videoDescription);


    this.uploadService.editVideo(this.video.id, formData).subscribe({
      next: () => {
        this.toaster.success("Video updated successfully 👍");
        this.loading = false;
        this.closeModal();
        this.videosUpdated.emit();
        this.router.navigateByUrl('/my-streams');
      },
      error: () => {
        this.loading = false;
      }
    })
    
  }


  onThumbnailImageFile(event: any) {
    const file = event.target.files[0];
    
    if (!file) return;


    if (!this.uploadService.isImage(file)) {
      this.toaster.error("Invalid image format.");
      this.imageReset = null;
      return;
    }

    this.model.thumbnailImageFile = file;
    this.uploadService.previewFile(this.imagePreview, file);

  }



  openModal() {
    if (this.video) {
      this.renderer.addClass(this.videoModel.nativeElement, 'show');
      this.renderer.setStyle(this.videoModel.nativeElement, 'display', 'block');
      this.renderer.setAttribute(this.videoModel.nativeElement, 'aria-hidden', 'false');
      this.renderer.addClass(document.body, 'modal-open');
      this.addBackdrop();
    }
  }

  closeModal() {
    this.renderer.removeClass(this.videoModel.nativeElement, 'show');
    this.renderer.setStyle(this.videoModel.nativeElement, 'display', 'none');
    this.renderer.setAttribute(this.videoModel.nativeElement, 'aria-hidden', 'true');
    this.renderer.removeClass(document.body, 'modal-open');
    this.removeBackdrop();
    this.router.navigateByUrl("/my-streams");
  }




  private initializeModel(video: Video) {
    this.video = video;
    this.model.originalFilename = video.originalFileName;
    this.model.videoDescription = video.videoDescription;
    this.videoPreview.nativeElement.src = video.videoUrl;
    this.imagePreview.nativeElement.src = video.thumbnailImageUrl;
  }
  


  private addBackdrop() {
    const backdrop = this.renderer.createElement('div');
    this.renderer.addClass(backdrop, 'modal-backdrop');
    this.renderer.addClass(backdrop, 'fade');
    this.renderer.addClass(backdrop, 'show');
    this.renderer.appendChild(document.body, backdrop);
  }

  private removeBackdrop() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
    }
  }
}
