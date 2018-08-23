/*
 *  hasher public interface
 *  
 *  Usage:
 *      // Display object with hashes, db match, etc.
 *      hasher.getRomData(someFileInput.files[0])
 *          .then(data => console.log(data));
 * 
 *      // Convenience method to get binary data from a File object
 *      hasher.getFileBytes(someFileInput.files[0])
 *          .then(buffer => console.log(buffer));
 * 
 *  Webpack:
 *      In the root directory, run the command `npm run build`.
 *      This runs webpack, and copies the bundle and the ROM
 *      database to the server folder.
 * 
 *  Test Server:
 *      Build the project as described above first. From the
 *      "server" directory, run the command `node index.js`.
 *      You can the access the test page at 
 *      http://localhost:8000/
 */


import Buffer from './Buffer';
// Apply Buffer shim (needed by sha1 library and for slice method)
if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}


import RomData from './RomData';
import Rom from './Rom';





/** Returns a promise that resolves to an object containing metadata about a ROM
 *  @param {File} romFile
 */
function getRomData(romFile) {
    // if (rom instanceof File || rom instanceof Blob) {
    //     return getFileBytes(rom).then(data => RomData.getData(data, filename));
    // } else {
    //     return RomData.getData(rom, filename);
    // }
    var rom = new Rom(romFile);
    return RomData.getData(rom);
}

/**
 * Accepts a File object and returns a promise that resolves to a Uint8Array
 * @param {File | Blob} file 
 */
function getFileBytes(file) {
    // What a pain
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function () {
            resolve(this.result);
        };
        reader.onerror = function (er) {
            reject();
        };
        reader.readAsArrayBuffer(file);
    }).then(arrayBuffer => {
        return new Buffer(arrayBuffer);
    });
}



export { getRomData, getFileBytes };
