import * as d3 from 'd3';

export const demoScatter = (id: string, newData: string, config: object): void => {
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

	//Read the data
	d3.json(newData).then(function (data) {
		// Add X axis
		const x = d3.scaleLinear().domain([0, 500]).range([0, width]);
		svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

		// Add Y axis
		const y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
		svg.append('g').call(d3.axisLeft(y));

		// Add dots
		svg
			.append('g')
			.selectAll('dot')
			.data(data)
			.join('circle')
			.attr('cx', function (d) {
				return x(d.x);
			})
			.attr('cy', function (d) {
				return y(d.y);
			})
			.attr('r', 1.5)
			.style('fill', '#69b3a2');
	});
};
