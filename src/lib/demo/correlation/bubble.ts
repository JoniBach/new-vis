import * as d3 from 'd3';

export const demoBubble = (id: string, newData: string, config: object): void => {
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
		// Add X axis
		const x = d3.scaleLinear().domain([0, 500]).range([0, width]);
		svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

		// Add Y axis
		const y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
		svg.append('g').call(d3.axisLeft(y));

		// Add a scale for bubble size
		const z = d3.scaleLinear().domain([0, 30]).range([1, 40]);

		// Add dots
		svg
			.append('g')
			.selectAll('dot')
			.data(data)
			.join('circle')
			.attr('cx', (d) => x(d.Distance_from_Earth))
			.attr('cy', (d) => y(d.Velocity))
			.attr('r', (d) => z(d.Diameter))
			.style('fill', '#69b3a2')
			.style('opacity', '0.7')
			.attr('stroke', 'black');
	});
};
