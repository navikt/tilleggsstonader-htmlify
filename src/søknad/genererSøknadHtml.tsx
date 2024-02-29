import { renderToStaticMarkup } from 'react-dom/server';

import soknadCss from './soknadCss';
import { Avsnitt, HtmlFelt, Søknad, Verdi } from './typer';
import { formaterNorskDato } from '../felles/datoFormat';
import { HtmlLang } from '../felles/HtmlLang';
import { NavSvg } from '../felles/nav_svg';
import { tittelSøknad } from '../felles/stønadstype';

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
                <div>
                    {header(felt, nivå, nivåClassName)}
                    {felt.verdier.map((verdi, index) => {
                        if (verdi.type == 'AVSNITT' && verdi.beholdMargin) {
                            return mapFelter(verdi, Math.min(nivå, 4));
                        } else {
                            return (
                                <div className={nivåClassName} key={index}>
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

const genererSøknadHtml = async (data: Søknad): Promise<string> => {
    const asyncHtml = () => (
        <html lang={HtmlLang.NB}>
            <head>
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <style type="text/css" dangerouslySetInnerHTML={{ __html: soknadCss }} />
                <title>{tittelSøknad(data.type)}</title>
            </head>
            <body className={'body'}>
                <div className={'header'}>
                    <div className={'ikon-og-dato'}>
                        {NavSvg}
                        <p>{formaterNorskDato(data.mottattTidspunkt)}</p>
                    </div>
                    <div className={'stonad-tittel'}>
                        <h1>{tittelSøknad(data.type)}</h1>
                    </div>
                    {mapFelter(data.avsnitt)}
                </div>
            </body>
        </html>
    );

    return renderToStaticMarkup(asyncHtml());
};
export default genererSøknadHtml;
