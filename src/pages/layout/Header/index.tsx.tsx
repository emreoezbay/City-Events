import { styled } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderManu = styled;

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">All Events</Link>
        </li>
        <li>
          <Link to="/manage">Manage All Events</Link>
        </li>
      </ul>
    </div>
  );
}
