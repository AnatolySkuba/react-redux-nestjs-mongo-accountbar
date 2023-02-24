import React, { useEffect, useMemo, useState } from "react";
import { Label, Input } from "reactstrap";
import { useDispatch } from "react-redux";

import { changeCompaniesNames } from "../../store/companies/companiesSlice";
import { ICompany } from "../../types";

export const AccountBarFilter = ({ companies }: { companies: ICompany[] }) => {
    const [isCheckboxes, setIsCheckboxes] = useState(false);
    const [values, setValues] = useState<Array<string>>([]);
    const dispatch = useDispatch();

    const uniqueCompaniesNames = useMemo(() => {
        return companies
            ?.map((company) => company.name)
            .filter((name, index, currentName) => currentName.indexOf(name) === index);
    }, [companies]);

    useEffect(() => {
        setValues(uniqueCompaniesNames);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uniqueCompaniesNames?.length]);

    useEffect(() => {
        dispatch(changeCompaniesNames(values));
    }, [dispatch, uniqueCompaniesNames, values]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        values.some((companyName) => companyName === name)
            ? setValues(values.filter((usedName) => usedName !== name))
            : setValues([...values, name]);

        dispatch(changeCompaniesNames(values));
    };

    function toggleCheckboxes() {
        setIsCheckboxes(!isCheckboxes);
    }

    return (
        <form className="form">
            <div className="multipleSelection">
                <div className="selectBox" onClick={toggleCheckboxes}>
                    <select>
                        <option>Filter</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
                <div className={`selectBox  ${isCheckboxes ? "d-flex flex-column" : "d-none"}`}>
                    {uniqueCompaniesNames?.map((name, index) => (
                        <Label key={index} for={name} className="px-2">
                            <Input
                                name={name}
                                id={name}
                                className="me-2"
                                type="checkbox"
                                defaultChecked
                                onChange={onChange}
                            />
                            {name}
                        </Label>
                    ))}
                </div>
            </div>
        </form>
    );
};
