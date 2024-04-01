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
import JewCollection from "../../contracts/abi/JewCollection.json";
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
  
  const imagesMenorah = [
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmSWNpJuafSx1CkYrn1xEkJYjWzwi2tQmk6MmryRXfde9k",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmbtvUaBUAmsJ3inuH19NvNqBxbQMPADzRfJJzKzmf644e",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/Qma4fdWDWvuyUDauppfzjNNtywvKZVVpxxH8dqVbDZ5eqF",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmX2zVrRD837wTJUHuoHKc1xiGc1VuMBP7nAaoKryKohht",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmdRpRqz1nc5DQxdAx4YnoCE311TRyF8GJH5ZwbDpK4f4h",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmNjFrycMKw3bTimc1aGVSZGg7t1tDhF25kXS1ArM2JPWz",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmcJbjh7uWRiZjAHEoitSniYRUAqnYSeQmhBiZan1LZj1D",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmXv4rqLe5ZYmnLUvYs2pCM9tCyk7ytSPWmN8v17AmuCGp",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmcDgfFVYNhF8HVpXDVRrVLEJPSLNDzGPBhpiF8wduhW1Q",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmW7oZu8pNT4cZxPjwFi4WAz7nwG3wiGUfhAcakj39ocoJ"
]

const imagesKiddish = [
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmYH11j9yBRd4prYMa1zRTNoSjtgabM35WpBot8oT2w7Kb",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmdyiSzLVH8kFTeNcEMVxwg7rEtApmH22XyQggUM4rbrpp",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmTKXhSbM4MDkbJDxDyeKok1T4oE9wiBtRkPhrLvMcwkwJ",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmP57cHwtc6NuMGWhnPzMckUtSA74mVpbAkZ9Z5reKwhA4",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmQTQpTKs3LKgVznxpGfgKQAvS2ZQzkRsPKW2rcDUZffVL",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmZM2YdW8hiuq2QbtEzZsioApCfsVmHqXNvzzGuWakWpPx",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmNzUFUcPiYT2bF1tAEfVXJ7iuTwzkw8Av3sGreuH2jywX",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmZkQqLKoMqLEMRwH1dNEqm6HzpU9STHz5YghYNSRqXdbP",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmS8WPpAi8voZ2F5HULojjpjDcVhkZS9nfjswaG2WSqb1X",
    "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmeHq9uX38cVzYbwua3a63gNa1u6nsfMzXP6L3EhxnuKKg"

]

const imagesChallahBread = [
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmWUFNZVaDTP33RcZXdzvUsydCvLs9gBDeaNZUNgAPor8s",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmNnMgjYrGS4rgwNUdNHBXNWGWisiHSchLQB24pwiMysjY",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmPQ8UE337cgLUoGQpEtrMLtNMLdu9maZzTBTSLaim5sa1",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmQreinqrxQ2pv7rcZ2ZziLPiAvB91mV6yQ4qL8eKFKBV5",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmXiiFvqZUWuN5feASQMev44eWSkQiiYA5bXBdMfJNzGEn",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmP6sskfHPhBr5mdmXuC6kWrsNyuC62V62SPjyGqP8451D",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmTjiQVhWJvFCb8MimFFqHX2qq4Lsi3EjgDA2HkwTsw6cM",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/Qme65TevmF1MieQLzUHmTnf6V3fNvDMLinQAF5oU3Z59iD",
]

const imagesMatzah = [
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmYoc2sZ9s8Rzuemw2sXA9U4jm4Q5jjFrxxSn65y7rRB9N",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmbA5JiSAbt24xBHXehWMZcmqirCPWuaubLGrbjnioFJxP",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmYckXn8wZo9gwEjMRxUCUWp8aXNWYkFbBkE6GVvyS74vu",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmQ8TpyJUX3GTDXMW4puA5aBHrctrba6cgFvLx3WTxR3jL",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmTX5g4QK1NYhrQucmNV9oE72w5Aa9LdpoNA81AjrPb9xV",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmeJwPBWhUUnu78tsXQqXYGWVcbr8YJsPAqctn7rayusuo",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/Qmd7asG6oAPDiwMpbahBV8FbFS8WfuSchBDADcrSVEZcX8",

]

const imagesYarmulke = [
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmNgpisdxgkzmBQCjyZug5JYw1DifhRDSKr9khicDyifVa",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmSMNFkEtqJhuZ14WVy9p6HZQNt3FRcN8LYMLJcHuuNymk",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmTmX52u5r6a1gug4p9kynDoKKSVxcn1MJt7EhidBqEe5W",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmbiC2uy1Dvb8yR4j4fkhfkKNEzf3PTYS6uNXLBH9XtCBa",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/Qma6kzvGfpTjFcXHMrnmihydeiC7QJ8jRAxc6fo2sSo3WL",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmRwrXTH55LeCagNvjGUePmoHXfHuYaHk6B9ExsjvcGRAw",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmZSE6TPvgizQWY5zh12RVb6C8NrQEYcFpzAwZzb4LEixm",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmcqxpE1k2JJQo3zdK1ACT2RVLsRQWCV4Wq7rzFEKkHGLD",
  "https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmS7bDCnCAChdNmZ79R68D1XmGDwqbKCxyAHxxNZPohW43"

]

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
      args: [address, addressContract.addressJewCollection],
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
      addressContract.addressJewCollection,
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
  // const {
  //   config: buyNFTConfig,
  //   // error: buyNFTConfigError,
  //   // isError: isBuyNFTConfigError,
  // } = usePrepareContractWrite({
  //   ...contractConfig,
  //   functionName: "buyNFT",
  //   args: [web3.utils.toNumber(web3.utils.toWei(shekelAmountForBuy, "ether"))],
  // });

  // const {
  //   data: buyNFTConfigData,
  //   write: buyNFT,
  //   // error: BuyNFTConfigError,
  //   isLoading: BuyNFTLoading,
  //   isSuccess: BuyNFTSuccess,
  //   isError: BuyNFTError,
  // } = useContractWrite(buyNFTConfig);

  // const waitForBuyNFTApproveTransaction = useWaitForTransaction({
  //   hash: buyNFTConfigData?.hash,
  //   onSuccess(data) {
  //     setChangeFlag(true);
  //     setBuyNFTLoadingIcon(false);
  //     toast.success("Purchase Successfull", {
  //       autoClose: 5000,
  //     });
  //   },
  // });

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

  const BuyNFTTx = async(url) => {
      try{
        // await buyNFT();
        
        const BuyNft = await writeContract({
          address: addressContract.addressJewCollection,
          abi: JewCollection,
          functionName: "buyNFT",
          args: [web3.utils.toNumber(web3.utils.toWei(shekelAmountForBuy, "ether")),url],
          
        })
        console.log('aaa',BuyNft)
        const tx = await waitForTransaction({hash: BuyNft.hash});
        if(tx){
          setChangeFlag(true);
          setBuyNFTLoadingIcon(false);
          toast.success("Purchase Successfull", {
            autoClose: 5000,
          });
        }

    }catch(e){
      setStakeLoadingIcon(false);
      setBuyNFTLoadingIcon(false);
      console.log(e);
      toast.error("Your transaction is failed!", { autoClose: 5000 });
    }
  }

  function getRandomImageIndex(images) {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
  }

  async function pinMetadataToIPFS(metadata) {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pinataContent: metadata
        })
    };

    let tokenUrl;
    try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options);
        const responseData = await response.json();
        console.log(responseData);
        const ipfsHash = responseData.IpfsHash;
        tokenUrl = `https://pink-acceptable-heron-641.mypinata.cloud/ipfs/${ipfsHash}`;
    } catch (err) {
        console.error(err);
        setStakeLoadingIcon(false);
        setBuyNFTLoadingIcon(false);
        toast.error("Your transaction is failed!", { autoClose: 5000 });
    }
    return tokenUrl;
}



  const onBuyNFT = async () => {
    if (isConnected === true) {

      setBuyNFTLoadingIcon(true);

      if(shekelAmountForBuy === 200){
        await BuyNFTTx("https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmcgjQFykm5tnXm1Wc92yJmVz3Mt4PJt5tkMQHriyk9QK5");

      }
      else if (shekelAmountForBuy === 350) {
        await BuyNFTTx("https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmfBcJBdEvC4Qu1LR7t9LxAvbvNWgGZ2PvwrW5soQsmQSr");

      }
      else if (shekelAmountForBuy === 250000) {
        await BuyNFTTx("https://pink-acceptable-heron-641.mypinata.cloud/ipfs/QmaEWg8Eo27PZDveZnXbnhtq8EjTKuPx2uXjWFFwi3QMGq")

      }
      else if (shekelAmountForBuy === 150) {
        const imageurl = getRandomImageIndex(imagesMenorah);
        const metadata = {
            name: "Menorah",
            description: "A Menorah is a traditional Jewish candelabrum that holds a central significance in the celebration of Hanukkah, also known as the Festival of Lights. During each night of Hanukkah, an additional candle is lit, starting with one on the first night and progressing to eight on the final night. The lighting of the candles commemorates the miracle of the oil that burned for eight days in the ancient Temple in Jerusalem, even though there was only enough oil for one day.",
            image: imageurl
        }
        const tokenurl = await pinMetadataToIPFS(metadata);
        console.log("final url",tokenurl);
        await BuyNFTTx(tokenurl);

      }
      else if (shekelAmountForBuy === 100) {
        const imageurl = getRandomImageIndex(imagesKiddish);
        const metadata = {
            name: "Kiddish Cup",
            description: "A Kiddush cup is a ceremonial goblet used in Jewish religious rituals, particularly during the blessing over wine or grape juice. The term (Kiddush) refers to the sanctification or blessing recited on Shabbat (the Jewish Sabbath) and other Jewish holidays, marking the separation between the ordinary and the holy. During the Kiddush ceremony, the cup is filled with wine or grape juice, and the blessing is recited to sanctify the Sabbath or holiday. The head of the household or a designated individual then sips from the Kiddush cup, and often the contents are shared with others at the table.",
            image: imageurl
        }

        const tokenurl = await pinMetadataToIPFS(metadata);
        console.log("final url",tokenurl);
        await BuyNFTTx(tokenurl);

      } else if (shekelAmountForBuy === 75) {
        const imageurl = getRandomImageIndex(imagesChallahBread);
        const metadata = {
            name: "Challah Bread",
            description: "Challah is a traditional Jewish bread that is typically eaten on the Sabbath and during Jewish holidays. It is a rich, sweet, and slightly eggy bread that holds cultural and religious significance in Jewish tradition. The braided shape of Challah is said to represent unity, love, and the intertwining of the Jewish people. Additionally, the sweetness of the bread symbolizes the sweetness of the Sabbath and other joyous occasions.",
            image: imageurl
        }

        const tokenurl = await pinMetadataToIPFS(metadata);
        console.log("final url",tokenurl);
        await BuyNFTTx(tokenurl);
      } else if (shekelAmountForBuy === 60) {
        
        const imageurl = getRandomImageIndex(imagesMatzah);
        const metadata = {
            name: "Matzah",
            description: "Matzah is unleavened flatbread that holds great significance in Jewish tradition, particularly during the festival of Passover (Pesach). Matzah is a central element of the Passover Seder, symbolizing the haste with which the Israelites left Egypt during the Exodus, as they did not have time for their bread to rise. Matzah is not only a symbol of historical events but also serves as a reminder of the Jewish people's journey from slavery to freedom. During Passover, it is a central element in the dietary observance of refraining from leavened products.",
            image: imageurl
        }

        const tokenurl = await pinMetadataToIPFS(metadata);
        console.log("final url",tokenurl);
        await BuyNFTTx(tokenurl);

      } else if (shekelAmountForBuy === 50) {

        const imageurl = getRandomImageIndex(imagesYarmulke);
        const metadata = {
            name: "Yarmulke",
            description: "A yarmulke, also known as a kippah, is a small, round skullcap worn by Jewish men as a symbol of their religious faith and reverence for God. It is typically worn during prayer or other religious ceremonies, and it signifies a sense of humility and acknowledgment of a higher power. In some Jewish traditions, wearing a yarmulke is a customary practice, while in others, it may be reserved for specific occasions or locations, such as a synagogue or during religious rituals. The style and size of yarmulkes can vary, but they are generally small and worn at the top of the head.",
            image: imageurl
        }

        const tokenurl = await pinMetadataToIPFS(metadata);
        console.log("final url",tokenurl);
        await BuyNFTTx(tokenurl);

      }
     
     
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
      ApproveShekelError === true 
    ) {
      setStakeLoadingIcon(false);
      setBuyNFTLoadingIcon(false);
      toast.error("Your transaction is failed!", { autoClose: 5000 });
    }
  }, [
    ApprovedJewError,
    ApproveShekelError
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

  useEffect(()=> {
    isStakedStatuesRefetch();
    shekelBalanceRefetch();
    isClaimRefetch();
    allownceJewAmountRefetch();
    allownceShekelAmountRefetch();
  },[reward])


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
