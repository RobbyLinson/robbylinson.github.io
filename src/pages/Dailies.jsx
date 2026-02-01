import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

// Sample daily tasks - we'll make this customizable later
const DEFAULT_TASKS = [
  { id: 1, text: 'One LeetCode Problem', completed: false },
  { id: 2, text: 'Apply for one Job', completed: false },
  { id: 3, text: '10 Minutes of Core or Stretching', completed: false },
  { id: 4, text: 'Read', completed: false },
  { id: 5, text: 'Work on side project', completed: false },
];

function Dailies() {
  const [tasks, setTasks] = useState([]);
  const [, setLastResetDate] = useState(null);

  // Get today's date in Dublin timezone
  const getTodayInDublin = () => {
    const dublinDate = new Date().toLocaleDateString('en-IE', {
      timeZone: 'Europe/Dublin',
    });
    return dublinDate;
  };

  // Initialize tasks from localStorage or defaults
  useEffect(() => {
    const storedTasks = localStorage.getItem('dailyTasks');
    const storedDate = localStorage.getItem('lastResetDate');
    const todayInDublin = getTodayInDublin();

    // If it's a new day in Dublin, reset tasks
    if (storedDate !== todayInDublin) {
      setTasks(DEFAULT_TASKS);
      setLastResetDate(todayInDublin);
      localStorage.setItem('dailyTasks', JSON.stringify(DEFAULT_TASKS));
      localStorage.setItem('lastResetDate', todayInDublin);
    } else if (storedTasks) {
      // Load saved tasks for today
      setTasks(JSON.parse(storedTasks));
      setLastResetDate(storedDate);
    } else {
      // First time setup
      setTasks(DEFAULT_TASKS);
      setLastResetDate(todayInDublin);
      localStorage.setItem('dailyTasks', JSON.stringify(DEFAULT_TASKS));
      localStorage.setItem('lastResetDate', todayInDublin);
    }
  }, []);

  // Toggle task completion
  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('dailyTasks', JSON.stringify(updatedTasks));
  };

  // Calculate progress
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          to="/"
          className="text-primary hover:text-secondary underline transition-colors inline-block mb-4"
        >
          ← Back to Home
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Daily Tasks</CardTitle>
            <p className="text-muted-foreground mt-2">
              {getTodayInDublin()} • {completedCount}/{totalCount} completed
            </p>
          </CardHeader>
          <CardContent>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 rounded border-primary text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                  />
                  <span
                    className={`flex-1 ${
                      task.completed
                        ? 'line-through text-muted-foreground'
                        : 'text-foreground'
                    }`}
                  >
                    {task.text}
                  </span>
                </label>
              ))}
            </div>

            {/* Motivational message when all done */}
            {completedCount === totalCount && totalCount > 0 && (
              <div className="mt-6 p-4 bg-primary/10 border border-primary rounded-lg text-center">
                <p className="text-primary font-semibold">
                  🎉 All tasks completed! Great work today!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dailies;
