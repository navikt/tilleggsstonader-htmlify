import React from 'react';

import { tekstEllerFeil } from '../../felles/tekstutils';
import { NonBreakingDiv } from '../felles';
import {
    resultatDelvilkårperiodeTilTekst,
    svarVurderingTilTekst,
    VurderingVilkårperiode,
} from '../typer/vilkårperiode';

export const Vurdering: React.FC<{ navn: string; vurdering?: VurderingVilkårperiode }> = ({
    navn,
    vurdering,
}) => {
    if (!vurdering) return null;
    return (
        <NonBreakingDiv>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                <strong>{navn}</strong> (
                {tekstEllerFeil(resultatDelvilkårperiodeTilTekst, vurdering.resultat)})
                <br />
                Svar: {tekstEllerFeil(svarVurderingTilTekst, vurdering.svar)}
            </p>
        </NonBreakingDiv>
    );
};
