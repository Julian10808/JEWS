import { SvgStakingRightArrow } from "assets/svg";
import s from "./Tokenomics.module.css";

const Tokenomics = () => {
  return (
    <div className={s.root} id="tokenomics_panel">
      <div className={s.leftWrapper}>
        <img
          src="assets/images/staking.png"
          alt="sunshine"
          className="lg:min-w-[367px] lg:min-h-[367px] lg:w-[367px] w-full h-[233px] min-h-[233px] object-cover"
          style={{
            borderRadius: "115px 0px",
            boxShadow: "0px 4px 120px 0px rgba(255, 227, 0, 0.70)",
          }}
        />
      </div>
      <div className={s.rightWrapper}>
        <div className="text-[30px] sm:text-[40px] text-[#FFE300] font-bold font-sefer">
          Tokenomics - Price Action - Liquidity Pool
        </div>
        {/* <div
					className="text-[14px] sm:text-[18px] font-semibold mt-[10px]"
					style={{ color: 'rgba(11, 7, 24, 0.30)' }}
				>
					Staking your jewcoin
				</div> */}
        <SvgStakingRightArrow />
        <div className="text-[12px] sm:text-[18px] text-white font-semibold mt-[30px]">
          {/* <div className="text-[#FFE300] font-sefer text-[23px]"></div> */}
          Six million JewCoins is the maximum amount that can ever exist. The
          burn begins when 1 million Jewcoins have been saved from Auchwallet,
          with 66,000 burned at the end of each day. The number of Jewcoins
          rescued each day will be subtracted from the daily rate of 66,000. If
          one Jewcoin is rescued, then 65,999 will burn that day. If 60,000
          Jewcoins are rescued, only 6,000 will burn that day. More than 66,000
          Jewcoins saved in a day does not affect the amount burned the
          following day.
          <br />
          <br />
          <p>
            Jewcoins starting price is .15 usd. After 1 million Jewcoins are
            saved from Auchwallet, we will open up a liquidity pool using the
            Eth and stable coins acquired. From this point onwards, the price of
            Jewcoin will be determined by incoming purchases and sales. We will
            keep the Jewcoin price in Auchwallet 1% less than the price in the
            LP to incentivize purchases of Jewcoin from Auchwallet over the LP.
          </p>
          <br />
          50% of all ethereum acquired from the Jewcoin token burn sale will be
          saved and deposited into the Liquidity pool to prevent the Jewcoin
          price from tanking and show the Jewcoin community that there will not
          be a rugpull. The other 50% will be used for funding further
          development of Jewcoin and loading the liquidity pool in the future if
          needed to stabilize price.
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
