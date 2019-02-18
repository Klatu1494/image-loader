class ImageLoader<IdType> {
    private readonly pendingImages: Array<Promise<LoadedImage<IdType>>>;

    public constructor() {
        this.pendingImages = [];
    }

    public addPendingImage(image: PendingImage<IdType>): void {
        let dimensions: Dimensions = image.getDimensions();
        let imageElement: HTMLImageElement = new Image(
            dimensions.getWidth(),
            dimensions.getHeight()
        );
        this.pendingImages.push(
            new Promise<LoadedImage<IdType>>(resolve => {
                imageElement.addEventListener("load", () => {
                    resolve(new LoadedImage(image.getId(), imageElement));
                });
            })
        );
        imageElement.src = image.getPath();
    }

    public addPendingImages(images: Array<PendingImage<IdType>>): void {
        for (let image of images) {
            this.addPendingImage(image);
        }
    }

    public async loadPendingImages(): Promise<Array<LoadedImage<IdType>>> {
        return Promise.all(this.pendingImages);
    }
}
