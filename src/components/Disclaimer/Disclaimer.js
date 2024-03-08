import { SvgStakingRightArrow } from "assets/svg";
import s from "./Disclaimer.module.css";

const Disclaimer = () => {
  return (
    <div className={s.root} id="disclaimer_panel">
      <div className={s.rightWrapper}>
        <div className="text-[30px] sm:text-[40px] text-[#FFE300] font-bold font-sefer">
          Disclaimer
        </div>
        {/* <div
					className="text-[14px] sm:text-[18px] font-semibold mt-[10px]"
					style={{ color: 'rgba(11, 7, 24, 0.30)' }}
				>
					Staking your jewcoin
				</div> */}
        <SvgStakingRightArrow />
        <div className="text-[12px] sm:text-[18px] text-white font-semibold mt-[30px]">
          Jewcoin is a Memecoin. It is not an investment vehicle or competing
          currency to the United States Dollar or any other nation's currency.
          Please do not buy Jewcoin with the intention of day trading it. That
          would result in a lot of gas fees, and the Jews have already had
          enough gas used on them. We cannot guarantee that saving Jewcoins from
          being burned will get the woke mob to leave you alone or rethink their
          virtue signaling.
          <br />
          We cannot guarantee that everything we set out to accomplish in our
          road map will end up being achieved. If you find our project
          offensive, please know that we could not care less and encourage you
          to be offended at the fact that your government consistently lies to
          you to gain more money and power for themselves.
        </div>
      </div>
      <div className={s.leftWrapper}>
        <img
          src="assets/images/tokenomics.png"
          alt="sunshine"
          className="lg:min-w-[367px] lg:min-h-[367px] lg:w-[367px] w-full h-[233px] min-h-[233px] object-cover"
          style={{
            borderRadius: "115px 0px",
            boxShadow: "0px 4px 120px 0px rgba(255, 227, 0, 0.70)",
          }}
        />
      </div>
    </div>
  );
};

export default Disclaimer;
