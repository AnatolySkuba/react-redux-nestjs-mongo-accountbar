import { ICompaniesNames, ICompaniesState } from "./companiesSlice";

export const getCompanies = (state: { companies: ICompaniesState }) => state.companies.companies;
export const getCompaniesNames = (state: { companies: ICompaniesNames }) =>
    state.companies.companiesNames;
