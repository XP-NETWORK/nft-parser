import axios from "axios";
import express from 'express';
import cors from "cors";
import * as evm from "./factory";
import { algorandParser } from "./factory/algorand";
import * as elrd from "./factory/elrond";
import * as tezos from "./factory/tezos";
import * as veChain from "./factory/veChain";
import * as fantom from "./factory/fantom";
import * as aurora from "./factory/auora";
import * as secret from "./factory/secret";
import { elrondParser } from "./factory/elrond";
import { tronParser } from "./factory/tron";
import { Minter__factory, UserNftMinter__factory } from "xpnet-web3-contracts";
import Evm from "../tools/evm";
import { ChainFactoryConfigs, ChainFactory, AppConfigs } from "xp.network";

var isNode = false;
if (typeof process === "object") {
    if (typeof process.versions === "object") {
        if (typeof process.versions.node !== "undefined") {
            isNode = true;
        }
    }
}

const app = express();
const port = 3000;

app.use(express.json({ limit: 100000000 }));
app.use(express.urlencoded({ limit: 100000000, extended: true, parameterLimit: 100000000 }));
app.use(cors({ credentials: true, origin: true }));

export const proxy = isNode ? "" : "https://sheltered-crag-76748.herokuapp.com/";
export const apenftKey = "rV9UjZwMSK4zqkKEWOUnUXXY2zNgPJ8i";
export const apenftSign = "7c9caa14981ff714f92fe16322bcf13803cd3c0d219ef008eb0e5ebf352814ca.7625.1663231473";

axios.defaults.timeout = isNode ? 3000 : axios.defaults.timeout;
axios.interceptors.request.use(
    function (config) { return config; },
    function (error: any) {
        if (error.code === "ECONNABORTED") {
            return Promise.reject("parse timeout");
        }
        return Promise.reject(error);
    }
);

interface ParsedNFT {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract?: string;
    collectionIdent: string;
    native: any;
    wrapped?: any;
    errorStatus?: number;
    metaData: {
        image: string;
        imageFormat: string;
        animation_url?: string;
        animation_url_format?: string;
        name?: string;
        symbol?: string;
        attributes?: any;
        description?: string;
        contractType?: string;
    };
}

interface NFT {
    uri: string;
    native: {
        tokenId: string;
        chainId: string;
        contract: string | undefined;
        [x: string]: any;
    };
    collectionIdent: string;
    [x: string]: any;
}

const evmHelper = Evm();

export const nftGeneralParser = async (
    nft: NFT,
    account: string,
    whitelisted: boolean,
    factory?: any
): Promise<ParsedNFT> => {

    const {
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;

    evmHelper.init(factory);

    let parsed;
    switch (chainId) {
        case "4":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "6":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "7":
            parsed = await evmParser(
                collectionIdent,
                nft,
                account,
                whitelisted,
                chainId
            );
            break;
        case "8":
            parsed = await fantom.fantomParser(
                collectionIdent,
                nft,
                account,
                whitelisted
            );
            break;
        case "12":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "14":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "16":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "19":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "20":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "21":
            parsed = await aurora.auroraParser(
                collectionIdent,
                nft,
                account,
                whitelisted
            );
            break;
        case "23":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "5":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "25":
            parsed = await veChain.veChainParser(
                collectionIdent,
                nft,
                account,
                whitelisted
            );
            break;
        case "2":
            parsed = await elrondParser(collectionIdent, nft, account, whitelisted);
            break;
        case "15":
            parsed = await algorandParser(collectionIdent, nft, account, whitelisted);
            break;
        case "9":
            parsed = await tronParser(collectionIdent, nft, account, whitelisted);
            break;
        case "18":
            parsed = await tezos.tezosParser(
                collectionIdent,
                nft,
                account,
                whitelisted
            );
            break;
        case "24":
            parsed = await secret.secretParser(
                collectionIdent,
                nft,
                account,
                whitelisted
            );
        case "30":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "33":
            parsed = await evmParser(collectionIdent, nft, account, whitelisted);
            break;
        default:
            return await evmParser(collectionIdent, nft, account, whitelisted);
    }
    return parsed;
};

export * from "../tools/helpers";

const evmParser = async (
    collectionIdent: string,
    nft: any,
    account: string,
    whitelisted: boolean,
    chainId?: string
) => {
    let parsed;
    if (!nft.uri || nft.uri === 'Invalid uri' || nft.uri === '' || nft.uri === 'MrHamm') {
        const mainnetConfig = await ChainFactoryConfigs.MainNet();
        const mainnetFactory = ChainFactory(AppConfigs.MainNet(), mainnetConfig);
        await evmHelper.init(mainnetFactory);
        nft = await evmHelper.getUri(nft, collectionIdent);
    }
    parsed = await evm.Default(nft, account, whitelisted);
    return parsed;
};

app.listen(port, async () => {
    app.post('/nft', async (req: any, res: any) => {
        try {
            const { nft } = req.body
            for (let item of nft) {
                await nftGeneralParser(item, "", true)
            }
            res.status(400);
        } catch (err: any) {
            console.log(err.message);
            res.status(400);
        }
    });
    return console.log(`Express is listening at http://localhost:${port}`);
});
