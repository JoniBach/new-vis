import * as d3 from 'd3';

export const demoBarCircular = (id: string, newData: string, config: object): void => {
	// set the dimensions and margins of the graph
	const margin = config.margin,
		width = config.size.width - margin.left - margin.right,
		height = config.size.height - margin.top - margin.bottom,
		innerRadius = 80,
		outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border

	// append the svg object to the body of the page
	const svg = d3
		.select('#' + id)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', `translate(${width / 2},${height / 2 + 100})`); // Add 100 on Y translation, cause upper bars are longer

	d3.json(newData).then(function (data) {
		// X scale
		const x = d3
			.scaleBand()
			.range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
			.align(0) // This does nothing ?
			.domain(data.map((d) => d.Country)); // The domain of the X axis is the list of states.

		// Y scale
		const y = d3
			.scaleRadial()
			.range([innerRadius, outerRadius]) // Domain will be define later.
			.domain([0, 10000]); // Domain of Y is from 0 to the max seen in the data

		// Add bars
		svg
			.append('g')
			.selectAll('path')
			.data(data)
			.join('path')
			.attr('fill', '#69b3a2')
			.attr(
				'd',
				d3
					.arc() // imagine your doing a part of a donut plot
					.innerRadius(innerRadius)
					.outerRadius((d) => y(d['Energy_Consumption']))
					.startAngle((d) => x(d.Country))
					.endAngle((d) => x(d.Country) + x.bandwidth())
					.padAngle(0.01)
					.padRadius(innerRadius)
			);
	});
};
