import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { Input } from '../../components/input';
import { Button } from '../../components/button';
// import { Select } from '../../components/select';
import { Certificate } from '../../models/certificate';
// import { SelectItem } from '../../models/selectitem';
import { fetchData } from '../../helpers/utils';

export const CertificateItem: FC<{}> = () => {
  const { id } = useParams();
  const [hasError, setErrors] = useState(false);
  const [certificate, setCertificate] = useState<Certificate>();

  useEffect(() => {
    if (id) {
      fetchData(`/api/go/certificate/item/${id}`)
        .then((responseJson) =>
          responseJson.Certificate ? setCertificate(responseJson.Certificate) : setErrors(true),
        )
        .catch((error) => setErrors(error));
    }
  }, [id]);

  // useEffect(() => {
  //   if (id) {
  //     fetchData(`/api/go/scope/select`)
  //       .then(responseJson =>
  //         responseJson.SelectItem ? setScopes(responseJson.SelectItem) : setErrors(true),
  //       )
  //       .catch(error => setErrors(error));
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (certificate) {
  //     setScope(scopes.find(v => v.id === company.scope_id));
  //     setEmails(addEmptyString(company.emails));
  //     setPhones(addEmptyString(numberToString(company.phones)));
  //     setFaxes(addEmptyString(numberToString(company.faxes)));
  //   }
  // }, [company, scopes]);

  // const Submit = () => {
  //   if (company && scopes && scope) {
  //     let values = {
  //       id: company.id,
  //       name: company.name,
  //       address: company.address,
  //       scope_id: scopes.filter((item) => item.name === scope.name).map((item) => item.id)[0],
  //       note: company.note,
  //       emails: emails.filter((value) => value !== ""),
  //       phones: phones.filter((value) => value !== "").map((value) => parseInt(value, 10)),
  //       faxes: faxes.filter((value) => value !== "").map((value) => parseInt(value, 10)),
  //     };

  //     // Object.keys(values).forEach((key) => {
  //     //   if (
  //     //     !Array.isArray(values[key]) &&
  //     //     (values[key] === undefined || values[key] === "")
  //     //   ) {
  //     //     delete values[key];
  //     //   }
  //     // });

  //     // this.close();
  //   }
  // }

  return (
    <div className="container mw768">
      {!hasError && certificate ? (
        <div>
          <Input
            name="note"
            value={certificate.num}
            label
            placeholder="Серийный номер удостоверения"
            iconLeft="tag"
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setCertificate({ ...certificate, num: event.currentTarget.value })
            }
          />

          <Input
            name="note"
            value={certificate.note}
            label
            placeholder="Заметка"
            iconLeft="sticky-note"
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setCertificate({ ...certificate, note: event.currentTarget.value })
            }
          />

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <Button
                color="primary"
                // @click="submit"
              >
                Сохранить
              </Button>
            </div>
            <div className="control">
              <Button>Закрыть</Button>
            </div>
            <div className="control">
              <Button
                color="danger"
                // onClick={() => {return confirm('Вы действительно хотите удалить эту запись?')}}
              >
                Удалить
              </Button>
            </div>
          </div>

          {/* <button className="button" onClick={handleSubmit(onSubmit)}>
            on submit
          </button>
          <Button className="button" onClick={handleSubmit(onSubmit)}>
            on submit
          </Button> */}
        </div>
      ) : null}
    </div>
  );
};
