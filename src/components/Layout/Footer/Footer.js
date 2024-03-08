import s from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={s.root} id="contact_panel">
      <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-1/3 mt-6 lg:mt-0">
        <div className="text-[30px] sm:text-[40px] text-[#FFE300] font-bold font-sefer">
          Twitter
        </div>
        <img
          src="/assets/images/twitterIcon.jpg"
          className="w-full h-full sm:w-[70%] md:w-[60%] lg:w-[300px] lg:h-[300px]"
          alt="twitter"
        />
        <div className="text-[24px] sm:text-[28px]font-bold text-blue-500 underline ">
          <a href="https://twitter.com/@savethejewcoins">@savethejewcoins</a>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-1/3 mt-6 lg:mt-0">
        <div className="text-[30px] sm:text-[40px] text-[#FFE300] font-bold font-sefer">
          Telegram
        </div>
        <img
          src="/assets/images/telIcon.png"
          className="w-full sm:w-[70%] md:w-[60%] lg:w-[250px] h-full lg:h-[300px]"
          alt="Telegram"
        />
        <div className="text-[24px] sm:text-[28px] font-bold text-blue-500 underline">
          <a href="https://t.me/Save_The_Jewcoins">@SAVE_THE_JEWCOINS</a>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-1/3 mt-6 lg:mt-0">
        <div className="text-[30px] sm:text-[40px] text-[#FFE300] font-bold font-sefer">
          Email
        </div>
        <img
          src="/assets/images/mailIcon.png"
          className="w-[300px] h-[300px] p-[30px]"
          alt="Email"
        />

        <div className="text-[24px] sm:text-[28px]font-bold text-center text-blue-500 underline">
          savethejewcoins
          <br />
          @protonmail.com
        </div>
      </div>
    </div>
  );
};

export default Footer;
