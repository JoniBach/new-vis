import * as d3 from 'd3';

export const demoBubbleAdvanced = (id: string, newData: string, config: object): void => {
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
		const z = d3.scaleLinear().domain([0, 40]).range([4, 40]);

		// Add a scale for bubble color
		const myColor = d3
			.scaleOrdinal()
			.domain(['Asia', 'Europe', 'Americas', 'Africa', 'Oceania'])
			.range(d3.schemeSet2);

		// -1- Create a tooltip div that is hidden by default:
		const tooltip = d3
			.select('#' + id)
			.append('div')
			.style('opacity', 0)
			.attr('class', 'tooltip')
			.style('background-color', 'black')
			.style('border-radius', '5px')
			.style('padding', '10px')
			.style('color', 'white');

		// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
		const showTooltip = function (event, d) {
			tooltip.transition().duration(200);
			tooltip
				.style('opacity', 1)
				.html('Name: ' + d.Name)
				.style('left', event.x / 2 + 'px')
				.style('top', event.y / 2 + 30 + 'px');
		};
		const moveTooltip = function (event, d) {
			tooltip.style('left', event.x / 2 + 'px').style('top', event.y / 2 + 30 + 'px');
		};
		const hideTooltip = function (event, d) {
			tooltip.transition().duration(200).style('opacity', 0);
		};

		// Add dots
		svg
			.append('g')
			.selectAll('dot')
			.data(data)
			.join('circle')
			.attr('class', 'bubbles')
			.attr('cx', (d) => x(d.Distance_from_Earth))
			.attr('cy', (d) => y(d.Velocity))
			.attr('r', (d) => z(d.Diameter))
			.style('fill', (d) => myColor(d.Name))
			// -3- Trigger the functions
			.on('mouseover', showTooltip)
			.on('mousemove', moveTooltip)
			.on('mouseleave', hideTooltip);
	});

	// The scale you use for bubble size
	const size = d3
		.scaleSqrt()
		.domain([1, 100]) // What's in the data, let's say it is percentage
		.range([1, 100]); // Size in pixel

	// Add legend: circles
	const valuesToShow = [10, 50, 100];
	const xCircle = 230;
	const xLabel = 380;
	const yCircle = 330;
	svg
		.selectAll('legend')
		.data(valuesToShow)
		.join('circle')
		.attr('cx', xCircle)
		.attr('cy', (d) => yCircle - size(d))
		.attr('r', (d) => size(d))
		.style('fill', 'none')
		.attr('stroke', 'lightgrey');

	// Add legend: segments
	svg
		.selectAll('legend')
		.data(valuesToShow)
		.join('line')
		.attr('x1', (d) => xCircle + size(d))
		.attr('x2', xLabel)
		.attr('y1', (d) => yCircle - size(d))
		.attr('y2', (d) => yCircle - size(d))
		.attr('stroke', 'lightgrey')
		.style('stroke-dasharray', '2,2');

	// Add legend: labels
	svg
		.selectAll('legend')
		.data(valuesToShow)
		.join('text')
		.attr('x', xLabel)
		.attr('y', (d) => yCircle - size(d))
		.text((d) => d)
		.style('font-size', 10)
		.attr('alignment-baseline', 'middle');
};
