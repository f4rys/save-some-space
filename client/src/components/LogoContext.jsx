import { createContext, useContext } from "react";
import PropTypes from 'prop-types';

const LogoContext = createContext();

export const LogoProvider = ({ children, handleLogoClick }) => {
  return (
    <LogoContext.Provider value={handleLogoClick}>
      {children}
    </LogoContext.Provider>
  );
};

LogoProvider.propTypes = {
  children: PropTypes.node.isRequired, 
  handleLogoClick: PropTypes.func.isRequired, 
};

export const useLogoClick = () => {
  return useContext(LogoContext);
};