import React from 'react';

import { NonBreakingDiv } from '../felles';
import { VilkårperiodeRad } from './VilkårperiodeRad';
import { Vurdering } from './Vurdering';
import { MålgruppeFaktaOgVurderingerDto, Vilkårperiode } from '../typer/vilkårperiode';

export const Målgrupper: React.FC<{
    målgrupper: Vilkårperiode[];
}> = ({ målgrupper }) => {
    return (
        <NonBreakingDiv className={'vilkaarperiode'}>
            <h2>Målgrupper</h2>
            {målgrupper.map((periode, index) => (
                <VilkårperiodeRad
                    key={index}
                    periode={periode}
                    faktaOgVurderinger={<VurderingerMålgruppe målgruppe={periode} />}
                />
            ))}
        </NonBreakingDiv>
    );
};

const VurderingerMålgruppe: React.FC<{ målgruppe: Vilkårperiode }> = ({ målgruppe }) => {
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
