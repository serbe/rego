import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const RegularLink = (): JSX.Element => (
  <>
    <li className="hover:bg-blue-800 hover:text-white">
      <NavLink
        to="/contacts"
        className="relative block px-2 py-4 text-sm font-bold lg:p-4 lg:text-base"
      >
        Контакты
      </NavLink>
    </li>
    <li className="hover:bg-blue-800 hover:text-white">
      <NavLink
        to="/companies"
        className="relative block px-2 py-4 text-sm font-bold lg:p-4 lg:text-base"
      >
        Организации
      </NavLink>
    </li>
  </>
);

const ToggleableLink = (): JSX.Element => (
  <li className="toggleable hover:bg-blue-800 hover:text-white">
    <input type="checkbox" value="selected" id="toggle-one" className="toggle-input" />
    <label
      htmlFor="toggle-one"
      className="block px-4 py-4 text-sm font-bold cursor-pointer lg:p-4 lg:text-base"
    >
      Click
    </label>
    <div role="toggle" className="p-6 mb-16 bg-blue-800 shadow-xl mega-menu sm:mb-0">
      <div className="container flex flex-wrap justify-between w-full mx-2 mx-auto">
        <ul className="w-full px-4 pt-6 pb-6 border-b border-gray-600 sm:w-1/2 lg:w-1/4 sm:border-r lg:border-b-0 lg:pt-3">
          <h3 className="mb-2 text-xl font-bold text-white text-bold">Heading 1</h3>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
        </ul>
        <ul className="w-full px-4 pt-6 pb-6 border-b border-gray-600 sm:w-1/2 lg:w-1/4 sm:border-r-0 lg:border-r lg:border-b-0 lg:pt-3">
          <h3 className="mb-2 text-xl font-bold text-white text-bold">Heading 2</h3>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
        </ul>
        <ul className="w-full px-4 pt-6 pb-6 border-b border-gray-600 sm:w-1/2 lg:w-1/4 sm:border-b-0 sm:border-r md:border-b-0 lg:pt-3">
          <h3 className="text-xl font-bold text-white text-bold">Heading 3</h3>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 text-gray-300 hover:bg-blue-600 hover:text-white">
              Category One Sublink
            </a>
          </li>
        </ul>
        <ul className="w-full px-4 pt-6 pb-6 border-gray-600 sm:w-1/2 lg:w-1/4 lg:pt-3">
          <h3 className="mb-2 text-xl font-bold text-white text-bold">Heading 4</h3>
          <li className="pt-3">
            <img src="https://placehold.it/205x172" />
          </li>
        </ul>
      </div>
    </div>
  </li>
);

const HoverableLink = (): JSX.Element => (
  <li className="hoverable hover:bg-blue-800 hover:text-white">
    <a
      href="#"
      className="relative block px-4 py-4 text-sm font-bold lg:p-4 lg:text-base hover:bg-blue-800 hover:text-white"
    >
      Hover
    </a>
    <div className="p-6 mb-16 bg-blue-800 shadow-xl mega-menu sm:mb-0">
      <div className="container flex flex-wrap justify-between w-full mx-2 mx-auto">
        <div className="w-full mb-8 text-white">
          <h2 className="text-2xl font-bold">Main Hero Message for the menu section</h2>
          <p>Sub-hero message, not too long and not too short. Make it just right!</p>
        </div>
        <ul className="w-full px-4 pt-6 pb-6 border-b border-gray-600 sm:w-1/2 lg:w-1/4 sm:border-r lg:border-b-0 lg:pt-3">
          <div className="flex items-center">
            <svg
              className="h-8 mb-3 mr-3 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z" />
            </svg>
            <h3 className="mb-2 text-xl font-bold text-white text-bold">Heading 1</h3>
          </div>
          <p className="text-sm text-gray-100">
            Quarterly sales are at an all-time low create spaces to explore the accountable talk and
            blind vampires.
          </p>
          <div className="flex items-center py-3">
            <svg
              className="h-6 pr-3 text-blue-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
            </svg>
            <a href="#" className="text-white border-b-2 border-blue-300 bold hover:text-blue-300">
              Find out more...
            </a>
          </div>
        </ul>
        <ul className="w-full px-4 pt-6 pb-6 border-b border-gray-600 sm:w-1/2 lg:w-1/4 sm:border-r-0 lg:border-r lg:border-b-0 lg:pt-3">
          <div className="flex items-center">
            <svg
              className="h-8 mb-3 mr-3 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z" />
            </svg>
            <h3 className="mb-2 text-xl font-bold text-white text-bold">Heading 2</h3>
          </div>
          <p className="text-sm text-gray-100">
            Prioritize these line items game-plan draw a line in the sand come up with something
            buzzworthy UX upstream selling.
          </p>
          <div className="flex items-center py-3">
            <svg
              className="h-6 pr-3 text-blue-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
            </svg>
            <a href="#" className="text-white border-b-2 border-blue-300 bold hover:text-blue-300">
              Find out more...
            </a>
          </div>
        </ul>
        <ul className="w-full px-4 pt-6 pb-6 border-b border-gray-600 sm:w-1/2 lg:w-1/4 sm:border-b-0 sm:border-r md:border-b-0 lg:pt-3">
          <div className="flex items-center">
            <svg
              className="h-8 mb-3 mr-3 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
            </svg>
            <h3 className="mb-2 text-xl font-bold text-white text-bold">Heading 3</h3>
          </div>
          <p className="text-sm text-gray-100">
            This proposal is a win-win situation which will cause a stellar paradigm shift, let's
            touch base off-line before we fire the new ux experience.
          </p>
          <div className="flex items-center py-3">
            <svg
              className="h-6 pr-3 text-blue-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
            </svg>
            <a href="#" className="text-white border-b-2 border-blue-300 bold hover:text-blue-300">
              Find out more...
            </a>
          </div>
        </ul>
        <ul className="w-full px-4 pt-6 pb-6 border-gray-600 sm:w-1/2 lg:w-1/4 lg:pt-3">
          <div className="flex items-center">
            <svg
              className="h-8 mb-3 mr-3 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg>
            <h3 className="mb-2 text-xl font-bold text-white text-bold">Heading 4</h3>
          </div>
          <p className="text-sm text-gray-100">
            This is a no-brainer to wash your face, or we need to future-proof this high performance
            keywords granularity.
          </p>
          <div className="flex items-center py-3">
            <svg
              className="h-6 pr-3 text-blue-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
            </svg>
            <a href="#" className="text-white border-b-2 border-blue-300 bold hover:text-blue-300">
              Find out more...
            </a>
          </div>
        </ul>
      </div>
    </div>
  </li>
);

const MegaMenu = (): JSX.Element => (
  <nav className="relative text-gray-900 bg-white border-b-2 border-gray-300">
    <div className="container flex justify-between mx-auto">
      <div className="relative block p-2 text-xl font-bold text-blue-600 lg:p-4">
        <NavLink to="/">ЕДДС</NavLink>
      </div>
      <ul className="flex">
        <RegularLink />
        <HoverableLink />
        <ToggleableLink />
      </ul>
    </div>
  </nav>
);

// const AccountDropdown = (): JSX.Element => {
//   const [isOpen, setOpen] = useState(false);

//   return (
//     <div className="relative ml-6">
//       <button
//         onClick={(): void => setOpen(!isOpen)}
//         className="relative z-10 block w-8 h-8 overflow-hidden border-2 border-gray-600 rounded-full focus:outline-none focus:border-white"
//       >
//         <img
//           className="object-cover w-full h-full"
//           src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
//           alt="Your avatar"
//         />
//       </button>
//       {isOpen ? (
//         <button
//           onClick={(): void => setOpen(false)}
//           tabIndex={-1}
//           className="fixed inset-0 w-full h-full bg-black opacity-50 cursor-default"
//         ></button>
//       ) : null}
//       {isOpen ? (
//         <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
//           <a
//             href="#settings"
//             className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
//           >
//             Account settings
//           </a>
//           <a
//             href="#support"
//             className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
//           >
//             Support
//           </a>
//           <a
//             href="#signout"
//             className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
//           >
//             Выход
//           </a>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// const Header = (): JSX.Element => {
//   const [isOpen, setOpen] = useState(false);
//   const navClass = isOpen
//     ? 'block px-2 pt-2 pb-4 sm:flex sm:p-0'
//     : 'hidden px-2 pt-2 pb-4 sm:flex sm:p-0';

//   return (
//     <header className="top-0 left-0 w-full bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-2">
//       <div className="flex items-center justify-between px-4 py-3 sm:p-0">
//         <div className="block px-2 pt-2 pb-4 sm:flex sm:p-0">
//           <NavLink
//             to="/"
//             className="block px-2 py-1 font-semibold text-white rounded hover:bg-gray-800"
//           >
//             ЕДДС
//           </NavLink>
//           <NavLink
//             to="/contacts"
//             className="block px-2 py-1 font-semibold text-white rounded hover:bg-gray-800"
//           >
//             Контакты
//           </NavLink>
//           <NavLink
//             to="/companies"
//             className="block px-2 py-1 mt-1 font-semibold text-white rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
//           >
//             Организации
//           </NavLink>
//         </div>
//         <div className="sm:hidden">
//           <button
//             onClick={(): void => setOpen(!isOpen)}
//             type="button"
//             className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
//           >
//             <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path
//                   fillRule="evenodd"
//                   d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
//                 />
//               ) : (
//                 <path
//                   fillRule="evenodd"
//                   d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>
//       <nav className={navClass}>
//         <NavLink
//           to="/certificates"
//           className="block px-2 py-1 font-semibold text-white rounded hover:bg-gray-800"
//         >
//           Сертификаты
//         </NavLink>
//         <NavLink
//           to="/companies"
//           className="block px-2 py-1 mt-1 font-semibold text-white rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
//         >
//           Организации
//         </NavLink>
//         <a
//           href="#messages"
//           className="block px-2 py-1 mt-1 font-semibold text-white rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
//         >
//           Messages
//         </a>
//         <AccountDropdown />
//       </nav>
//     </header>
//   );
// };

// const BottomBar = (): JSX.Element => (
//   <div className="fixed bottom-0 left-0 w-full bg-gray-900">
//     <div className="flex flex-col items-center justify-center py-1 sm:flex-row">
//       <h1 className="text-xs font-bold text-gray-600 uppercase">© 2020 Сочи</h1>
//     </div>
//   </div>
// );

export const NavBar: FC<{}> = () => {
  // const [auth, setAuth] = useState(true);
  // const auth = true;
  // const [open, setOpen] = useState(false);

  // const openClassName = (cn: string): string => (open ? `${cn} is-active` : cn);

  // const handleToggle = (): void => {
  //   setOpen(!open);
  // };

  return (
    <>
      <MegaMenu />
      {/* <Header /> */}
      {/* <Navbar /> */}
      {/* <BottomBar /> */}
    </>
    // <Container>
    //   {auth ? (
    //     <Menu>
    //       <Menu.Item name="ЕДДС" as={NavLink} exact to="/" />
    //       <Menu.Item name="Контакты" as={NavLink} to="/contacts" onClick={handleToggle} />
    //       <Menu.Item name="Организации" as={NavLink} to="/companies" onClick={handleToggle} />
    //       <Menu.Item name="Сирены" as={NavLink} to="/sirens" onClick={handleToggle} />

    //       <Menu.Item>
    //         <Dropdown text="Справочники">
    //           <Dropdown.Menu>
    //             <Dropdown.Item onClick={handleToggle} to="/departments">
    //               Отделы
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               activeClassName="is-active"
    //               className="navbar-item"
    //               onClick={handleToggle}
    //               to="/educations"
    //             >
    //               Обучение
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               activeClassName="is-active"
    //               className="navbar-item"
    //               onClick={handleToggle}
    //               to="/kinds"
    //             >
    //               Типы
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               activeClassName="is-active"
    //               className="navbar-item"
    //               onClick={handleToggle}
    //               to="/posts"
    //             >
    //               Должности
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               activeClassName="is-active"
    //               className="navbar-item"
    //               onClick={handleToggle}
    //               to="/practices"
    //             >
    //               Учения
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               activeClassName="is-active"
    //               className="navbar-item"
    //               onClick={handleToggle}
    //               to="/ranks"
    //             >
    //               Чины
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               activeClassName="is-active"
    //               className="navbar-item"
    //               onClick={handleToggle}
    //               to="/scopes"
    //             >
    //               Сферы
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               activeClassName="is-active"
    //               className="navbar-item"
    //               onClick={handleToggle}
    //               to="/certificates"
    //             >
    //               Удостоверения
    //             </Dropdown.Item>
    //             <hr className="navbar-divider" />
    //             <Dropdown.Item
    //               activeClassName="is-active"
    //               className="navbar-item"
    //               onClick={handleToggle}
    //               to="/sirentypes"
    //             >
    //               Типы сирен
    //             </Dropdown.Item>
    //           </Dropdown.Menu>
    //         </Dropdown>
    //       </Menu.Item>

    //       <Menu.Menu position="right">
    //         <Menu.Item>
    //           <Dropdown text="name">
    //             <Dropdown.Menu>
    //               <Dropdown.Item>
    //                 <Button>Выход</Button>
    //               </Dropdown.Item>
    //             </Dropdown.Menu>
    //           </Dropdown>
    //         </Menu.Item>
    //       </Menu.Menu>
    //     </Menu>
    //   ) : (
    //     <div className="navbar-brand">
    //       <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
    //         Авторизация
    //       </NavLink>
    //     </div>
    //   )}
    // </Container>
  );
};
