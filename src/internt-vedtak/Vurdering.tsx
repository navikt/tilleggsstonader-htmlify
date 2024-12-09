import React from 'react';

import { NonBreakingDiv } from './felles';
import {
    resultatDelvilkårperiodeTilTekst,
    svarVurderingTilTekst,
    VurderingVilkårperiode,
} from './typer/vilkårperiode';
import { tekstEllerFeil } from '../felles/tekstutils';

export const Vurdering: React.FC<{ navn: string; vurdering?: VurderingVilkårperiode }> = ({
    navn,
    vurdering,
}) => {
    if (!vurdering) return null;
    return (
        <NonBreakingDiv>
            <div>
                <strong>{navn}</strong> (
                {tekstEllerFeil(resultatDelvilkårperiodeTilTekst, vurdering.resultat)})
            </div>
            <div>Svar: {tekstEllerFeil(svarVurderingTilTekst, vurdering.svar)}</div>
        </NonBreakingDiv>
    );
};
