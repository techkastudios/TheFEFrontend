export interface ReporterFilter {
  id: number;
  text: string;
}

export interface CategoryChildren {
  id: number;
  name: string;
}

export interface CategoryFilter {
  id: number;
  name: string;
  children: CategoryChildren[]
}
