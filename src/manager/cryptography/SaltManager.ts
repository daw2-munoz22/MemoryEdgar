class SaltManager {
    private generatedSalt: string;

    /**
     * Genera un string de salt utilizando crypto.getRandomValues.
     * @param {number} length - Número de bytes para el salt.
     * @returns {string} Un string de salt en formato hexadecimal.
     */
    constructor() {
        this.generatedSalt = this.generateSalt();
    }

    private generateSalt(): string {
        const array = new Uint8Array(8);
        window.crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    public getSalt(): string {
        return this.generatedSalt;
    }
}
export default SaltManager;