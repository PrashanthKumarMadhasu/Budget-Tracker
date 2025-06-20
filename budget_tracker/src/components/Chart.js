import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const Message = styled.p`
  text-align: center;
  font-weight: bold;
  color: ${(props) => (props.exceeded ? 'red' : 'green')};
`;

const Chart = ({ salary, estimated, expense }) => {
  const ref = useRef();
  const width = 400;
  const height = 250;

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const data = [
      { label: 'Estimated Budget', value: +estimated },
      { label: 'Total Expense', value: Math.abs(expense) }
    ];

    const maxValue = d3.max(data, d => d.value) || 1;

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([innerHeight, 0]);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X-axis
    chart.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

    // Y-axis
    chart.append('g')
      .call(d3.axisLeft(yScale));

    // Bars
    chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.label))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.value))
      .attr('fill', (d, i) => (i === 1 ? '#f44336' : '#4caf50'));

    // Labels on bars
    chart.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => xScale(d.label) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.value) - 5)
      .attr('text-anchor', 'middle')
      .text(d => `₹${d.value}`);
  }, [estimated, expense]);

  const exceeded = expense > estimated;

  return (
    <div>
      <svg ref={ref} width={width} height={height}></svg>
      <Message exceeded={exceeded}>
        {exceeded ? '⚠️ Oops! Budget Exceeded!' : '✅ You are in the Safe Zone'}
      </Message>
    </div>
  );
};

export default Chart;
