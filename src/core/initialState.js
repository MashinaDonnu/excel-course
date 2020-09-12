import {defaultStyles} from "@/constants";
import {storage} from "@core/utils";

export const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    styleState: {},
    tableName: 'New Table',
    currentText: '',
    currentStyles: defaultStyles
}

const normalize = state => ({
    ...state,
    currentText: '',
    currentStyles: defaultStyles
})

export const initialState = () => {
   return normalize(storage('excel-state')) ? storage('excel-state') : defaultState
}
