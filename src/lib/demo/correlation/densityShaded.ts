import * as d3 from 'd3';

export const demoDensityShaded = (id: string, newData: string, config: object): void => {
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

	// read data
	d3.json(newData).then(function (data) {
		// Add X axis
		const x = d3
			.scaleLinear()
			.domain([5, 30])
			.range([margin.left, width - margin.right]);
		svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

		// Add Y axis
		const y = d3
			.scaleLinear()
			.domain([4, 31])
			.range([height - margin.bottom, margin.top]);
		svg.append('g').call(d3.axisLeft(y));

		// Prepare a color palette
		const color = d3
			.scaleLinear()
			.domain([0, 0.01]) // Points per square pixel.
			.range(['white', '#69b3a2']);

		// compute the density data
		const densityData = d3
			.contourDensity()
			.x(function (d) {
				return x(d.x);
			})
			.y(function (d) {
				return y(d.y);
			})
			.size([width, height])
			.bandwidth(20)(data);

		// show the shape!
		svg
			.insert('g', 'g')
			.selectAll('path')
			.data(densityData)
			.enter()
			.append('path')
			.attr('d', d3.geoPath())
			.attr('fill', function (d) {
				return color(d.value);
			});
	});
};
