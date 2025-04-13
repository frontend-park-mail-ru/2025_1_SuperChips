import { debounce, scrollHandler } from 'shared/utils';
import { fillUserFeed } from '../lib/fillUserFeed';

export const userFeedScroll = debounce((() => scrollHandler(fillUserFeed)), 75);
