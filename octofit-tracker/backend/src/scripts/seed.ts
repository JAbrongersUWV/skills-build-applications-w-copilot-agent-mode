import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'maya.chen',
        email: 'maya.chen@example.com',
        profile: { firstName: 'Maya', lastName: 'Chen', goal: 'Build endurance', weeklyTarget: 4 },
      },
      {
        username: 'jordan.rivera',
        email: 'jordan.rivera@example.com',
        profile: { firstName: 'Jordan', lastName: 'Rivera', goal: 'Improve strength', weeklyTarget: 3 },
      },
      {
        username: 'samira.patel',
        email: 'samira.patel@example.com',
        profile: { firstName: 'Samira', lastName: 'Patel', goal: 'Stay consistent', weeklyTarget: 5 },
      },
    ]);

    const teams = await Team.create([
      { name: 'Sunrise Striders', members: [users[0]._id, users[2]._id] },
      { name: 'Peak Performers', members: [users[1]._id] },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'running', value: 5.2, recordedAt: new Date('2026-08-28T07:30:00Z') },
      { userId: users[1]._id, type: 'cycling', value: 18.4, recordedAt: new Date('2026-08-29T17:45:00Z') },
      { userId: users[2]._id, type: 'strength', value: 42, recordedAt: new Date('2026-08-30T09:00:00Z') },
      { userId: users[0]._id, type: 'yoga', value: 35, recordedAt: new Date('2026-08-31T18:15:00Z') },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, score: 1280, rank: 1 },
      { userId: users[2]._id, score: 1145, rank: 2 },
      { userId: users[1]._id, score: 980, rank: 3 },
    ]);

    await Workout.create([
      {
        name: 'Foundation Strength',
        description: 'A balanced full-body session for building consistent strength.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Incline push-up', sets: 3, reps: 10 },
          { name: 'Plank', sets: 3, durationSeconds: 30 },
        ],
      },
      {
        name: 'Tempo Run Builder',
        description: 'Intervals that improve pacing and aerobic endurance.',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Easy warm-up', durationMinutes: 8 },
          { name: 'Tempo interval', sets: 4, durationMinutes: 5 },
          { name: 'Easy recovery', sets: 4, durationMinutes: 2 },
        ],
      },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, 4 activities, 3 leaderboard entries, and 2 workouts`);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

seedDatabase();
