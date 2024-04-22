import { renderToStaticMarkup } from 'react-dom/server';

import soknadCss from './soknadCss';
import { Avsnitt, Dokumentasjon, HtmlFelt, Søknad } from './typer';
import { formaterNorskDato } from '../felles/datoFormat';
import { HtmlLang } from '../felles/HtmlLang';
import { NavSvg } from '../felles/nav_svg';

const header = (avsnitt: Avsnitt, nivå: number, className: string) => {
    switch (nivå) {
        case 1:
            return <h1 className={className}>{avsnitt.label}</h1>;
        case 2:
            return <h2 className={className}>{avsnitt.label}</h2>;
        case 3:
            return <h3 className={className}>{avsnitt.label}</h3>;
        default:
            return <h4 className={className}>{avsnitt.label}</h4>;
    }
};
const mapFelter = (felt: HtmlFelt, nivå: number = 1) => {
    const nivåClassName = `level-${nivå}`;
    switch (felt.type) {
        case 'VERDI':
            return (
                <>
                    {felt.alternativer && <div className={'alternativer'}>{felt.alternativer}</div>}
                    {felt.verdi}
                </>
            );
        case 'AVSNITT':
            return (
                <div>
                    {header(felt, nivå, nivåClassName)}
                    {felt.verdier.map((verdi, index) => {
                        if (verdi.type == 'AVSNITT' && verdi.beholdMargin) {
                            return mapFelter(verdi, Math.min(nivå, 4));
                        } else {
                            return (
                                <div className={`${nivåClassName}`} key={index}>
                                    {mapFelter(verdi, Math.min(nivå + 1, 4))}
                                </div>
                            );
                        }
                    })}
                </div>
            );
        case 'LINJE':
            return <hr />;
        default:
            throw Error(`Kan ikke mappe ${JSON.stringify(felt)}`);
    }
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

const genererSøknadHtml = async (data: Søknad): Promise<string> => {
    const asyncHtml = () => (
        <html lang={HtmlLang.NB}>
            <head>
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <style type="text/css" dangerouslySetInnerHTML={{ __html: soknadCss }} />
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
                    {data.felter.map((verdi) => mapFelter(verdi, 2))}
                    {mapDokumentasjon(data.dokumentasjon)}
                </div>
            </body>
        </html>
    );

    return renderToStaticMarkup(asyncHtml());
};
export default genererSøknadHtml;
