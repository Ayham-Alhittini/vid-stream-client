export class Video {
    public id: number;
    public ownerUserName: string;
    public originalFileName: string;
    public videoUrl: string;
    public thumbnailImageUrl: string;
    constructor(id: number, ownerUserName: string, originalFileName: string, videoUrl: string, thumbnailImageUrl: string) {
        this.id = id;
        this.ownerUserName = ownerUserName;
        this.originalFileName = originalFileName;
        this.videoUrl = videoUrl;
        this.thumbnailImageUrl = thumbnailImageUrl;
    }
}

