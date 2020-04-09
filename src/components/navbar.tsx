import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

const AccountDropdown = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="relative ml-6">
      <button
        onClick={(): void => setOpen(!isOpen)}
        className="relative z-10 block w-8 h-8 overflow-hidden border-2 border-gray-600 rounded-full focus:outline-none focus:border-white"
      >
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
          alt="Your avatar"
        />
      </button>
      {isOpen ? (
        <button
          onClick={(): void => setOpen(false)}
          tabIndex={-1}
          className="fixed inset-0 w-full h-full bg-black opacity-50 cursor-default"
        ></button>
      ) : null}
      {isOpen ? (
        <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
          <a
            href="#settings"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Account settings
          </a>
          <a
            href="#support"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Support
          </a>
          <a
            href="#signout"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Выход
          </a>
        </div>
      ) : null}
    </div>
  );
};

const Header = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const navClass = isOpen
    ? 'block px-2 pt-2 pb-4 sm:flex sm:p-0'
    : 'hidden px-2 pt-2 pb-4 sm:flex sm:p-0';

  return (
    <header className="top-0 left-0 w-full bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-2">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div className="block px-2 pt-2 pb-4 sm:flex sm:p-0">
          <NavLink
            to="/"
            className="block px-2 py-1 font-semibold text-white rounded hover:bg-gray-800"
          >
            ЕДДС
          </NavLink>
          <NavLink
            to="/contacts"
            className="block px-2 py-1 font-semibold text-white rounded hover:bg-gray-800"
          >
            Контакты
          </NavLink>
          <NavLink
            to="/companies"
            className="block px-2 py-1 mt-1 font-semibold text-white rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
          >
            Организации
          </NavLink>
        </div>
        <div className="sm:hidden">
          <button
            onClick={(): void => setOpen(!isOpen)}
            type="button"
            className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <nav className={navClass}>
        <NavLink
          to="/certificates"
          className="block px-2 py-1 font-semibold text-white rounded hover:bg-gray-800"
        >
          Сертификаты
        </NavLink>
        <NavLink
          to="/companies"
          className="block px-2 py-1 mt-1 font-semibold text-white rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
        >
          Организации
        </NavLink>
        <a
          href="#messages"
          className="block px-2 py-1 mt-1 font-semibold text-white rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
        >
          Messages
        </a>
        <AccountDropdown />
      </nav>
    </header>
  );
};

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
      <Header />
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
