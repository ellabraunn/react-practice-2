import { Button } from "./Button.tsx";
import { isFuture, isSameDay, startOfWeek } from "date-fns";
import { endOfWeek } from "date-fns";
import { eachDayOfInterval } from "date-fns";
import { format } from "date-fns";

export type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

type HabitListProps = {
  habits: Habit[];
  deleteHabit: (id: string) => void;
};

export function HabitList({ habits, deleteHabit }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        No habits yet, add one in the form!
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem deleteHabit={deleteHabit} key={habit.id} habit={habit} />
      ))}
    </div>
  );
}

type HabitItemProps = {
  habit: Habit;
  deleteHabit: (id: string) => void;
};

function HabitItem({ habit, deleteHabit }: HabitItemProps) {
  const dates = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-400">streak</span>
        </div>
        <Button onClick={() => deleteHabit(habit.id)} variant="gone">
          Delete
        </Button>
      </div>
      <div className="flex gap-1.5">
        {dates.map((date) => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            disabled={isFuture(date)}
            key={date.toISOString()}
            variant={
              habit.completions.some((d) => isSameDay(date, d))
                ? "primary"
                : "secondary"
            }
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span>{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
