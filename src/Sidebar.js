import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";

// Logo
import logo from "./assets/theindex.svg";
import authStore from "./stores/authStore";

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
          <h4 className="menu-item">
            <NavLink to="/books">BOOKS</NavLink>
          </h4>
        </section>
        <section>
          {authStore.user ? (
            <h4 className="menu-item">
              <button
                className="btn btn-primary"
                onClick={() => authStore.logout()}
              >
                Logout: {authStore.user.username}
              </button>
            </h4>
          ) : (
            <div>
              <h4 className="menu-item active">
                <NavLink to="/login">Login</NavLink>
              </h4>
              <h4 className="menu-item">
                <NavLink to="/signup">Signup</NavLink>
              </h4>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default observer(Sidebar);
