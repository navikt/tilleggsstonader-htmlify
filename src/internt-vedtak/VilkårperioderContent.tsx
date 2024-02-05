import React from 'react';

import { Begrunnelse, KommentarSlettet, NonBreakingDiv } from './felles';
import {
    ResultatVilkårperiode,
    Vilkårperiode,
    VurderingVilkårperiode,
} from './typer/vilkårperiode';
import { formaterPeriode } from '../felles/datoFormat';
import IkkeOppfylt from '../ikoner/IkkeOppfylt';
import InfoIkon from '../ikoner/InfoIkon';
import OppfyltIkon from '../ikoner/OppfyltIkon';
import SlettetIkon from '../ikoner/SlettetIkon';

const resultatIkon = (resultat: ResultatVilkårperiode) => {
    switch (resultat) {
        case ResultatVilkårperiode.OPPFYLT:
            return <OppfyltIkon heigth={24} width={24} />;
        case ResultatVilkårperiode.IKKE_OPPFYLT:
            return <IkkeOppfylt heigth={24} width={24} />;
        case ResultatVilkårperiode.IKKE_VURDERT:
            return <InfoIkon heigth={24} width={24} />;
        case ResultatVilkårperiode.SLETTET:
            return <SlettetIkon heigth={24} width={24} />;
        default:
            throw Error(`Har ikke mappet ${resultat}`);
    }
};

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
        <NonBreakingDiv className={'vilkaarperiode-rad'}>
            <div className={'vilkaarperiode-type'}>
                {periode.type}{' '}
                <div className={'vilkaarperiode-resultat'}>{resultatIkon(periode.resultat)}</div>
            </div>
            <div>Periode: {formaterPeriode(periode)}</div>
            <div>Kilde: {periode.kilde}</div>
            <Begrunnelse data={periode} />
            <KommentarSlettet data={periode} />
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
        <NonBreakingDiv className={'vilkaarperiode'}>
            <h2>{navn}</h2>
            {perioder.map((periode, index) => (
                <React.Fragment key={index}>
                    <VilkårperiodeRad periode={periode} />
                </React.Fragment>
            ))}
        </NonBreakingDiv>
    );
};

export default VilkårperioderContent;
