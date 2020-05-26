import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const CopyrightPadding = styled.div`
  display: flex;
  padding: 12px;
`;

const Copyright = (props) => {
  const [copyright, setCopyright] = useState(null);

  useEffect(() => {
    if (props.copyright) {
      setCopyright(props.copyright);
    } else {
      setCopyright(null);
    }
  }, [props.copyright]);

  return (
    <CopyrightPadding>
      {copyright ? (
        <Typography variant="subtitle1">
          Image Credits & Copyright: {copyright}
        </Typography>
      ) : null}
    </CopyrightPadding>
  );
};

export default Copyright;
