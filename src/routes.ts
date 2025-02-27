import express from 'express';
import type { Request, Response } from 'express';

import { logError, logSecureInfo } from './felles/logger';
import genererInterntVedtakHtml from './internt-vedtak/genererInterntVedtakHtml';
import { InterntVedtak } from './internt-vedtak/typer/interntVedtak';
import { IFritekstbrevMedSignatur } from './klage/fritekst/dokumentApiBrev';
import { lagFritekstBrevKlage } from './klage/fritekst/lagFritekstBrevKlage';
import { genererInterntVedtakKlage } from './klage/internt-vedtak/genererInterntVedtakKlage';
import { IKlageDokumentData } from './klage/internt-vedtak/klageInterntVedtakTyper';
import genererSøknadHtml from './søknad/genererSøknadHtml';
import { Søknad } from './søknad/typer';

const router = express.Router();
router.get('/status', (_, res) => {
    res.status(200).end();
});

router.post('/soknad', async (req: Request, res: Response) => {
    const data: Søknad = req.body as Søknad;
    try {
        const html = await genererSøknadHtml(data);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (feil) {
        const error = feil as Error;
        logError(`Generering av dokument (pdf) feilet: Sjekk secure-logs`, req);
        logSecureInfo(`Feilet håndtering av ${JSON.stringify(data)}`, req, feil);

        res.status(500).send(`Generering av søknad feilet: ${error.message}`);
        return;
    }
});

router.post('/internt-vedtak', async (req: Request, res: Response) => {
    const data: InterntVedtak = req.body as InterntVedtak;
    try {
        const html = await genererInterntVedtakHtml(data);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (feil) {
        const error = feil as Error;
        logError(`Generering av internt-vedtak feilet: Sjekk secure-logs`, req);
        logSecureInfo(`Feilet håndtering av ${JSON.stringify(data)}`, req, feil);

        res.status(500).send(`Generering av internt-vedtak feilet: ${error.message}`);
        return;
    }
});

router.post('/klage/fritekst-brev', async (req: Request, res: Response) => {
    const brev = req.body as IFritekstbrevMedSignatur;
    try {
        const html = lagFritekstBrevKlage(brev);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (feil) {
        const error = feil as Error;
        logError(`Generering av fritekstbrev (pdf) feilet: ${error.message}`, req);
        logSecureInfo(`Generering av fritekstbrev (pdf) feilet: ${error}`, req, feil);
        res.status(500).send(`Generering av avansert dokument (pdf) feilet: ${error.message}`);
    }
});

router.post('/klage/internt-vedtak', async (req: Request, res: Response) => {
    const dokument: IKlageDokumentData = req.body as IKlageDokumentData;
    try {
        const html = await genererInterntVedtakKlage(dokument);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
    } catch (feil) {
        const error = feil as Error;
        logError(`Generering av internt-vedtak klage feilet: Sjekk secure-logs`, req);
        logSecureInfo('Generering av internt-vedtak klage feilet', req, error);

        res.status(500).send(`Generering av dokument (pdf) feilet: ${error.message}`);
    }
});

export default router;
