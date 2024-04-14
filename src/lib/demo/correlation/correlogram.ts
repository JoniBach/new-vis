import * as d3 from 'd3';

export const demoCorrelogram = (id: string, newData: string, config: object): void => {
	// Graph dimension
	const margin = config.margin,
		width = config.size.width - margin.left - margin.right,
		height = config.size.height - margin.top - margin.bottom;

	// Create the svg area
	const svg = d3
		.select('#' + id)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', `translate(${margin.left},${margin.top})`);

	d3.json(newData).then(function (rows) {
		// if (error) throw error
		// Going from wide to long format
		const data = [];
		rows.forEach(function (d) {
			let x = d[''];
			delete d[''];
			for (let prop in d) {
				let y = prop,
					value = d[prop];
				data.push({
					x: x,
					y: y,
					value: +value
				});
			}
		});

		// List of all variables and number of them
		const domain = Array.from(
			new Set(
				data.map(function (d) {
					return d.x;
				})
			)
		);
		const num = Math.sqrt(data.length);

		// Create a color scale
		const color = d3.scaleLinear().domain([-1, 0, 1]).range(['#B22222', '#fff', '#000080']);

		// Create a size scale for bubbles on top right. Watch out: must be a rootscale!
		const size = d3.scaleSqrt().domain([0, 1]).range([0, 9]);

		// X scale
		const x = d3.scalePoint().range([0, width]).domain(domain);

		// Y scale
		const y = d3.scalePoint().range([0, height]).domain(domain);

		// Create one 'g' element for each cell of the correlogram
		const cor = svg
			.selectAll('.cor')
			.data(data)
			.join('g')
			.attr('class', 'cor')
			.attr('transform', function (d) {
				return `translate(${x(d.x)}, ${y(d.y)})`;
			});

		// Low left part + Diagonal: Add the text with specific color
		cor
			.filter(function (d) {
				const ypos = domain.indexOf(d.y);
				const xpos = domain.indexOf(d.x);
				return xpos <= ypos;
			})
			.append('text')
			.attr('y', 5)
			.text(function (d) {
				if (d.x === d.y) {
					return d.x;
				} else {
					return d.value.toFixed(2);
				}
			})
			.style('font-size', 11)
			.style('text-align', 'center')
			.style('fill', function (d) {
				if (d.x === d.y) {
					return '#000';
				} else {
					return color(d.value);
				}
			});

		// Up right part: add circles
		cor
			.filter(function (d) {
				const ypos = domain.indexOf(d.y);
				const xpos = domain.indexOf(d.x);
				return xpos > ypos;
			})
			.append('circle')
			.attr('r', function (d) {
				return size(Math.abs(d.value));
			})
			.style('fill', function (d) {
				if (d.x === d.y) {
					return '#000';
				} else {
					return color(d.value);
				}
			})
			.style('opacity', 0.8);
	});
};
