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
                <table>
                    <tbody>
                        <tr>
                            <th>Ident</th>
                            <td>{behandling.ident}</td>
                        </tr>
                        <tr>
                            <th>Fagsak</th>
                            <td>{behandling.eksternFagsakId}</td>
                        </tr>

                        <tr>
                            <th>Behandling</th>
                            <td>{behandling.behandlingId}</td>
                        </tr>
                        <tr>
                            <th>Opprettet</th>
                            <td>{formaterNorskDatoTid(behandling.opprettetTidspunkt)}</td>
                        </tr>
                        <tr>
                            <th>Årsak</th>
                            <td>{behandling.årsak}</td>
                        </tr>
                        <tr>
                            <th>Saksbehandler</th>
                            <td>{behandling.saksbehandler}</td>
                        </tr>
                        <tr>
                            <th>Beslutter</th>
                            <td>{behandling.beslutter}</td>
                        </tr>
                        <tr>
                            <th>Resultat</th>
                            <td>{behandling.resultat}</td>
                        </tr>
                        <tr>
                            <th>Vedtakstidspunkt</th>
                            <td>{formaterNorskDatoTid(behandling.vedtakstidspunkt)}</td>
                        </tr>
                    </tbody>
                </table>

                {/* <div>Fagsak: {behandling.eksternFagsakId}</div>
                <div>Behandling: {behandling.behandlingId}</div>

                <div>Opprettet: {formaterNorskDatoTid(behandling.opprettetTidspunkt)}</div>
                <div>Årsak: {behandling.årsak}</div>

                <div style={{ marginTop: '10px' }}>
                    <div>Saksbehandler: {behandling.saksbehandler}</div>
                    {behandling.beslutter && <div>Beslutter: {behandling.beslutter}</div>}
                    <div>Resultat: {behandling.resultat}</div>
                    <div>Vedtakstidspunkt: {formaterNorskDatoTid(behandling.vedtakstidspunkt)}</div>
                </div> */}
            </div>
        </NonBreakingDiv>
    );
};

export default Behandling;
