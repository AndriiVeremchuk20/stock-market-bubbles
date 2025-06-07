'use client';

import { useEffect, useRef } from 'react';
import { Stock } from '~/services/finance-data/fmp-api';
import * as d3 from 'd3';

export const BuubleChart = ({ stockDataList }: { stockDataList: Stock[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

	//const screenCof = height / width;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const scaleColor = d3
      .scaleLinear<string>()
      .domain([-1, 0, 1])
      .range(['red', 'gray', 'green']);

    const color = d3
      .scaleLinear<string>()
      .domain([-1, 0, 1])
      .range([
        'rgba( 246, 126, 121,0.4)',
        'rgba( 169, 169, 169,0.4)',
        'rgba( 153, 246, 166,0.4)',
      ]);

	  const fontSize = d3.scaleLinear<number>()
	  .domain([-10, 10]).range([10, 12]);

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(stockDataList, d => d.price)!])
      .range([30, 200]);


    const simulation = d3
      .forceSimulation(stockDataList)
      .force('charge', d3.forceManyBody().strength(-10))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collision',
        d3.forceCollide((d) => radiusScale(d.price) + 4)
      )
      .on('tick', ticked);

    const node = svg
      .selectAll<SVGGElement, Stock>('g')
      .data(stockDataList)
      .enter()
      .append('g')
      .call(
        d3
          .drag<SVGGElement, Stock>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    node
      .append('circle')
      .transition()
      .duration(1500)
      .ease(d3.easeCubicOut)
      .attr('r', (d) => radiusScale(d.price) )
      .attr('fill', (d) => color(d.beta))
      .attr('stroke', (d) => scaleColor(d.beta));

    node
      .append('image')
      .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .attr('href', (d) => d.logo!)
      .attr('x', (d) => -radiusScale(d.price) * .4)
      .attr('y', (d) => -radiusScale(d.price) * 0.8)
      .attr('width', (d) => radiusScale(d.price) * .8)
      .attr('height', (d) => radiusScale(d.price) * .8)
      .attr('clip-path', (d, i) => `url(#clip-${i})`);

    // 3. Название компании — по центру
    node
      .append('text')
	  .attr('text-anchor', 'middle')
      .attr('y', (d) => radiusScale(d.price) * 0.3) // немного ниже центра
      .attr('fill', 'white')
      .attr('font-size',"14px")
      .text((d) => d.symbol);

    // 4. Изменение ценsы — ниже названия
    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => radiusScale(d.price) * 0.6)
      .attr('fill', "white")
      .attr('font-size', "10px")
	  .attr('font-weight', "bold")
      .text((d) => `${d.beta > 0 ? '+' : ''}${d.beta.toFixed(2)}%`);

    function ticked() {
      node.attr('transform', (d) => {
        const r = radiusScale(d.price);
        d.x = Math.max(r, Math.min(width - r, d.x!));
        d.y = Math.max(r, Math.min(height - r, d.y!));

        return `translate(${d.x},${d.y})`;
      });
    }

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
      svg.selectAll('*').remove();
    };
  }, []);

  return (
    <div className='bg-indigo-900 h-screen'>
      <svg ref={svgRef} />
    </div>
  );
};
