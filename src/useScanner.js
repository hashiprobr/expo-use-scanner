import { useRef, useState } from 'react';

import Preview from '@hashiprobr/expo-camera';

export default function useScanner() {
    const ref = useRef(true);

    const [active, setActive] = useState(false);

    async function activate() {
        if (!active) {
            if (ref.current) {
                const response = await Preview.requestCameraPermissionsAsync();
                if (response.granted) {
                    ref.current = false;
                } else {
                    throw new Error('Could not receive permission');
                }
            }
            setActive(true);
        }
    }

    function deactivate() {
        if (active) {
            setActive(false);
        }
    }

    return [
        {
            active,
            activate,
            deactivate,
        },
        Preview,
    ];
}
