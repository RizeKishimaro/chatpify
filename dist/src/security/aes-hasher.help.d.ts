export declare class CryptoService {
    private readonly algorithm;
    private readonly ivLength;
    private readonly key;
    encrypt(text: string): string;
    decrypt(text: string): string;
}
