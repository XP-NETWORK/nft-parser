import axios from "axios";
import * as evm from "./index";
import { getAssetFormat } from "..";
import { NFT } from "./index";
import https from "https";

export const casperParser = async (
    collectionIdent: string,
    nft: any,
    account: string,
    whitelisted: boolean,
) => {
    console.log("casper nft parser");
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";
    switch (collectionIdent) {
        default: {
            let uri = nft.uri;
            if (uri) {
                let res;
                try {
                    res = await axios(nft.uri);
                } catch (error) {
                    res = await axios.get(nft.uri, {
                        headers: {
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
                        },
                    });
                }
                const contentType = res.headers["content-type"];
                process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "1";

                if (typeof res.data === "object") {
                    return {
                        ...nft,
                        metaData: {
                            name: res.data.name,
                            image: res.data.image,
                            description: res.data.description,
                            collectionName: nft.collectionIdent,
                            attributes: res.data.attributes,
                        },
                    };
                }
                else {
                    return {
                        ...nft,
                        metaData: {
                            image: contentType.includes("image") ? nft.uri : "",
                            animation_url: contentType.includes("video") ? nft.uri : ""
                        }
                    };
                }
            }
        }
    }
};
