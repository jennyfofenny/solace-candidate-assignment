import { NextRequest, NextResponse } from "next/server";
import { AdvocateService, SortType } from "../services/advocateService";

const getSort = (sort: string | null): SortType[] => {
  if (!sort) {
    return [
      { column: "lastName", direction: "asc" }, 
      { column: "firstName", direction: "asc" }];
  }

  const sortArray = sort?.split(",").map(s => {
    return s.split(":");
  })

  return sortArray.map(s => {
    return { column: s[0], direction: s[1] } as SortType;
  });
}

export async function GET(req: NextRequest) {
  // TODO: Still need to add filters
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const sort = getSort(searchParams.get("sort"));

  const data = await AdvocateService.getAll({ limit, sort, page });
  const total = await AdvocateService.countAll();

  return Response.json({ data, total: total[0].total });
}
