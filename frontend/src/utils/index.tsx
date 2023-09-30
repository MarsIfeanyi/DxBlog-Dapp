import { ethers, toBigInt } from "ethers";
import { Abi } from "viem";
import { Provider } from "ethers";
import {
  inkContractAddress,
  multiCall2ContractAddress,
} from "@/constants/addresses";
import inkAbi from "@/constants/ABIs/inkAbi";
import multiCall2Abi from "@/constants/ABIs/multiCall2Abi";

// @ts-ignore
const getInterface = (abi) => new ethers.Interface(abi);

export const getInkInterface = getInterface(inkAbi);

// @ts-ignore
export const getContract = async (address: string, abi) => {
  // let  signer = await provider.getSigner();

  // @ts-ignore
  return new ethers.Contract(address, abi);
};

// export const getContractWithProvider = (address, abi, provider) => {
//   return new ethers.Contract(address, abi, provider);
// };

export const getInkContract = async () => {
  return await getContract(inkContractAddress, inkAbi);
};

export const getMultiCall2Contract = () => {
  return getContract(multiCall2ContractAddress, multiCall2Abi);
};

export const formatDate = (time: number) => {
  const date = new Date(time * 1000);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = monthNames[month - 1];

  const formattedDate = `${monthName} ${day}, ${year}`;

  return formattedDate;
};

export const calculateGasMargin = (value: bigint): bigint =>
  (toBigInt(value) * toBigInt(120)) / toBigInt(100);

export type inkFns =
  | "treasury"
  | "tipOnPost"
  | "register"
  | "getUserPosts"
  | "getUser"
  | "getPosts"
  | "getPost"
  | "createPost";

export const shortenAccount = (account: any) =>
  `${account.substring(0, 6)}...${account.substring(38)}`;
