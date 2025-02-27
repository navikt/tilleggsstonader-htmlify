import * as React from 'react';

import { renderToStaticMarkup } from 'react-dom/server';

import Header from './Header';
import { KlageBehandling, KlageFormkrav, Klagevurdering } from './KlageBehandling';
import { IKlageDokumentData, stønadstypeTilTekst } from './klageInterntVedtakTyper';
import { tekstEllerFeil } from '../../felles/tekstutils';
import { klageCss } from '../klageCss';
import { dagensDatoFormatert } from '../klageDatoUtils';

enum HtmlLang {
    NB = 'nb',
}

export const genererInterntVedtakKlage = async (data: IKlageDokumentData): Promise<string> => {
    const asyncHtml = () => (
        <html lang={HtmlLang.NB}>
            <head>
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <style type="text/css">{klageCss}</style>
                <title>Saksbehandlingsblankett klage</title>
            </head>
            <body className={'body'}>
                <div>
                    <Header
                        visLogo={true}
                        tittel={`Blankett klage ${tekstEllerFeil(stønadstypeTilTekst, data.behandling.stønadstype)}`}
                        navn={data.personopplysninger.navn}
                        fodselsnummer={data.personopplysninger.personIdent}
                        dato={dagensDatoFormatert()}
                    />
                    <KlageBehandling behandling={data.behandling} />
                    <KlageFormkrav formkrav={data.formkrav} />
                    <Klagevurdering vurdering={data.vurdering} />
                </div>
            </body>
        </html>
    );

    const htmldokument = asyncHtml();
    return await renderToStaticMarkup(htmldokument);
};
