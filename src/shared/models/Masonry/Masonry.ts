interface MasonryOptions {
    itemSelector: string;
    columnWidth: number;
    gutter: number;
}

export class Masonry {
    private readonly container: HTMLElement;
    private options: MasonryOptions;
    private items: HTMLElement[];
    private colsHeight: number[];
    private colWidth: number;
    private colsNum: number;
    private observer!: MutationObserver;
    private resizeTimeout: number | null = null;
    private offsetX: number;
    private readonly RESIZE_DELAY = 250;

    constructor(container: HTMLElement, options: Partial<MasonryOptions>) {
        this.container = container;
        this.options = {
            itemSelector: '.item',
            columnWidth: 200,
            gutter: 20,
            ...options,
        };
        this.items = [];
        this.colsHeight = [];
        this.colWidth = 0;
        this.colsNum = 0;
        this.offsetX = 0;
        this.init();
        this.setupMutationObserver();
    }

    private init() {
        this.items = Array.from(this.container.querySelectorAll(this.options.itemSelector));
        this.measureColumns();
        this.layoutAll();
        window.addEventListener('resize', this.handleResize);
    }

    private measureColumns() {
        const colWidth = this.options.columnWidth + this.options.gutter;
        const containerWidth = this.container.clientWidth;
        this.offsetX = (containerWidth - (Math.floor(containerWidth / (colWidth)) * (colWidth) - this.options.gutter)) / 2;

        this.colWidth = colWidth;
        this.colsNum = Math.max(1, Math.floor(containerWidth / this.colWidth));

        this.colsHeight = new Array(this.colsNum).fill(0);
    }

    private getColPosition(colSpan: number): { col: number; y: number } {
        const colGroup: number[] = [];
        for (let i = 0; i <= this.colsNum - colSpan; i++) {
            colGroup[i] = Math.max(...this.colsHeight.slice(i, i + colSpan));
        }
        const minY = Math.min(...colGroup);
        const col = colGroup.indexOf(minY);
        return { col, y: minY };
    }

    private setContainerHeight() {
        const maxY = Math.max(...this.colsHeight);
        this.container.style.height = `${maxY}px`;
    }

    private placeItem(item: HTMLElement) {
        const width = item.offsetWidth;
        const height = item.offsetHeight;

        if (width === 0 || height === 0) {
            this.deferLayout(item);
            return;
        }

        const colSpan = Math.min(Math.ceil(width / this.colWidth), this.colsNum);
        const { col, y } = this.getColPosition(colSpan);

        const x = col * this.colWidth + this.offsetX;

        item.style.position = 'absolute';
        item.style.left = `${x + this.container.offsetLeft}px`;
        item.style.top = `${y + this.container.offsetTop}px`;

        const itemHeight = height + this.options.gutter;
        for (let i = col; i < col + colSpan; i++) {
            this.colsHeight[i] = y + itemHeight;
        }
    }

    private layoutNew(newItems: HTMLElement[]) {
        newItems.forEach(item => this.placeItem(item));
        this.setContainerHeight();
    }

    private layoutAll() {
        this.measureColumns();
        this.items.forEach(item => this.placeItem(item));
        this.setContainerHeight();
    }

    private handleResize = () => {
        if (this.resizeTimeout) {
            window.clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = window.setTimeout(() => {
            this.layoutAll();
            this.resizeTimeout = null;
        }, this.RESIZE_DELAY);
    };

    private setupMutationObserver() {
        this.observer = new MutationObserver(mutations => {
            const added: HTMLElement[] = [];
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node instanceof HTMLElement && node.matches(this.options.itemSelector)) {
                            added.push(node);
                        }
                    });
                    mutation.removedNodes.forEach(node => {
                        if (node instanceof HTMLElement && node.matches(this.options.itemSelector)) {
                            this.items = this.items.filter(item => item !== node);
                        }
                    });
                }
            });
            if (added.length > 0) {
                this.items.push(...added);
                this.layoutNew(added);
            }
        });
        this.observer.observe(this.container, { childList: true, subtree: false });
    }

    private deferLayout(item: HTMLElement) {
        const img = item.querySelector<HTMLImageElement>('img');
        if (!img) return;
        const imgPromise = (img: HTMLImageElement) => {
            return img.complete
                ? Promise.resolve()
                : new Promise<void>(resolve => {
                    img.addEventListener('load', () => resolve(), { once: true });
                    img.addEventListener('error', () => resolve(), { once: true });
                });
        };

        imgPromise(img).then(() => {
            const width = img.width;
            const height = img.height;

            if (width > 0 && height > 0) {
                item.style.width = width + 'px';
                item.style.height = height + 'px';

                this.placeItem(item);
                this.setContainerHeight();
            }

        });
    }

    public destroy() {
        window.removeEventListener('resize', this.handleResize);
        if (this.resizeTimeout) {
            window.clearTimeout(this.resizeTimeout);
        }
        this.observer.disconnect();
    }
}
