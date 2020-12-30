import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

import { Navbar, Nav } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { DropdownButton,  Dropdown } from 'react-bootstrap';

class Auditpage extends React.Component {

    constructor(props){
        super(props);
        this.state = {timeFormat: "12hours"}

        this.get12hrFormat = this.get12hrFormat.bind(this);
        this.get24hrFormat = this.get24hrFormat.bind(this);
        this.getTimeFormat = this.getTimeFormat.bind(this);
    }
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    get12hrFormat(createdDate) {
        var dateTime = new Date(createdDate);
        let dateTimeSplit = dateTime.toLocaleString().split(',');
        let mmddyyyy = dateTimeSplit[0];
        let dateSplit = mmddyyyy.split('/');
        let ddmmyyyy = dateSplit[1]+'/'+dateSplit[0]+'/'+dateSplit[2]
        return ddmmyyyy+', '+dateTimeSplit[1];
    }

    get24hrFormat(createdDate){
        var dateTime = new Date(createdDate);
        return dateTime.toLocaleString("en-GB");
    }

    getTimeFormat(eventKey) {
        this.setState({timeFormat: eventKey})
    }

    render() {
        const { user, users } = this.props;

        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)"
        };

        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link href="#features">Auditor</Nav.Link>
                        <Nav.Link> <Link to="/login">Logout</Link></Nav.Link>
                    </Nav>
                </Navbar>
                <div>

                    <h1>Hi {user.firstName}!</h1>
                    <p>You're logged in with React!!</p>
                    <h3>All login audit :</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}

                    <DropdownButton
                        align = "right"
                        title="Time Format"
                        id="time-format"
                        onSelect={this.getTimeFormat}
                    >
                        <Dropdown.Item eventKey="12hours">12 Hours</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="24hours">24 Hours</Dropdown.Item>
                    </DropdownButton>
                    <br />

                    {users.items &&
                        <BootstrapTable
                            data={users.items}
                            striped
                            bordered
                            selectRow={selectRowProp}
                            hover
                            striped
                            hover
                            deleteRow
                            condensed
                            pagination
                            sorting
                            search
                            version='4'
                        >
                            <TableHeaderColumn isKey dataField='id' width='25%'>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='role' width='20%'>Role</TableHeaderColumn>
                            <TableHeaderColumn dataField='createdDate' 
                            dataFormat={this.state.timeFormat === "12hours"?this.get12hrFormat :this.get24hrFormat} width='25%'>Created Date</TableHeaderColumn>
                            <TableHeaderColumn dataField='firstName' width='15%'>First Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='lastName' width='15%'>Last Name</TableHeaderColumn>
                        </BootstrapTable>
                    }
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };