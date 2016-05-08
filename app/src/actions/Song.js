export const SONG_SAVE = 'SONG_SAVE';

export function save(songStr) {
    return({
        type: SONG_SAVE,
        payload: songStr 
    });
}
