import { debounce, scrollHandler } from 'shared/utils';
import { fillFeed } from '../lib/fillFeed';
import { fillSearchFeed } from '../lib/fillSearchFeed';

export const debouncedFeedScroll = debounce((() => scrollHandler(fillFeed)), 75);

export const searchFeedScroll = debounce(() => scrollHandler(fillSearchFeed), 75);
