import * as d3 from 'd3';

export const demoScatterConnected = (id: string, newData: string, config: object): void => {
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
	d3.json(
		newData
		// (d) => (d.forEach((d) => (d.date = d3.timeParse('%Y-%m-%d')(d.date))))
	).then(
		// Now I can use this dataset:
		function (data) {
			const newData = data.map((d) => ({
				date: d3.timeParse('%Y-%m-%d')(d.date),
				average_temperature: d.average_temperature
			}));

			// Add X axis --> it is a date format
			const x = d3
				.scaleTime()
				.domain(d3.extent(newData, (d) => d.date))
				.range([0, width]);
			svg
				.append('g')
				.attr('transform', 'translate(0,' + height + ')')
				.call(d3.axisBottom(x));
			// Add Y axis
			const y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
			svg.append('g').call(d3.axisLeft(y));
			// Add the line
			svg
				.append('path')
				.datum(newData)
				.attr('fill', 'none')
				.attr('stroke', '#69b3a2')
				.attr('stroke-width', 1.5)
				.attr(
					'd',
					d3
						.line()
						.x((d) => x(d.date))
						.y((d) => y(d.average_temperature))
				);
			// Add the points
			svg
				.append('g')
				.selectAll('dot')
				.data(newData)
				.join('circle')
				.attr('cx', (d) => x(d.date))
				.attr('cy', (d) => y(d.average_temperature))
				.attr('r', 5)
				.attr('fill', '#69b3a2');
		}
	);
};
