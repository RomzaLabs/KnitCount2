import Counter from "../models/Counter";
import Project from "../models/Project";
import {ProjectStatus} from "../models/ProjectStatus";

const PROJECTS = [
  new Project(
    1,
    "Holiday Hat",
    ProjectStatus.FO,
    [
      new Counter(1, 1, "Increase"),
      new Counter(2, 1, "Decrease"),
      new Counter(3, 1, "Row"),
      new Counter(4, 1, "Repeat")
    ],
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ["https://d2droglu4qf8st.cloudfront.net/2017/07/337881/Knitted-Christmas-Tree-Baby-Hat-Pattern_Large600_ID-2318268.png?v=2318268"],
    new Date(2019, 1, 1),
    new Date(2019, 1, 10),
    new Date(2019, 1, 10)
  ),
  new Project(
    2,
    "Stripey Socks",
    ProjectStatus.FO,
    [
      new Counter(1, 2, "Increase"),
      new Counter(2, 2, "Decrease"),
      new Counter(3, 2, "Row"),
      new Counter(4, 2, "Repeat")
    ],
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ["https://www.knittingpatternsgalore.com/cart/photos/10665s.jpg"],
    new Date(2019, 2, 1),
    new Date(2019, 2, 10),
    new Date(2019, 2, 10)
  ),
  new Project(
    3,
    "Mittens for Mom",
    ProjectStatus.WIP,
    [
      new Counter(1, 3, "Increase"),
      new Counter(2, 3, "Decrease"),
      new Counter(3, 3, "Row"),
      new Counter(4, 3, "Repeat"),
      new Counter(5, 3, "Special Counter")
    ],
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ["https://i.ytimg.com/vi/H79gaA_UCig/maxresdefault.jpg"],
    new Date(2019, 3, 1),
    new Date(2019, 3, 10),
    null
  )
];

export default PROJECTS;
