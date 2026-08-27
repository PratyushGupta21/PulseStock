// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/PlayMoney.sol";
import "../contracts/StockAMM.sol";

contract StockAMMTest is Test {
    PlayMoney public simUsd;
    StockAMM public amm;
    uint256 constant INITIAL_LIQUIDITY = 10_000 * 10 ** 18;

    event Trade(
        address indexed user,
        uint8 indexed stockId,
        bool isBuy,
        uint256 amountIn,
        uint256 amountOut,
        uint256 newPrice
    );

    function setUp() external {
        simUsd = new PlayMoney();
        amm = new StockAMM(address(simUsd), INITIAL_LIQUIDITY);
        simUsd.approve(address(amm), type(uint256).max);
    }

    function testClaimingFunds() external {
        simUsd.claimStarterFunds();
        uint256 balance = simUsd.balanceOf(address(this));
        assertEq(balance, 100_000 * 10 ** 18);
    }

    function testCannotClaimTwice() external {
        simUsd.claimStarterFunds();
        vm.expectRevert("Already claimed");
        simUsd.claimStarterFunds();
    }

    function testBuyingMovesPriceUp() external {
        simUsd.claimStarterFunds();

        uint256 priceBefore = amm.getPrice(0);

        amm.buy(0, 100 * 10 ** 18);

        uint256 priceAfter = amm.getPrice(0);
        assertGt(priceAfter, priceBefore);
    }

    function testUserSharesTracking() external {
        simUsd.claimStarterFunds();
        amm.buy(0, 100 * 10 ** 18);
        uint256 shares = amm.getUserShares(address(this), 0);
        assertGt(shares, 0);

        amm.sell(0, shares);
        uint256 sharesAfter = amm.getUserShares(address(this), 0);
        assertEq(sharesAfter, 0);
    }

    function testSellRevertsWithInsufficientUserShares() external {
        simUsd.claimStarterFunds();
        vm.expectRevert("Insufficient share balance");
        amm.sell(0, 10 * 10 ** 18);
    }

    function testSellingMovesPriceDown() external {
        simUsd.claimStarterFunds();

        amm.buy(0, 100 * 10 ** 18);
        uint256 sharesBought = amm.getUserShares(address(this), 0);

        uint256 priceBefore = amm.getPrice(0);

        amm.sell(0, sharesBought / 2);

        uint256 priceAfter = amm.getPrice(0);
        assertLt(priceAfter, priceBefore);
    }

    function testGetPriceReturnsCorrectValue() external {
        uint256 price = amm.getPrice(0);
        assertEq(price, 10 ** 18);
    }

    function testInvalidStockIdReverts() external {
        vm.expectRevert("Invalid stock");
        amm.getPrice(5);
    }

    function testBuyWithZeroAmountReverts() external {
        simUsd.claimStarterFunds();
        vm.expectRevert("Zero amount");
        amm.buy(0, 0);
    }

    function testSellWithZeroAmountReverts() external {
        vm.expectRevert("Zero amount");
        amm.sell(0, 0);
    }

    function testMultipleStocksIndependent() external {
        simUsd.claimStarterFunds();

        amm.buy(0, 100 * 10 ** 18);
        amm.buy(1, 100 * 10 ** 18);

        uint256 price0 = amm.getPrice(0);
        uint256 price1 = amm.getPrice(1);

        assertGt(price0, 10 ** 18);
        assertGt(price1, 10 ** 18);
    }

    function testTradeEventEmittedOnBuy() external {
        simUsd.claimStarterFunds();

        vm.expectEmit(true, true, false, false);
        emit Trade(address(this), 0, true, 0, 0, 0);
        amm.buy(0, 100 * 10 ** 18);
    }

    function testTradeEventEmittedOnSell() external {
        simUsd.claimStarterFunds();

        amm.buy(0, 100 * 10 ** 18);
        uint256 sharesBought = amm.getUserShares(address(this), 0);

        vm.expectEmit(true, true, false, false);
        emit Trade(address(this), 0, false, 0, 0, 0);
        amm.sell(0, sharesBought / 2);
    }
}