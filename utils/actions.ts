/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import {
  imageSchema,
  profileSchema,
  propertySchema,
  validateWithZodSchema,
} from './schemas';
import { uploadImage } from './supabase';
import db from './db';
// import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
// import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('protected route');
  }

  if (!user.privateMetadata.hasProfile) redirect('/profile/create');

  return user;
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('Please login to create a profile');

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    });

    const client = await clerkClient();
    client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect('/');
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!profile) redirect('profile/create');

  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await currentUser();
  if (!user) throw new Error('create a user to update user');

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });

    revalidatePath('/profile');
    return { message: 'profile updated' };
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });

    const fullPath = await uploadImage(validatedFields.image);
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });
    revalidatePath('/profile');
    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const rawData = Object.fromEntries(formData);
  const validatedFields = validateWithZodSchema(propertySchema, rawData);

  console.log(user, validatedFields);

  return { message: 'property created' };
  try {
  } catch (error) {
    return renderError(error);
  }

  // redirect('/');
};
const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message:
      error instanceof Error
        ? error.message
        : 'An unexpected error has occurred',
  };
};
