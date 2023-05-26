import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("StandardMerkleTree", function () {

  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const StandardMerkleTree = await ethers.getContractFactory("StandardMerkleTree");
    const standardMerkleTree = await StandardMerkleTree.deploy();

    return { standardMerkleTree,  owner, otherAccount };
  }

  describe("Merkle Tree", function () {

    it("verify", async function () {

      const { standardMerkleTree } = await loadFixture(deployFixture);

      const account = "0x1111111111111111111111111111111111111111";
      const amount = "5000000000000000000";
      const root = "0xcef9852531f2476330b76131d5de322f616540e5668b46383dd26f96c50d8861";
      const proof = [
        "0xb92c48e9d7abe27fd8dfd6b5dfdbfb1c9a463f80c712b66f3a5180a090cccafc",
        "0x8610c4ddba34d72ee1dabba4f1a813087579d4c6579c495c101530432969efa7"
      ];

      expect(await standardMerkleTree.verify(proof,root,account,amount)).to.equal(true);
    });

    it("verifyMultiProof", async function () {
      const { standardMerkleTree } = await loadFixture(deployFixture);

      const proof = [
        "0x8610c4ddba34d72ee1dabba4f1a813087579d4c6579c495c101530432969efa7",
      ];
      
      const proofFlags = [true, false];

      const root = "0xcef9852531f2476330b76131d5de322f616540e5668b46383dd26f96c50d8861";

      const accounts = [
        "0x1111111111111111111111111111111111111111",
        "0x2222222222222222222222222222222222222222"
      ];

      const amounts = [
        "5000000000000000000",
        "2500000000000000000"
      ];

      expect(await standardMerkleTree.multiProofVerify(proof, proofFlags ,root, accounts, amounts)).to.equal(true);
    });

  });
});
