import inkAbi from "@/constants/ABIs/inkAbi";
import { inkContractAddress } from "@/constants/addresses";
import { useEffect, useState } from "react";
import { useContractWrite } from "wagmi";

const useRegister = () => {
  // const [register, setRegister] = useState();

  const {
    data: registerData,
    isLoading: isRegistering,
    isSuccess: isRegistered,
    write: registerUser,
    error: registerError,
  } = useContractWrite({
    address: inkContractAddress,
    abi: inkAbi,
    functionName: "register",
  });

  useEffect(() => {
    console.log("registerData:", registerData);
    console.log(" isRegistering:", isRegistering);
    console.log("isRegistered", isRegistered);
    console.log("registerError:", registerError);
    console.log("___________");
  }, [registerData, isRegistering, isRegistered]);

  const registerUsers = async (e: any) => {
    e.preventDefault();

    try {
      const result = registerUser();
      //setRegister(result);
    } catch (error) {
      console.error("Error calling register:", error);
    }
  };

  return {
    registerUsers,
    isRegistering,
    isRegistered,
    registerError,
  };
};

export default useRegister;
