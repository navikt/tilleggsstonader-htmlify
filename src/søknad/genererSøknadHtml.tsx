import { renderToStaticMarkup } from 'react-dom/server';

import soknadCss from './soknadCss';
import { Avsnitt, HtmlFelt, Søknad, Verdi } from './typer';
import { formatterNorskDato } from '../felles/datoFormat';
import { HtmlLang } from '../felles/HtmlLang';
import { NavSvg } from '../felles/nav_svg';
import { tittelStønadstype } from '../felles/stønadstype';

const alternativer = (verdi: Verdi) => {
    return (
        verdi.alternativer && <div className={'alternativer'}>{verdi.alternativer.join(', ')}</div>
    );
};

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
                    {alternativer(felt)}
                    {felt.verdi}
                </>
            );
        case 'AVSNITT':
            return (
                <>
                    {header(felt, nivå, nivåClassName)}
                    {felt.verdier.map((verdi) => (
                        <div className={nivåClassName}>
                            {mapFelter(verdi, Math.min(nivå + 1, 4))}
                        </div>
                    ))}
                </>
            );
        case 'LINJE':
            return <hr />;
        default:
            throw `Kan ikke mappe ${JSON.stringify(felt)}`;
    }
};

const genererSøknadHtml = async (data: Søknad): Promise<string> => {
    const asyncHtml = () => (
        <html lang={HtmlLang.NB}>
            <head>
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <style type="text/css">{soknadCss}</style>
                <title>{tittelStønadstype(data.type)}</title>
            </head>
            <body className={'body'}>
                <div className={'header'}>
                    <div className={'ikon-og-dato'}>
                        {NavSvg}
                        <p>{formatterNorskDato(data.mottattTidspunkt)}</p>
                    </div>
                    <div className={'stonad-tittel'}>
                        <h1>{tittelStønadstype(data.type)}</h1>
                        {mapFelter(data.avsnitt)}
                    </div>
                </div>
            </body>
        </html>
    );

    return renderToStaticMarkup(asyncHtml());
};
export default genererSøknadHtml;
