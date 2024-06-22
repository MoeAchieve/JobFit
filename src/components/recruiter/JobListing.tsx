import { getCompanyByUserId } from "@/lib/actions/user";
import { currentUser } from "@/lib/auth";
import { ICompany } from "@/types";
import JobsTable from "./JobsTable";
import CompanyForm from "./CompanyForm";

export default async function JobListing() {
  const user = await currentUser();
  const company: ICompany = await getCompanyByUserId(user.id);
  if (!company) {
    return <CompanyForm />;
  }

  return <JobsTable company={company} />;
}