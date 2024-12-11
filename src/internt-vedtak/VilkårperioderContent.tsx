import React from 'react';

import { FaktaOgVurderingerVilkårperioder } from './FaktaOgVurderingerVilkårperioder';
import { Begrunnelse, KommentarSlettet, NonBreakingDiv } from './felles';
import {
    kildeVilkårperiodeTilTekst,
    ResultatVilkårperiode,
    typeStønadsperiodeTilTekst,
    Vilkårperiode,
} from './typer/vilkårperiode';
import { formaterPeriode } from '../felles/datoFormat';
import { tekstEllerFeil } from '../felles/tekstutils';
import IkkeOppfylt from '../ikoner/IkkeOppfylt';
import InfoIkon from '../ikoner/InfoIkon';
import OppfyltIkon from '../ikoner/OppfyltIkon';
import SlettetIkon from '../ikoner/SlettetIkon';

export const VilkårperioderContent: React.FC<{
    navn: 'Målgrupper' | 'Aktiviteter';
    perioder: Vilkårperiode[];
}> = ({ navn, perioder }) => {
    return (
        <NonBreakingDiv className={'vilkaarperiode'}>
            <h2>{navn}</h2>
            {perioder.map((periode) => (
                <NonBreakingDiv className={'vilkaarperiode-rad'}>
                    <TypeOgResultat periode={periode} />
                    <Detaljer periode={periode} />
                </NonBreakingDiv>
            ))}
        </NonBreakingDiv>
    );
};

const Detaljer: React.FC<{
    periode: Vilkårperiode;
}> = ({ periode }) => {
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
                <FaktaOgVurderingerVilkårperioder faktaOgVurderinger={periode.faktaOgVurderinger} />
            </div>
        </NonBreakingDiv>
    );
};

const TypeOgResultat = (props: { periode: Vilkårperiode }) => (
    <div className={'vilkaarperiode-type'}>
        <strong>{tekstEllerFeil(typeStønadsperiodeTilTekst, props.periode.type)}</strong>
        <div className={'vilkaarperiode-resultat'}>{resultatIkon(props.periode.resultat)}</div>
    </div>
);

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
