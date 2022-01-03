var SolnSquareVerifier = artifacts.require('./SolnSquareVerifier');
var Verifier = artifacts.require('./Verifier');
var Proof1 = require('../../zokrates/proof.json');

contract('SolnSquareVerifier', accounts => {
    beforeEach(async () => {
        this.verifier = await Verifier.new();
        this.contract = await SolnSquareVerifier.new(this.verifier.address);
    });

    it('a new solution can be added for contract', async () => {
        await this.contract.addSolution(accounts[0], 1);
        let events = await this.contract.getPastEvents('SolutionAdded');
        assert.equal(events.length, 1);
    })

    it('an ERC721 token can be minted for contract', async () => {
        const tokenId = 1902;
        await this.contract.mintNFT(tokenId, Proof1.proof, Proof1.inputs);
        let data = (await this.contract.getPastEvents('Transfer'))[0].returnValues;
        let totalSupply = await this.contract.totalSupply();

        assert.equal(data.tokenId, tokenId.toString());
        assert.equal(data.to, accounts[0]);
        assert.equal(totalSupply, 1);
    })
});