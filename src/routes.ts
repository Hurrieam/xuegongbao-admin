export const defaultRoute = 'dashboard/workplace';

export const routes = [
  {
    name: "仪表盘",
    key: "dashboard/workplace",
  },
  {
    name: "电话簿",
    key: "dashboard/phonebook",
  },
  {
    name: "学生留言",
    key: "dashboard/comment",
  },
  {
    name: "咨询预约",
    key: "dashboard/reservation",
  },
  {
    name: "宿舍报修",
    key: "dashboard/repairs",
  },
  {
    name: "失物招领",
    key: "dashboard/lostandfound",
  },
  {
    name: "食堂评估",
    key: "dashboard/evaluate",
  },
  {
    name: "系统信息",
    key: "dashboard/system",
  }
];

export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};
