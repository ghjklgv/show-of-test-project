import * as React from 'react'
interface IMyProps {
  data: any
}
class UserList extends React.Component<IMyProps> {
  tableRow = () => {
    return this.props.data.map((row: any, key: any) => (
      <tr>
        <td>{row.id}</td>
        <td>{row.name}</td>
      </tr>
    ))
  }
  render () {
    return (
      <div className='container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
            </tr>
          </thead>
          <tbody>{this.tableRow()}</tbody>
        </table>
      </div>
    )
  }
}
export default UserList
