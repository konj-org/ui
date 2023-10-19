/** @jsxImportSource preact */

import {
  StackingCard,
  StackingCards,
} from "@/components/preact/styled/stacking-cards";

const transactions = [
  {
    variant: "outgoing",
    title: "Brand A",
    date: "09/10/2023",
    timestamp: "11:21",
    amount: 120,
  },
  {
    variant: "outgoing",
    title: "Brand B",
    date: "09/10/2023",
    timestamp: "07:59",
    amount: 31,
  },
  {
    variant: "incoming",
    title: "Wire Transfer",
    date: "08/10/2023",
    timestamp: "12:00",
    amount: 980,
  },
  {
    variant: "outgoing",
    title: "Brand B",
    date: "08/10/2023",
    timestamp: "07:40",
    amount: 27,
  },
] as const;

export const StackingCardsDemo = () => {
  return (
    <StackingCards
      title="Transactions"
      className="max-w-md mx-auto"
      heightRatio={2}
      widthRatio={8}
    >
      {transactions.map(({ amount, date, timestamp, title, variant }) => (
        <StackingCard
          className="flex justify-between items-center px-6"
          key={date + ":" + timestamp}
        >
          <div>
            <p className="my-0 font-semibold text-lg">{title}</p>
            <p className="my-0 font-extralight text-xs flex gap-1">
              <span class="font-normal">{date}</span>
              <span>{timestamp}</span>
            </p>
          </div>
          <div>
            <p
              data-variant={variant}
              className="my-0 font-semibold text-lg data-[variant=incoming]:text-green-800 dark:data-[variant=incoming]:text-green-200"
            >
              {amount.toLocaleString("en-uk", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          </div>
        </StackingCard>
      ))}
      <StackingCard
        className="flex justify-center items-center px-6 dark:bg-neutral-900/80"
        key={"show-more"}
      >
        <a className="block text-center no-underline font-normal">Show more</a>
      </StackingCard>
    </StackingCards>
  );
};
