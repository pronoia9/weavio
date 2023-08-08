'use server';

import { FilterQuery, SortOrder } from 'mongoose';
import { revalidatePath } from 'next/cache';

import User from '@/lib/models/user.model';
import Thread from '@/lib/models/thread.model';
import Community from '@/lib/models/community.model';

import { connectToDB } from '../mongoose';

interface Params {
  userId: string;
  image: string;
  name: string;
  username: string;
  bio: string;
  path: string;
}

export async function updateUser({ userId, image, name, username, bio, path }: Params): Promise<void> {
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true });
    if (path === '/profile/edit') revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}