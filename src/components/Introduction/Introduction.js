import s from "./Introduction.module.css";
import React, {
  StrictMode,
  useState,
  useMemo,
  useRef,
  useEffect,
  Fragment,
} from "react";
import cn from "classnames";
import TextTransition, { presets } from "react-text-transition";
import { Menu, Transition } from "@headlessui/react";
import stableTokens from "../constants.json";
import Erc20Json from "../../contracts/abi/ERC20.json";
import JEWNFT from "../../contracts/abi/JEWNFT.json";
import addressContract from "../../contracts/contractAddress.json";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import web3 from "web3";

import {
  Address,
  ContractFunctionExecutionError,
  TransactionExecutionError,
  formatEther,
  formatUnits,
} from "viem";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useNetwork,
  useToken,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";

const TEXTS = [
  "Created by Jews, Made for everyone",
  "Insulation from Cancellation",
  "Where your Heart and Wallet Allign",
  "Proof you’re not Anti-Semetic",
];

const cryptosETH = stableTokens.cryptosETH;

// const JewModal = () => {
//   const gltf = useGLTF("/assets/logo/logo.glb"); // Replace with the path to your GLB model
//   const modelRef = useRef();

//   // Event listener to handle right mouse button press
//   const handleContextMenu = (event) => {
//     event.preventDefault();
//   };

//   // This function will be called on each frame
//   useFrame(() => {
//     // Update the rotation of the model to rotate it only around the y-axis (right to left)
//     modelRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
//   });

//   return (
//     <group ref={modelRef} onContextMenu={handleContextMenu}>
//       {/* Your GLB model */}
//       <primitive object={gltf.scene} />

//       {/* Other 3D objects in your scene go here */}
//       {/* ... */}
//     </group>
//   );
// };

const Introduction = () => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = 1709856000000 - now;

    if (difference <= 0) {
      // Countdown has expired
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [tokenAmount, setTokenAmount] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0.15);

  const [priceETH, setPriceToken] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("USDC");
  const [selectedCryptoAddress, setSelectedCryptoAddress] = useState(
    "0xade5a2FD277Ae81419f9fFe51c09e23e98687ff4"
  );
  const [neededUSD, setNeededUSD] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [lastInputChangeTime, setLastInputChangeTime] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const [balanceJew, setBalanceJew] = useState(0);

  // const account = useAccount();
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { data, isError } = useBalance({
    address: address,
    token: "0xE9959c7a1Cf7891Cac0bE4b2c835E723Db68a474",
  });

  useEffect(() => {
    if (data !== undefined) {
      setBalanceJew(formatUnits(Number(data?.value), 18));
    } else {
      setBalanceJew(0);
    }
  }, [data]);

  //===========stable token Contract Config================
  let erc20ContractConfig = {};
  erc20ContractConfig = {
    address: selectedCryptoAddress,
    abi: Erc20Json,
  };
  //=========== Contract Config================
  let contractConfig = {};
  contractConfig = {
    address: addressContract.addressNFT,
    abi: JEWNFT,
  };

  //=========== allowance Amount================
  const {
    data: allownceAmount,
    isSuccess,
    refetch,
  } = useContractRead({
    ...erc20ContractConfig,
    functionName: "allowance",
    args: [address, addressContract.addressNFT],
  });

  //=============Approve stable token===========
  const {
    config: erc20ApproveContractConfig,
    error: erc20ApproveConfigError,
    isError: isErc20ContractConfigError,
  } = usePrepareContractWrite({
    ...erc20ContractConfig,
    functionName: "approve",
    args: [
      addressContract.addressNFT,
      web3.utils.toNumber(web3.utils.toWei(neededUSD, "mwei")),
    ],
  });
  const {
    data: erc20ApproveReturnData,
    write: approve,
    error: Erc20ApproveError,
    isLoading: approvedLoading,
    isSuccess: approvedSuccess,
    isError: approvedError,
  } = useContractWrite(erc20ApproveContractConfig);

  //=============buy stable token===========
  const {
    config: buyStableConfig,
    error: buyStableConfigError,
    isError: isBuyStableConfigError,
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "buyTokenByStable",
    args: [
      selectedCryptoAddress,
      web3.utils.toNumber(web3.utils.toWei(tokenAmount, "ether")),
    ],
  });

  const {
    data: buyStableConfigData,
    write: buyTokenByStable,
    error: BuyStableConfigError,
    isLoading: StableLoading,
    isSuccess: StableSuccess,
    isError: StableError,
  } = useContractWrite(buyStableConfig);

  //=============buy ETH===========
  const {
    config: buyETHConfig,
    error: buyETHConfigError,
    isError: isBuyETHConfigError,
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "buyTokenByETH",
    value: web3.utils.toNumber(web3.utils.toWei(neededUSD, "ether")),
    args: [web3.utils.toNumber(web3.utils.toWei(tokenAmount, "ether"))],
  });

  const {
    data: buyETHConfigData,
    write: buyTokenByETH,
    error: BuyETHConfigError,
    isLoading: ETHLoading,
    isSuccess: ETHSuccess,
    isError: ETHError,
  } = useContractWrite(buyETHConfig);

  const buyWithStable = async () => {
    await buyTokenByStable();
  };

  const buyWithEth = async () => {
    await buyTokenByETH();
  };

  const approveStable = async () => {
    await approve();
  };

  useEffect(() => {
    if (approvedSuccess === true) {
      toast("Approved Success!");
    } else if (StableSuccess === true) {
      toast("You bought jewcoin with stablecoins!");
    } else if (ETHSuccess === true) {
      toast("You bought jewcoin with ETH!");
    }
    setProgress(false);
    refetch();
  }, [approvedSuccess, StableSuccess, ETHSuccess]);

  useEffect(() => {
    if (
      approvedLoading === true ||
      StableLoading === true ||
      ETHLoading === true
    ) {
      setProgress(true);
    }
  }, [approvedLoading, StableLoading, ETHLoading]);

  useEffect(() => {
    if (approvedError === true || StableError === true || ETHError === true) {
      setProgress(false);
    }
  }, [approvedError, StableError, ETHError]);

  const onBuyAmountChangeHandler = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      // Update the state with the new value
      setTokenAmount(inputValue);
      refetch();
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const currentTime = Date.now();

    if (currentTime - lastInputChangeTime > 1000) {
      // Your function to be triggered after 1s
      // Call your other function here
      // Example: otherFunction(newValue);
    }
    // Set a new timeout for 1s
    const newTimeoutId = setTimeout(() => {
      // Update the last input change time
      setLastInputChangeTime(currentTime);
    }, 1000);

    // Save the timeout ID in the state
    setTimeoutId(newTimeoutId);
  };

  const getPriceETH = async (amount, tokenPrice) => {
    const api_call = await fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=ETH&to_currency=USD&apikey=6NDTD5AH3BO6LPBY`
      // {
      //   method: "GET",
      //   mode: "cors",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // "Content-Type": "application/x-www-form-urlencoded",
      //     "Access-Control-Allow-Origin": "http://localhost:3000",
      //   },
      // }
    ).catch((err) => {
      console.error(err);
    });
    const price = await api_call?.json();

    // console.log(
    //   ((amount * tokenPrice) / price?.ethereum.usd).toFixed(3),
    //   "price of ethereum"
    // );
    setNeededUSD(
      (
        (amount * tokenPrice) /
        price["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
      ).toFixed(3)
    );
  };

  useEffect(() => {
    if (selectedCrypto === "USDC" || selectedCrypto === "USDT") {
      setNeededUSD((tokenAmount * tokenPrice).toFixed(2));
    } else if (selectedCrypto === "ETH") {
      getPriceETH(tokenAmount, tokenPrice);
    }
    refetch();
  }, [tokenAmount]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [1709856000000]);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  // <Canvas camera={{ position: [0, 0, -0.2], near: 0.025, zoom: 2.5 }}>
  //   <pointLight position={[0, 0, -0.2]} />
  //   <pointLight position={[0, -0.2, 0]} />
  //   <pointLight position={[0.2, 0, 0]} />

  //   {/* <Environment files="/assets/logo/hdr.hdr" background /> */}
  //   {/* <group>
  //           <Model
  //             url={Models[Models.findIndex((m) => m.title === title)].url}
  //           />
  //         </group> */}
  //   <OrbitControls autoRotate />
  //   {/* <JewModal /> */}
  //   <Stats showPanel={false} />
  // </Canvas>;

  return (
    <div className={s.root} id="intro_panel">
      <div className={s.leftWrapper}>
        <div className="text-[16px] sm:text-[20px] text-white font-bold">
          JEWCOIN TOKEN BURN COUNTDOWN
        </div>
        <div className="text-[30px] md:text-[50px] text-[#FFE300] font-bold">
          {timeLeft.days} days : {timeLeft.hours} hrs: {timeLeft.minutes} mins :{" "}
          {timeLeft.seconds} secs
        </div>
        <div
          className="text-[20px] sm:text-[25px] font-semibold"
          // style={{ color: "rgba(255, 255, 255, 0.50)" }}
        >
          Have you ever told yourself that you would have helped the Jews escape
          the Holocaust? On March 8th, you'll have the chance to prove it.
        </div>
        <div
          className="w-full py-[18px] sm:pl-[24px] sm:pr-[40px] px-[14px] text-[12px] sm:text-[20px] text-[#FFE300] font-bold rounded-[10px] bg-[#010813]"
          style={{
            border: "2px solid #FFE300",
            boxShadow: "4px 3px 13px 0px #FFE300",
          }}
        >
          {" "}
          6,000,000 Jewcoins are trapped in Auchwallet, with up to 66,000
          Jewcoins scheduled for daily burning. If nobody acts to rescue them,
          they will become digital ash. There will be no additional Jewcoins
          mined, nor any way to revive them once burned. While their situation
          is dire, there is still hope for their survival. You can save them
          from the burn by buying and storing them safely in your wallet. Don't
          condemn the Jewcoins to fiery destruction. Save and stake them to
          start earning rewards.{" "}
        </div>
      </div>
      <div className={s.rightWrapper}>
        <div className={cn(s.info, "hidden lg:flex")}>
          <TextTransition
            springConfig={presets.wobbly}
            className="w-full flex justify-center items-center"
          >
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        </div>
        <img
          src="assets/logo/logo.png"
          alt="logo"
          className="hidden lg:flex lg:min-w-[367px] lg:min-h-[367px] lg:w-[367px] w-full h-[233px] min-h-[233px] object-cover"
          style={{
            borderRadius: "190px 190px",
            boxShadow: "0px 4px 120px 0px rgba(255, 227, 0, 0.70)",
          }}
        />
        <div
          className={s.buyBox}
          style={{
            border: "2px solid #FFE300",
            boxShadow: "4px 3px 13px 0px #FFE300",
          }}
        >
          <p>Your JewCoin Balance: {balanceJew}</p>
          <p>Current Jewcoin Price: {tokenPrice}$</p>
          <div className="flex items-center justify-around">
            <p>Jewcoin</p>
            <div className={s.amountTokenInput}>
              <input
                className="outline-none w-full"
                placeholder="Amount"
                type="number"
                value={tokenAmount}
                onChange={onBuyAmountChangeHandler}
              />
            </div>
            <div className={s.selectedCrypto}>
              <Menu as="div" className="relative">
                <div className="h-8">
                  <Menu.Button className="flex md:inline-flex justify-between items-center  space-x-1 sm:space-x-2 w-full border-Light-Slate-Gray/90 text-Light-Slate-Gray ">
                    <div className="flex w-[30px] h-[30px]">
                      <img
                        src={`/assets/icons/${selectedCrypto}.svg`}
                        alt={selectedCrypto}
                      />
                    </div>

                    <div className={s.arrowIcon}>
                      <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.8382 8.11719H5.16159C4.6614 8.11719 4.3821 8.64531 4.69187 9.00586L13.0301 18.6746C13.2688 18.9514 13.7284 18.9514 13.9696 18.6746L22.3079 9.00586C22.6176 8.64531 22.3384 8.11719 21.8382 8.11719Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={`absolute w-full overflow-hidden mt-1 origin-top-right shadow-details bg-Pure-White bottom-14`}
                  >
                    <div className="font-medium text-sm text-Light-Slate-Gray bg-white rounded-lg">
                      {cryptosETH.map(
                        (crypto, index) =>
                          crypto.name !== selectedCrypto && (
                            <Menu.Item
                              key={crypto.name}
                              onClick={() => {
                                setSelectedCrypto(crypto.name);
                                setSelectedCryptoAddress(crypto.address);
                              }}
                              as="div"
                              className=" cursor-pointer hover:bg-Light-Slate-Gray/5 py-1 flex items-center justify-between space-x-4 border-l-4 border-Pure-White duration-300 hover:border-Chinese-Blue"
                            >
                              <img
                                src={`/assets/icons/${crypto.name}.svg`}
                                alt={crypto.name}
                              />
                            </Menu.Item>
                          )
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <p className="text-lg">
            If you want to buy {tokenAmount} jewcoin, you need {neededUSD}{" "}
            {selectedCrypto}
          </p>
          {selectedCrypto === "ETH" ? (
            <button className={s.buyBotton} onClick={buyWithEth}>
              {" "}
              Buy with ETH
              {progress === true ? (
                <CircularProgress
                  className="text-[18px]"
                  color="inherit"
                  size={25}
                />
              ) : (
                ""
              )}
            </button>
          ) : allownceAmount >=
            web3.utils.toNumber(web3.utils.toWei(neededUSD, "mwei")) ? (
            <button className={s.buyBotton} onClick={buyWithStable}>
              {" "}
              Buy with Stable
              {progress === true ? (
                <CircularProgress
                  className="text-[18px]"
                  color="inherit"
                  size={25}
                />
              ) : (
                ""
              )}
            </button>
          ) : (
            <button className={s.buyBotton} onClick={approveStable}>
              {" "}
              Approve Jewcoin
              {progress === true ? (
                <CircularProgress
                  className="text-[18px]"
                  color="inherit"
                  size={25}
                />
              ) : (
                ""
              )}
            </button>
          )}
        </div>
        {/* <div className={s.buyBox}></div> */}
      </div>
    </div>
  );
};

export default Introduction;
