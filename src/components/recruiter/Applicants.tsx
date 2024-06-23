import { currentUser } from "@/lib/auth";
import ApplicantsTable from "./ApplicantsTable";
import { getCompanyByUserId } from "@/lib/actions/user";
import { ICompany } from "@/types";
import CompanyForm from "./CompanyForm";

export default async function Applicants() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const company: ICompany = await getCompanyByUserId(user.id) as ICompany;
  if (!company) {
    return <CompanyForm />;
  }

  return (
    <ApplicantsTable company={company} />
  );
}
