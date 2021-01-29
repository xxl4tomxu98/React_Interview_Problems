import React from 'react';

class EmployeesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: this.props.employees,
      searchTerm: ''
    };
    this.filterMethod = this.filterMethod.bind(this);
  }

  filterMethod(e) {
    this.setState({
      searchTerm: e.target.value.toLowerCase()
    })
  }

  render() {
    const { employees } = this.state;
    return (
      <React.Fragment>
          <div className="controls">
              <input type="text" className="filter-input" data-testid="filter-input" onChange={this.filterMethod}/>
          </div>
          <ul className="employees-list">
              {employees.map( employee => {
                  if(employee.name.toLowerCase().includes(this.state.searchTerm)) {
                    return <li key={employee.name} data-testid="employee">{employee.name}</li>
                  } else {
                    return <li key={employee.name} data-testid="employee">{''}</li>
                  }
                }
              )}
          </ul>
      </React.Fragment>
    );
  }
}

export default EmployeesList;
