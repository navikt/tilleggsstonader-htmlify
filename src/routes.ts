import express from 'express';
import type { Request, Response } from 'express';

import { logError, logSecureInfo } from './felles/logger';
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
        res.setHeader('Content-Type', 'application/html');
        res.end(html);
    } catch (feil) {
        const error = feil as Error;
        logError(`Generering av dokument (pdf) feilet: Sjekk secure-logs`, req);
        logSecureInfo(`Feilet håndtering av ${data}`, req, feil);

        return res.status(500).send(`Generering av søknad feilet: ${error.message}`);
    }
});

export default router;
