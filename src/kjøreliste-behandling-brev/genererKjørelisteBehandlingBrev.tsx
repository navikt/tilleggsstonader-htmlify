import { renderToStaticMarkup } from 'react-dom/server';

import kjorelisteBehandlingBrevCss from './kjorelisteBehandlingBrevCss';
import { OppsummertBeregningsresultat } from './OppsummertBeregningsresultat';
import { KjørelisteBehandlingBrevData } from './typer';
import { formaterNorskDato } from '../felles/datoFormat';
import { HtmlLang } from '../felles/HtmlLang';
import { formaterTall } from '../felles/tekstutils';
import { Avslutning } from '../komponenter/Avslutning';
import { Brevhode } from '../komponenter/Brevhode';
import { Signatur } from '../komponenter/Signatur';

export const genererKjørelisteBehandlingBrev = (data: KjørelisteBehandlingBrevData): string => {
    const html = (
        <html lang={HtmlLang.NB}>
            <head>
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <style
                    type="text/css"
                    dangerouslySetInnerHTML={{ __html: kjorelisteBehandlingBrevCss }}
                />
                <title>Vi har behandlet kjørelisten(e) din(e)</title>
            </head>
            <body>
                <Brevhode
                    tittel="Vi har behandlet kjørelisten(e) din(e)"
                    navn={data.navn}
                    fodselsnummer={data.ident}
                    dato={data.behandletDato}
                />
                <Innhold data={data} />
                <Avslutning />
                <Signatur
                    enhet={data.behandlendeEnhet}
                    saksbehandlersignatur={data.saksbehandlerSignatur}
                />
            </body>
        </html>
    );

    return renderToStaticMarkup(html);
};

const Innhold: React.FC<{ data: KjørelisteBehandlingBrevData }> = ({ data }) => {
    return (
        <div>
            <p>Du får utbetalt pengestøtte til daglige reiser med bil.</p>
            <h2>Slik har vi beregnet utbetalingen din:</h2>
            <OppsummertBeregningsresultat reiser={data.beregning.reiser} />
            <p>Pengestøtten beregnes etter en fast sats per kilometer. Følgende satser gjelder:</p>
            <ul>
                {data.satser.map((sats, index) => (
                    <li key={index}>
                        {formaterTall(sats.beløp)} kr/km fra {formaterNorskDato(sats.fom)} til{' '}
                        {formaterNorskDato(sats.tom)}
                    </li>
                ))}
            </ul>
            <p>
                Du kan ikke få pengestøtte for flere dager enn det du er innvilget i vedtaket om
                pengestøtte til daglige reiser. Ved høye parkeringsutgifter må du sende inn
                kvittering før beløpet blir utbetalt. Du får pengene inn på konto i løpet av 2-3
                virkedager.
            </p>
        </div>
    );
};
