"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var contractkit_1 = require("@celo/contractkit");
var wallet_ledger_1 = require("@celo/wallet-ledger");
var hw_app_eth_1 = require("@ledgerhq/hw-app-eth");
var hw_transport_u2f_1 = require("@ledgerhq/hw-transport-u2f");
var hw_transport_webusb_1 = require("@ledgerhq/hw-transport-webusb");
var web3_1 = require("web3");
// Handle getting the Celo Ledger transport.
var getCeloLedgerTransport = function () {
    if (window.USB) {
        return hw_transport_webusb_1["default"].create();
    }
    else if (window.u2f) {
        return hw_transport_u2f_1["default"].create();
    }
    throw new Error("Ledger Transport not support, please use Chrome, Firefox, Brave, Opera or Edge.");
};
// Handle creating a new Celo ContractKit
var getContractKit = function () { return __awaiter(void 0, void 0, void 0, function () {
    var web3, transport, eth, wallet, kit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                web3 = new web3_1["default"]("https://alfajores-forno.celo-testnet.org");
                return [4 /*yield*/, getCeloLedgerTransport()];
            case 1:
                transport = _a.sent();
                eth = new hw_app_eth_1["default"](transport);
                return [4 /*yield*/, wallet_ledger_1.newLedgerWalletWithSetup(eth.transport)];
            case 2:
                wallet = _a.sent();
                kit = contractkit_1.newKitFromWeb3(web3, wallet);
                return [2 /*return*/, kit];
        }
    });
}); };
// Use the gold token contract to transfer tokens
var transfer = function (from, to, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var goldTokenContract, tx, receipt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, kit.contracts.getGoldToken()];
            case 1:
                goldTokenContract = _a.sent();
                return [4 /*yield*/, goldTokenContract.transfer(to, amount).send({ from: from })];
            case 2:
                tx = _a.sent();
                return [4 /*yield*/, tx.waitReceipt()];
            case 3:
                receipt = _a.sent();
                console.log("Transaction Receipt: ", receipt);
                return [2 /*return*/];
        }
    });
}); };
