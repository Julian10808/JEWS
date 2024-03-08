import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const NFTItem = ({
  name,
  images,
  description,
  nftId,
  supplyNft,
  tokenAmount,
}) => {
  const [curr, setCurr] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const prev = () => {
    setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
    console.log(curr, "prev");
  };

  const next = () => {
    setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));
    console.log(curr, "next");
  };

  return (
    <div
      className="flex flex-col w-full items-center justify-center gap-[12px]"
      style={{ boxShadow: "4px 3px 13px 0px #FFE300" }}
    >
      <div className="overflow-hidden relative w-full">
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
              src={e}
              alt="cartoon nft"
              className="rounded-[20px] w-full"
              style={{ boxShadow: "4px 3px 13px 0px 0px rgba(0, 0, 0, 0.25)" }}
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

      <div
        className="relative flex flex-col w-full rounded-[10px] bg-[#7659AD] px-[14px] py-[8px]"
        style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="w-full flex items-center justify-between">
          <div className="text-[16px] text-[#FFE300] font-bold">{name}</div>
        </div>
        <div>
          <div
            className="text-sm"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </div>
          <span
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            className="text-underline cursor-pointer	flex justify-end"
          >
            See More
            <ExpandMoreOutlinedIcon />
          </span>
          <div className="group flex justify-end relative">
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              className="w-inherit"
            >
              <Typography sx={{ p: 2 }}>{description}.</Typography>
            </Popover>
            {/* <span className="rounded-[10px] bg-white text-[#000000] px-2 text-sm shadow-sm">
            i
          </span>
          <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-[1]">
            {description}
          </span> */}
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="text-[12px] text-[#fff] font-bold">Supply Minted</div>
          <div className="text-[12px] text-[#fff] font-bold"> {supplyNft}</div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="text-[12px] text-[#fff] font-bold">
            Shekel Required
          </div>
          <div className="text-[12px] text-[#fff] font-bold">
            {tokenAmount.toLocaleString()} Shekel
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTItem;
