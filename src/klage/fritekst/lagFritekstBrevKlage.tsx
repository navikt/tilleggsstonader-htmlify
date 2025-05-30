import * as React from 'react';

import { renderToStaticMarkup } from 'react-dom/server';

import { klageCss } from '../klageCss';
import { Brevhode } from './Brevhode';
import { FritekstbrevMedSignatur } from './dokumentApiBrev';
import { dagensDatoFormatert } from '../klageDatoUtils';

export const lagFritekstBrevKlage = (brevMedSignatur: FritekstbrevMedSignatur) => {
    const brev = brevMedSignatur.brevFraSaksbehandler;

    return renderToStaticMarkup(
        <html lang={'nb'}>
            <head>
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <style type="text/css" dangerouslySetInnerHTML={{ __html: klageCss }} />
                <title>{brev.overskrift}</title>
            </head>
            <body className={'body'}>
                <Brevhode
                    tittel={brev.overskrift}
                    navn={brev.navn}
                    fodselsnummer={brev.personIdent}
                    brevOpprettetDato={brevMedSignatur.datoPlaceholder || dagensDatoFormatert()}
                />
                {brev.avsnitt?.map((avsnitt, index) => (
                    <p key={index}>
                        {avsnitt.deloverskrift && <strong>{avsnitt.deloverskrift} </strong>}
                        {avsnitt.deloverskrift && <br />}
                        {avsnitt.innhold && (
                            <span style={{ whiteSpace: 'pre-wrap' }}>{avsnitt.innhold}</span>
                        )}
                    </p>
                ))}
                <div>
                    <br />
                    <p style={{ float: 'left' }}>
                        <div>Med vennlig hilsen </div>
                        <div>{brevMedSignatur.enhet || 'NAV Arbeid og ytelser'}</div>
                        <br />
                        <div style={{ marginRight: '20px' }}>
                            {brevMedSignatur.saksbehandlersignatur}{' '}
                            {brevMedSignatur.besluttersignatur && (
                                <span style={{ marginLeft: '20px' }}>
                                    {brevMedSignatur.besluttersignatur}
                                </span>
                            )}
                        </div>
                    </p>
                </div>
            </body>
        </html>
    );
};
