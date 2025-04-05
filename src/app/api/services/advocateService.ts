import { db } from "@/app/db";
import { advocates } from "@/app/db/schema";
import { asc, desc, count } from "drizzle-orm";

export type SortType = {
  column: string;
  direction: "asc" | "desc";
}

type AdvocateGetAllType = {
  limit: number;
  page: number;
  sort: SortType[];
}

const validSortColumns: Record<string, any> = {
  firstName: advocates.firstName,
  lastName: advocates.lastName,
  degree: advocates.degree,
  yearsOfExperience: advocates.yearsOfExperience
}

export const AdvocateService = {
  getAll: async ({ limit, sort, page }: AdvocateGetAllType) => {
    const orderByClauses = sort.map(({ column, direction }) => {
      const dbCol = validSortColumns[column];
      if (!dbCol) throw new Error(`Invalid sort column: ${column}`);
      return direction === "asc" ? asc(dbCol) : desc(dbCol);
    });

    let query = db
      .select()
      .from(advocates)
      .orderBy(...orderByClauses)
      .offset((page - 1) * limit)
      .limit(limit);

    return await query;
  },
  countAll: async () => {
    return await db
      .select({ total: count() })
      .from(advocates)
  }
}
