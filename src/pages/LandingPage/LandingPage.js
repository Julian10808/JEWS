import Introduction from "components/Introduction";
import s from "./LandingPage.module.css";
import Staking from "components/Staking";
import NFTS from "components/NFTs/NFTs";
import Mission from "components/Mission";
import Roadmap from "components/Roadmap";
import Footer from "components/Layout/Footer";
import Tokenomics from "components/Tokenomics";
import Disclaimer from "components/Disclaimer";
import Airdrop from "components/Airdrop";

function LandingPage() {
  return (
    <div className={s.root}>
      <Introduction />
      <Staking />
      <NFTS />
      <Mission />
      <Roadmap />
      <Tokenomics />
      <Disclaimer />
      <Airdrop />
      <Footer />
    </div>
  );
}

export default LandingPage;
