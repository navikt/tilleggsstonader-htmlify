import { renderToStaticMarkup } from 'react-dom/server';

import soknadCss from './soknadCss';
import { Søknad } from './typer';
import { HtmlLang } from '../felles/HtmlLang';

const genererSøknadHtml = async (data: Søknad): Promise<string> => {
    const asyncHtml = () => (
        <html lang={HtmlLang.NB}>
            <head>
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <style type="text/css">{soknadCss}</style>
                <title>Søknad</title>
            </head>
            <body className={'body'}>
                <div>{JSON.stringify(data)}</div>
            </body>
        </html>
    );

    const htmldokument = asyncHtml();
    return await renderToStaticMarkup(htmldokument);
};
export default genererSøknadHtml;
