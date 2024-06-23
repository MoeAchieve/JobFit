import { currentUser } from "@/lib/auth";
import { ICompany } from "@/types";
import JobsTable from "./JobsTable";
import CompanyForm from "./CompanyForm";
import { getUserCompanies } from "@/lib/actions/company";

export default async function JobListing() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const company: ICompany = await getUserCompanies(user.id) as ICompany;
  if (!company) {
    return <CompanyForm />;
  }

  return <JobsTable company={company} />;
}
