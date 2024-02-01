import React from 'react';

import { Begrunnelse, NonBreakingDiv } from './felles';
import { Vilkårperiode, VurderingVilkårperiode } from './typer/vilkårperiode';
import { formaterPeriode } from '../felles/datoFormat';

const Vurdering: React.FC<{ navn: string; vurdering?: VurderingVilkårperiode }> = ({
    navn,
    vurdering,
}) => {
    if (!vurdering) return null;
    return (
        <NonBreakingDiv>
            <h4>{navn}</h4>
            <span>Svar: {vurdering.svar}</span>
            <span>Resultat: {vurdering.resultat}</span>
            <Begrunnelse data={vurdering} />
        </NonBreakingDiv>
    );
};
const VilkårperiodeRad: React.FC<{ periode: Vilkårperiode }> = ({ periode }) => {
    return (
        <NonBreakingDiv>
            <span>
                {periode.type} {periode.resultat}
            </span>
            <span>{formaterPeriode(periode)}</span>
            <span>Kilde: {periode.kilde}</span>
            <Begrunnelse data={periode} />
            <Vurdering navn={'Medlemskap'} vurdering={periode.delvilkår.medlemskap} />
            <Vurdering navn={'Lønnet'} vurdering={periode.delvilkår.lønnet} />
            <Vurdering navn={'Mottar sykepenger'} vurdering={periode.delvilkår.mottarSykepenger} />
        </NonBreakingDiv>
    );
};

const VilkårperioderContent: React.FC<{
    navn: 'Målgrupper' | 'Aktiviteter';
    perioder: Vilkårperiode[];
}> = ({ navn, perioder }) => {
    return (
        <NonBreakingDiv>
            <h1>{navn}</h1>
            {perioder.map((periode, index) => (
                <VilkårperiodeRad key={index} periode={periode} />
            ))}
        </NonBreakingDiv>
    );
};

export default VilkårperioderContent;
