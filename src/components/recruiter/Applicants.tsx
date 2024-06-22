import { currentUser } from "@/lib/auth";
import ApplicantsTable from "./ApplicantsTable";
import { getCompanyByUserId } from "@/lib/actions/user";
import { ICompany } from "@/types";
import CompanyForm from "./CompanyForm";

export default async function Applicants() {
  const user = await currentUser();
  const company: ICompany = await getCompanyByUserId(user.id);
  
  if (!company) {
    return <CompanyForm />;
  }

  return (
    <ApplicantsTable company={company} />
  );
}
