export async function loadPartials(partialsData) {
	const loadPromises = partialsData.map(async (partial) => {
		const response = await fetch(partial.path);
		const content = await response.text();
		Handlebars.registerPartial(partial.name, content);
	});

	await Promise.all(loadPromises);
}