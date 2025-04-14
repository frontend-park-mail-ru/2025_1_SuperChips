import { debounce, scrollHandler } from 'shared/utils';
import { fillBoardFeed } from '../lib/fillBoardFeed';

export const boardFeedScroll = debounce((() => scrollHandler(fillBoardFeed)), 75);
