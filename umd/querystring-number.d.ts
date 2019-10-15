export declare function decode(input: string): string | null;
export declare function encode(input: string): string | null;
export declare function parse(query?: string, withoutNumber?: boolean): any;
export declare function stringify(obj: any, prefix?: string): string;
declare const queryString: {
    parse: typeof parse;
    stringify: typeof stringify;
    decode: typeof decode;
    encode: typeof encode;
};
export default queryString;
