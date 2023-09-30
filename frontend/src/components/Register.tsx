import useRegister from "@/hooks/useRegister";
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AnyARecord } from "dns";

type Props = {};

const Register = (props: Props) => {
  const { registerUsers } = useRegister();

  const handleRegister = (e: any) => {
    e.preventDefault();
    registerUsers(e);
  };

  return (
    <div onClick={handleRegister}>
      <ConnectButton label="Register" showBalance />
    </div>
  );
};

export default Register;
