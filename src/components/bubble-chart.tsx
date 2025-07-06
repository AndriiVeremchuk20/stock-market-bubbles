'use client';

import { useEffect, useRef } from 'react';
import { Stock } from '~/server/services/fmp-api';
import * as d3 from 'd3';
import {
  BubbleColorScheme,
  BubbleContent,
  usePreferencesStore,
} from '~/store/preferences';
import { formatMarketCap } from '~/server/services/formatters';

const colorsShemes: Record<BubbleColorScheme, string[]> = {
  'red-green': ['red', 'gray', 'green'],
  'blue-yellow': ['blue', 'gray', 'yellow'],
  neutral: ['white', 'white'],
};

const getBubbleContent = (d: Stock, content: BubbleContent) => {
  if (content === 'beta')
    return `${d.beta > 0 ? '+' : ''}${d.beta.toFixed(2)}%`;
  else if (content === 'marketCap') return formatMarketCap(d.marketCap);

  return formatMarketCap(d.volume);
};

export const BuubleChart = ({ stockDataList }: { stockDataList: Stock[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const { bubbleSize, bubbleContent, bubbleColorScheme } =
    usePreferencesStore();

  const width = window.innerWidth - 20;
  const height = window.innerHeight - 20;

  const isMoble = width < 768;

  const diviveMaxRadius = bubbleSize === 'beta' ? 10 : 5; // used to make bubble size smaller when bubbleSize === "beta"

  useEffect(() => {
    const getRadiusValue = (d: Stock) => d[bubbleSize];
    const valueByContent = (d: Stock) => d[bubbleContent];

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const scaleColor = d3
      .scaleLinear<string>()
      .domain([-1, 0, 1])
      .range(colorsShemes[bubbleColorScheme]);

    const fontSize = d3
      .scaleSqrt()
      .domain([-10, d3.max(stockDataList, (d) => getRadiusValue(d))!])
      .range(isMoble ? [10, 15] : [10, 25]);

    const radiusScale = d3
      .scaleSqrt()
      .domain([
        d3.min(stockDataList, (d) => getRadiusValue(d))!,
        d3.max(stockDataList, (d) => getRadiusValue(d))!,
      ])
      .range(
        isMoble
          ? [20, Math.min(width, height) / diviveMaxRadius]
          : [
              bubbleSize === 'beta' ? 20 : 40,
              Math.min(height, width) / diviveMaxRadius,
            ]
      );

    const simulation = d3
      .forceSimulation(stockDataList)
      .velocityDecay(0.6)
      .force('charge', d3.forceManyBody().strength(-10))
      .force(
        'x',
        d3
          .forceX()
          .strength(0.05)
          .x((d) => {
            return Math.random() * width;
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
        d3.forceCollide((d) => radiusScale(getRadiusValue(d)) + 5)
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
      .attr('r', (d) => radiusScale(getRadiusValue(d)))
      .attr('stroke', (d) => scaleColor(d.beta))
      .attr('stroke-width', '2px');

    node
      .append('image')
      .attr('display', (d) =>
        radiusScale(getRadiusValue(d)) < (isMoble ? 12 : 32) ? 'none' : null
      )
      .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .attr('href', (d) => `api/stock/image/${d.symbol}`)
      .attr('x', (d) => -radiusScale(getRadiusValue(d)) * 0.4)
      .attr('y', (d) => -radiusScale(getRadiusValue(d)) * 0.8)
      .attr('width', (d) => radiusScale(getRadiusValue(d)) * 0.8)
      .attr('height', (d) => radiusScale(getRadiusValue(d)) * 0.8)
      .attr('clip-path', (d, i) => `url(#clip-${i})`);

    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => radiusScale(getRadiusValue(d)) * 0.3) // немного ниже центра
      .attr('fill', 'white')
      .attr('font-size', (d) => `${fontSize(getRadiusValue(d))}px`)
      .text((d) => d.symbol);

    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => radiusScale(getRadiusValue(d)) * 0.6)
      .attr('fill', 'white')
      .attr('font-size', (d) => `${fontSize(getRadiusValue(d)) - 4}px`)
      .attr('font-weight', 'bold')
      .text((d) => getBubbleContent(d, bubbleContent));

    function ticked() {
      node.attr('transform', (d) => {
        const r = radiusScale(getRadiusValue(d)) + 5;
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
  }, [bubbleColorScheme, bubbleSize, bubbleContent]);

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <svg ref={svgRef} className='bg-primary/90' />
    </div>
  );
};
