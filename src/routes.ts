export const Path = {
  root: '/',
  showAll: '/',
  showActive: '/active',
  showCompleted: '/completed',
  detail: '/detail/:id',
  login: '/login',
};
export const Paths = {
  main: [Path.showAll, Path.showActive, Path.showCompleted],
};

export interface DetailMatchParams {
  id: string;
}
