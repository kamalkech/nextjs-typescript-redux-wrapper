import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const SecondLayout = ({ children, title = "Second Layout" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <h1>Second Layout</h1>
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

export default SecondLayout;
