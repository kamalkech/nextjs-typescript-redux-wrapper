import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

import { Navbar, Nav } from "react-bootstrap";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <Navbar bg="dark" variant="dark">
        <Link href="/" passHref>
          <Navbar.Brand>MD</Navbar.Brand>
        </Link>
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link>Home</Nav.Link>
          </Link>
          <Link href="/movies" passHref>
            <Nav.Link>Movies</Nav.Link>
          </Link>
          <Link href="/photos" passHref>
            <Nav.Link>Photos</Nav.Link>
          </Link>
        </Nav>
      </Navbar>
    </header>
    {children}
    <footer className="footer mt-auto py-3">
      <div className="container">
        <span className="text-muted">
          © 2020, MAROC DEVELOP. All rights reserved.
        </span>
      </div>
    </footer>
  </div>
);

export default Layout;
