export interface NFT {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract: string;
    collectionIdent: string;
    native: any;
    wrapped?: any;
    forceCache?: boolean;
    metaData: {
        whitelisted: boolean;
        image: string;
        imageFormat: string;
        animation_url?: string;
        animation_url_format?: string;
        name?: string;
        symbol?: string;
        attributes?: any;
        description?: string;
        contractType?: string;
        collectionName?: string;
    };
}
export declare const setupURI: (uri: string) => string;
export declare const Default: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const ART_NFT_MATIC: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const EtherHead: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const AngelOfAether: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Legend: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const AlphaBettyDoodle: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Mabstronauts: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const RocketMonsters: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const TheBlackMagic: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const CartelPunks: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const TreatNFT: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const IdoDirt: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Awokensages: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Technomaniacs: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const ArcadeEdition: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Founders_Cabinet: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const TTAV: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const BoredGUtterCats: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const IDoDirtPolygon: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const ArsenalGame: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Mate: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const CoolPig: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const ABCBears: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const TragicMonsters: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const SuperFatAcademy: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const ForgottenRunesComic: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const LilDickie: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const TheCheeks: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const InterestingCPeople: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Nagato: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const OpenSEA: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const ChainCaders: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const OPENSTORE: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const COZYCOSM: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const DirtyLife: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const MachineFi: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const TRSRNFT: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const WUBI: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const PACK: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const VelasOgPunks: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const Drifters: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const Weed: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const Cities: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const Mountains: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const WrappedXPNET: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
export declare const abeyChainUserMinter: (nft: any, account: string, whitelisted: boolean) => Promise<any>;
