import { getAllCompanies } from "@/lib/actions/company";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
) {
  const companies = await getAllCompanies();
  if (!companies) {
    return NextResponse.json({ error: "Something Went Wrong!" }, { status: 404 });
  }
  return NextResponse.json(companies, { status: 200 });
}
