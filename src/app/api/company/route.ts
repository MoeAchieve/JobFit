import { createCompany, getAllCompanies } from "@/lib/actions/company";
import { createCompanySchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
) {
  const companies = await getAllCompanies();
  if (!companies) {
    return NextResponse.json({ error: "Something Went Wrong!" }, { status: 404 });
  }
  return NextResponse.json(companies, { status: 200 });
}

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();
    const validated = createCompanySchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors }, { status: 400 });
    }
    
    const company = await createCompany(body);
    return NextResponse.json(company, { status: 201 });
  }
  catch (error) {
    return NextResponse.json({ error: "Failed creating company" }, { status: 500 });
  }
}
