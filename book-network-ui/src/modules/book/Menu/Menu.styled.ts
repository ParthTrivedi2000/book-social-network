// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

// export const Navbar = styled.nav`
//   background-color: #f8f9fa;
//   .container-fluid {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }

//   .navbar-toggler {
//     background-color: #000;
//   }

//   .navbar-brand {
//     font-weight: bold;
//   }

//   .navbar-collapse {
//     display: flex;
//     justify-content: space-between;
//     width: 100%;
//   }
// `;

// export const Nav = styled.ul`
//   list-style: none;
//   display: flex;
//   gap: 20px;
// `;

// export const NavItem = styled.li``;

// export const NavLink = styled(Link)`
//   color: #000;
//   text-decoration: none;
//   padding: 10px;
//   border-radius: 5px;

//   &:hover {
//     background-color: #d6e5f1;
//     text-decoration: underline;
//   }

//   &.active {
//     color: #24a7e9;
//     border-radius: 5px;
//   }
// `;

// export const SearchForm = styled.form`
//   display: flex;
//   align-items: center;

//   input {
//     margin-right: 10px;
//   }

//   button {
//     background-color: transparent;
//     border: none;
//     cursor: pointer;
//   }
// `;



// 2nd version

// Styled components
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background-color: #f8f9fa;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const NavBrand = styled.a`
  font-size: 1.5rem;
  color: #000;
  text-decoration: none;
`;

export const NavbarToggler = styled.button`
  border: none;
  background: none;
  font-size: 1.5rem;
`;

export const NavbarCollapse = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  margin-bottom: 0;
  padding-left: 0;
`;

export const NavItem = styled.li`
  margin-right: 1rem;
`;

export const NavLink = styled(Link)`
  color: #000;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;

  &.active {
    color: #24a7e9;
  }

  &:hover {
    background-color: #d6e5f1;
    text-decoration: underline;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SearchInput = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  color: #24a7e9;
  cursor: pointer;
`;

export const WelcomeText = styled.span`
  font-size: 1rem;
  margin-right: 1rem;
`;

export const Username = styled.span`
  font-size: 1rem;
  font-weight: bold;
  text-transform: capitalize;
  margin-right: 1rem;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: #24a7e9;
  cursor: pointer;
  font-size: 1rem;
`;
