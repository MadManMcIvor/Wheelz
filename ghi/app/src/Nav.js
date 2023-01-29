import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/manufacturers">Manufacturers</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/manufacturers/new">Create Manufacturers</NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink className="dropdown-item" to="/models">Vehicle Models</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/models/new">Create Model</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="dropdown-item" to="/automobiles">Automobiles</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/automobiles/new">Create Automobiles</NavLink>
                  </li>
                </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Service
              </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                      <NavLink className="dropdown-item" to="/technicians/new">Add Technician</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/appointments">Upcoming Appointments</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/appointments/new">Make Appointment</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/appointments/history">Service History</NavLink>
                  </li>
                </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/salesperson">Add Sales Person</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/customer">Potential Customer Form</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/salesrecords">Sales Record</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/salesrecords/new">Create Sales Record</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to="/salesrecords/salesperson">Sales Person's Sales</NavLink>
                  </li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
