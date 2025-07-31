import buildProgress from "./devProgress";

const totalPoints = buildProgress.reduce((sum, task) => sum + task.weight, 0);
const earnedPoints = buildProgress.reduce((sum, task) => {
  return sum + (task.status === "✅" ? task.weight : 0);
}, 0);

const scorePercent = Math.round((earnedPoints / totalPoints) * 100);

console.log(`🧭 Build Progress: ${scorePercent}% complete`);

