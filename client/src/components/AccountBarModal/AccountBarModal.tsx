import React, { useEffect, useMemo, useState } from "react";
import { Modal, FormGroup, Label, Input, Button, ModalHeader, ModalBody } from "reactstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TfiList } from "react-icons/tfi";

import { CURRENCIES } from "../../constants";
import { ICompany } from "../../types";
import { useAddCompanyMutation } from "../../store/companies/companiesApi";

export const AccountBarModal = ({
    companies,
    isModal,
    toggleModal,
}: {
    companies: ICompany[];
    isModal: boolean;
    toggleModal: () => void;
}) => {
    const [isCreateCompany, setIsCreateCompany] = useState(false);
    const [addCompanyApi] = useAddCompanyMutation();

    const initialState = useMemo(() => {
        return {
            name: companies?.length ? companies[0].name : "",
            game: "",
            amount: "",
            currency: CURRENCIES[0],
        };
    }, [companies]);

    const [values, setValues] = useState(initialState);

    useEffect(() => {
        setValues(initialState);
    }, [initialState]);

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Object.keys(values).length && addCompanyApi(values);
        toggleModal();
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const toggleIsCreateCompany = () => {
        setIsCreateCompany(!isCreateCompany);
    };

    const uniqueCompaniesNames = companies
        ?.map((company) => company.name)
        .filter((name, index, currentName) => currentName.indexOf(name) === index);

    return (
        <Modal isOpen={isModal}>
            <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>{" "}
            <ModalBody>
                <form onSubmit={submitForm}>
                    <div className="row">
                        <FormGroup className="col-md-4">
                            <Label for="name" className="me-2">
                                Company
                            </Label>
                            {isCreateCompany ? (
                                <TfiList onClick={toggleIsCreateCompany} />
                            ) : (
                                <IoIosAddCircleOutline onClick={toggleIsCreateCompany} />
                            )}
                            {isCreateCompany ? (
                                <Input
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={onChange}
                                    placeholder="New Company*"
                                />
                            ) : (
                                <Input type="select" name="name" id="name" onChange={onChange}>
                                    {uniqueCompaniesNames?.map((name, index) => (
                                        <option key={index}>{name}</option>
                                    ))}
                                </Input>
                            )}
                        </FormGroup>
                        <FormGroup className="col-md-6">
                            <Label for="game">Game name</Label>
                            <Input type="text" name="game" id="game" onChange={onChange} />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-4">
                            <Label for="currency">Currency</Label>
                            <Input type="select" name="currency" id="currency" onChange={onChange}>
                                {CURRENCIES.map((currency, index) => (
                                    <option key={index}>{currency}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup className="col-md-6">
                            <Label for="amount">Amount of payment</Label>
                            <Input
                                type="number"
                                required
                                name="amount"
                                id="amount"
                                onChange={onChange}
                            />
                        </FormGroup>
                    </div>
                    <Button color="primary" className="">
                        Create a new account
                    </Button>
                </form>
            </ModalBody>
        </Modal>
    );
};
