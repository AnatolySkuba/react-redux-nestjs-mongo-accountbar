import { Button, Table } from "reactstrap";
import { useSelector } from "react-redux";

import { TABLE_HEADER } from "../../constants";
import { useUpdateAccountMutation } from "../../store/companies/companiesApi";
import { ICompany } from "../../types";
import { getCompaniesNames } from "../../store/companies/companiesSelectors";

export const AccountBarTable = ({ companies }: { companies: ICompany[] }) => {
    const [updateAccountApi] = useUpdateAccountMutation();
    const companiesNames = useSelector(getCompaniesNames);

    const formatDate = (date: string) => {
        return `${date.slice(0, 10).split("-").reverse().join(".")} at ${date
            .toString()
            .slice(11, 16)}`;
    };

    return (
        <Table>
            <thead className="text-primary">
                <tr>
                    {TABLE_HEADER.map((header, index) => (
                        <td key={index}>{header}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {companies?.map(
                    ({ id, account, name, game, amount, currency, createdAt, payday }) => {
                        if (companiesNames?.some((companyName) => companyName === name)) {
                            return (
                                <tr key={id}>
                                    <td>{account}</td>
                                    <td>{name}</td>
                                    <td>{game}</td>
                                    <td>{amount}</td>
                                    <td>{currency}</td>
                                    <td>{formatDate(createdAt)}</td>
                                    <td>
                                        {payday ? (
                                            formatDate(payday)
                                        ) : (
                                            <Button
                                                onClick={() => updateAccountApi(id)}
                                                color="primary"
                                                size="sm"
                                            >
                                                Account paid
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                        } else {
                            return null;
                        }
                    }
                )}
            </tbody>
        </Table>
    );
};
