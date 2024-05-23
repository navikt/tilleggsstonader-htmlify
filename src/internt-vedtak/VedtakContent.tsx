import React from 'react';

import { Begrunnelse, NonBreakingDiv } from './felles';
import {
    UtgiftBarn,
    Vedtak,
    VedtakAvslag,
    VedtakInnvilgeTilsynBarn,
    VedtakType,
    vedtakTypeTilTekst,
    årsakAvslagTilTekst,
} from './typer/vedtak';
import { formaterNorskDato } from '../felles/datoFormat';
import { tekstEllerFeil } from '../felles/tekstutils';

export const VedtakContent: React.FC<{ vedtak: Vedtak }> = ({ vedtak }) => {
    switch (vedtak.type) {
        case VedtakType.AVSLAG:
            return <Avslag vedtak={vedtak} />;
        case VedtakType.INNVILGELSE:
            return <InnvilgelseTilsynBarn vedtak={vedtak} />;
        default:
            // @ts-ignore
            throw Error(`Har ikke mapping av ${vedtak.type}`);
    }
};

const Avslag: React.FC<{ vedtak: VedtakAvslag }> = ({ vedtak }) => {
    const årsaker = vedtak.årsakerAvslag.map((årsak) => årsakAvslagTilTekst[årsak]).join(', ');

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

const InnvilgelseTilsynBarn: React.FC<{ vedtak: VedtakInnvilgeTilsynBarn }> = ({ vedtak }) => {
    return (
        <NonBreakingDiv>
            <h2>Vedtak</h2>
            <div>
                <strong>Resultat: </strong>
                {tekstEllerFeil(vedtakTypeTilTekst, vedtak.type)}
            </div>
            <UtgifterBarnContent utgifterBarn={vedtak.utgifterBarn} />
        </NonBreakingDiv>
    );
};

const UtgifterBarnContent: React.FC<{ utgifterBarn: UtgiftBarn[] }> = ({ utgifterBarn }) => {
    return (
        <NonBreakingDiv>
            <h3>Utgifter</h3>
            {utgifterBarn.map((utgiftBarn, indexUtgiftBarn) => {
                return (
                    <NonBreakingDiv key={indexUtgiftBarn}>
                        <h4>
                            Barn med fødselsdato:{formaterNorskDato(utgiftBarn.fødselsdatoBarn)}
                        </h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Fra</th>
                                    <th>Til</th>
                                    <th>Utgift</th>
                                </tr>
                            </thead>
                            <tbody>
                                {utgiftBarn.utgifter.map((utgift, indexUtgift) => (
                                    <tr key={indexUtgift}>
                                        <td>{formaterNorskDato(utgift.fom)}</td>
                                        <td>{formaterNorskDato(utgift.tom)}</td>
                                        <td>{utgift.beløp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </NonBreakingDiv>
                );
            })}
        </NonBreakingDiv>
    );
};
