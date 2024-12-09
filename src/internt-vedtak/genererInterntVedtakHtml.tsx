import React from 'react';

import { renderToStaticMarkup } from 'react-dom/server';

import Behandling from './Behandling';
import interntVedtakCss from './interntVedtakCss';
import StønadsperioderContent from './StønadsperioderContent';
import Søknadsinformasjon from './Søknadsinformasjon';
import { InterntVedtak } from './typer/interntVedtak';
import { VedtakContent } from './VedtakContent';
import { VilkårContent } from './VilkårContent';
import { Målgrupper } from './vilkårperioder/Målgrupper';
import { formaterNorskDato } from '../felles/datoFormat';
import { HtmlLang } from '../felles/HtmlLang';
import { NavSvg } from '../felles/nav_svg';
import { tittelInterntVedtak } from '../felles/stønadstype';
import { Aktiviteter } from './vilkårperioder/Aktiviteter';

const asyncHtml = (data: InterntVedtak) => (
    <html lang={HtmlLang.NB}>
        <head>
            <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
            <style type="text/css" dangerouslySetInnerHTML={{ __html: interntVedtakCss }} />
            <title>{tittelInterntVedtak(data.behandling.stønadstype)}</title>
        </head>
        <body className={'body'}>
            <div className={'header'}>
                <div className={'ikon-og-dato'}>
                    {NavSvg}
                    <p>{formaterNorskDato(data.behandling.vedtakstidspunkt)}</p>
                </div>
            </div>
            <Behandling behandling={data.behandling} />
            <Søknadsinformasjon søknad={data.søknad} />
            <Målgrupper målgrupper={data.målgrupper} />
            <Aktiviteter aktiviteter={data.aktiviteter} stønadstype={data.behandling.stønadstype} />
            <StønadsperioderContent perioder={data.stønadsperioder} />
            <VilkårContent vilkårsett={data.vilkår} />
            <VedtakContent vedtak={data.vedtak} />
        </body>
    </html>
);

const genererInterntVedtakHtml = async (data: InterntVedtak): Promise<string> =>
    renderToStaticMarkup(asyncHtml(data));
export default genererInterntVedtakHtml;
