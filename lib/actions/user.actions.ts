"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    if (!userId) {
      throw new Error("UserId is required");
    }

    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      console.warn(`User not found for clerkId: ${userId}. Creating new user...`);
      
      // Try to get user data from Clerk
      try {
        const { clerkClient } = await import("@clerk/nextjs/server");
        const clerkUser = await clerkClient.users.getUser(userId);
        
        const newUserData = {
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || `${userId}@temp.local`,
          username: clerkUser.username || `user_${userId}`,
          photo: clerkUser.imageUrl || '/assets/images/placeholder.png',
          firstName: clerkUser.firstName || 'User',
          lastName: clerkUser.lastName || 'New',
        };
        
        const newUser = await User.create(newUserData);
        return JSON.parse(JSON.stringify(newUser));
      } catch (clerkError) {
        console.error("Error fetching from Clerk:", clerkError);
        throw new Error(`User not found for clerkId: ${userId}`);
      }
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    )

    if(!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    console.error("Error updating credits:", error);
    throw error;
  }
}