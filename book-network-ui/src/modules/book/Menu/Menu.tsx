// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Navbar, Nav, NavItem, NavLink, SearchForm } from '../Menu/Menu.styled';

// const Menu: React.FC = () => {
//   const location = useLocation();
//   const [activeLink, setActiveLink] = useState<string>('');

//   useEffect(() => {
//     // Set active link based on the current route
//     setActiveLink(location.pathname);
//   }, [location]);

//   return (
//     <Navbar>
//       <div className="container-fluid">
//         <a className="navbar-brand" href="javascript:void(0)">
//           BSN
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <Nav>
//             <NavItem>
//               <NavLink
//                 to="/books"
//                 className={activeLink === '/books' ? 'active' : ''}
//                 onClick={() => setActiveLink('/books')}
//               >
//                 <i className="fas fa-home-alt"></i>&nbsp;Home
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink
//                 to="/my-books"
//                 className={activeLink === '/my-books' ? 'active' : ''}
//                 onClick={() => setActiveLink('/my-books')}
//               >
//                 <i className="fas fa-book"></i>&nbsp;My books
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink
//                 to="/my-waiting-list"
//                 className={activeLink === '/my-waiting-list' ? 'active' : ''}
//                 onClick={() => setActiveLink('/my-waiting-list')}
//               >
//                 <i className="fas fa-heart"></i>&nbsp;My waiting list
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink
//                 to="/my-returned-books"
//                 className={activeLink === '/my-returned-books' ? 'active' : ''}
//                 onClick={() => setActiveLink('/my-returned-books')}
//               >
//                 <i className="fa-solid fa-truck-fast"></i>&nbsp;My returned books
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink
//                 to="/my-borrowed-books"
//                 className={activeLink === '/my-borrowed-books' ? 'active' : ''}
//                 onClick={() => setActiveLink('/my-borrowed-books')}
//               >
//                 <i className="fas fa-list-check"></i>&nbsp;Borrowed books
//               </NavLink>
//             </NavItem>
//           </Nav>
//           <SearchForm>
//             <input
//               className="form-control me-2"
//               type="search"
//               placeholder="Find a book"
//               aria-label="Search"
//             />
//             <button className="btn btn-outline-success" type="submit">
//               <i className="fas fa-search"></i>
//             </button>
//           </SearchForm>
//         </div>
//       </div>
//     </Navbar>
//   );
// };

// export default Menu;



// 2nd version
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav, NavItem, NavLink, SearchForm, Container, NavBrand, NavbarToggler, NavbarCollapse, NavList, SearchInput, SearchButton, WelcomeText, Username, LogoutButton } from '../Menu/Menu.styled';


const Menu: React.FC = () => {
  console.log("Inside Menu")
  const location = useLocation();
  const [username] = useState('Parth'); // You can replace this with actual user data

  useEffect(() => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Nav>
      <Container>
        <NavBrand as={Link} to="/">BSN</NavBrand>
        <NavbarToggler
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarCollapse id="navbarSupportedContent">
          <NavList>
            <NavItem>
              <NavLink to="/books/" className={`nav-link ${location.pathname === '/books' ? 'active' : ''}`}>
                <i className="fas fa-home-alt"></i>&nbsp;Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/books/my-books" className={`nav-link ${location.pathname === '/books/my-books' ? 'active' : ''}`}>
                <i className="fas fa-book"></i>&nbsp;My books
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/books/my-waiting-list" className={`nav-link ${location.pathname === '/books/my-waiting-list' ? 'active' : ''}`}>
                <i className="fas fa-heart"></i>&nbsp;My waiting list
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/books/my-returned-books" className={`nav-link ${location.pathname === '/books/my-returned-books' ? 'active' : ''}`}>
                <i className="fa-solid fa-truck-fast"></i>&nbsp;My returned books
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/books/my-borrowed-books" className={`nav-link ${location.pathname === '/books/my-borrowed-books' ? 'active' : ''}`}>
                <i className="fas fa-list-check"></i>&nbsp;Borrowed books
              </NavLink>
            </NavItem>
          </NavList>
          <SearchForm role="search">
            <SearchInput type="search" placeholder="Find a book" aria-label="Search" />
            <SearchButton type="submit">
              <i className="fas fa-search"></i>
            </SearchButton>
            <WelcomeText>Welcome</WelcomeText>
            <Username>{username}</Username>
            <LogoutButton onClick={handleLogout}>
              <i className="fas fa-door-open"></i>
            </LogoutButton>
          </SearchForm>
        </NavbarCollapse>
      </Container>
    </Nav>
  );
};

export default Menu;