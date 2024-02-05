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
            <div>Svar: {vurdering.svar}</div>
            <div>Resultat: {vurdering.resultat}</div>
            <Begrunnelse data={vurdering} />
        </NonBreakingDiv>
    );
};
const VilkårperiodeRad: React.FC<{ periode: Vilkårperiode }> = ({ periode }) => {
    return (
        <NonBreakingDiv>
            <div>
                {periode.type} {periode.resultat}
            </div>
            <div>{formaterPeriode(periode)}</div>
            <div>Kilde: {periode.kilde}</div>
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
            <h2>{navn}</h2>
            {perioder.map((periode, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <hr />}
                    <VilkårperiodeRad periode={periode} />
                </React.Fragment>
            ))}
        </NonBreakingDiv>
    );
};

export default VilkårperioderContent;
