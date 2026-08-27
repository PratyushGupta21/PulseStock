// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StockAMM is Ownable {
    using SafeERC20 for IERC20;

    enum Stock { MNDX, CHAI, VIBE, GRIT, TECH }

    string[5] public TICKERS;

    uint256[5] public cashReserve;
    uint256[5] public shareReserve;

    mapping(address => mapping(uint8 => uint256)) public userShares;

    IERC20 public immutable playMoney;

    event Trade(
        address indexed user,
        uint8 indexed stockId,
        bool isBuy,
        uint256 amountIn,
        uint256 amountOut,
        uint256 newPrice
    );

    constructor(address _playMoney, uint256 initialLiquidity) Ownable(msg.sender) {
        playMoney = IERC20(_playMoney);
        TICKERS[0] = "MNDX";
        TICKERS[1] = "CHAI";
        TICKERS[2] = "VIBE";
        TICKERS[3] = "GRIT";
        TICKERS[4] = "TECH";
        for (uint8 i = 0; i < 5; i++) {
            cashReserve[i] = initialLiquidity;
            shareReserve[i] = initialLiquidity;
        }
    }

    function buy(uint8 stockId, uint256 cashAmount) external {
        require(cashAmount > 0, "Zero amount");
        require(stockId < 5, "Invalid stock");

        uint256 sharesOut = (shareReserve[stockId] * cashAmount) / (cashReserve[stockId] + cashAmount);
        require(sharesOut > 0, "No shares received");
        require(sharesOut <= shareReserve[stockId], "Insufficient liquidity");

        playMoney.safeTransferFrom(msg.sender, address(this), cashAmount);

        cashReserve[stockId] += cashAmount;
        shareReserve[stockId] -= sharesOut;
        userShares[msg.sender][stockId] += sharesOut;

        uint256 newPrice = getPrice(stockId);

        emit Trade(msg.sender, stockId, true, cashAmount, sharesOut, newPrice);
    }

    function sell(uint8 stockId, uint256 shareAmount) external {
        require(shareAmount > 0, "Zero amount");
        require(stockId < 5, "Invalid stock");
        require(userShares[msg.sender][stockId] >= shareAmount, "Insufficient share balance");
        require(shareAmount <= shareReserve[stockId], "Insufficient shares in reserve");

        uint256 cashOut = (cashReserve[stockId] * shareAmount) / (shareReserve[stockId] + shareAmount);
        require(cashOut > 0, "No cash received");
        require(cashOut <= cashReserve[stockId], "Insufficient liquidity");

        userShares[msg.sender][stockId] -= shareAmount;
        shareReserve[stockId] += shareAmount;
        cashReserve[stockId] -= cashOut;

        playMoney.safeTransfer(msg.sender, cashOut);

        uint256 newPrice = getPrice(stockId);

        emit Trade(msg.sender, stockId, false, shareAmount, cashOut, newPrice);
    }

    function getUserShares(address user, uint8 stockId) external view returns (uint256) {
        require(stockId < 5, "Invalid stock");
        return userShares[user][stockId];
    }

    function getPrice(uint8 stockId) public view returns (uint256) {
        require(stockId < 5, "Invalid stock");
        if (shareReserve[stockId] == 0) return 0;
        return (cashReserve[stockId] * 10 ** 18) / shareReserve[stockId];
    }

    function getTicker(uint8 stockId) external view returns (string memory) {
        require(stockId < 5, "Invalid stock");
        return TICKERS[stockId];
    }
}