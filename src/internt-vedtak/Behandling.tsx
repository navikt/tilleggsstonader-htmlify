import React from 'react';

import { NonBreakingDiv } from './felles';
import { Behandlinginfo } from './typer/interntVedtak';
import { formaterNorskDatoTid } from '../felles/datoFormat';
import { tittelInterntVedtak } from '../felles/stønadstype';

const Behandling: React.FC<{ behandling: Behandlinginfo }> = ({ behandling }) => {
    return (
        <NonBreakingDiv>
            <div className={'behandling'}>
                <h1>{tittelInterntVedtak(behandling.stønadstype)}</h1>
                <div>Ident: {behandling.ident}</div>

                <div>Fagsak: {behandling.eksternFagsakId}</div>
                <div>Behandling: {behandling.behandlingId}</div>

                <div>Opprettet: {formaterNorskDatoTid(behandling.opprettetTidspunkt)}</div>
                <div>Årsak: {behandling.årsak}</div>

                <div style={{ marginTop: '10px' }}>
                    <div>Saksbehandler: {behandling.saksbehandler}</div>
                    {behandling.beslutter && <div>Beslutter: {behandling.beslutter}</div>}
                    <div>Resultat: {behandling.resultat}</div>
                    <div>Vedtakstidspunkt: {formaterNorskDatoTid(behandling.vedtakstidspunkt)}</div>
                </div>
            </div>
        </NonBreakingDiv>
    );
};

export default Behandling;
