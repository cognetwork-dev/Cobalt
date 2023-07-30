import { useEffect, useState } from "react";

const target = new EventTarget();

export default function useLocalStorage(key: string) {
    // trigger re-render with useState
    const [state, setState] = useState<any>(localStorage.getItem(key));

    const event = `set ${key}`;

    useEffect(() => {
        function listener() {
            setState(localStorage.getItem(key));
        }

        target.addEventListener(event, listener);

        return () => target.removeEventListener(event, listener);
    });

    return [
        state,
        (value: any) => {
            // null = nuke the item
            if (value === null) localStorage.removeItem(key);
            else localStorage.setItem(key, value);

            setState(value);
            target.dispatchEvent(new Event(event));
        },
    ];
}
