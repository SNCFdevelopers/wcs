export class Manifest {
    _layers;
    constructor(layers) {
        this._layers = layers;
    }
    static fromJson(json) {
        if (!json.name || !json.collections) {
            throw new Error('Invalid manifest format');
        }
        if (json.collections.Primitive === undefined || json.collections.Semantic === undefined) {
            throw new Error('Invalid manifest format');
        }
        return new Manifest(json.collections);
    }
    get layers() {
        return this._layers;
    }
    get layersName() {
        return Object.keys(this.layers);
    }
    get layersNames() {
        return this.layersName;
    }
    getModes(layerName) {
        const layer = this.layers[layerName];
        if (!layer) {
            throw new Error(`Layer '${layerName}' not found in manifest.`);
        }
        return layer.modes;
    }
    /**
     * Get all json files names for each mode of each layer
     */
    getJsonFilesNamesByMode() {
        const jsonFilesForMode = new Map();
        for (let layer of this.layersNames) {
            const modes = this.getModes(layer);
            for (let mode in modes) {
                const transformedMode = mode.toLowerCase().replace(" ", "-");
                const preExistedJsonFiles = jsonFilesForMode.get(transformedMode) || [];
                const newJsonFiles = [...preExistedJsonFiles, ...modes[mode]];
                jsonFilesForMode.set(mode.toLowerCase().replace(" ", "-"), newJsonFiles);
            }
        }
        return jsonFilesForMode;
    }
}
