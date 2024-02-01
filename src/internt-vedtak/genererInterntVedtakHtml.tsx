import React from 'react';

import { renderToStaticMarkup } from 'react-dom/server';

import Behandling from './Behandling';
import interntVedtakCss from './interntVedtakCss';
import StønadsperioderContent from './StønadsperioderContent';
import Søknadsinformasjon from './Søknadsinformasjon';
import { InterntVedtak } from './typer/interntVedtak';
import VilkårperioderContent from './VilkårperioderContent';
import { HtmlLang } from '../felles/HtmlLang';
import { tittelStønadstype } from '../felles/stønadstype';

const asyncHtml = (data: InterntVedtak) => (
    <html lang={HtmlLang.NB}>
        <head>
            <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
            <style type="text/css" dangerouslySetInnerHTML={{ __html: interntVedtakCss }} />
            <title>{tittelStønadstype(data.behandling.stønadstype)}</title>
        </head>
        <body className={'body'}>
            <Behandling behandling={data.behandling} />
            <Søknadsinformasjon søknad={data.søknad} />
            <VilkårperioderContent navn={'Målgrupper'} perioder={data.målgrupper} />
            <VilkårperioderContent navn={'Aktiviteter'} perioder={data.aktiviteter} />
            <StønadsperioderContent perioder={data.stønadsperioder} />
            <h1>Stønadsvilkår</h1>
            <h1>Vedtak</h1>
            <h1>Utbetalingsperioder</h1>
        </body>
    </html>
);

const genererInterntVedtakHtml = async (data: InterntVedtak): Promise<string> =>
    renderToStaticMarkup(asyncHtml(data));
export default genererInterntVedtakHtml;
