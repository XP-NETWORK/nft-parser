export declare const veChainParser: (collectionIdent: string, nft: any, account: string, whitelisted: boolean, chainId?: string) => Promise<any>;
/**
 *
 * {
    "query": "\n            query itemList($filter:Filter, $page:Int, $perPage:Int, $sort:Sort){\n              itemList(filter:$filter, page:$page, perPage:$perPage, sortBy:$sort) {\n                    PlanetID\n                    PlanetName\n                    Image\n                    PlanetSector\n                    PlanetCoordinates\n                    Background\n                    BackgroundStarDensity\n                    BackgroundNebula\n                    SystemType\n                    StarOneType\n                    StarOneSpectralClass\n                    StarOneSpectralNumber\n                    StarOneSequence\n                    StarTwoType\n                    StarTwoSpectralClass\n                    StarTwoSpectralNumber\n                    StarTwoSequence\n                    StarThreeType\n                    StarThreeSpectralClass\n                    StarThreeSpectralNumber\n                    StarThreeSequence\n                    ExoClass\n                    MotherPlanetType\n                    MotherPlanetSubtype\n                    WorldType\n                    WorldSubtype\n                    Moons\n                    MoonOneType\n                    MoonTwoType\n                    MoonThreeType\n                    Ring\n                    RingType\n                    BioDiversityScale\n                    CarniverousVegetation\n                    SecretBiosphere\n                    Gaia\n                    IntelligentMicrobiome\n                    ApexPredators\n                    SentientLifeFormType\n                    FitnessFactor\n                    IntelligenceCapacity\n                    ConciousnessAffinity\n                    RarityScore\n                    Rank\n                    TokenOwner\n                    ItemID\n                    StartTime\n                    EndTime\n                    ReserveTokenPrice\n                    BuyoutTokenPrice\n                    ListingType\n                    Neighbor1\n                    Neighbor2\n                    Neighbor3\n                    Neighbor4\n                    Neighbor5\n                    Neighbor6\n                    Neighbor7\n                    Neighbor8\n                    Neighbor9\n                    Neighbor10\n                }\n            }",
    "variables": {
        "filter": {},
        "perPage": 20,
        "page": 0,
        "sort": {
            "OrderBy": "BuyoutTokenPrice",
            "OrderDirection": 1
        }
    },
    "operationName": "itemList"
}
 */
