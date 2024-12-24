import ReactDOMServer from "react-dom/server";
import App from "../src/App";
import {StaticRouter} from "react-router-dom";

export const renderHtml = (url: string): string => {
    return ReactDOMServer.renderToString(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    );
};