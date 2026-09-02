import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profile: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

const teamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  recordedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, default: 0 },
  rank: { type: Number },
}, { timestamps: true });

const workoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  difficulty: { type: String, default: 'beginner' },
  exercises: { type: [Schema.Types.Mixed], default: [] },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);