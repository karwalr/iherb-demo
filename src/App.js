import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import FormTemplate from './components/Form';
import Report from './components/Report';

import { Container, Nav, NavItem } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasReports: localStorage.getItem('reports') ? true : false
    };
  }

  renderReportLink() {
    if (this.state.hasReports) {
      return (
        <Link to="/report" className="nav-link">
          Report
        </Link>
      );
    } else {
      return <span className="nav-link">Report</span>;
    }
  }

  updateLinks() {
    this.setState({
      hasReports: localStorage.getItem('reports') ? true : false
    });
  }

  render() {
    return (
      <Container>
        <BrowserRouter>
          <div>
            <Nav>
              <NavItem>
                <Link to="/" className="nav-link">
                  Form
                </Link>
              </NavItem>
              <NavItem>{this.renderReportLink()}</NavItem>
            </Nav>

            <Route
              path="/"
              exact
              render={props => (
                <FormTemplate
                  {...props}
                  UpdateNavigation={() => this.updateLinks()}
                />
              )}
            />
            <Route path="/report" component={Report} />
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
