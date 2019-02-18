class ImageLoader<IdType> {
    private readonly addedImages: Array<QuerablePromise<LoadedImage<IdType>>>;

    public constructor() {
        this.addedImages = [];
    }

    public addPendingImage(image: PendingImageData<IdType>): void {
        let dimensions: Dimensions = image.getDimensions();
        let imageElement: HTMLImageElement = new Image(
            dimensions.getWidth(),
            dimensions.getHeight()
        );
        let promise: QuerablePromise<LoadedImage<IdType>> = new QuerablePromise<
            LoadedImage<IdType>
        >((resolve, reject) => {
            imageElement.addEventListener("load", () => {
                resolve(new LoadedImage(image.getId(), imageElement));
            });
            imageElement.addEventListener("error", () => {
                reject("There was an error while loading the image.");
            });
        });
        this.addedImages.push(promise);
        imageElement.src = image.getPath();
    }

    public addPendingImages(images: Array<PendingImageData<IdType>>): void {
        for (let image of images) {
            this.addPendingImage(image);
        }
    }

    public async loadPendingImages(): Promise<Array<LoadedImage<IdType>>> {
        return Promise.all(this.addedImages);
    }

    public getAmountOfReadyImages(): number {
        return this.addedImages.filter(element => element.isResolved()).length;
    }

    public getAmountOfImages(): number {
        return this.addedImages.length;
    }
}
