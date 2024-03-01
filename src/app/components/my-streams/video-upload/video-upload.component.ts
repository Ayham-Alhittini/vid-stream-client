import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../../../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements AfterViewInit, OnDestroy{

  noImageUrl = 'data:image/png;base64,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'

  @ViewChild('videoPreview') videoPreview: ElementRef;
  @ViewChild('imagePreview') imagePreview: ElementRef;
  @ViewChild('videoModel') videoModel: ElementRef;

  @Output('videosUpdated') videosUpdated = new EventEmitter<void>();

  private queryParamsSubscription: Subscription;
  loading = false;
  videos = [];

  reset: any = {
    video: null,
    image: null
  };

  model: any = {
    originalFilename: '',
    videoDescription: '',
    videoFile: null,
    thumbnailImageFile: null,
    videoDuration: 0
  };


  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private uploadService: UploadService,
      private toaster: ToastrService,
      private renderer: Renderer2
  ){}


  ngAfterViewInit(): void {

    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const uploadMode = params['upload'] === 'true';
      if (uploadMode) {
        this.openModal();
      }
    });

  }


  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }



  submit() {

    this.loading = true;

    const formData = new FormData();

    formData.append('originalFilename', this.model.originalFilename);
    formData.append('videoFile', this.model.videoFile);
    formData.append('thumbnailImageFile', this.model.thumbnailImageFile);
    formData.append('videoDuration', this.model.videoDuration);
    formData.append('videoDescription', this.model.videoDescription);


    this.uploadService.uploadVideo(formData).subscribe({
      next: response => {
        this.toaster.success("Video uploaded successfully 👍");
        this.loading = false;
        this.closeModal();
        this.videosUpdated.emit();
      },
      error: () => {
        this.loading = false;
      }
    })
    
  }


  onVideoSelected(event: any) {
    const file = event.target.files[0];
    
    if (!file) return;


    if (!this.uploadService.isVideo(file)) {
      this.toaster.error("Invalid video format.");
      this.reset.video = null;
      return;
    }

    this.model.videoFile = file;
    this.uploadService.previewFile(this.videoPreview, file);
    this.uploadService.calculateVideoDuration(this.videoPreview, (duration) => {
      this.model.videoDuration = duration;
    });
  }


  onThumbnailImageFile(event: any) {
    const file = event.target.files[0];
    
    if (!file) return;


    if (!this.uploadService.isImage(file)) {
      this.toaster.error("Invalid image format.");
      this.reset.image = null;
      return;
    }

    this.model.thumbnailImageFile = file;
    this.uploadService.previewFile(this.imagePreview, file);

  }



  openModal() {
    this.renderer.addClass(this.videoModel.nativeElement, 'show');
    this.renderer.setStyle(this.videoModel.nativeElement, 'display', 'block');
    this.renderer.setAttribute(this.videoModel.nativeElement, 'aria-hidden', 'false');
    this.renderer.addClass(document.body, 'modal-open');
    this.addBackdrop();
  }

  closeModal() {
    this.renderer.removeClass(this.videoModel.nativeElement, 'show');
    this.renderer.setStyle(this.videoModel.nativeElement, 'display', 'none');
    this.renderer.setAttribute(this.videoModel.nativeElement, 'aria-hidden', 'true');
    this.renderer.removeClass(document.body, 'modal-open');
    this.removeBackdrop();
    this.router.navigateByUrl("/my-streams");
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
