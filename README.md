expo-use-scanner
================

**A React Hook for simplifying the barcode scanning features of
[expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/)**

This hook returns an object and an component.

The object has two properties:

* a boolean state `active`;

* an asynchronous method `activate`, that asks for permission to access the
  camera, sets the aforementioned state to `true` if it is granted, and throws
  an error otherwise;

* a synchronous method `deactivate`, that sets the aforementioned state to
  `false`.

The component is a [modified
version](https://www.npmjs.com/package/@hashiprobr/expo-camera) of
[expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/).


Peer dependencies
-----------------

``` json
{
    "@hashiprobr/expo-camera": "^1.0.8",
    "expo": "^43.0.5",
    "react": "^17.0.1",
    "react-native": ">=0.64.3"
}
```


Install
-------

With npm:

```
npm install @hashiprobr/expo-use-scanner
```

With yarn:

```
yarn add @hashiprobr/expo-use-scanner
```

With expo:

```
expo install @hashiprobr/expo-use-scanner
```


Example
-------

``` js
import React, { useState } from 'react';

import { View, Text, Button } from 'react-native';

import useScanner from '@hashiprobr/expo-use-scanner';

export default function MyComponent() {
    const [data, setData] = useState(null);

    const [scanner, Scanner] = useScanner();

    async function onPressScan() {
        try {
            await scanner.activate();
        } catch (error) {
            console.error(error);
        }
    }

    function onPressCancel() {
        scanner.deactivate();
    }

    function onBarCodeScanned(result) {
        setData(result.data);
        scanner.deactivate();
    }

    return (
        <View
            style={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {scanner.active ? (
                <Scanner
                    style={{
                        flexGrow: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'flex-end',
                    }}
                    onBarCodeScanned={onBarCodeScanned}
                >
                    <Button title="cancel" onPress={onPressCancel} />
                </Scanner>
            ) : (
                <>
                    {data && (
                        <Text>{data}</Text>
                    )}
                    <Button title="scan" onPress={onPressScan} />
                </>
            )}
        </View>
    );
}
```
