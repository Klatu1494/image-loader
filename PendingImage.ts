class PendingImage<IdType> {
    public constructor(
        private readonly id: IdType,
        private readonly path: string,
        private readonly dimensions: Dimensions
    ) {}

    public getId(): IdType {
        return this.id;
    }

    public getPath(): string {
        return this.path;
    }

    public getDimensions(): Dimensions {
        return this.dimensions;
    }
}
