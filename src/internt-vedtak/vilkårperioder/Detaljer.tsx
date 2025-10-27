import React from 'react';

import { formaterPeriode } from '../../felles/datoFormat';
import { Stønadstype } from '../../felles/stønadstype';
import { tekstEllerFeil } from '../../felles/tekstutils';
import { FaktaOgVurdering } from '../FaktaOgVurdering';
import { Begrunnelse } from '../felles';
import { KommentarSlettet } from '../felles/KommentarSlettet';
import { kildeVilkårperiodeTilTekst, Vilkårperiode } from '../typer/vilkårperiode';

export const Detaljer: React.FC<{
    periode: Vilkårperiode;
    stønadType: Stønadstype;
}> = ({ periode, stønadType }) => {
    return (
        <div className={'vilkaarperiode-rad-content'}>
            <div>Periode: {formaterPeriode(periode)}</div>
            <div>Kilde: {tekstEllerFeil(kildeVilkårperiodeTilTekst, periode.kilde)}</div>
            <Begrunnelse begrunnelse={periode.begrunnelse} />
            <KommentarSlettet data={periode} />
            <FaktaOgVurdering
                faktaOgVurderinger={periode.faktaOgVurderinger}
                stønadType={stønadType}
            />
        </div>
    );
};
