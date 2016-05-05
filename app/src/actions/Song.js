export const DB_SAVE_ITEM = 'DB_SAVE_ITEM';
export function saveItem(item) {
    // generate item id if item is new
    if (item.id === null || item.id === undefined) {
        item.id = guid();
    }


    return (dispatch) => {
        dispatch({
            type: DB_SAVE_ITEM,
            payload: item
        }).then(() => {
            dispatch(saveDb());
        });
    }

}
