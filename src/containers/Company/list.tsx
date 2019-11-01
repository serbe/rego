import React, { useState, useEffect } from "react";
import { Table } from "../../components/table";
import { CompanyList } from "../../models/company";

export const Companies: React.FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [companies, setCompanies] = useState<CompanyList[]>([]);

  async function fetchData() {
    const res = await fetch("/api/go/company/list");
    res
      .json()
      .then(res => setCompanies(res.data["CompanyList"]))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "name",
      label: "Наименование",
      link_base: "/companies/",
      link_field: "id"
    },
    {
      field: "address",
      label: "Адрес",
      class_name: "is-hidden-touch"
    },
    {
      field: "scope_name",
      label: "Сфера деятельности",
      class_name: "is-hidden-mobile"
    },
    { field: "phones", label: "Телефоны", array: true },
    {
      field: "faxes",
      label: "Факсы",
      array: true,
      class_name: "is-hidden-touch"
    },
    {
      field: "practices",
      label: "Тренировки",
      array: true,
      class_name: "is-hidden-touch"
    }
  ];

  return hasError ? (
    <div>No data</div>
  ) : (
    <div className="">
      <Table
        data={companies}
        columns={columns}
        hoverable
        narrow
        striped
        paginate={20}
      />
    </div>
  );
};
