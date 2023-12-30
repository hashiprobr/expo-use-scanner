expo-use-scanner
================

[PROJECT DISCONTINUED]

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
    "@hashiprobr/expo-camera": "1.0.9",
    "expo": "45.0.0",
    "react": "17.0.2",
    "react-native": "0.68.2"
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

    const [scanner, Preview] = useScanner();

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
                <Preview
                    style={{
                        flexGrow: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'flex-end',
                    }}
                    onBarCodeScanned={onBarCodeScanned}
                >
                    <Button title="cancel" onPress={onPressCancel} />
                </Preview>
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
