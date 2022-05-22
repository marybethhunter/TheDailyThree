import React from "react";
import styled from "styled-components";
import gratefulLogo from "../images/gratefulLogo.png";
import PropTypes from "prop-types";

const Logo = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 5px;
  top: 18px;
`;

export default function NavIcon({ expanded, setExpanded }) {
  const recordClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Logo
      src={gratefulLogo}
      onClick={recordClick}
      className={expanded ? "navIcon-expanded" : "navIcon-hidden"}
    />
  );
}

NavIcon.propTypes = {
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
};
