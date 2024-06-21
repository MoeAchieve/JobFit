import { getCompanyById, updateCompany } from "@/lib/actions/company";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const company = await getCompanyById(id);
    if (!company) {
      return NextResponse.json({ error: "company not found" }, { status: 404 });
    }

    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed fetching company" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();

    const company = await getCompanyById(id);
    if (!company) {
      return NextResponse.json({ error: "company not found" }, { status: 404 });
    }

    const updatedCompany = await updateCompany(id, body);
    if (!updatedCompany) {
      return NextResponse.json({ error: "Failed updating company" }, { status: 500 });
    }
    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed updating company" }, { status: 500 });
  }
}
