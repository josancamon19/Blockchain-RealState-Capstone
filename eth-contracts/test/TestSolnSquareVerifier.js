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
        const {
            a,
            b,
            c
        } = Proof1.proof;
        try {
            await this.contract.mintNFT(2, a, b, c, Proof1.inputs);
        } catch (e) {
            console.log(e);
        }

    })
});