import React from 'react';
import M from 'materialize-css';

export default class CurrencyList extends React.Component{
    constructor(props){
        super(props);
        this.state={"sender_currency":""};
    }
    componentDidMount(){
        this.getCurrency()
        .then(()=>{
            this.sortSelect(document.getElementById("sender_currency"));
            document.getElementById("sender_currency").value=this.state.sender_currency;
            M.AutoInit();
        });
    }
    getCurrency(){        
        return new Promise((resolve, reject)=>{
            fetch("https://api.ipdata.co/currency?api-key=6865651ab2ddad0e2c07f4405277d8547e6ab89a5a7de3e98248febb")
            .then(async (res)=>{
                let currency_code=(await res.json()).code.toLowerCase();
                this.setState({"sender_currency":currency_code});
                resolve();
            })
            .catch((err)=>{
                console.error(err);
                this.setState({"sender_currency":"cad"});
                resolve();
            });
        });
    }
    sortSelect(selElem) {
        var tmpAry = [];
        for (let i=0;i<selElem.options.length;i++) {
            tmpAry[i] = []
            tmpAry[i][0] = selElem.options[i].text;
            tmpAry[i][1] = selElem.options[i].value;
        }
        tmpAry.sort();
        while (selElem.options.length > 0) {
            selElem.options[0] = null;
        }
        for (let i=0;i<tmpAry.length;i++) {
            var op = new Option(tmpAry[i][0], tmpAry[i][1]);
            selElem.options[i] = op;
        }
        return;
    }
    render(){
        return(
            <select name="currency" id="sender_currency">
                <option value="afn">Afghanistan Afghani</option>
                <option value="all">Albanian Lek</option>
                <option value="amd">Armenian Dram</option>
                <option value="ang">Netherlands Antillian Guilder</option>
                <option value="aoa">Kwanza</option>
                <option value="ars">Argentine Peso</option>
                <option value="aud">Australian Dollar</option>
                <option value="awg">Aruban Guilder</option>
                <option value="azn">Azerbaijan Manat</option>
                <option value="bam">Convertible Marks</option>
                <option value="bbd">Barbados Dollar</option>
                <option value="bdt">Bangladeshi Taka</option>
                <option value="bgn">Lev, Bulgarian Lev</option>
                <option value="bmd">Bermuda Dollar</option>
                <option value="bnd">Brunei Dollar</option>
                <option value="bob">Boliviano, Mvdol</option>
                <option value="brl">Brazil Real</option>
                <option value="bsd">Bahamian Dollar</option>
                <option value="bwp">Pula</option>
                <option value="bzd">Belize Dollar</option>
                <option value="cad">Canadian Dollar</option>
                <option value="cdf">Franc Congolais</option>
                <option value="chf">Swiss Franc</option>
                <option value="cny">Yuan Renminbi</option>
                <option value="cop">Colombian Peso</option>
                <option value="crc">Costa Rican Colon</option>
                <option value="cve">Cape Verde Escudo</option>
                <option value="czk">Czech Koruna</option>
                <option value="dkk">Danish Krone</option>
                <option value="dop">Dominican Peso</option>
                <option value="dzd">Algerian Dinar</option>
                <option value="egp">Egyptian Pound</option>
                <option value="etb">Ethiopian Birr</option>
                <option value="eur">European Currency Unit</option>
                <option value="fjd">Fiji Dollar</option>
                <option value="fkp">Falkland Islands Pound</option>
                <option value="gbp">Pound Sterling</option>
                <option value="gel">Lari</option>
                <option value="gip">Gibraltar Pound</option>
                <option value="gmd">Dalasi</option>
                <option value="gtq">Guatemalan Quetza</option>
                <option value="gyd">Guyana Dollar</option>
                <option value="hkd">Hong Kong Dollar</option>
                <option value="hnl">Honduran Lempira</option>
                <option value="hrk">Croatian Kuna</option>
                <option value="htg">Haiti Gourde</option>
                <option value="huf">Forint</option>
                <option value="idr">Indonesian Rupiah</option>
                <option value="ils">New Israeli Sheqel</option>
                <option value="inr">Indian Rupee, Ngultrum</option>
                <option value="isk">Iceland Krona</option>
                <option value="jmd">Jamaican Dollar</option>
                <option value="kes">Kenyan Shilling</option>
                <option value="kgs">Kyrgyzstan Som</option>
                <option value="khr">Cambodian Riel</option>
                <option value="kwd">Kuwaiti Dinar</option>
                <option value="kzt">Kazakhstan Tenge</option>
                <option value="lak">Laos Kip</option>
                <option value="lbp">Lebanese Pound</option>
                <option value="lkr">Sri Lanka Rupee</option>
                <option value="lrd">Liberian Dollar</option>
                <option value="lsl">Rand, Loti</option>
                <option value="mad">Moroccan Dirham</option>
                <option value="mdl">Moldovan Leu</option>
                <option value="mkd">Macedonian Denar</option>
                <option value="mmk">Myanmar Kyat</option>
                <option value="mnt">Mongolian Tugrik</option>
                <option value="mop">Pataca</option>
                <option value="mro">Mauritanian Ouguiya</option>
                <option value="mur">Mauritius Rupee</option>
                <option value="mvr">Maldives Rufiyaa</option>
                <option value="mwk">Kwacha</option>
                <option value="mxn">Mexican Peso, Mexican Unidad de Inversion (UDI)</option>
                <option value="myr">Malaysian Ringgit</option>
                <option value="mzn">Mozambique Metical</option>
                <option value="nad">Rand, Namibia Dollar</option>
                <option value="ngn">Nigerian Naira</option>
                <option value="nio">Nicaraguan Cordoba Oro</option>
                <option value="nok">Norwegian Krone</option>
                <option value="npr">Nepalese Rupee</option>
                <option value="nzd">New Zealand</option>
                <option value="pab">Balboa</option>
                <option value="pen">Peru Nuevo Sol</option>
                <option value="pgk">Papua New Guinea Kina</option>
                <option value="php">Philippine Peso</option>
                <option value="pkr">Pakistan Rupee</option>
                <option value="pln">Poland Zloty</option>
                <option value="qar">Qatari Rial</option>
                <option value="ron">Romania Leu</option>
                <option value="rsd">Serbia Dinar</option>
                <option value="rub">Russian Ruble, Russian Ruble</option>
                <option value="sar">Saudi Riyal</option>
                <option value="sbd">Solomon Islands Dollar</option>
                <option value="scr">Seychelles Rupee</option>
                <option value="sek">Swedish Krona</option>
                <option value="sgd">Singapore Dollar</option>
                <option value="shp">St. Helena Pound</option>
                <option value="sll">Sierra Leone Leone</option>
                <option value="sos">Somalia Shilling</option>
                <option value="srd">Suriname Dollar</option>
                <option value="std">Sao Tome and Principe Dobra</option>
                <option value="svc">El Salvador Colon</option>
                <option value="szl">Swaziland Lilangeni</option>
                <option value="thb">Thai Baht</option>
                <option value="tjs">Tajikistan Somoni</option>
                <option value="top">Tonga Pa'anga</option>
                <option value="try">Turkey Lira</option>
                <option value="ttd">Trinidad and Tobago Dollar</option>
                <option value="twd">New Taiwan Dollar</option>
                <option value="tzs">Tanzanian Shilling</option>
                <option value="uah">Hryvnia</option>
                <option value="uyu">Peso Uruguayo</option>
                <option value="uzs">Uzbekistan Sum</option>
                <option value="wst">Tala</option>
                <option value="xcd">East Caribbean Dollar</option>
                <option value="yer">Yemeni Rial</option>
                <option value="zar">South Africa Rand</option>
                <option value="usd">US Dollar</option>
                <option value="aed">UAE Dirham</option>
                <option value="zmw">Zambian kwacha</option>	
            </select>
        );
    }
}