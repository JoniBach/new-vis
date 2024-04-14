import * as d3 from 'd3';

export const demoDendrogram = (id: string, newData: string, config: object): void => {
	// set the dimensions and margins of the graph
	const width = config.size.width;
	const height = config.size.height;

	// append the svg object to the body of the page
	const svg = d3
		.select('#' + id)
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', 'translate(40,0)'); // bit of margin on the left = 40

	// read json data
	d3.json(newData).then(function (data) {
		// Create the cluster layout:
		const cluster = d3.cluster().size([height, width - 100]); // 100 is the margin I will have on the right side

		// Give the data to this cluster layout:
		const root = d3.hierarchy(data, function (d) {
			return d.children;
		});
		cluster(root);

		// Add the links between nodes:
		svg
			.selectAll('path')
			.data(root.descendants().slice(1))
			.join('path')
			.attr('d', function (d) {
				return (
					'M' +
					d.y +
					',' +
					d.x +
					'C' +
					(d.parent.y + 50) +
					',' +
					d.x +
					' ' +
					(d.parent.y + 150) +
					',' +
					d.parent.x + // 50 and 150 are coordinates of inflexion, play with it to change links shape
					' ' +
					d.parent.y +
					',' +
					d.parent.x
				);
			})
			.style('fill', 'none')
			.attr('stroke', '#ccc');

		// Add a circle for each node.
		svg
			.selectAll('g')
			.data(root.descendants())
			.join('g')
			.attr('transform', function (d) {
				return `translate(${d.y},${d.x})`;
			})
			.append('circle')
			.attr('r', 7)
			.style('fill', '#69b3a2')
			.attr('stroke', 'black')
			.style('stroke-width', 2);
	});
};
