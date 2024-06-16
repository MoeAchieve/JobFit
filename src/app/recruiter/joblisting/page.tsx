import CompanyForm from "@/components/recruiter/CompanyForm";
import JobsTable from "@/components/recruiter/JobsTable";
import NavBar from "@/components/ui/AppBar";
import Footer from "@/components/ui/Footer";
import { currentUser } from "@/lib/auth";
import { ICompany } from "@/types";
import { Container } from "@mui/material";

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
      <NavBar />
      <Container maxWidth="lg" component="main">
        {company.length ? (
          <JobsTable company={company[0]} />
        ) : (
          <CompanyForm />
        )}
      </Container>
      <Footer />
    </>
  );
}
