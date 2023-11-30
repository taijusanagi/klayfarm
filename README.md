# 2023-klaymakers

## Reference

### Deployed Address

https://baobab.klaytnscope.com/account/0xCa12692fbF90F3551095f36BD2efcE9119330BBD?tabId=txList

## OpenSea integration

- This is actually the Goerli testnet NFT because uurrently OpenSea's Klaytn Testnet metadata fetch is not working well, so I deployed same contract on Goerli NFT for Demo. However the game is connected to the Klaytn test network. Please check the actual Unity game page for the Klaytn integration as well.

https://testnets.opensea.io/assets/goerli/0xB14572E709046C220AeC6D67195bd8Ee7908208f/26261747886964506387964269904227895253792649728833556614078948511907327676793

I spent most of times on OpenSea and Unity integration, so I keep the points.
I believe this implementation guide helps others to build game NFT with Unity and it will help Klaytn ecosystem grows.

### Build Setting

To display game on OpenSea, we need to set as the followings.

![unity-publish-setting](./Docs/unity-publish-setting.png)

- Compression Format: Disabled
- Data Caching: False

### Restriction

Cursor lock does not work, so we disabled in the code.

```
// Cursor.lockState = CursorLockMode.Locked;
```
