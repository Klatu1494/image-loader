class Dimensions {
    public constructor(
        private readonly width: number,
        private readonly height: number
    ) {}

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }
}
