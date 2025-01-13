import React from 'react';

import { NonBreakingDiv } from './felles';
import { Beregningsresultat } from './typer/beregningsresultat';

export const BeregningsresultatContent: React.FC<{
    beregningsresultat?: Beregningsresultat;
}> = ({ beregningsresultat }) => {
    if (!beregningsresultat) {
        return null;
    }
    return (
        <NonBreakingDiv>
            <h2>Beregning</h2>
            {beregningsresultat.tilsynBarn &&
                TilsynBarnBeregningsresultatTabell(beregningsresultat)}
            {beregningsresultat.læremidler &&
                LæremidlerBeregningsresultatTabell(beregningsresultat)}
        </NonBreakingDiv>
    );
};

const TilsynBarnBeregningsresultatTabell = (beregningsresultat: Beregningsresultat) => (
    <table>
        <thead>
            <tr>
                <th>Periode</th>
                <th>Barn</th>
                <th>Månedlige utgifter</th>
                <th>Dagsats</th>
                <th>Stønadsbeløp</th>
            </tr>
        </thead>
        <tbody>
            {beregningsresultat.tilsynBarn?.map((beregningsresultat, index) => (
                <tr key={index}>
                    <td>{beregningsresultat.grunnlag.måned}</td>
                    <td>{beregningsresultat.grunnlag.antallBarn}</td>
                    <td>{beregningsresultat.grunnlag.utgifterTotal}</td>
                    <td>{beregningsresultat.dagsats}</td>
                    <td>{beregningsresultat.månedsbeløp}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const LæremidlerBeregningsresultatTabell = (beregningsresultat: Beregningsresultat) => (
    <table>
        <thead>
            <tr>
                <th>Fom</th>
                <th>Tom</th>
                <th>Ant. månder</th>
                <th>Månedsbeløp</th>
                <th>Stønadsbeløp</th>
                <th>Utbetalingsdato</th>
            </tr>
        </thead>
        <tbody>
            {beregningsresultat.læremidler?.map((beregningsresultat, index) => (
                <tr key={index}>
                    <td>{beregningsresultat.fom}</td>
                    <td>{beregningsresultat.tom}</td>
                    <td>{beregningsresultat.antallMåneder}</td>
                    <td>{beregningsresultat.beløp}</td>
                    <td>{beregningsresultat.stønadsbeløp}</td>
                    <td>{beregningsresultat.utbetalingsdato}</td>
                </tr>
            ))}
        </tbody>
    </table>
);
