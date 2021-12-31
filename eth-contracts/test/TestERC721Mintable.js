var UdacityRealStateItem = artifacts.require('UdacityRealStateItem');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await UdacityRealStateItem.new({
                from: account_one
            });
            await this.contract.mint(account_one, 1);
            await this.contract.mint(account_one, 2);
            await this.contract.mint(account_two, 3);
            // minting multiple tokens
        })

        it('should return total supply', async function () {
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, 3)
        })

        it('should get token balance', async function () {
            let account1Balance = await this.contract.balanceOf(account_one);
            assert.equal(account1Balance, 2);
        })

        // Used a different append way (CURRENT ERC721 by openzeppelin so can't validate this way).
        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let tokenUri = await this.contract.tokenURI(1);
            assert(tokenUri.includes("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"));
        })

        it('should transfer token from one owner to another', async function () {
            await this.contract.transferFrom(account_one, account_two, 1);

            assert.equal((await this.contract.balanceOf(account_one)), 1);
            assert.equal((await this.contract.balanceOf(account_two)), 2);

            assert.equal((await this.contract.ownerOf(1)), account_two);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await UdacityRealStateItem.new({
                from: account_one
            });
        })

        it('should fail when minting when address is not contract owner', async function () {
            var failureReason;
            try {
                await this.contract.mint(account_two, 4, {
                    from: account_two
                });
            } catch (e) {
                failureReason = e.reason;
            }

            assert.equal(failureReason, 'Ownable: caller is not the owner');
        })

        it('should return contract owner', async function () {
            assert.equal((await this.contract.owner()), account_one);
        })

    });
})