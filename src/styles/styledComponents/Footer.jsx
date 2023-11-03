import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #484848;
  color: #fff;
  padding: 20px 0;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  .container {
    text-align: center;

    .copyright {
      font-size: small;
    }

    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Footer = () => (
  <StyledFooter>
    <div className="container">
      <small className="copyright">
        Designed by <a href="https://www.linkedin.com/in/mauroph/" target="_blank" rel="noopener noreferrer">Mauro Philipe</a>
      </small>
    </div>
  </StyledFooter>
);

export default Footer;