class ImageLoader<IdType> {
    private readonly pendingImages: Array<PendingImage<IdType>>;

    public constructor() {
        this.pendingImages = new Array<PendingImage<IdType>>();
    }

    public addPendingImage(image: PendingImage<IdType>): void {
        this.pendingImages.push(image);
    }

    public addPendingImages(images: Array<PendingImage<IdType>>): void {
        for (let image of images) {
            this.addPendingImage(image);
        }
    }

    public async loadPendingImages(): Promise<Array<LoadedImage<IdType>>> {
        let promisesArray: Array<Promise<LoadedImage<IdType>>>;
        for (let image of this.pendingImages) {
            let dimensions: Dimensions = image.getDimensions();
            let imageElement: HTMLImageElement = new Image(
                dimensions.getWidth(),
                dimensions.getHeight()
            );
            promisesArray.push(
                new Promise<LoadedImage<IdType>>(resolve => {
                    imageElement.addEventListener("load", () => {
                        resolve(new LoadedImage(image.getId(), imageElement));
                    });
                })
            );
            imageElement.src = image.getPath();
        }
        return Promise.all(promisesArray);
    }
}
