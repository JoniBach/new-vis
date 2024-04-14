import * as d3 from 'd3';

export const demoLolipopHorizontal = (id: string, newData: string, config: object): void => {
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

	// Parse the Data
	d3.json(newData).then(function (data) {
		// Add X axis
		const x = d3.scaleLinear().domain([0, 40]).range([0, width]);
		svg
			.append('g')
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(x))
			.selectAll('text')
			.attr('transform', 'translate(-10,0)rotate(-45)')
			.style('text-anchor', 'end');

		// Y axis
		const y = d3
			.scaleBand()
			.range([0, height])
			.domain(
				data.map(function (d) {
					return d.name;
				})
			)
			.padding(1);
		svg.append('g').call(d3.axisLeft(y));

		// Lines
		svg
			.selectAll('myline')
			.data(data)
			.enter()
			.append('line')
			.attr('x1', function (d) {
				return x(d.level);
			})
			.attr('x2', x(0))
			.attr('y1', function (d) {
				return y(d.name);
			})
			.attr('y2', function (d) {
				return y(d.name);
			})
			.attr('stroke', 'grey');

		// Circles
		svg
			.selectAll('mycircle')
			.data(data)
			.enter()
			.append('circle')
			.attr('cx', function (d) {
				return x(d.level);
			})
			.attr('cy', function (d) {
				return y(d.name);
			})
			.attr('r', '4')
			.style('fill', '#69b3a2')
			.attr('stroke', 'black');
	});
};
