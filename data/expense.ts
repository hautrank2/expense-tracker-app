const daysAgo = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const EXPENSE_DATA = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: daysAgo(0), // hôm nay
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: daysAgo(1), // 1 ngày trước
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: daysAgo(2),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: daysAgo(4),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: daysAgo(6),
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.29,
    date: daysAgo(8), // ngoài 7 ngày
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 5.99,
    date: daysAgo(10),
  },
  {
    id: "e8",
    description: "A book",
    amount: 14.99,
    date: daysAgo(15),
  },
  {
    id: "e9",
    description: "Another book",
    amount: 18.59,
    date: daysAgo(20),
  },
];
