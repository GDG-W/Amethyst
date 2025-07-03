export type Crumb = {
  prev: string | null;
  label: string;
  href: string;
  next: string | null;
};

export interface BreadcrumbProps {
  crumbs: { [key: string]: Crumb };
}
