import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Student = () => {
  const [student, setStudent] = useState(null);
  const [studentDelete, setStudentDelete] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const history = useHistory();

  const dataTableFuncMap = {
    globalFilter: setGlobalFilter,
  };

  function deleteStudent(data) {
    return axios
      .delete(`http://localhost:3000/user/${data._id}`)
      .then((res) => {
        if (res.data.result.acknowledged) {
          setStudentDelete(res.data.acknowledged);
          alert(data.firstName + " " + data.lastName + " deleted.");
        } else {
          alert("Unable to deleted the student.");
        }
      });
  }
  useEffect(() => {
    axios
      .get("http://localhost:3000/user")
      .then((data) => setStudent(data.data.result));
  }, [studentDelete]);

  const renderHeader = (globalFilterKey) => {
    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) =>
            dataTableFuncMap[`${globalFilterKey}`](e.target.value)
          }
          placeholder="Global Search"
        />
      </span>
    );
  };

  const header = renderHeader("globalFilter");
  const actionEdit = (rowData) => {
    return (
      <Link
        to={{
          pathname: `/`,
          state: { data: rowData },
        }}
      >
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-parimey p-mr-2"
        />
      </Link>
    );
  };
  const actionDelete = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-parimey p-mr-2"
        onClick={() => {
          deleteStudent(rowData);
        }}
      />
    );
  };

  const addStudent = () => {
    history.push("/");
  };

  return (
    <div className="mt-5">
      <div>
        <Button
          className="p-button-rounded p-button-parimey p-mr-2"
          onClick={() => {
            addStudent();
          }}
        >
          Add new student
        </Button>
      </div>
      <div className="card">
        <h1 className="py-3">Student details</h1>

        <DataTable
          value={student}
          paginator
          rows={10}
          header={header}
          globalFilter={globalFilter}
          selectionMode="single"
          dataKey="id"
          stateStorage="custom"
          emptyMessage="No teams found."
        >
          <Column field="firstName" header="First Name" sortable></Column>
          <Column field="lastName" header="Last Name" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="contact" header="Contact" sortable></Column>
          <Column field="address.city" header="City" sortable></Column>
          <Column field="address.state" header="State" sortable></Column>
          <Column className="edit" body={actionEdit}></Column>
          <Column className="delete" body={actionDelete}></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Student;
