import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config = {
  solidity: "0.8.18",

  networks:{
    hardhat:{

    },
    
    goerli :{
      url:process.env.HTTP_URL,
      
      accounts:[process.env.PRIVATE_KEY]
    }
  },
};

export default config;
