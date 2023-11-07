import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: linear-gradient(to top,#e60012, #ac000d, #d10011);
  padding: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 1000;

  .container {
    text-align: end;
    padding-right: 10px;

    .copyright {
      font-size: small;
      align-self: right;
      color: #fff;
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
        Designed by <a href="https://www.linkedin.com/in/mauroph/" target="_blank" rel="noopener noreferrer">Mauro Philipe®</a>
      </small>
    </div>
  </StyledFooter>
);

export default Footer;