import * as d3 from 'd3';

export const demoScatterConnectedSmoothe = (id: string, newData: string, config: object): void => {
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

		// When reading the csv, I must format variables:
		// (d) => {
		// 	return { date: d3.timeParse('%Y-%m-%d')(d.date), value: d.value };
		// }
	).then(
		// Now I can use this dataset:
		function (data) {
			const newData = data.map((d) => ({
				date: d3.timeParse('%Y-%m-%d')(d.date),
				value: d.average_temperature
			}));
			// Add X axis --> it is a date format
			const x = d3
				.scaleTime()
				.domain(d3.extent(newData, (d) => d.date))
				.range([0, width]);
			svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

			// Add Y axis
			const y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
			svg.append('g').call(d3.axisLeft(y));

			// Add the line
			svg
				.append('path')
				.datum(newData)
				.attr('fill', 'none')
				.attr('stroke', 'black')
				.attr('stroke-width', 1.5)
				.attr(
					'd',
					d3
						.line()
						.curve(d3.curveBasis) // Just add that to have a curve instead of segments
						.x((d) => x(d.date))
						.y((d) => y(d.value))
				);

			// create a tooltip
			const Tooltip = d3
				.select('#' + id)
				.append('div')
				.style('opacity', 0)
				.attr('class', 'tooltip')
				.style('background-color', 'white')
				.style('border', 'solid')
				.style('border-width', '2px')
				.style('border-radius', '5px')
				.style('padding', '5px');

			// Three function that change the tooltip when user hover / move / leave a cell
			const mouseover = function (event, d) {
				Tooltip.style('opacity', 1);
			};
			const mousemove = function (event, d) {
				Tooltip.html('Exact value: ' + d.value)
					.style('left', `${event.layerX + 10}px`)
					.style('top', `${event.layerY}px`);
			};
			const mouseleave = function (event, d) {
				Tooltip.style('opacity', 0);
			};

			// Add the points
			svg
				.append('g')
				.selectAll('dot')
				.data(newData)
				.join('circle')
				.attr('class', 'myCircle')
				.attr('cx', (d) => x(d.date))
				.attr('cy', (d) => y(d.value))
				.attr('r', 8)
				.attr('stroke', '#69b3a2')
				.attr('stroke-width', 3)
				.attr('fill', 'white')
				.on('mouseover', mouseover)
				.on('mousemove', mousemove)
				.on('mouseleave', mouseleave);
		}
	);
};
