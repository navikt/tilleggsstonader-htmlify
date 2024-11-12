import React from 'react';

import { Begrunnelse, NonBreakingDiv } from './felles';
import {
    Vedtak,
    VedtakAvslag,
    VedtakInnvilgeTilsynBarn,
    VedtakOpphørTilsynBarn,
    VedtakType,
    vedtakTypeTilTekst,
    årsakAvslagTilTekst,
    årsakOpphørTilTekst,
} from './typer/vedtak';
import { tekstEllerFeil } from '../felles/tekstutils';

export const VedtakContent: React.FC<{ vedtak: Vedtak }> = ({ vedtak }) => {
    switch (vedtak.type) {
        case VedtakType.AVSLAG:
            return <Avslag vedtak={vedtak} />;
        case VedtakType.INNVILGELSE:
            return <InnvilgelseTilsynBarn vedtak={vedtak} />;
        case VedtakType.OPPHØR:
            return <OpphørTilsynBarn vedtak={vedtak} />;
        default:
            // @ts-ignore
            throw Error(`Har ikke mapping av ${vedtak.type}`);
    }
};

const Avslag: React.FC<{ vedtak: VedtakAvslag }> = ({ vedtak }) => {
    const årsaker = vedtak.årsakerAvslag
        .map((årsak) => tekstEllerFeil(årsakAvslagTilTekst, årsak))
        .join(', ');

    return (
        <NonBreakingDiv>
            <h2>Vedtak</h2>
            <div>
                <strong>Resultat: </strong>
                {tekstEllerFeil(vedtakTypeTilTekst, vedtak.type)}
            </div>
            <p>
                Årsaker til avslag: <br />
                {årsaker}
            </p>
            <Begrunnelse begrunnelse={vedtak.avslagBegrunnelse} />
        </NonBreakingDiv>
    );
};

const OpphørTilsynBarn: React.FC<{ vedtak: VedtakOpphørTilsynBarn }> = ({ vedtak }) => {
    const årsaker = vedtak.årsakerOpphør
        .map((årsak) => tekstEllerFeil(årsakOpphørTilTekst, årsak))
        .join(', ');

    return (
        <NonBreakingDiv>
            <h2>Vedtak</h2>
            <div>
                <strong>Resultat: </strong>
                {tekstEllerFeil(vedtakTypeTilTekst, vedtak.type)}
            </div>
            <p>
                Årsaker til opphør: <br />
                {årsaker}
            </p>
            <Begrunnelse begrunnelse={vedtak.opphørBegrunnelse} />
        </NonBreakingDiv>
    );
};

const InnvilgelseTilsynBarn: React.FC<{ vedtak: VedtakInnvilgeTilsynBarn }> = ({ vedtak }) => {
    return (
        <NonBreakingDiv>
            <h2>Vedtak</h2>
            <div>
                <strong>Resultat: </strong>
                {tekstEllerFeil(vedtakTypeTilTekst, vedtak.type)}
            </div>
        </NonBreakingDiv>
    );
};
