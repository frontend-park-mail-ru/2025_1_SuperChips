import { debounce, scrollHandler } from 'shared/utils';
import { fillFeed } from '../lib/fillFeed';

export const debouncedFeedScroll = debounce((() => scrollHandler(fillFeed)), 75);
