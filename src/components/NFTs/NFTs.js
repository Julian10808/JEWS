import { SvgStakingRightArrow } from "assets/svg";
import s from "./NFTs.module.css";
import NFTItem from "./NFTItem";

const NFTS = () => {
  return (
    <div className={s.root} id={"nft_panel"}>
      <div className="text-[30px] md:text-[40px] text-[#FFE300] font-bold font-sefer">
        NFT’S
      </div>
      <div className="text-[14px] md:text-[18px] text-[#fff] font-bold mt-[10px]">
        Below are the first round of Jewcoin NFTs that you can mint. Supply is
        limited, so don’t wait to stake!
      </div>
      <SvgStakingRightArrow />
      <div className="flex-wrap flex items-center justify-center w-full gap-[30px] mt-[50px]">
        <div
          className="sm:w-[42%] lg:w-[22%] flex-col w-full items-center justify-center gap-[12px] rounded-[20px] bg-[#FFE300] p-[12px] "
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
          <NFTItem
            name="Yarmulke"
            images={[
              "assets/images/Yarmulke/1.jpg",
              "assets/images/Yarmulke/2.jpg",
              "assets/images/Yarmulke/3.jpg",
              "assets/images/Yarmulke/4.jpg",
              "assets/images/Yarmulke/5.jpg",
              "assets/images/Yarmulke/6.jpg",
              "assets/images/Yarmulke/7.jpg",
              "assets/images/Yarmulke/8.jpg",
              "assets/images/Yarmulke/9.jpg",
            ]}
            description={
              "A yarmulke, also known as a kippah, is a small, round skullcap worn by Jewish men as a symbol of their religious faith and reverence for God. It is typically worn during prayer or other religious ceremonies, and it signifies a sense of humility and acknowledgment of a higher power. In some Jewish traditions, wearing a yarmulke is a customary practice, while in others, it may be reserved for specific occasions or locations, such as a synagogue or during religious rituals. The style and size of yarmulkes can vary, but they are generally small and worn at the top of the head"
            }
            nftId={2311}
            supplyNft={"0 / 5000"}
            tokenAmount={50}
          />
        </div>
        <div
          className="sm:w-[42%] lg:w-[22%] flex-col w-full items-center justify-center gap-[12px] rounded-[20px] bg-[#FFE300] p-[12px]"
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
          <NFTItem
            name="Matzah"
            images={[
              "assets/images/Matzah/1.jpg",
              "assets/images/Matzah/2.jpg",
              "assets/images/Matzah/3.jpg",
              "assets/images/Matzah/4.jpg",
              "assets/images/Matzah/5.jpg",
              "assets/images/Matzah/6.jpg",
              "assets/images/Matzah/7.jpg",
            ]}
            description={
              "Matzah is unleavened flatbread that holds great significance in Jewish tradition, particularly during the festival of Passover (Pesach). Matzah is a central element of the Passover Seder, symbolizing the haste with which the Israelites left Egypt during the Exodus, as they did not have time for their bread to rise. Matzah is not only a symbol of historical events but also serves as a reminder of the Jewish people's journey from slavery to freedom. During Passover, it is a central element in the dietary observance of refraining from leavened products"
            }
            nftId={2321}
            supplyNft={"0 / 2500"}
            tokenAmount={60}
          />
        </div>
        <div
          className="sm:w-[42%] lg:w-[22%] flex-col w-full items-center justify-center gap-[12px] rounded-[20px] bg-[#FFE300] p-[12px]"
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
          <NFTItem
            name="Challah Bread"
            images={[
              "assets/images/Challah Bread/1.jpg",
              "assets/images/Challah Bread/2.jpg",
              "assets/images/Challah Bread/3.jpg",
              "assets/images/Challah Bread/4.jpg",
              "assets/images/Challah Bread/5.jpg",
              "assets/images/Challah Bread/6.jpg",
              "assets/images/Challah Bread/7.jpg",
              "assets/images/Challah Bread/8.jpg",
            ]}
            description={
              "Challah is a traditional Jewish bread that is typically eaten on the Sabbath and during Jewish holidays. It is a rich, sweet, and slightly eggy bread that holds cultural and religious significance in Jewish tradition. The braided shape of Challah is said to represent unity, love, and the intertwining of the Jewish people. Additionally, the sweetness of the bread symbolizes the sweetness of the Sabbath and other joyous occasions"
            }
            nftId={2301}
            supplyNft={"0 / 1200"}
            tokenAmount={75}
          />
        </div>
        <div
          className="sm:w-[42%] lg:w-[22%] flex-col w-full items-center justify-center gap-[12px] rounded-[20px] bg-[#FFE300] p-[12px]"
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
          <NFTItem
            name="Kiddish Cup"
            images={[
              "assets/images/Kiddish Cup/1.jpg",
              "assets/images/Kiddish Cup/2.jpg",
              "assets/images/Kiddish Cup/3.jpg",
              "assets/images/Kiddish Cup/4.jpg",
              "assets/images/Kiddish Cup/5.jpg",
              "assets/images/Kiddish Cup/6.jpg",
              "assets/images/Kiddish Cup/7.jpg",
              "assets/images/Kiddish Cup/8.jpg",
            ]}
            description={
              'A Kiddush cup is a ceremonial goblet used in Jewish religious rituals, particularly during the blessing over wine or grape juice. The term "Kiddush" refers to the sanctification or blessing recited on Shabbat (the Jewish Sabbath) and other Jewish holidays, marking the separation between the ordinary and the holy. During the Kiddush ceremony, the cup is filled with wine or grape juice, and the blessing is recited to sanctify the Sabbath or holiday. The head of the household or a designated individual then sips from the Kiddush cup, and often the contents are shared with others at the table'
            }
            nftId={2311}
            supplyNft={"0 / 600"}
            tokenAmount={100}
          />
        </div>

        <div
          className="sm:w-[42%] lg:w-[22%] flex-col w-full items-center justify-center gap-[12px] rounded-[20px] bg-[#FFE300] p-[12px]"
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
          <NFTItem
            name="Menorah"
            images={[
              "assets/images/Menorah/1.jpg",
              "assets/images/Menorah/2.jpg",
              "assets/images/Menorah/3.jpg",
              "assets/images/Menorah/4.jpg",
              "assets/images/Menorah/5.jpg",
              "assets/images/Menorah/6.jpg",
              "assets/images/Menorah/7.jpg",
              "assets/images/Menorah/8.jpg",
              "assets/images/Menorah/9.jpg",
              "assets/images/Menorah/10.jpg",
            ]}
            description={
              "A Menorah is a traditional Jewish candelabrum that holds a central significance in the celebration of Hanukkah, also known as the Festival of Lights. During each night of Hanukkah, an additional candle is lit, starting with one on the first night and progressing to eight on the final night. The lighting of the candles commemorates the miracle of the oil that burned for eight days in the ancient Temple in Jerusalem, even though there was only enough oil for one day"
            }
            nftId={2341}
            supplyNft={"0 / 500"}
            tokenAmount={150}
          />
        </div>

        <div
          className="sm:w-[42%] lg:w-[22%] flex-col w-full items-center justify-center gap-[12px] rounded-[20px] bg-[#FFE300] p-[12px]"
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
          <NFTItem
            name="Torah"
            images={[
              "assets/images/Torah/1.jpg",
              "assets/images/Torah/2.jpg",
              "assets/images/Torah/3.jpg",
              "assets/images/Torah/4.jpg",
            ]}
            description={
              "The Torah is the central and most important sacred text in Judaism. It refers to the first five books of the Hebrew Bible, also known as the Pentateuch or the Five Books of Moses. These books are Genesis, Exodus, Leviticus, Numbers, and Deuteronomy"
            }
            nftId={2341}
            supplyNft={"0 / 350"}
            tokenAmount={200}
          />
        </div>
        <div
          className="sm:w-[42%] lg:w-[22%] flex-col w-full items-center justify-center gap-[12px] rounded-[20px] bg-[#FFE300] p-[12px]"
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
          <NFTItem
            name="Dreidel"
            images={["assets/images/Dreidel/rotateDreidel.gif"]}
            description={
              "A Dreidel is a spinning top that is often played with during Hanukkah, a Jewish holiday. It has four sides, each with a Hebrew letter on it. Players take turns spinning the dreidel and depending on which letter it lands on, they either win or lose game pieces"
            }
            nftId={2341}
            supplyNft={"0 / 200"}
            tokenAmount={350}
          />
        </div>
        <div
          className="sm:w-[42%] lg:w-[22%] flex-col w-full items-center justify-center gap-[12px] rounded-[20px] bg-[#FFE300] p-[12px]"
          style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
        >
          <NFTItem
            name="Golden Foreskin"
            images={["assets/images/Golden Foreskin/rotateForeskin.gif"]}
            description={
              "Are you a non-Jew who had his foreskin stolen when he was a vulnerable infant? It's time you got it back. Are you a Jew who never had the option to voluntarily give up your foreskin to make the covenant with your g-d authentic? Mint this NFT and then burn it to make it a proper sacrifice"
            }
            nftId={2341}
            supplyNft={"0 / 10"}
            tokenAmount={250000}
          />
        </div>
      </div>
    </div>
  );
};

export default NFTS;
