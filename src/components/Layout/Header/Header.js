import s from "./Header.module.css";

import cn from "classnames";
import { SvgLogoText } from "assets/svg";
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const navLinks = [
    { label: "Home", active: true },
    { label: "Staking" },
    { label: "NFT'S" },
    { label: "Mission" },
    { label: "Roadmap" },
    { label: "Tokenomics" },
    { label: "Disclaimer" },
    { label: "Airdrop" },
    { label: "Contact" },
  ];
  const [language, setLanguage] = useState("en");
  const [index, setIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleClick = (label) => {
    setShowNav(false);
    if (label === "Home") {
      const element = document.getElementById("intro_panel");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    } else if (label === "Staking") {
      const element = document.getElementById("staking_panel");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    } else if (label === "NFT'S") {
      const element = document.getElementById("nft_panel");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    } else if (label === "Mission") {
      const element = document.getElementById("mission_panel");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    } else if (label === "Roadmap") {
      const element = document.getElementById("roadmap_panel");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    } else if (label === "Tokenomics") {
      const element = document.getElementById("tokenomics_panel");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    } else if (label === "Disclaimer") {
      const element = document.getElementById("disclaimer_panel");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    } else if (label === "Airdrop") {
      const element = document.getElementById("airdrop_panel");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    } else if (label === "Contact") {
      const element = document.getElementById("contact_panel");
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  const showNavBar = () => {
    setShowNav(!showNav);
  };

  return (
    <div className={s.root}>
      {/* <iframe
        src="https://v3d.net/pl1"
        title="logo"
        className="w-[80px] xl:w-[100px] h-[80px] xl:h-[100px] mt-[10px] xl:mt-0"
      /> */}
      {/* <SvgLogoText className={cn(s.logo)} /> */}
      <img
        src="assets/logo/logo.png"
        alt="logo"
        className="lg:min-w-[50px] lg:min-h-[50px] lg:w-[50px] w-[50px] h-[50px] min-h-[50px] object-cover"
        style={{
          borderRadius: "190px 190px",
          boxShadow: "0px 4px 120px 0px rgba(255, 227, 0, 0.70)",
        }}
      />

      <nav className={s.nav}>
        <div className={s.itemsWrapper}>
          {navLinks.map((link, index) => (
            <div
              className={cn(s.item, link.active && s.active)}
              key={index}
              onClick={() => {
                handleClick(link.label);
              }}
            >
              {link.label}
            </div>
          ))}
        </div>
      </nav>
      <div className="flex items-center text-center justify-center gap-6 xl:pt-0">
        {/* <div className={s.getButton}>Disclaimer</div> */}

        {/* <div className={s.connectButton}> */}
        <ConnectButton />
        {/* </div> */}
        {/* <Select
					value={language}
					onChange={handleChange}
					className={s.languageSelect}
				>
					<MenuItem
						value={'en'}
						className="flex gap-[4px] items-center"
						style={{ justifyContent: 'center' }}
					>
						English
						<SvgEnglish />
					</MenuItem>
					<MenuItem
						value={'fr'}
						className="flex gap-[4px] items-center"
						style={{ justifyContent: 'center' }}
					>
						Français
						<SvgFrench />
					</MenuItem>
				</Select> */}
      </div>

      <svg
        className="flex md:hidden w-[30px] h-[30px] fill-white"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        onClick={showNavBar}
      >
        <path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"></path>
      </svg>
      <div className={cn(s.mobileNav, !showNav && "hidden")}>
        {navLinks.map((link, index) => (
          <div
            className={cn(s.item, link.active && s.active)}
            key={index}
            onClick={() => {
              handleClick(link.label);
            }}
          >
            {link.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
