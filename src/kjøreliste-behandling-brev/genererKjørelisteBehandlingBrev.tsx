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
                    tittel="Vi har behandlet kjørelisten din"
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

export const Body: React.FC<{ data: KjørelisteBehandlingBrevData }> = ({ data }) => {
    return (
        <>
            <Brevhode
                tittel="Vi har behandlet kjørelisten din"
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
        </>
    );
};

const Innhold: React.FC<{ data: KjørelisteBehandlingBrevData }> = ({ data }) => {
    return (
        <div>
            <div className="avsnitt">
                <p>Du får utbetalt pengestøtte til daglige reiser med bil.</p>
                <h2>Slik har vi beregnet utbetalingen din</h2>
                <OppsummertBeregningsresultat reiser={data.beregning.reiser} />
                <p>
                    Antall dager viser hvor mange dager i perioden kjøring med bil er dekket.
                    Parkeringskostnad, fergekostnad og bompenger dekkes med en samlet sum per uke.
                    Du kan ikke få pengestøtte for flere dager enn det du er innvilget i vedtaket om
                    pengestøtte til daglige reiser. Ved høye parkeringsutgifter må du sende inn
                    kvittering før beløpet blir utbetalt. Du får pengene inn på konto i løpet av 2-3
                    virkedager.
                </p>
                <p>
                    Pengestøtten beregnes etter en fast sats per kilometer. Følgende satser gjelder:
                </p>
                <ul>
                    {data.satser.map((sats, index) => (
                        <li key={index}>
                            {formaterTall(sats.beløp)} kr/km fra {formaterNorskDato(sats.fom)} til{' '}
                            {formaterNorskDato(sats.tom)}
                        </li>
                    ))}
                </ul>
            </div>
            {data.begrunnelse && (
                <div className="avsnitt">
                    <h3>Begrunnelse for utbetalingen</h3>
                    <p>{data.begrunnelse}</p>
                </div>
            )}
        </div>
    );
};
