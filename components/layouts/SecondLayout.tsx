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
      <h2>Second Layout</h2>
    </header>
    {children}
    <div className="container">
      <div className="row">
        <div className="col-sm">
          One of three columns
        </div>

        <div className="col-sm">
          One of three columns
        </div>
      </div>
    </div>
    <footer className="footer mt-auto py-3">
      <div className="container">
        <span className="text-muted">
          © 2020, MAROC DEVELOP. All rights reserved.
        </span>
      </div>
    </footer>
    <style jsx>
      {`
        .col-sm {
          padding-top: .75rem;
          padding-bottom: .75rem;
          background-color: rgba(86,61,124,.15);
          border: 1px solid rgba(86,61,124,.2);
        }
      `}
    </style>
  </div>
);

export default SecondLayout;
