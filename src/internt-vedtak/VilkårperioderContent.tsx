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
            <div>
                <strong>{navn}</strong> ({vurdering.resultat})
            </div>
            <div>Svar: {vurdering.svar}</div>
        </NonBreakingDiv>
    );
};
const VilkårperiodeRad: React.FC<{ periode: Vilkårperiode }> = ({ periode }) => {
    return (
        <NonBreakingDiv className={'vilkaarperiode-rad'}>
            <div className={'vilkaarperiode-type'}>
                <strong>{periode.type}</strong>
                <div className={'vilkaarperiode-resultat'}>{resultatIkon(periode.resultat)}</div>
            </div>
            <div className={'vilkaarperiode-rad-content'}>
                <div>Periode: {formaterPeriode(periode)}</div>
                <div>Kilde: {periode.kilde}</div>
                <Begrunnelse begrunnelse={periode.begrunnelse} />
                <KommentarSlettet data={periode} />
                <Vurdering navn={'Medlemskap'} vurdering={periode.delvilkår.medlemskap} />
                <Vurdering navn={'Lønnet'} vurdering={periode.delvilkår.lønnet} />
                <Vurdering
                    navn={'Mottar sykepenger'}
                    vurdering={periode.delvilkår.mottarSykepenger}
                />
            </div>
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
