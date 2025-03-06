export const createSkeletonFeed = (numElements) => {
	const feed = document.createElement('div');

	const classes = ['skeleton-1', 'skeleton-2', 'skeleton-3'];
	function randInt(min, max) {
		return Math.floor(Math.random() * (max-min+1))
	}

	for (let i=0; i<numElements; i++) {
		const elem = document.createElement('div');
		const rand = classes[randInt(0, classes.length - 1)];
		elem.classList.add(rand);

		feed.appendChild(elem);
	}

	return feed;
}
