import { createSlice } from "@reduxjs/toolkit";
import { ICompany } from "../../types";

export interface ICompaniesState {
    companies: ICompany[];
}

export interface ICompaniesNames {
    companiesNames: string[];
}

const initialState: ICompaniesNames = {
    companiesNames: [],
};

export const companiesSlice = createSlice({
    name: "companiesNames",
    initialState,
    reducers: {
        changeCompaniesNames(state, action) {
            state.companiesNames = action.payload;
        },
    },
});

export const { changeCompaniesNames } = companiesSlice.actions;
