import React from 'react';

import { BeregningsresultatTabell } from './BeregningsresultatTabell';
import { OppsummertBeregningForReise } from './typer';

export const OppsummertBeregningsresultat: React.FC<{
    reiser: OppsummertBeregningForReise[];
}> = ({ reiser }) => {
    return (
        <>
            {reiser.map((reise, reiseIndex) => {
                return (
                    <div key={reiseIndex} style={{ marginBottom: '2rem' }}>
                        <h3>
                            Reise til {reise.aktivitetsadresse ?? 'ukjent adresse'} (
                            {reise.reiseavstandEnVei} km)
                        </h3>
                        <BeregningsresultatTabell oppsummertReise={reise} />
                    </div>
                );
            })}
        </>
    );
};
