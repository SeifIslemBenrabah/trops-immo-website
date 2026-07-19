export const paths = {
  home: "/",
  projects: "/projets",
  projectDetails: (projectId: string) => `/projets/${projectId}`,
  apartmentDetails: (projectId: string, apartmentId: string) => `/projets/${projectId}/${apartmentId}`,
  about: "/a-propos",
  contact: () => "/contact",
} as const;

export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({ top: 0, behavior });
}
