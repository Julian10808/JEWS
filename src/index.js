// import React, { StrictMode } from "react";
// import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
 import {base } from "wagmi/chains";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";

// import { PhantomConnector } from "phantom-wagmi-connector";
// import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "@rainbow-me/rainbowkit/styles.css";
// import { infuraProvider } from "@wagmi/core/providers/infura";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base],
  [
    // infuraProvider({ apiKey: "6ed11913153a4847abaec3a4df8a42b5" }),
     publicProvider(),
  ]
  // [
  //   // alchemyProvider({ apiKey: 'ZbcJUctTzRg0qySTHx0jmolpmxP-5V3g' }),
  //   publicProvider(),
  // ],
  // [
  //   jsonRpcProvider({
  //     rpc: (chain) => ({
  //       https: `https://goerli.infura.io/v3/6ed11913153a4847abaec3a4df8a42b5`,
  //     }),
  //   }),
  // ]
);
const { connectors } = getDefaultWallets({
  appName: "Jewcoin",
  projectId: "9e4d7cc888739a5a23e607a0a005c0e5",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
  // connectors: [new PhantomConnector({ chains })],
});

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   // <React.StrictMode>

//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
//   // </React.StrictMode>
// );
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={midnightTheme({
          accentColor: "#ffe300",
          accentColorForeground: "white",
          borderRadius: "medium",
        })}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </BrowserRouter>
  // </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
