import { SvgStakingRightArrow } from "assets/svg";
import s from "./Staking.module.css";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useContractRead,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useBalance,
  useWaitForTransaction,
} from "wagmi";
import { formatEther, formatUnits } from "viem";
import web3 from "web3";
import { toast } from "react-toastify";
import addressContract from "../../contracts/contractAddress.json";
import JEWNFT from "../../contracts/abi/JEWNFT.json";
import Erc20Json from "../../contracts/abi/ERC20.json";
import { readContract,waitForTransaction,writeContract } from '@wagmi/core'

const Staking = () => {
  const { address, connector, isConnected } = useAccount();
  const [stakeLoadingIcon, setStakeLoadingIcon] = useState(false);
  const [buyNFTLoadingIcon, setBuyNFTLoadingIcon] = useState(false);

  const [flag, setChangeFlag] = useState(false);
  const [curr, setCurr] = useState(0);
  const [name, setName] = useState("Yarmulke");
  const [balanceShekel, setBalanceShekel] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [shekelAmountForBuy, setShekelAmountForBuy] = useState(0);

  const [reward , setReward] = useState(0);
  const [nextReward , setNextReward] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0); 

  const { data, refetch: shekelBalanceRefetch } = useBalance({
    address: address,
    token: addressContract.addressShekel,
  });
 
  console.log(address, connector, isConnected, "wallet and user info=-=-=-==-");

  //=========== Contract Config================
  let contractConfig = {};
  contractConfig = {
    address: addressContract.addressNFT,
    abi: JEWNFT,
  };
  //===========Jew Contract Config================
  let erc20JewContractConfig = {};
  erc20JewContractConfig = {
    address: addressContract.addressJew,
    abi: Erc20Json,
  };

  //===========Shekel Contract Config================
  let erc20ShekelContractConfig = {};
  erc20ShekelContractConfig = {
    address: addressContract.addressShekel,
    abi: Erc20Json,
  };

  //=========== user staked info================
  const { data: isStakedStatues, refetch: isStakedStatuesRefetch } =
    useContractRead({
      ...contractConfig,
      functionName: "stakeInfo",
      args: [address],
    });
  //=========== claim possible===============
  const { data: isClaim, refetch: isClaimRefetch } = useContractRead({
    ...contractConfig,
    functionName: "isClaimableShekel",
    args: [address],
  });
  //=========== allowance Jew Amount================
  const { data: allownceJewAmount, refetch: allownceJewAmountRefetch } =
    useContractRead({
      ...erc20JewContractConfig,
      functionName: "allowance",
      args: [address, addressContract.addressNFT],
    });
  //=============Approve Jew token===========
  const {
    config: JewApproveContractConfig,
    // error: erc20ApproveConfigError,
    // isError: isErc20ContractConfigError,
  } = usePrepareContractWrite({
    ...erc20JewContractConfig,
    functionName: "approve",
    args: [
      addressContract.addressNFT,
      web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether")),
    ],
  });
  const {
    data: JewApproveReturnData,
    write: approveJew,
    // error: Erc20ApproveError,
    isLoading: ApprovedJewLoading,
    isSuccess: ApprovedJewSuccess,
    isError: ApprovedJewError,
  } = useContractWrite(JewApproveContractConfig);

  const waitForJewApproveTransaction = useWaitForTransaction({
    hash: JewApproveReturnData?.hash,
    onSuccess(data) {
      setChangeFlag(true);
      setStakeLoadingIcon(false);
      toast.success("You approved the jewcoin successfully!", {
        autoClose: 5000,
      });
    },
  });

  //=========== allowance Shekel Amount================
  const { data: allownceShekelAmount, refetch: allownceShekelAmountRefetch } =
    useContractRead({
      ...erc20ShekelContractConfig,
      functionName: "allowance",
      args: [address, addressContract.addressNFT],
    });

  //=============Approve shekel token===========
  const {
    config: shekelApproveContractConfig,
    // error: shekelApproveConfigError,
    // isError: isShekelContractConfigError,
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
    // error: ShekelApproveError,
    isLoading: ApproveShekelLoading,
    isSuccess: ApproveShekelSuccess,
    isError: ApproveShekelError,
  } = useContractWrite(shekelApproveContractConfig);

  const waitForShekelApproveTransaction = useWaitForTransaction({
    hash: shekelApproveReturnData?.hash,
    onSuccess(data) {
      setChangeFlag(true);
      setBuyNFTLoadingIcon(false);
      toast.success("You approved the shekel successfully!", {
        autoClose: 5000,
      });
    },
  });

  //=============stake jewcoin===========
  // const {
  //   config: stakeConfig,
  //   // error: stakeConfigError,
  //   // isError: isStakeConfigError,
  // } = usePrepareContractWrite({
  //   ...contractConfig,
  //   functionName: "stake",
  //   args: [
  //     web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether"))
  //   ],
  // });

  // const {
  //   data: stakeConfigData,
  //   write: stake,
  //   // error: StakeConfigError,
  //   isLoading: StakeLoading,
  //   isSuccess: StakeSuccess,
  //   isError: StakeError,
  // } = useContractWrite(stakeConfig);

  // const waitForStakeApproveTransaction = useWaitForTransaction({
  //   hash: stakeConfigData?.hash,
  //   onSuccess(data) {
  //     setChangeFlag(true);
  //     setStakeLoadingIcon(false);
  //     toast.success("You staked the jewcoin successfully!", {
  //       autoClose: 5000,
  //     });
  //   },
  // });

  // //=============unstake jewcoin===========
  // const {
  //   config: unStakeConfig,
  //   // error: unstakeConfigError,
  //   // isError: isUnStakeConfigError,
  // } = usePrepareContractWrite({
  //   ...contractConfig,
  //   functionName: "unStake",
  //   args: [],
  // });

  // const {
  //   data: unStakeConfigData,
  //   write: unStake,
  //   // error: UnStakeConfigError,
  //   isLoading: UnStakeLoading,
  //   isSuccess: UnStakeSuccess,
  //   isError: UnStakeError,
  // } = useContractWrite(unStakeConfig);

  // const waitForUnStakeApproveTransaction = useWaitForTransaction({
  //   hash: unStakeConfigData?.hash,
  //   onSuccess(data) {
  //     setChangeFlag(true);
  //     setStakeLoadingIcon(false);
  //     toast.success("You unstaked the jewcoin successfully!", {
  //       autoClose: 5000,
  //     });
  //   },
  // });

  // //=============claim shekel token===========
  // const {
  //   config: claimConfig,
  //   // error: claimConfigError,
  //   // isError: isClaimConfigError,
  // } = usePrepareContractWrite({
  //   ...contractConfig,
  //   functionName: "claim",
  //   args: [],
  // });

  // const {
  //   data: claimConfigData,
  //   write: claim,
  //   // error: ClaimConfigError,
  //   isLoading: ClaimLoading,
  //   isSuccess: ClaimSuccess,
  //   isError: ClaimError,
  // } = useContractWrite(claimConfig);

  // const waitForClaimApproveTransaction = useWaitForTransaction({
  //   hash: claimConfigData?.hash,
  //   onSuccess(data) {
  //     setChangeFlag(true);
  //     setStakeLoadingIcon(false);
  //     toast.success(
  //       "You claimed the jewcoin and shekel for reward successfully!",
  //       { autoClose: 5000 }
  //     );
  //   },
  // });

  //=============Buy NFT===========
  const {
    config: buyNFTConfig,
    // error: buyNFTConfigError,
    // isError: isBuyNFTConfigError,
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "buyNFT",
    args: [web3.utils.toNumber(web3.utils.toWei(shekelAmountForBuy, "ether"))],
  });

  const {
    data: buyNFTConfigData,
    write: buyNFT,
    // error: BuyNFTConfigError,
    isLoading: BuyNFTLoading,
    isSuccess: BuyNFTSuccess,
    isError: BuyNFTError,
  } = useContractWrite(buyNFTConfig);

  const waitForBuyNFTApproveTransaction = useWaitForTransaction({
    hash: buyNFTConfigData?.hash,
    onSuccess(data) {
      setChangeFlag(true);
      setBuyNFTLoadingIcon(false);
      toast.success("Purchase Successfull", {
        autoClose: 5000,
      });
    },
  });

  const onApproveJew = async () => {
    if (isConnected === true) {
      await approveJew();
      setStakeLoadingIcon(true);
    } else {
      toast.warn(
        "Your wallet is disconnected!After disconnect, plz connect again!",
        { autoClose: 5000 }
      );
    }
  };

  const onApproveShekel = async () => {
    if (isConnected === true) {
      await approveShekel();
      setBuyNFTLoadingIcon(true);
    } else {
      toast.warn(
        "Your wallet is disconnected!After disconnect, plz connect again!",
        { autoClose: 5000 }
      );
    }
  };

  const onStake = async () => {
   
    if (isConnected === true) {
    try{  
      setStakeLoadingIcon(true);
      const stake = await writeContract({
        address: addressContract.addressNFT,
        abi: JEWNFT,
        functionName: "stake",
        args: [
          web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether"))
        ],
        
      })
      console.log('aaa',stake)
      const tx = await waitForTransaction({hash: stake.hash});
      if(tx){
        setChangeFlag(true);
      setStakeLoadingIcon(false);
      toast.success("You staked the jewcoin successfully!", {
        autoClose: 5000,
      });
      
      }
    }catch(e){
      setStakeLoadingIcon(false);
      setBuyNFTLoadingIcon(false);
      toast.error("Your transaction is failed!", { autoClose: 5000 });
    }
  }else {
    toast.warn(
      "Your wallet is disconnected!After disconnect, plz connect again!",
      { autoClose: 5000 }
    );
  }
  };

  const onClaim = async () => {
    
    if (isConnected === true) {
      try{  
        setStakeLoadingIcon(true);
        const claim = await writeContract({
          address: addressContract.addressNFT,
          abi: JEWNFT,
          functionName: "claim",
          args: [],
          
        })
        console.log('aaa',claim)
        const tx = await waitForTransaction({hash: claim.hash});
        if(tx){
          setChangeFlag(true);
          setStakeLoadingIcon(false);
          toast.success(
          "You claimed the jewcoin and shekel for reward successfully!",
          { autoClose: 5000 }
        );
        
        }
      }catch(e){
        setStakeLoadingIcon(false);
        setBuyNFTLoadingIcon(false);
        toast.error("Your transaction is failed!", { autoClose: 5000 });
      }
    }else {
      toast.warn(
        "Your wallet is disconnected!After disconnect, plz connect again!",
        { autoClose: 5000 }
      );
    }
  };

  const onUnStake = async () => {
    if (isConnected === true) {
      try{  
        setStakeLoadingIcon(true);
        const unStake = await writeContract({
          address: addressContract.addressNFT,
          abi: JEWNFT,
          functionName: "unStake",
          args: [],
          
        })
        console.log('aaa',unStake)
        const tx = await waitForTransaction({hash: unStake.hash});
        if(tx){
          setChangeFlag(true);
          setStakeLoadingIcon(false);
          toast.success("You unstaked the jewcoin successfully!", {
            autoClose: 5000,
          });
        
        }
      }catch(e){
        setStakeLoadingIcon(false);
        setBuyNFTLoadingIcon(false);
        toast.error("Your transaction is failed!", { autoClose: 5000 });
      }
    }else {
      toast.warn(
        "Your wallet is disconnected!After disconnect, plz connect again!",
        { autoClose: 5000 }
      );
    }
  };

  const onBuyNFT = async () => {
    if (isConnected === true) {
      await buyNFT();
      setBuyNFTLoadingIcon(true);
    } else {
      toast.warn(
        "Your wallet is disconnected!After disconnect, plz connect again!",
        { autoClose: 5000 }
      );
    }
  };

  useEffect(() => {
    const GetReward = async () => {
      console.log(">>>>>>>BAL",isStakedStatues?.[1]);
      if (isConnected === true && isStakedStatues?.[0] === true) {
        const rewardQuery = await readContract({
          address: addressContract.addressNFT,
          abi: JEWNFT,
          functionName: 'calcAmount',
          args: [address],
        });

        const NextrewardQuery = await readContract({
          address: addressContract.addressNFT,
          abi: JEWNFT,
          functionName: 'calcFutureReward',
          args: [address],
        });
        setReward((web3.utils.fromWei(rewardQuery, 'wei')) /10 ** 18);
        setNextReward((web3.utils.fromWei(NextrewardQuery, 'wei')) /10 ** 18)
      }
    }
    

    // Call GetReward immediately when component mounts
    GetReward();

    // Set up a timer to call GetReward every 30 minutes
    const intervalId = setInterval(() => {
      GetReward();
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    return () => {
      clearInterval(intervalId);
    };
  }, [isConnected, isStakedStatues]);


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
      link: "assets/images/Torah/Torah.gif",
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
    // if (/^\d*$/.test(inputValue)) {
    // Update the state with the new value
    setStakedAmount(inputValue);
    isStakedStatuesRefetch();
    isClaimRefetch();
    allownceJewAmountRefetch();
    allownceShekelAmountRefetch();
    shekelBalanceRefetch();
    // }
  };

  const onDateChangeHandler = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      // Update the state with the new value
    }
  };

  useEffect(() => {
    setName(images[curr].name);
    setShekelAmountForBuy(images[curr].amount);
    // Clear the interval when the component unmounts
  }, [curr]);

  useEffect(() => {
    isStakedStatuesRefetch();
    shekelBalanceRefetch();
    isClaimRefetch();
    allownceJewAmountRefetch();
    allownceShekelAmountRefetch();
    setChangeFlag(false);
    setStakedAmount(0);

    console.log("bal>>>>",isStakedStatues);

  }, [flag]);

  useEffect(() => {
    isStakedStatuesRefetch();
    shekelBalanceRefetch();
    isClaimRefetch();
    allownceJewAmountRefetch();
    allownceShekelAmountRefetch();

    console.log("bal>>>>",isStakedStatues);

  }, []);

  useEffect(() => {
    if (
      ApprovedJewError === true ||
      ApproveShekelError === true ||
      BuyNFTError === true
    ) {
      setStakeLoadingIcon(false);
      setBuyNFTLoadingIcon(false);
      toast.error("Your transaction is failed!", { autoClose: 5000 });
    }
  }, [
    ApprovedJewError,
    ApproveShekelError,
    BuyNFTError,
  ]);

  useEffect(() => {
    if (data !== undefined) {
      setBalanceShekel(data?.formatted);
    } else setBalanceShekel(0);
  }, [data]);

  useEffect(() => {
    if (isStakedStatues?.[0] === true) {
      console.log(">>> time",web3.utils.toNumber(isStakedStatues?.[2].toString()));
     const calculateTime = async () => {
        console.log("setting time")
        const currentTime = Math.floor(Date.now() / 1000); // Current time in UNIX format
        const elapsedTime = currentTime -  web3.utils.toNumber(isStakedStatues?.[2].toString());
        const timeUntilNextReward = 24 * 60 * 60 - (elapsedTime % (24 * 60 * 60));
        setRemainingTime(Math.floor(timeUntilNextReward/3600));
     }
     calculateTime();
      const interval = setInterval(() => {
          calculateTime();
      }, 3600000); // Update every hour (3600 * 1000 milliseconds)

      return () => clearInterval(interval);
    }
  }, [isConnected,isStakedStatues]);


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
        <div className="text-[14px] sm:text-[18px] font-semibold mb-[30px] text-center">
          Please allow up to 1 minute for the website to update after buying,
          staking and claiming. If it does not update in that time, please
          refresh the webpage. If you still are having trouble, please reach out
          in the telegram chat.
        </div>
        <div
          className="relative  w-full font-bold h-full  flex-col ms:flex-row items-center justify-center gap-[20px] bg-[#FFE300] rounded-[20px] px-[20px] xl:px-[25px] lg:px-[12px] sm:px-[32px] py-[30px]  mb-[20px]"
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
        <div className="relative grid grid-cols-1 lg:grid-row gap-4 w-full rounded-lg bg-purple-700 shadow-md p-4 mb-4 align-middle">
  <div className="col-span-1">
    {isStakedStatues?.[0] ? (
      <>
        <div className="text-lg font-bold text-yellow-400">Staked Jew Amount:</div>
        <div className="bg-yellow-400 text-lg font-bold rounded-lg p-2">{(isStakedStatues?.[1].toString()) / 10 ** 18}</div>
      </>
    ) : (
      <>
        <div className="text-lg font-bold text-yellow-400">Jewcoin Amount:</div>
        <div className={s.amountTokenInput}>
          <input
            className="outline-none w-full bg-transparent text-lg text-yellow-400 placeholder-yellow-400"
            placeholder="Amount"
            type="number"
            value={stakedAmount}
            onChange={onAmountChangeHandler}
          />
        </div>
      </>
    )}
  </div>
  <div className="col-span-1 mx-auto">
    <div className="text-lg font-bold text-yellow-400">You have earned {reward} SHEKEL</div>
    <div className="text-lg font-bold text-yellow-400">After {remainingTime + 1} hours you will earn {nextReward - reward} SHEKEL</div>
  </div>
</div>


          {/* {allownceJewAmount >=
            web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether"))} */}
          {isStakedStatues?.[0] ? (
            reward > 0? (
              <button
                className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[#7659AD] rounded-[10px] h-[20%]"
                onClick={onClaim}
              >
                Claim
                {stakeLoadingIcon === true ? (
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
                Unstake
                {stakeLoadingIcon === true ? (
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
          ) : (allownceJewAmount !== undefined ? allownceJewAmount : 0) >=
            web3.utils.toNumber(web3.utils.toWei(stakedAmount, "ether")) ? (
            <button
              className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[#7659AD] rounded-[10px] h-[20%]"
              onClick={onStake}
            >
              Stake
              {stakeLoadingIcon === true ? (
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
              onClick={onApproveJew}
            >
              Approve
              {stakeLoadingIcon === true ? (
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
        <div className="text-[14px] sm:text-[18px] font-semibold mt-[10px] text-center">
          Once you have staked your Jewcoins, if you want to stake additional
          tokens you will first need to unstake all Jewcoins before re-staking
          your new and improved Jewcoin balance.
        </div>

        <div
          className="relative w-full  h-full flex flex-col ms:flex-row items-center justify-center gap-[20px] bg-[#FFE300] rounded-[20px] px-[20px] xl:px-[25px] lg:px-[12px] sm:px-[32px] py-[30px]  mb-[20px] mt-[10px]"
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
              (allownceShekelAmount !== undefined ? allownceShekelAmount : 0) <
              web3.utils.toNumber(
                web3.utils.toWei(shekelAmountForBuy, "ether")
              ) ? (
                <button
                  className="h-[50px] w-full text-[white] text-[20px] font-bold bg-[#7659AD] rounded-[10px] h-[20%]"
                  onClick={onApproveShekel}
                >
                  Approve Shekel
                  {buyNFTLoadingIcon === true ? (
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
                  onClick={onBuyNFT}
                >
                  Buy NFT
                  {buyNFTLoadingIcon === true ? (
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
            ) : (
              <button className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[black] rounded-[10px] h-[20%]">
                No Balance
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
