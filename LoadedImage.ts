class LoadedImage<IdType> {
    constructor(
        private readonly id: IdType,
        private readonly element: HTMLImageElement
    ) {}

    public getId(): IdType {
        return this.id;
    }

    public getElement(): HTMLImageElement {
        return this.element;
    }
}
