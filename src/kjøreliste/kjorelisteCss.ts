export default `
body {
    font-family: Source Sans Pro, sans-serif;
    font-size: 12pt;
    line-height: 1.4em;
    margin: 0;
    box-sizing: border-box;
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

.level-2 {
    margin-left: 10px;
    page-break-inside: avoid;
}

.level-3 {
    margin-left: 20px;
    page-break-inside: avoid;
}



.uke {
    /*border-left: 4px solid #003366;
    background: #fff;*/
    padding: 10px 15px;
    /*margin-bottom: 12px;*/
}

.spm {
    font-weight: bold;   
}

.dag {
    margin-left: 10px;
    padding: 3px 0;
    border-bottom: 1px solid #eee;
    font-size: 0.95em;
}

.dag:last-child {
    border-bottom: none;
}

.label {
    font-weight: bold;
}

.verdi {
    margin-left: 5px;
}
`;
