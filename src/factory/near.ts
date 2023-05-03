import axios from "axios";
import * as evm from "./index";

import { NFT } from "./index";

export const nearParser = async (
    collectionIdent: string,
    nft: any,
    account: string,
    whitelisted: boolean,
    chainId?: string
) => {
    let parsed: NFT;
    switch (collectionIdent) {
        default: {
            let uri;
            try {
                uri = evm.setupURI(nft.uri);
            } catch {
                uri = false;
            }

            if (uri) {
                parsed = await evm.Default(nft, account, whitelisted);
            } else {
                if (nft.media.match(/^\d+\.\S+$/)) {
                    const res = (
                        await axios(
                            `https://api-v2-mainnet.paras.id/token?token_series_id=${nft.native.token_id}&contract_id=${collectionIdent}`
                        )
                    ).data;
                    if (!res.data) return;
                    const {
                        data: { results },
                    } = res;
                    console.log(results, "results");
                    const data = results[0].metadata;
                    data.image = data.media;
                    return {
                        ...nft,
                        metaData: {
                            ...data,
                            imageFormat:
                                data.image?.match(/(?:\.([^.]+))?$/)?.at(1) ||
                                "",
                        },
                    };
                }

                parsed = {
                    ...nft,
                    metaData: {
                        name: nft.title,
                        description: nft.description,
                        image: nft.image,
                        imageFormat:
                            nft.image?.match(/(?:\.([^.]+))?$/)?.at(1) || "",
                        collectionName: nft.collectionIdent,
                        attributes: nft.attributes,
                    },
                };
            }
            break;
        }
    }

    return parsed;
};
