import * as d3 from 'd3';

export const demoLolipopCleveland = (id: string, newData: string, config: object): void => {
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
		const x = d3.scaleLinear().domain([-1, 10]).range([0, width]);
		svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

		// Y axis
		const y = d3
			.scaleBand()
			.range([0, height])
			.domain(
				data.map(function (d) {
					return d.Athlete;
				})
			)
			.padding(1);
		svg.append('g').call(d3.axisLeft(y));

		// Lines
		svg
			.selectAll('myline')
			.data(data)
			.join('line')
			.attr('x1', function (d) {
				return x(d.LongJump);
			})
			.attr('x2', function (d) {
				return x(d.HighJump);
			})
			.attr('y1', function (d) {
				return y(d.Athlete);
			})
			.attr('y2', function (d) {
				return y(d.Athlete);
			})
			.attr('stroke', 'grey')
			.attr('stroke-width', '1px');

		// Circles of variable 1
		svg
			.selectAll('mycircle')
			.data(data)
			.join('circle')
			.attr('cx', function (d) {
				return x(d.LongJump);
			})
			.attr('cy', function (d) {
				return y(d.Athlete);
			})
			.attr('r', '6')
			.style('fill', '#69b3a2');

		// Circles of variable 2
		svg
			.selectAll('mycircle')
			.data(data)
			.join('circle')
			.attr('cx', function (d) {
				return x(d.HighJump);
			})
			.attr('cy', function (d) {
				return y(d.Athlete);
			})
			.attr('r', '6')
			.style('fill', '#4C4082');
	});
};
