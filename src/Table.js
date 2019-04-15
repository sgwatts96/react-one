import React, { Component } from 'react';
import './Table.css';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th className="TableHeader-header">Issues!!</th>
      </tr>
    </thead>
  )
}

const TableBody = props => {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.number}{row.title}{row.createdDt}{row.createdBy}</td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

class Table extends Component {
  render() {
    // this.props
    const { characterData } = this.props
    // this.props = {
    //   characterData: [],
    //   vic: "awesome"
    // }
    // destructuring
    // this.props.vic
    // const { vic } = this.props
    // vic

    return (
      <div id='container'>
          <table>
            <TableHeader />
            <TableBody characterData={characterData}/>
          </table>
      </div>
    )
  }
}

export default Table