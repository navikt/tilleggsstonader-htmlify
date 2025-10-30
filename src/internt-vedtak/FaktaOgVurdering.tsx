import React from 'react';

import { FaktaOgVurderinger, studienivåTilTekst } from './typer/vilkårperiode';
import { Vurdering } from './vilkårperioder/Vurdering';
import { notNullOrUndefined } from '../felles/nullOrUndefined';
import { Stønadstype, stønadstypeTekstTilSmåBokstav } from '../felles/stønadstype';

export const FaktaOgVurdering: React.FC<{
    faktaOgVurderinger: FaktaOgVurderinger;
    stønadstype: Stønadstype;
}> = ({
    faktaOgVurderinger: {
        aktivitetsdager,
        prosent,
        studienivå,
        harUtgifter,
        harRettTilUtstyrsstipend,
        utgifterDekketAvAnnetRegelverk,
        medlemskap,
        lønnet,
        aldersvilkår,
    },
    stønadstype,
}) => {
    return (
        <>
            {notNullOrUndefined(aktivitetsdager) && <div>Aktivitetsdager: {aktivitetsdager}</div>}
            {notNullOrUndefined(prosent) && <div>Prosent: {prosent}</div>}
            {notNullOrUndefined(studienivå) && (
                <div>Studienivå: {studienivåTilTekst[studienivå]}</div>
            )}
            <Vurdering navn={'Mottar bruker ordinær lønn i tiltaket?'} vurdering={lønnet} />
            <Vurdering
                navn={`Har bruker utgifter til ${stønadstypeTekstTilSmåBokstav(stønadstype)}?`}
                vurdering={harUtgifter}
            />
            <Vurdering
                navn={'Har bruker rett til utsstyrsstipend?'}
                vurdering={harRettTilUtstyrsstipend}
            />
            <Vurdering navn={'Medlemskap i folketrygden?'} vurdering={medlemskap} />
            <Vurdering
                navn={'Dekkes utgiftene av annet regelverk?'}
                vurdering={utgifterDekketAvAnnetRegelverk}
            />
            <Vurdering navn={'Aldersvilkår'} vurdering={aldersvilkår} />
        </>
    );
};
