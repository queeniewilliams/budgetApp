import React from 'react'
import * as d3 from 'd3'

class IncomeBar extends React.Component {
  componentDidMount() {
    console.log(this.props)
    const dataset = this.props.data
    const w = 500
    const h = 200
    const svg = d3
      .select(this.refs.chart)
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('class', 'bar')
    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('fill', 'rgba(0, 255, 255, 0.678)')
      .attr('class', 'sBar')
      .attr('x', (d, i) => i * 25)
      .attr('y', (d, i) => {
        return h - 0.05 * d
      })
      .attr('width', 20)
      .attr('height', (d, i) => 7 * d)
      .append('title')
      .text((d) => d)
    svg
      .selectAll('text')
      .data(dataset)
      .enter()
      .append()
      .style('font-size', 18)
      .attr('fill', 'grey')
      .attr('x', (d, i) => i * 25)
      .attr('y', (d, i) => h - 0.05 * d - 3)
      .text((d) => d)
  }
  render() {
    const styles = {
      container: {
        display: 'grid',
        justifyItems: 'center'
      }
    }
    return this.props.data && <div ref="chart" style={styles.container}></div>
  }
}
export default IncomeBar
