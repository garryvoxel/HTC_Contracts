const { expect } = require("chai");
const { ethers } = require("hardhat");
const { sign } = require("./EIP712");

let HTC, HATMAN;
//marketingWallet: account2
//teamWallet: account3  ,   _depositPoolWallet
//NFTHatSwap: account4  ,   _withdrawPoolWallet
//poolWallet: account5  ,   _rewardPoolWallet
//user1: account6
//user2: account7
describe("Play2Earn Tests", function() {
  this.beforeEach(async function() {
    [account1, account2, account3, account4, account5, account6, account7] = await ethers.getSigners();

    const hatcoin = await ethers.getContractFactory("HatCoin");
    HTC = await hatcoin.deploy(account2.address, account3.address, account4.address, account5.address);
    await HTC.deployed();

    const hatman = await ethers.getContractFactory("Hatman");
    HATMAN = await hatman.deploy(
      HTC.address,
      account1.address,
      account3.address,
      account7.address
    );
    await HATMAN.deployed();

    console.log("HATMAN deployed:", HATMAN.address);
  })

  it("Withdraw", async function() {
    [account1, account2, account3, account4, account5, account6, account7] = await ethers.getSigners();   

//    await HTC.connect(account1).transfer(account4.address, 20000000000);
    await HTC.connect(account1).transfer(account7.address, 20000000000);
    await HTC.connect(account7).approve(HATMAN.address, 20000000000);

        const domain = {
          name: 'Hatman',
          version: '1',
          chainId: 31337,
          verifyingContract: '0x94f22206e0FD145f91DFF52f564Ef5B920095B40'
        };

        const types = {
          Hatman: [
              {name: "account", type: "address"},  
              {name: "amount", type: "uint256"},
              {name: "credit", type: "uint256"},
              {name: "nonce", type: "uint256"},
              {name: "deadline", type: "uint256"},
            ]
       };

       const value = {
          account: account6.address,
          amount: 10000000,
          credit: 70000000,
          nonce: 0,
          deadline: 1665499796 
      };       
      
      signature = await account1._signTypedData(domain, types, value);
      const { r, s, v } = ethers.utils.splitSignature(signature);
      
      await HATMAN.connect(account6).withdraw(10000000, 70000000, 1665499796, v, r, s);
  })

  it("Deposit", async function() {
    [account1, account2, account3, account4, account5, account6, account7] = await ethers.getSigners();   

    await HTC.connect(account1).transfer(account6.address, 20000000000);
    await HTC.connect(account6).approve(HATMAN.address, 20000000000);

      const domain = {
        name: 'Hatman',
        version: '1',
        chainId: 31337,
        verifyingContract: '0x94f22206e0FD145f91DFF52f564Ef5B920095B40'
      };

     
     const types = {
        Hatman: [
            {name: "account", type: "address"},  
            {name: "amount", type: "uint256"},
            {name: "credit", type: "uint256"},
            {name: "nonce", type: "uint256"},
            {name: "deadline", type: "uint256"},
          ]
     };

     const value = {
        account: account6.address,
        amount: 20000000,
        credit: 0,
        nonce: 0,
        deadline: 1665499796 
     };
      signature = await account1._signTypedData(domain, types, value);
      const { r, s, v } = ethers.utils.splitSignature(signature);
      console.log("value==>", value, r, s, v);
      await HATMAN.connect(account6).deposit(20000000, 1665499796, v, r, s);
  })
})

