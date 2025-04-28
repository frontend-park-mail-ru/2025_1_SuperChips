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
        this.layout();
        window.addEventListener('resize', this.handleResize);
    }


    /**
     * Ищет суммарную ширину ленты, которая складывается из оффсета контейнера и ширины каждой колонки с отступом
     */
    private measureColumns(){
        const containerWidth = this.container.offsetWidth;
        this.colWidth = this.options.columnWidth + this.options.gutter;
        this.colsNum = Math.floor(containerWidth / this.colWidth);

        const totalWidth = this.colsNum * this.colWidth - this.options.gutter;
        this.offsetX = (containerWidth - totalWidth) / 2;

        this.colsHeight = new Array(this.colsNum).fill(0);
    }

    /**
     * Ищет номер колонки с минимальной высотой
     */
    private getColPosition(colSpan: number): { col: number; y: number } {
        const colGroup: number[] = [];

        for (let i = 0; i <= this.colsNum - colSpan; i++) {
            colGroup[i] = Math.max(...this.colsHeight.slice(i, i + colSpan));
        }

        const minY = Math.min(...colGroup);
        const col = colGroup.indexOf(minY);

        return { col, y: minY };
    }


    /**
     * Изменяет высоту контейнера
     */
    private setContainerHeight(){
        const maxY = Math.max(...this.colsHeight);
        this.container.style.height = `${maxY}px`;
    }


    /**
     *  Задает координаты каждого элемента в контейнере
     */
    layout() {
        this.measureColumns();

        this.items.forEach((item) => {
            const colSpan = Math.min(Math.ceil(item.offsetWidth / this.colWidth), this.colsNum);
            const colPos = this.getColPosition(colSpan);

            const containerOffsetLeft = this.container.offsetLeft;
            const containerOffsetTop = this.container.offsetTop;

            const x = colPos.col * this.colWidth + containerOffsetLeft + this.offsetX;
            const y = colPos.y + containerOffsetTop;

            item.style.position = 'absolute';
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;

            const itemHeightWithGutter = item.offsetHeight + this.options.gutter;
            for (let i = colPos.col; i < colPos.col + colSpan; i++) {
                this.colsHeight[i] = y + itemHeightWithGutter - containerOffsetTop;
            }
        });

        this.setContainerHeight();
    }

    /**
     * Функция для обработки изменения размера окна с задержкой
     */
    private handleResize = () => {
        if (this.resizeTimeout) {
            window.clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = window.setTimeout(() => {
            this.layout();
            this.resizeTimeout = null;
        }, this.RESIZE_DELAY);
    };


    /**
     * Создает observer, который работает при добавлении новых элементов в контейнер
     */
    private setupMutationObserver() {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                    const newItems: HTMLElement[] = [];
                    const array = mutation.addedNodes.length > 0 ? mutation.addedNodes : mutation.removedNodes;

                    Array.from(array).forEach((node) => {
                        if (node instanceof HTMLElement) {
                            if (node.matches(this.options.itemSelector)) {
                                newItems.push(node);
                            }
                        }
                    });

                    if (newItems.length > 0) {
                        this.items.push(...newItems);
                        this.layout();
                    }
                }
            });
        });

        this.observer.observe(this.container, { childList: true, subtree: true });
    }

    /**
     *  Деструктор
     */
    public destroy(){
        window.removeEventListener('resize', this.handleResize);
        if (this.resizeTimeout) {
            window.clearTimeout(this.resizeTimeout);
        }
        this.observer.disconnect();
    }
}
