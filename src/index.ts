import axios from "axios";
import * as evm from "./factory";
import { algorandParser } from "./factory/algorand";
import * as elrd from "./factory/elrond";
import * as tezos from "./factory/tezos";
import * as veChain from "./factory/veChain";
import * as fantom from "./factory/fantom";
import * as aurora from "./factory/auora";
import * as secret from "./factory/secret";
import { tronParser } from "./factory/tron";
import { Minter__factory, UserNftMinter__factory } from "xpnet-web3-contracts";
import Evm from "../tools/evm";

interface ParsedNFT {
  chainId: string;
  tokenId: string;
  owner: string;
  uri: string;
  contract?: string;
  collectionIdent: string;
  native: any;
  wrapped?: any;
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

const evmHelper = Evm();

export const nftGeneralParser = async (
  nft: any,
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
      break;
    default:
      return nft;
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

  if (!nft.uri) {
    nft = await evmHelper.getUri(nft, collectionIdent);
  }

  switch (collectionIdent) {
    case "0x0271c6853d4b2bdccd53aaf9edb66993e14d4cba":
      parsed = await evm.ART_NFT_MATIC(nft, account, whitelisted);
      break;
    case "0x4508af04de4073b10a53ac416eb311f4a2ab9569":
      parsed = await evm.ART_NFT_MATIC(nft, account, whitelisted);
      break;
    case "0xa8a079ea48dc846899bdb542f3728dbc6758fdfa":
      parsed = await evm.EtherHead(nft, account, whitelisted);
      break;
    case "0x6e1ecc59f4005d0f2707ab7a0a8cecbaba41c11e":
      parsed = await evm.AngelOfAether(nft, account, whitelisted);
      break;
    case "0xe5b3903ffb3a00e91c75e25a4bd6616d3171e45e":
      parsed = await evm.Legend(nft, account, whitelisted);
      break;
    case "0xee6d7e31ea2095df9b2f89ec15111d3de5cd39af":
      parsed = await evm.AlphaBettyDoodle(nft, account, whitelisted);
      break;
    case "0x65f1A1D6E65fb43672BD936858D69b88C0D2059e":
      parsed = await evm.Mabstronauts(nft, account, whitelisted);
      break;
    case "0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe":
      parsed = await evm.RocketMonsters(nft, account, whitelisted);
      break;
    case "0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A":
      parsed = await evm.TheBlackMagic(nft, account, whitelisted);
      break;
    case "0x4c1900270dbf0c1e6a9c984aef9a18a7cb9ab1cc":
      parsed = await evm.CartelPunks(nft, account, whitelisted);
      break;
    case "0x36f8f51f65fe200311f709b797baf4e193dd0b0d":
      parsed = await evm.TreatNFT(nft, account, whitelisted);
      break;

    case "0x2C83EAf6E460C673d92477a7c49eb4ECd04e1216":
      parsed = await evm.DirtyLife(nft, account, whitelisted);
      break;
    case "0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216":
      parsed = await evm.IdoDirt(nft, account, whitelisted);
      break;
    case "0x691bd0f2f5a145fcf297cf4be79095b66f002cbc":
      parsed = await evm.Awokensages(nft, account, whitelisted);
      break;
    case "0x7f3495cf2d05db6e9e52cdf989bced71e786725c":
      parsed = await evm.Technomaniacs(nft, account, whitelisted);
      break;
    case "0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb":
      parsed = await evm.ArcadeEdition(nft, account, whitelisted);
      break;
    case "0x56d93767467c54bd86578666904087c4f16cdb7f":
      parsed = await evm.Founders_Cabinet(nft, account, whitelisted);
      break;
    case "0x2d317ed6c2e3eb5c54ca7518ef19deee96c15c85":
      parsed = await evm.TTAV(nft, account, whitelisted);
      break;
    case "0x7a7ca3b27760b52428d7a9d0a9f369ff31a2de94":
      parsed = await evm.BoredGUtterCats(nft, account, whitelisted);
      break;
    case "0x2feee2cc7fb32bd48ab22080e2c680f5390ef426":
      parsed = await evm.IDoDirtPolygon(nft, account, whitelisted);
      break;
    case "0x2953399124f0cbb46d2cbacd8a89cf0599974963":
      parsed = chainId
        ? await evm.OPENSTORE(nft, account, whitelisted)
        : await evm.ArsenalGame(nft, account, whitelisted);
      break;
    case "0xc69ecd37122a9b5fd7e62bc229d478bb83063c9d":
      parsed = await evm.Mate(nft, account, whitelisted);
      break;
    case "0x8eaeaa3a67abfc7c141775234fc30c707e26cf49":
      parsed = await evm.ABCBears(nft, account, whitelisted);
      break;
    case "0x51ecb52ebb85384679b108a9e6a017ae17754eef":
      parsed = await evm.TragicMonsters(nft, account, whitelisted);
      break;
    case "0xbede8ad4878e5ce441accce6a828ea7bc5be1ed0":
      parsed = await evm.SuperFatAcademy(nft, account, whitelisted);
      break;
    case "0xb94c3fd0016888bab09dbc229f9397294e828a54":
      parsed = await evm.ForgottenRunesComic(nft, account, whitelisted);
      break;
    case "0xd4c77e46b0266a7aca11083bcc86342f47bbdd04":
      parsed = await evm.LilDickie(nft, account, whitelisted);
      break;
    case "0x9304f22a5ab577119210d730e41755a6732e19f7":
      parsed = await evm.TheCheeks(nft, account, whitelisted);
      break;
    case "0x817c63be246dcfb5f218091baa581949b6796bdb":
      parsed = await evm.Nagato(nft, account, whitelisted);
      break;
    case "0x495f947276749ce646f68ac8c248420045cb7b5e":
      parsed = await evm.OpenSEA(nft, account, whitelisted);
      break;
    case "0x0c5ab026d74c451376a4798342a685a0e99a5bee":
      parsed = await evm.MachineFi(nft, account, whitelisted);
      break;
    case "0xc254a8d4ef5f825fd31561bdc69551ed2b8db134":
      parsed = await evm.WrappedXPNET(nft, account, whitelisted);
      break;

    case "0xca4f6b3f9e45e2484913bcc46667f1bb6db72906":
      parsed = await evm.TRSRNFT(nft, account, whitelisted);
      break;
    case "0xeA380Be04a398d93030E4Bff15cBC87f6B35b5ae":
      parsed = await evm.WUBI(nft, account, whitelisted);
      break;

    case "0xeA380Be04a398d93030E4Bff15cBC87f6B35b5ae":
      parsed = await evm.PACK(nft, account, whitelisted);
      break;

    case "0x32319834d90323127988E4e2DC7b2162d4262904": //fuze
      parsed = await evm.COZYCOSM(nft, account, whitelisted);
      break;

    case "0xb73cc6d7a621e0e220b369c319dbfac258cef4d2": //veals OGPUNKS
      parsed = await evm.VelasOgPunks(nft, account, whitelisted);
      break;

    case "0x868c047be897e30e8e5e7e2feeef4ae95cb28796": //veals OGPUNKS
      parsed = await evm.Cities(nft, account, whitelisted);
      break;

    case "0xe38400150bde0f8efdda9f3a11f89c8a1660fa84": //veals OGPUNKS
      parsed = await evm.Mountains(nft, account, whitelisted);
      break;

    case "0x387d38eeaaa7f1235c00ae6ee9b1462c026007f4": //veals OGPUNKS
      parsed = await evm.ChainCaders(nft, account, whitelisted);
      break;

    //0x387d38eeaaa7f1235c00ae6ee9b1462c026007f4

    default:
      parsed = await evm.Default(nft, account, whitelisted);
      break;
  }

  return parsed;
};

const elrondParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean
) => {
  let parsed;
  switch (collectionIdent) {
    case "AERMES-ac9886": {
      parsed = await elrd.AERMES(nft, account, whitelisted);
      break;
    }
    case "DRIFTERS-efd96c": {
      parsed = await elrd.DRIFTERS(nft, account, whitelisted);
      break;
    }

    case "NIFTYREX-d8c812": {
      parsed = await elrd.DRIFTERS(nft, account, whitelisted);
      break;
    }

    case "INNOVATOR-fca3a7": {
      parsed = await elrd.INNOVATOR(nft, account, whitelisted);
      break;
    }

    case "CGPASS-73ac68": {
      parsed = await elrd.MEDUSA(nft, account, whitelisted);
      break;
    }

    case "ORC-ef544d": {
      parsed = await elrd.ORC(nft, account, whitelisted);
      break;
    }

    case "STRAYCATS-b079a7": {
      parsed = await elrd.WrappedXPNET(nft, account, whitelisted);
      break;
    }

    case "PMONC-4032bc": {
      parsed = await elrd.WrappedXPNET(nft, account, whitelisted);
      break;
    }

    case "TAKANNE-3db244": {
      parsed = await elrd.APOPHIS(nft, account, whitelisted);
      break;
    }

    case "KINGSGUARD-8e5d07": {
      parsed = await elrd.KINGSGUARD(nft, account, whitelisted);
      break;
    }

    case "ALIEN-a499ab": {
      parsed = await elrd.ALIEN(nft, account, whitelisted);
      break;
    }

    default:
      parsed = await elrd.Default(nft, account, whitelisted);
      break;
  }
  return parsed;
};
