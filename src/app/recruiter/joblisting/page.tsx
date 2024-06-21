import CompanyForm from "@/components/recruiter/CompanyForm";
import JobsTable from "@/components/recruiter/JobsTable";
import { currentUser } from "@/lib/auth";
import { ICompany } from "@/types";

const fetchUserCompany = async (id: string) => {
  const data = await fetch(`http://localhost:3000/api/user/${id}/company/`);
  const company = await data.json();
  return company;
};

export default async function Page() {
  const user = await currentUser();
  const company: ICompany[] = await fetchUserCompany(user!.id);
  return (
    <>
        {company.length ? (
          <JobsTable company={company[0]} />
        ) : (
          <CompanyForm />
        )}
    </>
  );
}
