import React from 'react';

import { FaktaOgVurderingerAktivitet } from './FaktaOgVurderingerAktivitet';
import { Begrunnelse, KommentarSlettet, NonBreakingDiv } from './felles';
import {
    kildeVilkårperiodeTilTekst,
    ResultatVilkårperiode,
    typeStønadsperiodeTilTekst,
    Vilkårperiode,
} from './typer/vilkårperiode';
import { VurderingerMålgruppe } from './VurderingerMålgruppe';
import { formaterPeriode } from '../felles/datoFormat';
import { Stønadstype } from '../felles/stønadstype';
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

const VilkårperiodeRad: React.FC<{
    periode: Vilkårperiode;
    faktaOgVurderinger: React.ReactNode;
}> = ({ periode, faktaOgVurderinger }) => {
    return (
        <NonBreakingDiv className={'vilkaarperiode-rad'}>
            <div className={'vilkaarperiode-type'}>
                <strong>{tekstEllerFeil(typeStønadsperiodeTilTekst, periode.type)}</strong>
                <div className={'vilkaarperiode-resultat'}>{resultatIkon(periode.resultat)}</div>
            </div>
            <div className={'vilkaarperiode-rad-content'}>
                <div>Periode: {formaterPeriode(periode)}</div>
                <div>Kilde: {tekstEllerFeil(kildeVilkårperiodeTilTekst, periode.kilde)}</div>
                <Begrunnelse begrunnelse={periode.begrunnelse} />
                <KommentarSlettet data={periode} />
                {faktaOgVurderinger}
            </div>
        </NonBreakingDiv>
    );
};

const VilkårperioderContent: React.FC<{
    type: 'Målgrupper' | 'Aktiviteter';
    perioder: Vilkårperiode[];
    stønadstype: Stønadstype;
}> = ({ type, perioder, stønadstype }) => {
    return (
        <NonBreakingDiv className={'vilkaarperiode'}>
            <h2>{type}</h2>
            {perioder.map((periode, index) => (
                <VilkårperiodeRad
                    key={index}
                    periode={periode}
                    faktaOgVurderinger={
                        type === 'Aktiviteter' ? (
                            <FaktaOgVurderingerAktivitet
                                aktivitet={periode}
                                stønadstype={stønadstype}
                            />
                        ) : (
                            <VurderingerMålgruppe målgruppe={periode} />
                        )
                    }
                />
            ))}
        </NonBreakingDiv>
    );
};

export default VilkårperioderContent;
