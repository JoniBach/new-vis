import * as d3 from 'd3';

export const demoHeatmap = (id: string, newData: string, config: object): void => {
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

	// Labels of row and columns
	const myGroups = ['A', 'B', 'C', 'D', 'E'];
	const myVars = [
		'Efficiency',
		'Teamwork',
		'Innovation',
		'Reliability',
		'Leadership',
		'Communication',
		'Adaptability',
		'Initiative',
		'Work Ethic',
		'Efficiency'
	];

	// Build X scales and axis:
	const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);
	svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

	// Build X scales and axis:
	const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
	svg.append('g').call(d3.axisLeft(y));

	// Build color scale
	const myColor = d3.scaleLinear().range(['white', '#69b3a2']).domain([1, 100]);

	//Read the data
	d3.json(newData).then(function (data) {
		svg
			.selectAll()
			.data(data, function (d) {
				return d.group + ':' + d.variable;
			})
			.join('rect')
			.attr('x', function (d) {
				return x(d.group);
			})
			.attr('y', function (d) {
				return y(d.variable);
			})
			.attr('width', x.bandwidth())
			.attr('height', y.bandwidth())
			.style('fill', function (d) {
				return myColor(d.value);
			});
	});
};
