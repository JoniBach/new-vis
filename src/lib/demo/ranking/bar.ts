import * as d3 from 'd3';

export const demoBar = (id: string, newData: string, config: object): void => {
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

	// Parse the Data
	d3.json(newData).then(function (data) {
		// X axis
		const x = d3
			.scaleBand()
			.range([0, width])
			.domain(data.map((d) => d.name))
			.padding(0.2);
		svg
			.append('g')
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(x))
			.selectAll('text')
			.attr('transform', 'translate(-10,0)rotate(-45)')
			.style('text-anchor', 'end');

		// Add Y axis
		const y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
		svg.append('g').call(d3.axisLeft(y));

		// Bars
		svg
			.selectAll('mybar')
			.data(data)
			.join('rect')
			.attr('x', (d) => x(d.name))
			.attr('y', (d) => y(d.level))
			.attr('width', x.bandwidth())
			.attr('height', (d) => height - y(d.level))
			.attr('fill', '#69b3a2');
	});
};
