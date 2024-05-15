export default `
body {
    font-family: Source Sans Pro, sans-serif;
    font-size: 12pt;
    line-height: 1.4em;
    margin: 0;
    box-sizing: border-box;
}

.internt-vedtak-page-break {
    page-break-inside: avoid;
}

.ikon-og-dato {
    position: absolute;
    right: 0px;
    top: 0px;
    margin: 0;
    padding: 0;
}

.nav-ikon {
    width: 100px;
    height: 65px;
    position: relative;
    right: 0px;
    margin: 0;
    padding: 0;
}

.header {
    margin-bottom: 20px;
}

.behandling {
    margin-top: 140px;
}

.vilkaarperiode-rad {
    margin-top: 20px;
}

.vilkaarperiode-rad-content {
    margin-top: 5px;
    margin-left: 5px;
    padding-left: 10px;
    border-left: 2px solid grey;
}

.vilkaarperiode > .vilkaarperiode-rad:first-of-type {
    margin-top: 0;
}

.vilkaarperiode-type {
    margin-bottom: 2px;
}

.vilkaarperiode-resultat {
    display: inline-block;
    height: 24px;
    position: relative;
    top: 5px;
    margin-left: 5px;
}

.vilkårsresultat-ikon {
    display: inline-block;
    width: 24px;
    height: 24px;
    position: relative;
    top: 5px;
    margin:0;
    padding:0;
}

@page {
    @bottom-right {
        content: 'Side ' counter(page) ' av ' counter(pages);
    }
}

.stonad-tittel {
    line-height: 40px;
    margin-top: 20px;
    margin-bottom: 50px;
    width: 85%
}

h2, h3, h4 {
    margin-bottom: 10px;
}

h1 {
    font-size: 36px;
    margin-top: 30px;
    margin-bottom: 20px;
}

h2 {
    font-size: 24px;
    margin-top: 18px;
}

h3 {
    font-size: 20px;
    margin-top: 5px;
}

h4 {
    font-size: 16px;
    margin-top: 0px;
}

.level-2 {
    margin-left: 20px
}

.level-3 {
    margin-left: 40px
}

.level-4 {
    margin-left: 50px
}

.alternativer {
    font-style: italic;
    font-size: 75%;
}

table, td, th {
    border: 1px solid;
    border-collapse:collapse;
}

td, th {
    text-align: left;
    padding: 3px 10px;
}
`;
