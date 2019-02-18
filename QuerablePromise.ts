class QuerablePromise<T> extends Promise<T> {
    private pending: boolean;
    private resolved: boolean;
    private rejected: boolean;

    public constructor(
        executor: (
            resolve: (value?: T | PromiseLike<T>) => void,
            reject: (reason?: any) => void
        ) => void
    ) {
        super(executor);
        this.pending = true;
        this.resolved = false;
        this.rejected = false;
    }

    public isPending(): boolean {
        return this.pending;
    }

    public isResolved(): boolean {
        return this.resolved;
    }

    public isRejected(): boolean {
        return this.rejected;
    }

    private resolve(): void {
        this.pending = false;
        this.resolved = true;
    }

    private reject(): void {
        this.pending = false;
        this.rejected = true;
    }

    public then<TResult1 = T, TResult2 = never>(
        onFulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
        onRejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
    ): Promise<TResult1 | TResult2> {
        return super.then(
            (value: T) => {
                this.resolve();
                return onFulfilled(value);
            },
            (reason: any) => {
                this.reject();
                return onRejected(reason);
            }
        );
    }
}
