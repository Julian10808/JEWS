import { SvgStakingRightArrow } from "assets/svg";
import s from "./Roadmap.module.css";

const Roadmap = () => {
  return (
    <div
      className={s.root}
      style={{
        background: "url(assets/images/roadmap-back.png)",
        boxShadow: "4px 3px 13px 0px #FFE300",
        backgroundSize: "cover",
      }}
      id="roadmap_panel"
    >
      <div className="text-[30px] md:text-[40px] text-[#FFE300] font-bold font-sefer">
        Roadmap
      </div>
      <SvgStakingRightArrow />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-[36px] xl:gap-[52px] w-full md:w-[80%] lg:w-full xl:w-[80%] mt-[56px] self-center">
        <div className="flex flex-col items-center justify-end gap-[36px] w-full">
          <div
            className="w-full py-[32px] px-[20px] rounded-r-[20px] rounded-bl-[20px] bg-[#FFE300]"
            style={{ boxShadow: "0px 4px 20px 0px #FFE300" }}
          >
            <div
              className="w-full py-[16px] text-[24px] rounded-[10px] bg-[#7659AD] text-center"
              style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)" }}
            >
              Q1
            </div>
            <ul className="list-outside list-disc pl-[20px] text-black mt-[32px] text-[12px] md:text-[16px] leading-[24px] font-bold">
              <li>Jewcoin is launched.</li>
              <li>
                Once 1 million tokens are saved, we will open up a ETH/JEWS
                Lliquidity pool with the eth and stables raised.
              </li>
              <li>The burning begins. Buy them while you can.</li>
              <li>Staking begins, and NFTs start being minted.</li>
            </ul>
          </div>
          <div
            className="w-full py-[32px] px-[20px] rounded-r-[20px] rounded-bl-[20px] bg-[#FFE300]"
            style={{ boxShadow: "0px 4px 20px 0px #FFE300" }}
          >
            <div
              className="w-full py-[16px] text-[24px] rounded-[10px] bg-[#7659AD] text-center"
              style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)" }}
            >
              Q2
            </div>
            <ul className="list-outside list-disc pl-[20px] text-black mt-[32px] text-[12px] md:text-[16px] leading-[24px] font-bold">
              <li>The last Jewcoins have been bought or burned.</li>
              <li>The second round of NFTs are minted.</li>
              <li>
                JewCrew: undetermined amount Jewish themed NFTS. (Yes, some of
                them will be tunnelers. No, we can’t guarantee that owning a
                Jewpunk will give you access to those tunnels.)
              </li>
              <br />
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end gap-[36px] w-full">
          <div
            className="w-full py-[32px] px-[20px] rounded-r-[20px] rounded-bl-[20px] bg-[#FFE300] lg:h-[508px]"
            style={{ boxShadow: "0px 4px 20px 0px #FFE300" }}
          >
            <div
              className="w-full py-[16px] text-[24px] rounded-[10px] bg-[#7659AD] text-center"
              style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)" }}
            >
              Q3
            </div>
            <ul className="list-outside list-disc pl-[20px] text-black mt-[32px] text-[12px] md:text-[16px] leading-[24px] font-bold">
              <li>
                MetaJews: A metaverse, gaming platform, and civilization
                builder.
              </li>
              <li>
                Equip your Jewish avatar with all the NFTs you've collected.
              </li>
              <li>Acquire your plot of the virtual holy land.</li>
              <li>
                Kick out a Palestinian family to make way for your new housing
                development.
              </li>
              <li>Put down Hamas and secure the Gaza border for good.</li>
              <li>
                Play historical events from the Old Testament, including Noah's
                Ark, Moses vs Pharaoh, David vs Goliath, and Jonah in the Whale.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full text-white text-[16px] sm:text-[30px] font-bold mt-[80px] mb-[36px] text-center lg:text-left">
        More to be announced !
      </div>
      <div className="w-full lg:w-fit flex items-center justify-center gap-[22px]">
        <div
          className="p-[16px] sm:py-[18px] lg:py-[26px] lg:px-[28px] rounded-[10px] bg-[#010813] text-[12px] sm:text-[16px] text-[#FFE300] font-bold cursor-pointer"
          style={{
            border: "2px solid #FFE300",
            boxShadow: "4px 3px 13px 0px #FFE300",
          }}
        >
          Get Your Jewcoin
        </div>
        <div
          className="p-[16px] sm:py-[18px] lg:py-[26px] sm:px-[20px] lg:px-[28px]  rounded-[10px] bg-[#FFE300] text-[12px] sm:text-[16px] text-[#000] font-bold cursor-pointer"
          style={{
            border: "2px solid #FFE300",
            boxShadow: "4px 3px 13px 0px #FFE300",
          }}
        >
          Connect Wallet
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
