# tilleggsstonader-htmlify

App for å generere html ut fra json som skal brukes for å generere pdf.

- Søknad - pdf
- Sak - internt vedtak

## Kjøre app lokalt

`yarn start:dev`

## Teste generert HTML lokalt

### Internt vedtak

I `tilleggsstonader-sak:InterntVedtakServiceTest` er det laget en test gjør kall mot http://localhost:8001 med
syntetiske testdata. 