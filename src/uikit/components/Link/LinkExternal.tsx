import React from "react";
import Link from "./Link";
import { LinkProps } from "./types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

const LinkExternal: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link external {...props}>
      {children}
      <FontAwesomeIcon color={props.color ? props.color : "primary"} icon={faExternalLinkAlt} />
    </Link>
  );
};

export default LinkExternal;
