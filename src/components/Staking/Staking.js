import { SvgStakingRightArrow } from "assets/svg";
import s from "./Staking.module.css";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useContractRead,
  useNetwork,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useBalance,
} from "wagmi";
import web3 from "web3";
import { toast } from "react-toastify";
import { formatEther, formatUnits } from "viem";

import addressContract from "../../contracts/contractAddress.json";
import JEWNFT from "../../contracts/abi/JEWNFT.json";
import Erc20Json from "../../contracts/abi/ERC20.json";

const Staking = () => {
  const { address, connector, isConnected } = useAccount();

  const [staking, setStaking] = useState(0);
  const [progress, setProgress] = useState(false);
  const [curr, setCurr] = useState(0);
  const [name, setName] = useState("Yarmulke");
  // const [amount, setAmount] = useState(50);
  const [balanceShekel, setBalanceShekel] = useState(0);
  const [stakedPeriod, setStakedPeriod] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [shekelAmountForBuy, setShekelAmountForBuy] = useState(50);

  const { data, isError } = useBalance({
    address: address,
    token: "0x4DFbb247f9A7277c5c2F900d5e86a6Ceb98e0f63",
  });

  console.log(data?.formatted, "balance!---------");

  //=========== Contract Config================
  let contractConfig = {};
  contractConfig = {
    address: addressContract.addressNFT,
    abi: JEWNFT,
  };
  //===========stable token Contract Config================
  let erc20ContractConfig = {};
  erc20ContractConfig = {
    address: addressContract.addressJew,
    abi: Erc20Json,
  };

  //===========stable token Contract Config================
  let erc20ShekelContractConfig = {};
  erc20ContractConfig = {
    address: addressContract.addressShekel,
    abi: Erc20Json,
  };

  //=========== user staked info================
  const { data: isStakedStatues } = useContractRead({
    ...contractConfig,
    functionName: "stakeInfo",
    args: [address],
  });
  console.log(isStakedStatues, "stake statues");

  //=========== claim possible===============
  const { data: isClaim } = useContractRead({
    ...contractConfig,
    functionName: "isClaimableShekel",
    args: [address],
  });
  console.log(isClaim, "claimable statues");

  //=========== allowance Amount================
  const {
    data: allownceAmount,

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
      web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether")),
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

  //=========== allowance Shekel Amount================
  const { data: allownceShekelAmount } = useContractRead({
    ...erc20ShekelContractConfig,
    functionName: "allowance",
    args: [address, addressContract.addressNFT],
  });

  //=============Approve shekel token===========
  const {
    config: shekelApproveContractConfig,
    error: shekelApproveConfigError,
    isError: isShekelContractConfigError,
  } = usePrepareContractWrite({
    ...erc20ShekelContractConfig,
    functionName: "approve",
    args: [
      addressContract.addressNFT,
      web3.utils.toNumber(web3.utils.toWei(shekelAmountForBuy, "ether")),
    ],
  });
  const {
    data: shekelApproveReturnData,
    write: approveShekel,
    error: ShekelApproveError,
    isLoading: shekelLoading,
    isSuccess: shekelSuccess,
    isError: shekelError,
  } = useContractWrite(shekelApproveContractConfig);

  //=============stake jewcoin===========
  const {
    config: stakeConfig,
    error: stakeConfigError,
    isError: isStakeConfigError,
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "stake",
    args: [
      web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether")),
      stakedPeriod,
    ],
  });

  console.log(
    web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether")),
    stakedPeriod
  );

  const {
    data: stakeConfigData,
    write: stake,
    error: StakeConfigError,
    isLoading: StakeLoading,
    isSuccess: StakeSuccess,
    isError: StakeError,
  } = useContractWrite(stakeConfig);

  //=============unstake jewcoin===========
  const {
    config: unStakeConfig,
    error: unstakeConfigError,
    isError: isUnStakeConfigError,
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "unStake",
    args: [],
  });

  const {
    data: unStakeConfigData,
    write: unStake,
    error: UnStakeConfigError,
    isLoading: UnStakeLoading,
    isSuccess: UnStakeSuccess,
    isError: UnStakeError,
  } = useContractWrite(unStakeConfig);

  //=============claim shekel token===========
  const {
    config: claimConfig,
    error: claimConfigError,
    isError: isClaimConfigError,
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "claim",
    args: [],
  });

  const {
    data: claimConfigData,
    write: claim,
    error: ClaimConfigError,
    isLoading: ClaimLoading,
    isSuccess: ClaimSuccess,
    isError: ClaimError,
  } = useContractWrite(claimConfig);

  //=============Buy NFT===========
  const {
    config: buyNFTConfig,
    error: buyNFTConfigError,
    isError: isBuyNFTConfigError,
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "buyNFT",
    args: [web3.utils.toNumber(web3.utils.toWei(shekelAmountForBuy, "ether"))],
  });

  const {
    data: buyNFTConfigData,
    write: buyNFT,
    error: BuyNFTConfigError,
    isLoading: BuyNFTLoading,
    isSuccess: BuyNFTSuccess,
    isError: BuyNFTError,
  } = useContractWrite(buyNFTConfig);

  const onStake = async () => {
    await stake();
    setStaking(1);
    setTimeout(() => {
      setStaking(2);
    }, 3000);
  };

  const onClaim = async () => {
    await claim();
  };

  const onUnStake = async () => {
    await unStake();
  };

  const onApprove = async () => {
    await approve();
  };

  const onApproveShekel = async () => {
    await approveShekel();
  };

  const onBuyNFT = async () => {
    await buyNFT();
  };

  const images = [
    {
      name: "Golden Foreskin",
      link: "assets/images/Golden Foreskin/rotateForeskin.gif",
      amount: 250000,
      period: 30,
    },
    {
      name: "Yarmulke",
      link: "assets/images/Yarmulke/1.jpg",
      amount: 50,
      period: 10,
    },
    {
      name: "Matzah",
      link: "assets/images/Matzah/1.jpg",
      amount: 60,
      period: 10,
    },
    {
      name: "Challah Bread",
      link: "assets/images/Challah Bread/1.jpg",
      amount: 75,
      period: 14,
    },
    {
      name: "Kiddish Cup",
      link: "assets/images/Kiddish Cup/1.jpg",
      amount: 100,
      period: 14,
    },
    {
      name: "Menorah",
      link: "assets/images/Menorah/1.jpg",
      amount: 150,
      period: 21,
    },
    {
      name: "Torah",
      link: "assets/images/Torah/1.jpg",
      amount: 200,
      period: 21,
    },
    {
      name: "Dreidel",
      link: "assets/images/Dreidel/rotateDreidel.gif",
      amount: 350,
      period: 21,
    },
  ];

  const prev = () => {
    setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  };

  const onAmountChangeHandler = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      // Update the state with the new value
      setStakedAmount(inputValue);
      refetch();
    }
  };

  const onDateChangeHandler = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      // Update the state with the new value
      setStakedPeriod(inputValue);
    }
  };

  useEffect(() => {
    setName(images[curr].name);
    setShekelAmountForBuy(images[curr].amount);
    // Clear the interval when the component unmounts
  }, [curr]);

  useEffect(() => {
    if (approvedSuccess === true) {
      toast("Approved Success!");
    } else if (StakeSuccess === true) {
      toast("You staked jewcoin with jewcoins!");
    } else if (ClaimSuccess === true) {
      toast("You claimed shekel token!");
    } else if (UnStakeSuccess === true) {
      toast("You unStake jewcoin!");
    }
    setProgress(false);
    refetch();
  }, [approvedSuccess, StakeSuccess, ClaimSuccess, UnStakeSuccess]);

  useEffect(() => {
    if (
      approvedLoading === true ||
      StakeLoading === true ||
      ClaimLoading === true ||
      UnStakeSuccess === true
    ) {
      setProgress(true);
    }
  }, [approvedLoading, StakeLoading, ClaimLoading, UnStakeSuccess]);

  useEffect(() => {
    if (
      approvedError === true ||
      StakeError === true ||
      ClaimError === true ||
      UnStakeError === true
    ) {
      setProgress(false);
    }
  }, [approvedError, StakeError, ClaimError, UnStakeError]);

  useEffect(() => {
    if (data !== undefined) {
      setBalanceShekel(data?.formatted);
    } else setBalanceShekel(0);
  }, [data]);

  console.log(
    allownceAmount,
    web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether")),
    "dafsdgadfaswd"
  );

  return (
    <div className={s.root} id="staking_panel">
      <div className={s.rightWrapper}>
        <div className="text-[30px] sm:text-[40px] text-[#FFE300] font-bold font-sefer">
          Staking
        </div>
        <div
          className="text-[20px] sm:text-[25px] font-semibold mt-[10px] text-white"
          // style={{ color: "rgba(11, 7, 24, 0.30)" }}
        >
          Staking your Jewcoin
        </div>
        <SvgStakingRightArrow />
        <div className="text-[14px] sm:text-[18px] font-semibold mt-[30px]">
          What do Jews do? They make Shekels! After saving them from the burn,
          it's time to watch them work their magic. Stake your Jewcoin to earn
          $SHEKEL, the currency token for the Jewcoin ecosystem. All NFTs and
          virtual holy land in our metaverse will be purchased with Shekel. You
          will earn different amounts of Shekel depending on how much Jewcoin
          you staked and how long you stake it.
          <div className="text-[#FFE300]">
            <br />
            The formula follows: The amount of Jewcoins multiplied by time
            staked divided by ten equals the amount of Sheklel yielded.
          </div>
          <br />
          If you stake 25,000 Jewcoins for seven days, you will earn 175 Shekel.
          If you stake 666 Jewcoin for six days, it will earn 399.6 Shekel.
          Given that Shekel is inflationary and has no maximum supply, we will
          be decreasing the amount of $SHEKEL earned every month until the
          staking reward is 10% of the original amount. Once the SHEKEL reward
          reaches this level it will not be decreased further. While
          historically, Jewish cultural items and practices have been reserved
          for Jews alone, The Jewcoins you saved are so grateful that they want
          to share their culture with you as a thank you. Collect these NFTs to
          show your support for Jewish people further or resell them to those
          who weren't able to get their own Jewcoins. Acquiring NFTs with your
          Shekel is an investment and an education. It's not cultural
          appropriation; it's cultural appreciation! Remember that NFTs are
          limited, so start staking your Jewcoins as soon as you save them to
          ensure you get your Jewish NFTs.
          <br />
          Once you purchase your NFT, you’ll get an alert giving you your NFT ID
          which you can use to import your NFT into your ethereum wallet.
          {/* <div className="text-[#FFE300]">
            These are the first round of NFTs you will earn. Round 2 will focus
            on pivotal moments in the Old Testament, such as Moses parting the
            Red Sea and David beating Goliath.
          </div> */}
        </div>
      </div>
      <div className={s.leftWrapper}>
        <div
          className="relative  w-full font-bold h-full  flex-col ms:flex-row items-center justify-center gap-[20px] bg-[#FFE300] rounded-[20px] px-[20px] xl:px-[25px] lg:px-[12px] sm:px-[32px] py-[30px]  mb-[20px]"
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
          <div
            className="relative h-[50%] justify-between flex flex-col w-full rounded-[10px] bg-[#7659AD] mb-[10px] px-[14px] py-[8px] "
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex items-center justify-between">
              <div className="text-[14px] lg:text-[16px] font-bold text-[#ffe300]">
                Jewcoin Amount:
              </div>
              <div className={s.amountTokenInput}>
                <input
                  className="outline-none w-full"
                  placeholder="Amount"
                  type="number"
                  value={stakedAmount}
                  onChange={onAmountChangeHandler}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[14px] lg:text-[16px] font-bold text-[#ffe300]">
                Locked Period:
              </div>
              <div className={s.periodInput}>
                <input
                  className="outline-none w-full"
                  placeholder="days"
                  type="number"
                  value={stakedPeriod}
                  onChange={onDateChangeHandler}
                />
              </div>
            </div>

            <div className="text-[14px] text-center lg:text-[16px] font-bold text-[#ffe300]">
              you'll earn {(stakedAmount * stakedPeriod) / 10} shekel tokens
              after {stakedPeriod} days
            </div>
          </div>
          {allownceAmount >=
            web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether"))}
          {isStakedStatues?.[0] ? (
            isClaim ? (
              <button
                className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[#7659AD] rounded-[10px] h-[20%]"
                onClick={onClaim}
              >
                Claim
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
              <button
                className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[#7659AD] rounded-[10px] h-[20%]"
                onClick={onUnStake}
              >
                Unstake ({formatUnits(Number(isStakedStatues?.[1]), 18)} staked)
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
            )
          ) : allownceAmount >=
            web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether")) ? (
            <button
              className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[#7659AD] rounded-[10px] h-[20%]"
              onClick={onStake}
            >
              Stake
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
            <button
              className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[#7659AD] rounded-[10px] h-[20%]"
              onClick={onApprove}
            >
              Approve
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
        <div
          className="relative w-full  h-full flex flex-col ms:flex-row items-center justify-center gap-[20px] bg-[#FFE300] rounded-[20px] px-[20px] xl:px-[25px] lg:px-[12px] sm:px-[32px] py-[30px]  mb-[20px]"
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
          <div className="overflow-hidden relative  sm:w-[85%] md:w-[55%] lg:w-[100%]">
            <div
              className="transition-transform ease-out duration-500"
              style={{
                transform: `translateX(-${curr * 100}%)`,
                display: "-webkit-box",
                aspectRatio: 1,
              }}
            >
              {images.map((e, index) => (
                <img
                  key={index}
                  src={e.link}
                  alt="cartoon nft"
                  className="rounded-[20px] w-full"
                  style={{
                    boxShadow: "4px 3px 13px 0px 0px rgba(0, 0, 0, 0.25)",
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={prev}
                className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
              >
                {`<`}
              </button>
              <button
                onClick={next}
                className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
              >
                {`>`}
              </button>
            </div>
            <div className="absolute bottom-4 right-0 left-0">
              <div className="flex items-center justify-center gap-2">
                {images.map((s, i) => (
                  <div
                    key={i}
                    className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${
                      curr === i ? "p-0.5" : "bg-opacity-50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="hidden ms:flex ms:w-[80%] md:w-[30%] text-[#FFE300]">
            asdf
          </div>
          <div className="ms:absolute w-full sm:w-[80%] ms:w-auto flex flex-col justify-between right-[30px] md:right-[12px] top-[30px] left-[55%] md:left-[60%] bottom-[30px]">
            <div
              className="relative h-[50%] justify-between flex flex-col w-full rounded-[10px] bg-[#7659AD] mb-[10px] px-[14px] py-[8px] "
              style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="w-full flex items-center mb-[5px] justify-between">
                <div className="text-[16px] lg:text-[18px] text-[#FFE300] font-bold">
                  {name}
                </div>
              </div>
              <div className="mb-[5px]">
                <div className="w-full flex items-center  justify-between">
                  <div className="text-[13px] lg:text-[14px] text-[#fff] font-bold">
                    Amount
                  </div>
                  <div className="text-[13px] lg:text-[14px] text-[#fff] font-bold">
                    {shekelAmountForBuy.toLocaleString()} Shekel
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="text-[14px] lg:text-[16px] font-bold text-[#ffe300]">
                  Balance
                </div>
                <div
                  className={`text-[12px] ${
                    balanceShekel >= shekelAmountForBuy
                      ? "text-[#ffe300]"
                      : "text-[#ff3939]"
                  } font-bold`}
                >
                  {balanceShekel} Shekel
                </div>
              </div>
            </div>
            {balanceShekel >= shekelAmountForBuy && isConnected ? (
              allownceShekelAmount >
              web3.utils.toNumber(
                web3.utils.toWei(shekelAmountForBuy, "ether")
              ) ? (
                <button
                  className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[#7659AD] rounded-[10px] h-[20%]"
                  onClick={onApproveShekel}
                >
                  Approve Shekel
                </button>
              ) : (
                <button
                  className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[#7659AD] rounded-[10px] h-[20%]"
                  onClick={onBuyNFT}
                >
                  Buy NFT
                </button>
              )
            ) : (
              <button className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[black] rounded-[10px] h-[20%]">
                No Blance
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
// staking === 1 ? (
//   <div className="flex items-center justify-center h-[72px] w-full text-[white] text-[18px] font-bold bg-[#7659AD] rounded-[10px]">
//     <CircularProgress className="text-[18px]" color="inherit" />
//   </div>
// )
export default Staking;
