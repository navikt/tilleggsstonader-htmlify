import React from 'react';

import { Begrunnelse, KommentarSlettet, NonBreakingDiv } from './felles';
import {
    kildeVilkårperiodeTilTekst,
    ResultatVilkårperiode,
    resultatDelvilkårperiodeTilTekst,
    svarVurderingTilTekst,
    typeStønadsperiodeTilTekst,
    Vilkårperiode,
    VurderingVilkårperiode,
} from './typer/vilkårperiode';
import { formaterPeriode } from '../felles/datoFormat';
import { notNullOrUndefined } from '../felles/nullOrUndefined';
import { tekstEllerFeil } from '../felles/tekstutils';
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
                <strong>{navn}</strong> (
                {tekstEllerFeil(resultatDelvilkårperiodeTilTekst, vurdering.resultat)})
            </div>
            <div>Svar: {tekstEllerFeil(svarVurderingTilTekst, vurdering.svar)}</div>
        </NonBreakingDiv>
    );
};
const VilkårperiodeRad: React.FC<{ periode: Vilkårperiode }> = ({ periode }) => {
    return (
        <NonBreakingDiv className={'vilkaarperiode-rad'}>
            <div className={'vilkaarperiode-type'}>
                <strong>{tekstEllerFeil(typeStønadsperiodeTilTekst, periode.type)}</strong>
                <div className={'vilkaarperiode-resultat'}>{resultatIkon(periode.resultat)}</div>
            </div>
            <div className={'vilkaarperiode-rad-content'}>
                <div>Periode: {formaterPeriode(periode)}</div>
                {notNullOrUndefined(periode.aktivitetsdager) && (
                    <div>Aktivitetsdager: {periode.aktivitetsdager}</div>
                )}
                <div>Kilde: {tekstEllerFeil(kildeVilkårperiodeTilTekst, periode.kilde)}</div>
                <Begrunnelse begrunnelse={periode.begrunnelse} />
                <KommentarSlettet data={periode} />
                <Vurdering
                    navn={'Medlemskap i folketrygden?'}
                    vurdering={periode.delvilkår.medlemskap}
                />
                <Vurdering
                    navn={'Dekkes utgiftene av annet regelverk?'}
                    vurdering={periode.delvilkår.dekketAvAnnetRegelverk}
                />
                <Vurdering
                    navn={'Mottar bruker ordinær lønn i tiltaket?'}
                    vurdering={periode.delvilkår.lønnet}
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
