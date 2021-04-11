import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavBarLink url="/" title="Zoetrope" />
            <NavBarLink url="/" title="Tasks" />
            <NavBarLink url="/projects" title="Projects" />
            <NavBarLink url="/messages" title="Messages" />

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                System Info
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/diskusage">Disk Usage</a></li>
                <li><a className="dropdown-item" href="/hostinfo">Host Info</a></li>
                <li><a className="dropdown-item" href="/dailytransferhistory">Daily Transfer History</a></li>
                <li><a className="dropdown-item" href="/globalpreferences">Global Preferences</a></li>
              </ul>
            </li>
        </ul>
        </div>
      </div>
    </nav>
  );
};

const NavBarLink = ({url, title}) => {
  return (
    <li className="nav-item">
      <a className="nav-link" href={url} tabIndex="-1">{title}</a>
    </li>
  );
};

export default NavBar;

