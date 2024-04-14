import * as d3 from 'd3';

export const demoTreemapJson = (id: string, newData: string, config: object): void => {
	// set the dimensions and margins of the graph
	const margin = config.margin,
		width = config.size.width - margin.left - margin.right,
		height = config.size.height - margin.top - margin.bottom;

	// append the svg object to the body of the page
	const svg = d3
		.select('#' + id)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	// read json data
	d3.json(newData).then(function (data) {
		// Give the data to this cluster layout:
		const root = d3.hierarchy(data).sum(function (d) {
			return d.value;
		}); // Here the size of each leave is given in the 'value' field in input data

		// Then d3.treemap computes the position of each element of the hierarchy
		d3.treemap().size([width, height]).padding(2)(root);

		// use this information to add rectangles:
		svg
			.selectAll('rect')
			.data(root.leaves())
			.join('rect')
			.attr('x', function (d) {
				return d.x0;
			})
			.attr('y', function (d) {
				return d.y0;
			})
			.attr('width', function (d) {
				return d.x1 - d.x0;
			})
			.attr('height', function (d) {
				return d.y1 - d.y0;
			})
			.style('stroke', 'black')
			.style('fill', 'slateblue');

		// and to add the text labels
		svg
			.selectAll('text')
			.data(root.leaves())
			.join('text')
			.attr('x', function (d) {
				return d.x0;
			}) // +10 to adjust position (more right)
			.attr('y', function (d) {
				return d.y0 + 20;
			}) // +20 to adjust position (lower)
			.text(function (d) {
				return d.data.name;
			})
			.attr('font-size', '15px')
			.attr('fill', 'white');
	});
};
