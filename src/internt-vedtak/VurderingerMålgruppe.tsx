import React from 'react';

import { MålgruppeFaktaOgVurderingerDto, Vilkårperiode } from './typer/vilkårperiode';
import { Vurdering } from './Vurdering';

export const VurderingerMålgruppe: React.FC<{ målgruppe: Vilkårperiode }> = ({ målgruppe }) => {
    const { medlemskap, utgifterDekketAvAnnetRegelverk } =
        målgruppe.faktaOgVurderinger as MålgruppeFaktaOgVurderingerDto;
    return (
        <>
            <Vurdering navn={'Medlemskap i folketrygden?'} vurdering={medlemskap} />
            <Vurdering
                navn={'Dekkes utgiftene av annet regelverk?'}
                vurdering={utgifterDekketAvAnnetRegelverk}
            />
        </>
    );
};
