'use client';

import { useEffect, useRef } from 'react';
import { Stock } from '~/server/services/fmp-api';
import * as d3 from 'd3';

export const BuubleChart = ({ stockDataList }: { stockDataList: Stock[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth - 50;
    const height = window.innerHeight - 50;

    //const screenCof = height / width;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const scaleColor = d3
      .scaleLinear<string>()
      .domain([-1, 0, 1])
      .range(['red', 'gray', 'green']);

    /*
    const color = d3
      .scaleLinear<string>()
      .domain([-1, 0, 1])
      .range([
        'rgba( 246, 126, 121,0.2)',
        'rgba( 169, 169, 169,0.2)',
        'rgba( 153, 246, 166,0.2)',
      ]);
*/
    const fontSize = d3
      .scaleSqrt()
      .domain([-10, d3.max(stockDataList, (d) => d.marketCap)!])
      .range([10, 25]);

    const radiusScale = d3
      .scaleSqrt()
      .domain([
        d3.min(stockDataList, (d) => d.marketCap)!,
        d3.max(stockDataList, (d) => d.marketCap)!,
      ])
      .range([30, 150]);

    const simulation = d3
      .forceSimulation(stockDataList)
      .velocityDecay(0.6)
      .force('charge', d3.forceManyBody().strength(-10)) // чуть слабее отталкивание
      .force(
        'x',
        d3
          .forceX()
          .strength(0.05)
          .x((d) => {
            return Math.random() * width; // или по d.id
          })
      )
      .force(
        'y',
        d3
          .forceY()
          .strength(0.05)
          .y((d) => {
            return Math.random() * height;
          })
      )
      .force(
        'collision',
        d3.forceCollide((d) => radiusScale(d.marketCap) + 5)
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
      .duration(1000)
      .ease(d3.easeCubicOut)
      .attr('r', (d) => radiusScale(d.marketCap))
      .attr('stroke', (d) => scaleColor(d.beta))
      .attr('stroke-width', '2px');

    /*
	 node.on('click', function (event, d) {
  
		 const g = d3.select(this);

  // Анимация исчезновения
  g.select('circle')
    .transition()
    .duration(400)
    .attr('r', radiusScale(d.price) * 2)
    .style('opacity', 0);

  g.selectAll('text, image')
    .transition()
    .duration(400)
    .style('opacity', 0);

  // Удаление из DOM и из симуляции
  setTimeout(() => {
    // Удаляем узел из DOM
    g.remove();

    // Удаляем из данных симуляции
    const index = stockDataList.indexOf(d);
    if (index > -1) {
      stockDataList.splice(index, 1);
    }

    simulation.nodes(stockDataList); // обновляем симуляцию
    simulation.alpha(1).restart();   // перезапускаем симуляцию
  }, 400);
});

*/
    node
      .append('image')
      .attr('display', (d) => (radiusScale(d.marketCap) < 30 ? 'none' : null))
      .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .attr('href', (d) => `api/stock/image/${d.symbol}`)
      .attr('x', (d) => -radiusScale(d.marketCap) * 0.4)
      .attr('y', (d) => -radiusScale(d.marketCap) * 0.8)
      .attr('width', (d) => radiusScale(d.marketCap) * 0.8)
      .attr('height', (d) => radiusScale(d.marketCap) * 0.8)
      .attr('clip-path', (d, i) => `url(#clip-${i})`);

    // 3. Название компании — по центру
    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => radiusScale(d.marketCap) * 0.3) // немного ниже центра
      .attr('fill', 'white')
      .attr('font-size', (d) => `${fontSize(d.marketCap)}px`)
      .text((d) => d.symbol);

    // 4. Изменение ценsы — ниже названия
    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => radiusScale(d.marketCap) * 0.6)
      .attr('fill', 'white')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text((d) => `${d.beta > 0 ? '+' : ''}${d.beta.toFixed(2)}%`);

    function ticked() {
      node.attr('transform', (d) => {
        const r = radiusScale(d.marketCap) + 5;
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
    <div className='flex h-full w-full items-center justify-center'>
      <svg ref={svgRef} className='bg-primary/90 p-1' />
    </div>
  );
};
