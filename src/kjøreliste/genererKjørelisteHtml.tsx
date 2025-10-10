import { renderToStaticMarkup } from 'react-dom/server';

import kjorelisteCss from './kjorelisteCss';
import { Dag, Kjøreliste, Uke } from './typer';
import { formaterNorskDato } from '../felles/datoFormat';
import { HtmlLang } from '../felles/HtmlLang';
import { NavSvg } from '../felles/nav_svg';
import { Dokumentasjon } from '../søknad/typer';

const mapDag = (dag: Dag) => {
    const harKjørtSvar = dag.harKjørt ? 'Ja' : 'Nei';
    const parkeringsutgiftTekst = dag.parkeringsutgift
        ? ` | ${dag.parkeringsutgift.tekst}: ${dag.parkeringsutgift.beløp}`
        : '';

    return (
        <div className={'dag'}>
            <span className={'label'}>{dag.datoTekst}:</span>
            <span className={'verdi'}>Kjørt: {harKjørtSvar + parkeringsutgiftTekst}</span>
        </div>
    );
};

const mapKjørelisteUker = (uker: Uke[]) => {
    return uker.map((uke) => (
        <div className={'uke'}>
            <h2>{uke.ukeTekst}</h2>
            <div className={'label'}>{uke.spørsmål}</div>
            {uke.dager.map((dag) => mapDag(dag))}
        </div>
    ));
};

const mapDokumentasjon = (dokumentasjon: Dokumentasjon[]) => {
    return (
        <div className={'level-2'}>
            {dokumentasjon.map((d) => (
                <>
                    <h2>{d.label}</h2>
                    {d.dokument.map((d) => (
                        <div className={'level-3'}>
                            <h3>{d.label}</h3>
                            <div>{d.labelSendtInnTidligere}</div>
                            <div>{d.labelAntall}</div>
                        </div>
                    ))}
                </>
            ))}
        </div>
    );
};

const genererKjørelisteHtml = async (data: Kjøreliste): Promise<string> => {
    const asyncHtml = () => (
        <html lang={HtmlLang.NB}>
            <head>
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <style type="text/css" dangerouslySetInnerHTML={{ __html: kjorelisteCss }} />
                <title>{data.tittel}</title>
            </head>
            <body className={'body'}>
                <div className={'header'}>
                    <div className={'ikon-og-dato'}>
                        {NavSvg}
                        <p>{formaterNorskDato(data.mottattTidspunkt)}</p>
                    </div>
                    <div className={'stonad-tittel'}>
                        <h1>{data.tittel}</h1>
                        <h2>{data.skjemanummer}</h2>
                    </div>
                    <div>
                        <h2 className={'level-2'}>Søker</h2>
                        <div className={'level-2'}>
                            <div>
                                <h3 className={'level-3'}>Fødselsnummer</h3>
                                <div className={'level-3'}>{data.søker.ident}</div>
                            </div>
                            <div>
                                <h3 className={'level-3'}>Navn</h3>
                                <div className={'level-3'}>{data.søker.navn}</div>
                            </div>
                        </div>
                        {mapKjørelisteUker(data.uker)}
                    </div>
                    {mapDokumentasjon(data.dokumentasjon)}
                </div>
            </body>
        </html>
    );

    return renderToStaticMarkup(asyncHtml());
};

export default genererKjørelisteHtml;
