import React from "react";
import { Helmet } from "react-helmet";

export const wrapPageElement = ({ element, props }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      {element}
    </>
  );
};
