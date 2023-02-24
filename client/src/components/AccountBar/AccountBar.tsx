import { useState } from "react";
import { Button } from "reactstrap";

import { useGetCompaniesQuery } from "../../store/companies/companiesApi";
import { getCompanies } from "../../store/companies/companiesSelectors";
import { ICompany } from "../../types";
import { AccountBarFilter } from "../AccountBarFilter/AccountBarFilter";
import { AccountBarModal } from "../AccountBarModal/AccountBarModal";
import { AccountBarTable } from "../AccountBarTable/AccountBarTable";

export const AccountBar = () => {
    const [isModal, setIsModal] = useState(false);
    const data = useGetCompaniesQuery(getCompanies);
    const companies: ICompany[] = data?.data;

    const toggleModal = () => {
        setIsModal(!isModal);
    };

    return (
        <>
            <div className="d-flex justify-content-end position-relative mt-4">
                <AccountBarFilter companies={companies} />
                <Button onClick={toggleModal} color="primary" size="sm">
                    Add account
                </Button>
            </div>
            <AccountBarModal companies={companies} isModal={isModal} toggleModal={toggleModal} />
            <AccountBarTable companies={companies} />
        </>
    );
};
