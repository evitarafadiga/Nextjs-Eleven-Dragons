import { ListProvider } from "../providers/userlist";

function MyApp({ Component, pageProps }) {
    return (
    <ListProvider>
        <Component {...pageProps} />
    </ListProvider>
    )
}
export default MyApp;