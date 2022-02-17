import { createContext } from "react";

const NavContext = createContext({
  nav: false,
  setNav: (nav: boolean) => {},
});
export default NavContext;
