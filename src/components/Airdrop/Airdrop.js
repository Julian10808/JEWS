import { SvgStakingRightArrow } from "assets/svg";
import s from "./Airdrop.module.css";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useTransaction,
  useWaitForTransaction,
} from "wagmi";
import { toast } from "react-toastify";
import addressContract from "../../contracts/contractAddress.json";
import JEWNFT from "../../contracts/abi/JEWNFT.json";
import { readContract,waitForTransaction,writeContract } from '@wagmi/core'

const Airdrop = () => {
  const { address, connector, isConnected } = useAccount();
  const [isClaimed, setClaimed] = useState(false);
  const [flag, setChangeFlag] = useState(false);
  const [staking, setStaking] = useState(0);
  const [progress, setProgress] = useState(false);
  const [claim, setClaim] = useState(false);
  const [curr, setCurr] = useState(0);
  const [name, setName] = useState("Yarmulke");
  const [amount, setAmount] = useState(50);
  const [balance, setBalance] = useState(100);
  const [stakedPeriod, setStakedPeriod] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);

  //=========== Contract Config================
  let contractConfig = {};
  contractConfig = {
    address: addressContract.addressNFT,
    abi: JEWNFT,
  };

  //=========== isClaimableSkin================
  const { data: claiamble, refetch: isClaimableSkinRefetch } = useContractRead({
    ...contractConfig,
    functionName: "isClaimableSkin",
    args: [address],
  });

  console.log(claiamble, "isClaimableSkin");
  console.log("aadd",address);
  //=============buy stable token===========
  // const {
  //   config: claimSkinConfig,
  //   // error: claimSkinConfigError,
  //   // isError: isClaimSkinConfigError,
  // } = usePrepareContractWrite({
  //   ...contractConfig,
  //   functionName: "claimSkin",
  //   args: [],
  // });

  // const {
  //   data: claimSkinConfigData,
  //   write: claimSkin,
  //   // error: ClaimSkinConfigError,
  //   isLoading: ClaimSkinLoading,
  //   isSuccess: ClaimSkinSuccess,
  //   isError: ClaimSkinError,
  // } = useContractWrite(claimSkinConfig);

  // const waitForClaimSkinTransaction = useWaitForTransaction({
  //   hash: claimSkinConfigData?.hash,
  //   onSuccess(data) {
  //     setChangeFlag(true);
  //     toast.success("You claimed foreskin token!", { autoClose: 5000 });
  //     setProgress(false);
  //     setClaimed(true);
  //   },
  // });

  const onClaimSkin = async () => {
    if (isConnected === true) {
      //await claimSkin();
      setProgress(true);
      try{  
        const claimSkin = await writeContract({
          address: addressContract.addressNFT,
          abi: JEWNFT,
          functionName: "claimSkin",
          args: [],
          
        })
        console.log('aaa',claimSkin)
        const tx = await waitForTransaction({hash: claimSkin.hash});
        if(tx){
          setChangeFlag(true);
          toast.success("You claimed foreskin token!", { autoClose: 5000 });
          setProgress(false);
          setClaimed(true);
        
        }
      }catch(e){
        setProgress(false);
        toast.error("Your progress is failed!", { autoClose: 5000 });
      }
    } else {
      toast.warn(
        "Your wallet is disconnected!After disconnect, plz connect again!",
        { autoClose: 5000 }
      );
    }
  };

  const onToast = async () => {
    toast.warn(
      "Auchwallet still has JEWS in it, come back to claim when it’s empty.",
      { autoClose: 5000 }
    );
  };

  const onStaking = () => {
    setStaking(1);
    setTimeout(() => {
      setStaking(2);
    }, 3000);
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

    // setName(images[curr - 1].name);
    // setAmount(images[curr - 1].amount);
    // setPeriod(images[curr - 1].period);
  };

  const next = () => {
    setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));

    // setName(images[curr + 1].name);
    // setAmount(images[curr + 1].amount);
    // setPeriod(images[curr + 1].period);
  };

  const onAmountChangeHandler = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      // Update the state with the new value
      setStakedAmount(inputValue);
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
    setAmount(images[curr].amount);
    // Clear the interval when the component unmounts
  }, [curr]);


  useEffect(() => {
    isClaimableSkinRefetch();
    setChangeFlag(false);
  }, [flag]);
  return (
    <div className={s.root} id="airdrop_panel">
      <div className={s.rightWrapper}>
        <div className="text-[30px] sm:text-[40px] text-[#FFE300] font-bold font-sefer">
          Airdrop
        </div>
        {/* <div
          className="text-[20px] sm:text-[25px] font-semibold mt-[10px] text-white"
          // style={{ color: "rgba(11, 7, 24, 0.30)" }}
        >
          Staking your Jewcoin
        </div> */}
        <SvgStakingRightArrow />
        <div className="text-[14px] sm:text-[18px] font-semibold mt-[30px]">
          Not to be confused with the 10 Golden Foreskin NFTs, $SKIN holders
          will be able to enter into a lottery to win the opportunity to submit
          their own NFT designs and earn 50% of the Shekels from the sales of
          their NFT. The more Foreskin you hold, the more entries into the NFT
          sweepstakes you will get. Every two months, the lottery will commence
          again, giving a new chance for $SKIN holders to win the rights to
          submit their own NFT.
          {/* <div className="text-[#FFE300]">
            <br />
            The formula follows: The amount of Jewcoins multiplied by time
            staked divided by ten equals the amount of Sheklel yielded.
          </div> */}
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
            To reward OG Jewcoin holders, we will be airdropping our governance
            token, Foreskin ($SKIN) to anyone staking at least 1000 Jewcoin when
            the Auchwallet burn has finished. For every 1000 Jewcoin Staked,
            users will be able to claim 1 $SKIN
          </div>

          <div
            className="relative justify-between flex flex-col w-full rounded-[10px] bg-[#7659AD] mb-[10px] px-[14px] py-[8px]"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)", textAlign: "center" }}
          >
            <span>Skin CA </span>
            <span>0x27915C1489E63F391025A1C6DD8F9F55C240cB09</span>
        </div>

          {claiamble !== undefined && claiamble === true ? (
            <button
              className="h-[50px] w-full text-[white] text-[24px] font-bold bg-[#7659AD] rounded-[10px] h-[20%]"
              onClick={onClaimSkin}
            >
              {isClaimed === true ? "Claimed" : "Claim"}
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
              onClick={onToast}
            >
              Can't Claim
            </button>
          )}
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
export default Airdrop;
