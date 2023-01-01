import { ethers } from "ethers";
import Krebit from "@krebitdao/reputation-passport";


export const issuerWalletInformation = async () => {
  const { ETHEREUM_SEED } = process.env;
  try {
    const ethProvider = Krebit.lib.ethereum.getProvider();
    console.log("ethProvider: ", ethProvider);
    // Create wallet from ethereum seed
    let wallet: ethers.Wallet;

    try {
      // Unlock/Decrypt local wallet
      const unlockedWallet = ethers.Wallet.fromMnemonic(ETHEREUM_SEED);
      console.log("unlockedWallet: ", unlockedWallet);
      // Connect wallet with provider for signing the transaction
      wallet = unlockedWallet.connect(ethProvider);
    } catch (error) {
      console.error("Failed to use local Wallet: ", error);
    }

    if (wallet && wallet.address) {
      const address = wallet.address;
      console.log("address: ", wallet.address);
      ethProvider.setWallet(wallet);

      return { ethProvider, address, wallet };
    }

    // return undefined;
  } catch (error) {
    throw new Error(error);
  }
};
