export default `
body {
    font-family: Source Sans Pro, sans-serif;
    font-size: 12pt;
    line-height: 1.4em;
    margin: 0;
    box-sizing: border-box;
}

.nav-ikon {
    width: 100px;
    height: 65px;
    display: inline-block;
}

.tittel-og-personinfo {
    margin-top: 80px;
}

.header {
    margin-bottom: 20px;
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

h1, h2, h3, h4 {
    margin-bottom: 0px;
}

h1 {
    font-size: 36px;
    margin-top: 30px
}

h2 {
    font-size: 18px;
    margin-top: 18px;
}

h3 {
    font-size: 16px;
    margin-top: 5px;
}

table, td, th {
    border: 1px solid;
    border-collapse:collapse;
}

td, th {
    text-align: left;
    padding: 3px 10px;
}

th {
    vertical-align: top;
    overflow-wrap: break-word;
    hyphens: auto;
}

.tabell-beskrivelse {
    font-size: 80%;
    margin-bottom: 4px;
    line-height: 140%;
}

.høyrejustert {
    text-align: right;
}

.avsnitt {
    margin-bottom: 2rem;
}
`;
