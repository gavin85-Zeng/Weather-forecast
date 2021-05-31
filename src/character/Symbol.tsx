export default class Symbol {
    private static fahrenheit =  '\u2109'
    private static celsius =  '\u2103'
    private static percent = '\u0025'
    private static ms = 'm/s'
    private static kmh = 'km/h'

    public static get getF() : string {
        return this.fahrenheit
    }
    
    public static get getC() : string {
        return this.celsius
    }
    
    public static get getPercent() : string {
        return this.percent
    }
    
    public static get getMS() : string {
        return  this.ms
    }
    
    public static get getKMH() : string {
        return this.kmh
    }
}
