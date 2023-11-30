# 2023-klaymakers

## OpenSea integration

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
