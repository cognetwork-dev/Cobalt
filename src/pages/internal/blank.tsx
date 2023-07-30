import Head from "../../components/head";
import { useLocalAppearance } from "../../settings";

function Blank() {
    const [localAppearance, setLocalAppearance] = useLocalAppearance();

    // @ts-ignore
    globalThis.changeTheme = (theme: string) => {
        setLocalAppearance(theme);
    };
    return (
        <>
            <Head defaultTitle="Blank" />
        </>
    );
}

export default Blank;
