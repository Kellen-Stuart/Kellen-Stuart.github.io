class GuitarTuning {
    /**
     * @param {string} name - Name of the tuning (e.g. "C# Standard")
     * @param {Array<string>} notes - Array of note names from thickest to thinnest
     */
    constructor(name, notes) {
        this.name = name;
        this.notes = notes;
    }
}

export const eStandard = new GuitarTuning("E Standard", ["E", "A", "D", "G", "B", "E"]);
export const eFlatStandard = new GuitarTuning("Eb Standard", ["Eb", "Ab", "Db", "Gb", "Bb", "Eb"]);