export const kelvinToFahrenheit = (temp:number) => {
    return Math.round(((temp - 273.15) * 9 / 5 + 32) * 10) / 10
}

export const kelvinToCelsius = (temp:number) => {
    return Math.round((temp - 273.15) * 10) / 10
}

export const longToLocaleFullTime = (dt:number) => {
    return new Date(dt * 1000).toLocaleString()
}

export const longToLocaleDate = (dt:number) => {
    return new Date(dt * 1000).toLocaleDateString()
}

export const longToLocaleTime12 = (dt:number) => {
    return new Date(dt * 1000).toLocaleTimeString('en-US')
}

export const longToLocaleTime24 = (dt:number) => {
    return new Date(dt * 1000).toLocaleTimeString('en-GB')
}

export const longToDate = (dt:number) => {
    return new Date(dt * 1000).toDateString()
}

export const longToYear = (dt:number) => {
    return new Date(dt * 1000).getFullYear()
}

export const longToMonthNum = (dt:number) => {
    return new Date(dt * 1000).getMonth() + 1
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

export const longToMonthStr = (dt:number) => {
    return monthNames[new Date(dt * 1000).getMonth()]
}

export const getDayStr = (dt:number) => {
    const today = new Date().getDay();
    const dtDay = new Date(dt * 1000).getDay();
    return today === dtDay ? "Today" : weekday[dtDay]
}

export const longToMonthWithDate = (dt:number) => {
    const dts = new Date(dt * 1000)
    let day:number|string = dts.getDate(),
        hours:number|string = dts.getHours(),
        minutes:number|string = dts.getMinutes()
    if (day < 10) day = '0' + day
    if (hours < 10) hours = '0' +  hours
    if (minutes < 10) minutes = '0' + minutes
    return `${monthNames[dts.getMonth()]} ${day} ${hours}:${minutes}`
}

export const longToHourMinute = (dt: number) => {
    const dts = new Date(dt * 1000)
    let hours:number|string = dts.getHours(),
        minutes:number|string = dts.getMinutes()
    if (hours < 10) hours = '0' +  hours
    if (minutes < 10) minutes = '0' + minutes
    return `${hours}:${minutes}`
}

export const longToGetDate = (dt:number) => {
    return new Date(dt * 1000).getDate()
}

export const longToGetTime = (dt:number) => {
    return new Date(dt * 1000).getTime()
}

export const msToKmh = (ms:number) => {
    return ms * 3.6
}

interface jsonObj {
    [key:string] : string;
}

export class Country {
    private static datas:jsonObj = {
        AF:	"Afghanistan",
        AX:	"Aland Islands",
        AL:	"Albania",
        DZ:	"Algeria",
        AS:	"American Samoa",
        AD:	"Andorra",
        AO:	"Angola",
        AI:	"Anguilla",
        AQ:	"Antarctica",
        AG:	"Antigua and Barbuda",
        AR:	"Argentina",
        AM:	"Armenia",
        AW:	"Aruba",
        AU:	"Australia",
        AT:	"Austria",
        AZ:	"Azerbaijan",
        BS:	"Bahamas",
        BH:	"Bahrain",
        BD:	"Bangladesh",
        BB:	"Barbados",
        BY:	"Belarus",
        BE:	"Belgium",
        BZ:	"Belize",
        BJ:	"Benin",
        BM:	"Bermuda",
        BT:	"Bhutan",
        BO:	"Bolivia",
        BA:	"Bosnia and Herzegovina",
        BW:	"Botswana",
        BV:	"Bouvet Island",
        BR:	"Brazil",
        VG:	"British Virgin Islands",
        IO:	"British Indian Ocean Territory",
        BN:	"Brunei Darussalam",
        BG:	"Bulgaria",
        BF:	"Burkina Faso",
        BI:	"Burundi",
        KH:	"Cambodia",
        CM:	"Cameroon",
        CA:	"Canada",
        CV:	"Cape Verde",
        KY:	"Cayman Islands",
        CF:	"Central African Republic",
        TD:	"Chad",
        CL:	"Chile",
        CN:	"China",
        HK:	"Hong Kong, SAR China",
        MO:	"Macao, SAR China",
        CX:	"Christmas Island",
        CC:	"Cocos (Keeling) Islands",
        CO:	"Colombia",
        KM:	"Comoros",
        CG:	"Congo??(Brazzaville)",
        CD:	"Congo, (Kinshasa)",
        CK:	"Cook Islands",
        CR:	"Costa Rica",
        CI:	"C??te d'Ivoire",
        HR:	"Croatia",
        CU:	"Cuba",
        CY:	"Cyprus",
        CZ:	"Czech Republic",
        DK:	"Denmark",
        DJ:	"Djibouti",
        DM:	"Dominica",
        DO:	"Dominican Republic",
        EC:	"Ecuador",
        EG:	"Egypt",
        SV:	"El Salvador",
        GQ:	"Equatorial Guinea",
        ER:	"Eritrea",
        EE:	"Estonia",
        ET:	"Ethiopia",
        FK:	"Falkland Islands (Malvinas)",
        FO:	"Faroe Islands",
        FJ:	"Fiji",
        FI:	"Finland",
        FR:	"France",
        GF:	"French Guiana",
        PF:	"French Polynesia",
        TF:	"French Southern Territories",
        GA:	"Gabon",
        GM:	"Gambia",
        GE:	"Georgia",
        DE:	"Germany",
        GH:	"Ghana",
        GI:	"Gibraltar",
        GR:	"Greece",
        GL:	"Greenland",
        GD:	"Grenada",
        GP:	"Guadeloupe",
        GU:	"Guam",
        GT:	"Guatemala",
        GG:	"Guernsey",
        GN:	"Guinea",
        GW:	"Guinea-Bissau",
        GY:	"Guyana",
        HT:	"Haiti",
        HM:	"Heard and Mcdonald Islands",
        VA:	"Holy See??(Vatican City State)",
        HN:	"Honduras",
        HU:	"Hungary",
        IS:	"Iceland",
        IN:	"India",
        ID:	"Indonesia",
        IR:	"Iran, Islamic Republic of",
        IQ:	"Iraq",
        IE:	"Ireland",
        IM:	"Isle of Man",
        IL:	"Israel",
        IT:	"Italy",
        JM:	"Jamaica",
        JP:	"Japan",
        JE:	"Jersey",
        JO:	"Jordan",
        KZ:	"Kazakhstan",
        KE:	"Kenya",
        KI:	"Kiribati",
        KP:	"Korea??(North)",
        KR:	"Korea??(South)",
        KW:	"Kuwait",
        KG:	"Kyrgyzstan",
        LA:	"Lao PDR",
        LV:	"Latvia",
        LB:	"Lebanon",
        LS:	"Lesotho",
        LR:	"Liberia",
        LY:	"Libya",
        LI:	"Liechtenstein",
        LT:	"Lithuania",
        LU:	"Luxembourg",
        MK:	"Macedonia, Republic of",
        MG:	"Madagascar",
        MW:	"Malawi",
        MY:	"Malaysia",
        MV:	"Maldives",
        ML:	"Mali",
        MT:	"Malta",
        MH:	"Marshall Islands",
        MQ:	"Martinique",
        MR:	"Mauritania",
        MU:	"Mauritius",
        YT:	"Mayotte",
        MX:	"Mexico",
        FM:	"Micronesia, Federated States of",
        MD:	"Moldova",
        MC:	"Monaco",
        MN:	"Mongolia",
        ME:	"Montenegro",
        MS:	"Montserrat",
        MA:	"Morocco",
        MZ:	"Mozambique",
        MM:	"Myanmar",
        NA:	"Namibia",
        NR:	"Nauru",
        NP:	"Nepal",
        NL:	"Netherlands",
        AN:	"Netherlands Antilles",
        NC:	"New Caledonia",
        NZ:	"New Zealand",
        NI:	"Nicaragua",
        NE:	"Niger",
        NG:	"Nigeria",
        NU:	"Niue",
        NF:	"Norfolk Island",
        MP:	"Northern Mariana Islands",
        NO:	"Norway",
        OM:	"Oman",
        PK:	"Pakistan",
        PW:	"Palau",
        PS:	"Palestinian Territory",
        PA:	"Panama",
        PG:	"Papua New Guinea",
        PY:	"Paraguay",
        PE:	"Peru",
        PH:	"Philippines",
        PN:	"Pitcairn",
        PL:	"Poland",
        PT:	"Portugal",
        PR:	"Puerto Rico",
        QA:	"Qatar",
        RE:	"R??union",
        RO:	"Romania",
        RU:	"Russian Federation",
        RW:	"Rwanda",
        BL:	"Saint-Barth??lemy",
        SH:	"Saint Helena",
        KN:	"Saint Kitts and Nevis",
        LC:	"Saint Lucia",
        MF:	"Saint-Martin (French part)",
        PM:	"Saint Pierre and Miquelon",
        VC:	"Saint Vincent and Grenadines",
        WS:	"Samoa",
        SM:	"San Marino",
        ST:	"Sao Tome and Principe",
        SA:	"Saudi Arabia",
        SN:	"Senegal",
        RS:	"Serbia",
        SC:	"Seychelles",
        SL:	"Sierra Leone",
        SG:	"Singapore",
        SK:	"Slovakia",
        SI:	"Slovenia",
        SB:	"Solomon Islands",
        SO:	"Somalia",
        ZA:	"South Africa",
        GS:	"South Georgia and the South Sandwich Islands",
        SS:	"South Sudan",
        ES:	"Spain",
        LK:	"Sri Lanka",
        SD:	"Sudan",
        SR:	"Suriname",
        SJ:	"Svalbard and Jan Mayen Islands",
        SZ:	"Swaziland",
        SE:	"Sweden",
        CH:	"Switzerland",
        SY:	"Syrian Arab Republic??(Syria)",
        TW:	"Taiwan",
        TJ:	"Tajikistan",
        TZ:	"Tanzania, United Republic of",
        TH:	"Thailand",
        TL:	"Timor-Leste",
        TG:	"Togo",
        TK:	"Tokelau",
        TO:	"Tonga",
        TT:	"Trinidad and Tobago",
        TN:	"Tunisia",
        TR:	"Turkey",
        TM:	"Turkmenistan",
        TC:	"Turks and Caicos Islands",
        TV:	"Tuvalu",
        UG:	"Uganda",
        UA:	"Ukraine",
        AE:	"United Arab Emirates",
        GB:	"United Kingdom",
        US:	"United States of America",
        UM:	"US Minor Outlying Islands",
        UY:	"Uruguay",
        UZ:	"Uzbekistan",
        VU:	"Vanuatu",
        VE:	"Venezuela??(Bolivarian Republic)",
        VN:	"Viet Nam",
        VI:	"Virgin Islands, US",
        WF:	"Wallis and Futuna Islands",
        EH:	"Western Sahara",
        YE:	"Yemen",
        ZM:	"Zambia",
        ZW:	"Zimbabwe",
    }
   
    public static getCountryName(code:string) {
        return this.datas[code]
    }
}