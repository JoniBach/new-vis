import * as d3 from 'd3';

export const demoTreemap = (id: string, newData: string, config: object): void => {
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
		.attr('transform', `translate(${margin.left},${margin.top})`);

	//Read the data
	d3.json(newData).then(function (data) {
		// stratify the data: reformatting for d3.js
		const root = d3
			.stratify()
			.id(function (d) {
				return d.name;
			}) // Name of the entity (column name is name in csv)
			.parentId(function (d) {
				return d.parent;
			})(
				// Name of the parent (column name is parent in csv)
				data
			);
		root.sum(function (d) {
			return +d.value;
		}); // Compute the numeric value for each entity

		// Then d3.treemap computes the position of each element of the hierarchy
		// The coordinates are added to the root object above
		d3.treemap().size([width, height]).padding(4)(root);

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
			.style('fill', '#69b3a2');

		// and to add the text labels
		svg
			.selectAll('text')
			.data(root.leaves())
			.join('text')
			.attr('x', function (d) {
				return d.x0 + 10;
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
