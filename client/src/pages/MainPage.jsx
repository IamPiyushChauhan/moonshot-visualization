import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom'
function MainPage() {
  return (
    <React.Fragment>
        <NavBar/>
        <div style={{marginTop: "2.5rem"}}>
          <Outlet/>
        </div>
    </React.Fragment>
  );
}

export default MainPage;
