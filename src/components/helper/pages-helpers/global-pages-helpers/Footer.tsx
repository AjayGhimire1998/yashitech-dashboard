import * as React from "react";
import { Button } from "../../../../styles/global";
import {
  getUserDetails,
  logOut,
} from "../../../../services/auth-services/auth-service";

interface IFooterProps {
    className? :string;
}

const Footer: React.FunctionComponent<IFooterProps> = ({className}) => {
  return (
    <div className={className}>
      <br />
      <br />
      <p>logged in as: {getUserDetails().attributes.email}</p>
      <br />
      <br />
      <Button
        bgColor="#440a70"
        txtColor="white"
        hoverBg="red"
        children="LogOut"
        onClick={() => logOut()}
      />
      <br />
      <br />
    </div>
  );
};

export default Footer;
