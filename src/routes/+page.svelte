<script lang="ts">
	import { demoScatter } from '$lib/charts/scatter';
	import { demoDendrogram } from '$lib/demo/comparison/dendrogram';
	import { demoDoughnut } from '$lib/demo/comparison/doughnut';
	import { demoPie } from '$lib/demo/comparison/pie';
	import { demoTreemapCircular } from '$lib/demo/comparison/treemapCircular';
	import { demoTreemapJson } from '$lib/demo/comparison/treemapJson';
	import { demoBubble } from '$lib/demo/correlation/bubble';
	import { demoBubbleAdvanced } from '$lib/demo/correlation/bubbleAdvanced';
	import { demoCorrelogram } from '$lib/demo/correlation/correlogram';
	import { demoDensityShaded } from '$lib/demo/correlation/densityShaded';
	import { demoHeatmap } from '$lib/demo/correlation/heatmap';
	import { demoHeatmapAdvanced } from '$lib/demo/correlation/heatmapAdvanced';
	import { demoScatterConnected } from '$lib/demo/correlation/scatterConnected';
	import { demoScatterConnectedMulti } from '$lib/demo/correlation/scatterConnectedMulti';
	import { demoScatterConnectedSmoothe } from '$lib/demo/correlation/scatterConnectedSmoothe';
	import { demoDensity } from '$lib/demo/distribution/density';
	import { demoDensityDouble } from '$lib/demo/distribution/densityDouble';
	import { demoDensityDoubleB2B } from '$lib/demo/distribution/densityDoubleB2B';
	import { demoHistogram } from '$lib/demo/distribution/histogram';
	import { demoHistogramDouble } from '$lib/demo/distribution/histogramDouble';
	import { demoRidgeLine } from '$lib/demo/distribution/ridgeLine';
	import { demoRidgeLineAdvanced } from '$lib/demo/distribution/ridgeLineAdvanced';
	import { demoArc } from '$lib/demo/flow/arc';
	import { demoChord } from '$lib/demo/flow/chord';
	import { demoNetwork } from '$lib/demo/flow/network';
	import { demoBar } from '$lib/demo/ranking/bar';
	import { demoBarCircular } from '$lib/demo/ranking/barCircular';
	import { demoBarCircularLabels } from '$lib/demo/ranking/barCircularLabels';
	import { demoBarCircularLabelsDouble } from '$lib/demo/ranking/barCircularLabelsDouble';
	import { demoBarHorizontal } from '$lib/demo/ranking/barHorizontal';
	import { demoBarStacked } from '$lib/demo/ranking/barStacked';
	import { demoLolipop } from '$lib/demo/ranking/lolipop';
	import { demoLolipopCleveland } from '$lib/demo/ranking/lolipopCleveland';
	import { demoLolipopHorizontal } from '$lib/demo/ranking/lolipopHorizontal';
	import { demoParallel } from '$lib/demo/ranking/parallel';
	import { onMount } from 'svelte';

	const config = {
		margin: { top: 50, right: 30, bottom: 20, left: 100 },
		size: { width: 400, height: 400 },
		bg: 'transparent',
		padding: 0
	};

	const graphs = [
		{
			id: 'histogram',
			title: 'Sales Performance',
			data: 'data/distribution/histogram.json',
			fn: demoHistogram
		},
		{
			id: 'histogram-double',
			title: 'Sales Performance',
			data: 'data/distribution/histogram-double.json',
			fn: demoHistogramDouble
		},

		{
			id: 'density',
			title: 'Sales Performance',
			data: 'data/distribution/histogram.json',
			fn: demoDensity
		},
		{
			id: 'density-double',
			title: 'Density double',
			data: 'data/distribution/density-double.json',
			fn: demoDensityDouble
		},
		{
			id: 'density-double-b2b',
			title: 'Density double back to back',
			data: 'data/distribution/density-double-b2b.json',
			// data originally from "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_doubleHist.csv",
			fn: demoDensityDoubleB2B
		},
		{
			id: 'ridgeline',
			title: 'Mental Health',
			data: 'data/distribution/ridgeline.json',
			fn: demoRidgeLine
		},
		{
			id: 'ridgeline-advanced',
			title: 'Mental Health',
			data: 'data/distribution/ridgeline.json',
			fn: demoRidgeLineAdvanced
		},

		// correlation
		{
			id: 'scatter',
			title: 'Stock Performance',
			data: 'data/correlation/scatter.json',
			fn: demoScatter
		},
		{
			id: 'heatmap',
			title: 'Employeee Performance',
			data: 'data/correlation/heatmap.json',
			fn: demoHeatmap
		},
		{
			id: 'heatmap-advanced',
			title: 'Employeee Performance',
			data: 'data/correlation/heatmap.json',
			fn: demoHeatmapAdvanced
		},
		{
			id: 'correlogram',
			title: 'Health and Lifestyle',
			data: 'data/correlation/correlogram.json',
			fn: demoCorrelogram
		},
		{
			id: 'bubble',
			title: 'Near Earth Objects',
			data: 'data/correlation/bubble.json',
			fn: demoBubble
		},
		{
			id: 'bubble-advanced',
			title: 'Near Earth Objects',
			data: 'data/correlation/bubble.json',
			fn: demoBubbleAdvanced
		},
		{
			id: 'scatter-connected',
			title: 'Scatter connected',
			data: 'data/correlation/scatter-connected.json',
			fn: demoScatterConnected
		},
		{
			id: 'scatter-connected-multi',
			title: 'Time Sales Expenses Proffit',
			data: 'data/correlation/scatter-connected-multi.json',
			fn: demoScatterConnectedMulti
		},
		{
			id: 'scatter-connected-smoothe',
			title: 'Scatter connected smothe',
			data: 'data/correlation/scatter-connected.json',
			fn: demoScatterConnectedSmoothe
		},
		{
			id: 'density-shaded',
			data: 'data/correlation/density-shaded.json',
			fn: demoDensityShaded
		},

		// ranking
		{
			id: 'bar',
			title: 'Pokemon evolution level',
			data: 'data/ranking/bar.json',
			fn: demoBar
		},
		{
			id: 'bar-horizontal',
			title: 'Pokemon evolution level',
			data: 'data/ranking/bar.json',
			fn: demoBarHorizontal
		},
		{
			id: 'bar-stacked',
			title: 'Sales of goods',
			data: 'data/ranking/bar-stacked.json',
			fn: demoBarStacked
		},
		{
			id: 'parallel',
			title: 'Vehicles performance',
			data: 'data/ranking/parallel.json',
			fn: demoParallel
		},
		{
			id: 'lolipop',
			title: 'Pokemon evolution levels',
			data: 'data/ranking/bar.json',
			fn: demoLolipop
		},
		{
			id: 'lolipop-horizontal',
			title: 'Pokemon evolution levels',
			data: 'data/ranking/bar.json',
			fn: demoLolipopHorizontal
		},
		{
			id: 'lolipop-cleveland',
			title: 'Athletes performance',
			data: 'data/ranking/lolipop-cleveland.json',
			fn: demoLolipopCleveland
		},
		{
			id: 'bar-circular',
			title: 'Energy consumption',
			data: 'data/ranking/bar-circular.json',
			fn: demoBarCircular
		},
		{
			id: 'bar-circular-labels',
			title: 'Energy consumption',
			data: 'data/ranking/bar-circular.json',
			fn: demoBarCircularLabels
		},
		{
			id: 'bar-circular-labels-double',
			title: 'Energy consumption vs green energy production',
			data: 'data/ranking/bar-circular-double.json',
			fn: demoBarCircularLabelsDouble
		},

		// comparison
		{
			id: 'treemap',
			title: 'Academia',
			data: 'data/comparison/treemap.json',
			fn: demoTreemapJson
		},
		{
			id: 'treemap-circular',
			title: 'Tech revinue',
			data: 'data/comparison/treemap-circular.json',
			// originally from "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/11_SevCatOneNumNestedOneObsPerGroup.csv",
			fn: demoTreemapCircular
		},
		{
			id: 'dendrogram',
			title: 'Employee structure',
			data: 'data/comparison/dendrogram.json',
			fn: demoDendrogram
		},
		{
			id: 'doughnut',
			title: 'Example doughnut chart',
			data: { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 },
			fn: demoDoughnut
		},
		{
			id: 'pie',
			title: 'Example pie chart',
			data: { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 },
			fn: demoPie
		},

		// flow
		{
			id: 'arc',
			title: 'Engineering team flow',
			data: 'data/flow/arc.json',
			fn: demoArc
		},
		{
			id: 'network',
			title: 'Reasearch team network',
			data: 'data/flow/network.json',
			fn: demoNetwork
		},
		{
			id: 'chord',
			title: 'courntry export connections',
			data: [
				[0, 35, 50, 25], // Exports from Country A to B, C, D
				[40, 0, 30, 20], // Exports from Country B to A, C, D
				[45, 25, 0, 30], // Exports from Country C to A, B, D
				[20, 40, 35, 0] // Exports from Country D to A, B, C
			],
			fn: demoChord
		}
	];

	onMount(async () => {
		for (const graph of graphs) {
			await graph.fn(graph.id, graph.data, config);
		}
	});
</script>

sd
{#each graphs as { id }}
	<div {id}></div>
{/each}
