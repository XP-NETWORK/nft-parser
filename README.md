<center>

# XP Network NFT-Parser

</center>

### Work In Progress / Alpha Stage Library

<br/>
Parsing steps:
<br/>

-   [x] [1. Installing the library](#1-install-the-libraries-required-for-the-project)
-   [x] [2. Importing the dependencies](#2-import-the-dependencies)
-   [x] [3. Get parsed nft object with metadata](#3-get-parsed-nft-object-with-metadata)

<hr/><br/>
<center>

## To parse NFTs metadata, follow the steps below:

</center>
<br/>

Make sure [nodejs](https://nodejs.org/en/download/) is installed on your machine.<br/>
<br/>

### 1. Install the libraries required for the project:

<br/>

```bash
yarn add nft-parser
```

OR

```bash
npm i --save nft-parser
```

To import the latest version of nft-parser library:

```bash
yarn add "git+https://github.com/xp-network/nft-parser#bleeding-edge"
```

<br/>

### 2. Import the dependencies<br/><br/>

```javascript
import { nftGeneralParser } from "nft-parser/dist/src/index";
```

<hr/><br/>

### 3. Get parsed nft object with metadata

### 3.1 Example of getting parsed nft object with metadata for nft received from [xp.network](https://www.npmjs.com/package/xp.network/) nft-indexer

### NFT

```json
{
    "uri": "https://nft.xp.network/w/30536082382037290147901655651",
    "native": {
        "chainId": "12",
        "tokenId": "30536082382037290147901655651",
        "owner": "0xb6C8748115d23Eb1c6d59Cb83eAe051b56ef75c7",
        "contract": "0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe",
        "symbol": "RMBB",
        "name": "Rocket Monsters Bear Battalion",
        "uri": "https://nft.xp.network/w/30536082382037290147901655651",
        "contractType": "ERC721"
    },
    "collectionIdent": "0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe"
}
```

### Address - wallet address your dApp connected to

```javascript
const parsedObject = await nftGeneralParser(NFT, Address);
```

### Returned parsed object

```typescript
interface NFT {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract: string;
    collectionIdent: string;
    native: any;
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
    };
}
```
