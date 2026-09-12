import {
  BookOpen,
  Users,
  BookMarked,
  LibraryBig,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Total Books",
    value: "1,250",
    icon: BookOpen,
    description: "Books available in library",
  },
  {
    title: "Total Users",
    value: "320",
    icon: Users,
    description: "Registered library users",
  },
  {
    title: "Borrowed Books",
    value: "86",
    icon: BookMarked,
    description: "Currently borrowed",
  },
  {
    title: "Available Books",
    value: "1,164",
    icon: LibraryBig,
    description: "Currently available",
  },
];