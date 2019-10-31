export type Certificate = {
  id: number;
  num?: string;
  contact_id?: number;
  company_id?: number;
  cert_date?: string;
  note?: string;
};

export type CertificateList = {
  id: number;
  num?: string;
  contact_id?: number;
  contact_name?: string;
  company_id?: number;
  company_name?: string;
  cert_date?: string;
  note?: string;
};
